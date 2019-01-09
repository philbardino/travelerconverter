import React from "react";
import Currency from "./currency.js";
import UnusedCurrency from "./unusedCurrency.js";
import VariableCurrency from "./variableCurrency.js";
import Bookmark from "./bookmark.js";
import { CSSTransitionGroup } from "react-transition-group";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

export default class Converter extends React.Component {
  constructor(props) {
    super(props);

    let initialCurrencies = getCurrencies();
    this.state = {
      rates: [],
      variableCurrency: initializeVariableCurrency(),
      currencies: initializeCurrencies(initialCurrencies),
      unusedCurrencies: initializeUnusedCurrencies(initialCurrencies),
      copySuccess: ""
    };
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleUnusedClick = this.handleUnusedClick.bind(this);
    this.handleUsedClick = this.handleUsedClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://s3.us-east-2.amazonaws.com/www.travelerconverter.com/exchangeRates.json"
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          rates: result.rates
        });
      });
  }

  handleBookmarkClick(event) {
    let bookmarkUrl =
      window.location.host +
      "?variable=" +
      this.state.variableCurrency[0].code +
      "&";
    for (var i = 0; i < this.state.currencies.length; i++) {
      bookmarkUrl += "country=" + this.state.currencies[i].code + "&";
    }
    bookmarkUrl = bookmarkUrl.substring(0, bookmarkUrl.length - 1);

    copyStringToClipboard(bookmarkUrl);
    this.setState({ copySuccess: "URL copied to clipboard" });
    setTimeout(() => this.setState({ copySuccess: "" }), 3000);
  }

  handleDropdownChange(event) {
    let updatedVariableCurrency = this.state.variableCurrency;
    updatedVariableCurrency[0].code = event.target.value;
    this.setState({ variableCurrency: updatedVariableCurrency });
    this.convert(event.target.value, this.state.variableCurrency[0].amount);
  }

  handleAmountChange(event) {
    let inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      this.convert(event.target.id, inputValue);
    }
  }

  handleUnusedClick(event) {
    let updatedCurrencies = this.state.currencies;
    let updatedUnusedCurrencies = this.state.unusedCurrencies;
    for (let i = 0; i < updatedUnusedCurrencies.length; i++) {
      if (updatedUnusedCurrencies[i].flag === event.target.id) {
        updatedCurrencies.splice(
          updatedCurrencies.length,
          1,
          updatedUnusedCurrencies[i]
        );
        updatedUnusedCurrencies.splice(i, 1);
      }
    }
    this.setState({ unusedCurrencies: updatedUnusedCurrencies });
    this.setState({ currencies: updatedCurrencies });
  }
  handleUsedClick(event) {
    let updatedCurrencies = this.state.currencies;
    let updatedUnusedCurrencies = this.state.unusedCurrencies;
    for (let i = 0; i < updatedCurrencies.length; i++) {
      if (updatedCurrencies[i].flag === event.target.id) {
        updatedUnusedCurrencies.splice(
          updatedUnusedCurrencies.length,
          1,
          updatedCurrencies[i]
        );
        updatedCurrencies.splice(i, 1);
      }
    }
    this.setState({ unusedCurrencies: updatedUnusedCurrencies });
    this.setState({ currencies: updatedCurrencies });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const list = reorder(
      this.state.currencies,
      result.source.index,
      result.destination.index
    );

    this.setState({
      currencies: list
    });
  };

  convert(fromCurrency, enteredValue) {
    let updatedCurrencies = this.state.currencies;
    let updatedUnusedCurrencies = this.state.unusedCurrencies;
    let updatedVariableCurrency = this.state.variableCurrency;

    var usdAmount = enteredValue / this.state.rates[fromCurrency];
    for (let i = 0; i < updatedCurrencies.length; i++) {
      let code = updatedCurrencies[i].code;
      let amount = Math.round(usdAmount * this.state.rates[code] * 100) / 100;
      updatedCurrencies[i].amount = amount;
    }
    for (let i = 0; i < updatedUnusedCurrencies.length; i++) {
      let code = updatedUnusedCurrencies[i].code;
      let amount = Math.round(usdAmount * this.state.rates[code] * 100) / 100;
      updatedUnusedCurrencies[i].amount = amount;
    }
    let variableCode = this.state.variableCurrency[0].code;
    let variableAmount =
      Math.round(usdAmount * this.state.rates[variableCode] * 100) / 100;
    updatedVariableCurrency[0].amount = variableAmount;
    this.setState({ variableCurrency: updatedVariableCurrency });
    this.setState({ currencies: updatedCurrencies });
  }

  render() {
    let currencyList = [];
    let unusedCurrencyList = [];
    currencyList = this.state.currencies.map((currency, index) => (
      <Draggable key={currency.code} draggableId={currency.code} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Currency
              key={currency.code}
              country={currency}
              onChange={this.handleAmountChange}
              onClick={this.handleUsedClick}
            />
          </div>
        )}
      </Draggable>
    ));
    unusedCurrencyList = this.state.unusedCurrencies.map(unusedCurrency => (
      <UnusedCurrency
        key={unusedCurrency.code}
        country={unusedCurrency}
        onClick={this.handleUnusedClick}
      />
    ));

    return (
      <div>
        <div id="currencyBox">
          <h1>Traveler Converter</h1>
          <div id="intro">
            A currency converter specifically designed for
            <span className="unused"> backpackers</span> traveling through
            <span className="unused"> Southeast Asia</span>
          </div>
          <div id="data">
            <form>
              <ul id="currencyList" className="sortable">
                <VariableCurrency
                  country={this.state.variableCurrency[0]}
                  onDropdownChange={this.handleDropdownChange}
                  onChange={this.handleAmountChange}
                />
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {provided => (
                      <div ref={provided.innerRef}>
                        <CSSTransitionGroup
                          transitionName="currencies"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                        >
                          {currencyList}
                        </CSSTransitionGroup>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </ul>
            </form>
          </div>
          <div id="unused">
            <div id="unusedHeader">
              <span className="unused">Drag</span> flags to reorder.
              <span className="unused"> Click</span> flags to add and remove
            </div>
            <ul id="unusedFlags">
              <CSSTransitionGroup
                transitionName="unusedCurrencies"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {unusedCurrencyList}
              </CSSTransitionGroup>
            </ul>
          </div>
        </div>
        <Bookmark
          onClick={this.handleBookmarkClick}
          copySuccess={this.state.copySuccess}
        />
      </div>
    );
  }
}

const reorder = (currencies, startIndex, endIndex) => {
  const reorderedCurrencies = Array.from(currencies);
  const [removed] = reorderedCurrencies.splice(startIndex, 1);
  reorderedCurrencies.splice(endIndex, 0, removed);
  return reorderedCurrencies;
};

const currenciesMaster = [
  {
    code: "USD",
    id: "currencyUSD",
    label: "US Dollar - USD",
    flag: "United_States",
    amount: 0
  },
  {
    code: "KHR",
    id: "currencyKHR",
    label: "Cambodian Riel - KHR",
    flag: "Cambodia",
    amount: 0
  },
  {
    code: "IDR",
    id: "currencyIDR",
    label: "Indonesian Rupiah - IDR",
    flag: "Indonesia",
    amount: 0
  },
  {
    code: "LAK",
    id: "currencyLAK",
    label: "Lao Kip - LAK",
    flag: "Laos",
    amount: 0
  },

  {
    code: "THB",
    id: "currencyTHB",
    label: "Thai Baht - THB",
    flag: "Thailand",
    amount: 0
  },
  {
    code: "VND",
    id: "currencyVND",
    label: "Vietnamese Dong - VND",
    flag: "Vietnam",
    amount: 0
  },
  {
    code: "CNY",
    id: "currencyCNY",
    label: "Chinese Yuan Renminbi - CNY",
    flag: "China",
    amount: 0
  },
  {
    code: "HKD",
    id: "currencyHKD",
    label: "Hong Kong Dollar - HKD",
    flag: "Hong_Kong",
    amount: 0
  },
  {
    code: "INR",
    id: "currencyINR",
    label: "Indian Rupee - INR",
    flag: "India",
    amount: 0
  },
  {
    code: "JPY",
    id: "currencyJPY",
    label: "Japanese Yen - JPY",
    flag: "Japan",
    amount: 0
  },
  {
    code: "MYR",
    id: "currencyMYR",
    label: "Malaysian Ringgit - MYR",
    flag: "Malaysia",
    amount: 0
  },
  {
    code: "MMK",
    id: "currencyMMK",
    label: "Myanmar Kyat - MMK",
    flag: "Myanmar",
    amount: 0
  },
  {
    code: "PHP",
    id: "currencyPHP",
    label: "Philippine Peso - PHP",
    flag: "Philippines",
    amount: 0
  },
  {
    code: "SGD",
    id: "currencySGD",
    label: "Singapore Dollar - SGD",
    flag: "Singapore",
    amount: 0
  },
  {
    code: "KRW",
    id: "currencyKRW",
    label: "South Korean Won - KRW",
    flag: "South_Korea",
    amount: 0
  }
];

const getCurrencies = () => {
  let url = window.location.href;
  let countryParameters = new URLSearchParams(
    url.substring(url.indexOf("?") + 1)
  );
  let urlCountries = ["USD", "KHR", "IDR", "LAK", "THB", "VND"];
  if (countryParameters.getAll("country").length > 0) {
    urlCountries = countryParameters.getAll("country");
  }
  return urlCountries;
};

const initializeCurrencies = urlCountries => {
  let usedCurrencies = [];
  if (urlCountries.length > 0) {
    urlCountries.forEach(element => {
      currenciesMaster.forEach(country => {
        if (element === country.code) {
          usedCurrencies.push(country);
        }
      });
    });
  }
  return usedCurrencies;
};

const initializeUnusedCurrencies = urlCountries => {
  let unusedCurrencies = currenciesMaster;
  for (let i = 0; i < urlCountries.length; i++) {
    for (let j = 0; j < currenciesMaster.length; j++) {
      if (urlCountries[i] === unusedCurrencies[j].code) {
        unusedCurrencies.splice(j, 1);
        break;
      }
    }
  }
  return unusedCurrencies;
};

const initializeVariableCurrency = () => {
  let url = window.location.href;
  let countryParameters = new URLSearchParams(
    url.substring(url.indexOf("?") + 1)
  );
  let variableCurrency = [{ code: "EUR", amount: 0 }];
  if (countryParameters.get("variable")) {
    variableCurrency[0].code = countryParameters.get("variable");
  }
  return variableCurrency;
};

const copyStringToClipboard = str => {
  var el = document.createElement("textarea");
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", false);
  el.setAttribute("contenteditable", true);
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
};
