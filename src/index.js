import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

class Currency extends React.Component {
  render() {
    return (
      <li className="currency" draggable="true">
        <div className="inputandflag">
          <div className="input_text">
            <input
              type="text"
              name={this.props.country.code}
              id={this.props.country.code}
              className="number"
              value={this.props.country.amount}
              step=".01"
              onChange={this.props.onChange}
            />
          </div>
          <div
            className="flag handle"
            id={this.props.country.flag}
            onClick={this.props.onClick}
          />
        </div>
        <div className="label">
          <label className="currencylabel">{this.props.country.label}</label>
        </div>
      </li>
    );
  }
}

class UnusedCurrency extends React.Component {
  render() {
    return (
      <li
        className="unusedFlag"
        name={this.props.country.code}
        id={this.props.country.flag}
        onClick={this.props.onClick}
      />
    );
  }
}

class VariableCurrency extends React.Component {
  render() {
    return (
      <li className="currency" id="disabledItem">
        <div className="inputandflag">
          <div className="input_text">
            <input
              type="text"
              name="variableCurrency"
              id={this.props.country.code}
              className="number"
              value={this.props.country.amount}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div id="currencyFrom">
          <select
            id="currencyFrom"
            className="currencyFrom"
            size="1"
            tabIndex="2"
            value={this.props.country.code}
            onChange={this.props.onDropdownChange}
          >
            <option value="AUD">Australian Dollar - AUD</option>
            <option value="CAD">Canadian Dollar - CAD</option>
            <option value="CHF">Swiss Franc - CHF</option>
            <option value="DKK">Danish Krone - DKK</option>
            <option value="EUR">Euro - EUR</option>
            <option value="GBP">British Pound - GBP</option>
            <option value="HUF">Hungarian Forint - HUF</option>
            <option value="MXN">Mexican Peso - MXN</option>
            <option value="NOK">Norwegian Krone - NOK</option>
            <option value="NZD">New Zealand Dollar - NZD</option>
            <option value="RUB">Russian Ruble - RUB</option>
            <option value="SEK">Swedish Krona - SEK</option>
            <option value="TRY">Turkish Lira - TRY</option>
            <option value="ZAR">South African Rand - ZAR</option>
          </select>
        </div>
      </li>
    );
  }
}

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: [
        {
          AED: 3.673018,
          AFN: 75.799153,
          ALL: 108.41,
          AMD: 485.139421,
          ANG: 1.774807,
          AOA: 309.483,
          ARS: 37.408,
          AUD: 1.387106,
          AWG: 1.800249,
          AZN: 1.7025,
          BAM: 1.718723,
          BBD: 2,
          BDT: 83.734,
          BGN: 1.714357,
          BHD: 0.37697,
          BIF: 1815,
          BMD: 1,
          BND: 1.575965,
          BOB: 6.91035,
          BRL: 3.907959,
          BSD: 1,
          BTC: 0.000288072515,
          BTN: 70.789845,
          BWP: 10.648005,
          BYN: 2.132107,
          BZD: 2.015849,
          CAD: 1.32829,
          CDF: 1610,
          CHF: 0.989275,
          CLF: 0.024214,
          CLP: 674.7866,
          CNH: 6.884422,
          CNY: 6.8744,
          COP: 3175.156886,
          CRC: 598.540358,
          CUC: 1,
          CUP: 25.75,
          CVE: 97.2375,
          CZK: 22.648007,
          DJF: 178.05,
          DKK: 6.53535,
          DOP: 50.315,
          DZD: 118.415,
          EGP: 17.90978,
          ERN: 14.99759,
          ETB: 28.17,
          EUR: 0.875446,
          FJD: 2.110204,
          FKP: 0.784212,
          GBP: 0.784212,
          GEL: 2.648677,
          GGP: 0.784212,
          GHS: 4.99,
          GIP: 0.784212,
          GMD: 49.515,
          GNF: 9190,
          GTQ: 7.726401,
          GYD: 209.700159,
          HKD: 7.81351,
          HNL: 24.410019,
          HRK: 6.4828,
          HTG: 75.214827,
          HUF: 282.9383,
          IDR: 14534.3,
          ILS: 3.73305,
          IMP: 0.784212,
          INR: 71.364928,
          IQD: 1190,
          IRR: 42495.428797,
          ISK: 121.579905,
          JEP: 0.784212,
          JMD: 127.04,
          JOD: 0.709607,
          JPY: 112.64094444,
          KES: 102.397786,
          KGS: 68.708289,
          KHR: 4030,
          KMF: 432.503855,
          KPW: 900,
          KRW: 1126.2075,
          KWD: 0.303982,
          KYD: 0.83319,
          KZT: 370.66,
          LAK: 8545,
          LBP: 1508.714668,
          LKR: 178.525585,
          LRD: 158.099657,
          LSL: 14.04,
          LYD: 1.39,
          MAD: 9.473399,
          MDL: 17.237015,
          MGA: 3565,
          MKD: 54.038702,
          MMK: 1560.344317,
          MNT: 2453.75,
          MOP: 8.050507,
          MRO: 357,
          MRU: 36.55,
          MUR: 34.402,
          MVR: 15.459996,
          MWK: 739.254786,
          MXN: 20.267355,
          MYR: 4.162939,
          MZN: 60.650412,
          NAD: 14.04,
          NGN: 364.5,
          NIO: 32.4,
          NOK: 8.476408,
          NPR: 113.263963,
          NZD: 1.456335,
          OMR: 0.385026,
          PAB: 1,
          PEN: 3.365967,
          PGK: 3.3612,
          PHP: 52.766272,
          PKR: 139.11,
          PLN: 3.757697,
          PYG: 5909.638782,
          QAR: 3.640999,
          RON: 4.069914,
          RSD: 103.619234,
          RUB: 66.4114,
          RWF: 891.692129,
          SAR: 3.7522,
          SBD: 7.99389,
          SCR: 13.639789,
          SDG: 47.6,
          SEK: 9.018266,
          SGD: 1.369272,
          SHP: 0.784212,
          SLL: 8390,
          SOS: 580,
          SRD: 7.458,
          SSP: 130.2634,
          STD: 21050.59961,
          STN: 21.575,
          SVC: 8.750972,
          SYP: 514.993439,
          SZL: 14.04,
          THB: 32.853667,
          TJS: 9.425877,
          TMT: 3.499986,
          TND: 2.927948,
          TOP: 2.290526,
          TRY: 5.299406,
          TTD: 6.74045,
          TWD: 30.937,
          TZS: 2299.3,
          UAH: 27.872,
          UGX: 3736.27142,
          USD: 1,
          UYU: 32.167337,
          UZS: 8315,
          VEF: 248487.642241,
          VES: 188.07911,
          VND: 23235.412672,
          VUV: 110.812039,
          WST: 2.599144,
          XAF: 574.254886,
          XAG: 0.06830847,
          XAU: 0.00080003,
          XCD: 2.70255,
          XDR: 0.718662,
          XOF: 574.254886,
          XPD: 0.00081799,
          XPF: 104.468488,
          XPT: 0.00125977,
          YER: 250.350747,
          ZAR: 14.181166,
          ZMW: 11.886,
          ZWL: 322.355011
        }
      ],
      variableCurrency: [{ code: "EUR", amount: 0 }],
      currencies: [
        {
          code: "USD",
          id: "currencyUSD",
          label: "US Dollar - USD",
          flag: "United_States",
          amount: 0,
          used: true
        },
        {
          code: "KHR",
          id: "currencyKHR",
          label: "Cambodian Riel - KHR",
          flag: "Cambodia",
          amount: 0,
          used: true
        },
        {
          code: "CNY",
          id: "currencyCNY",
          label: "Chinese Yuan Renminbi - CNY",
          flag: "China",
          amount: 0,
          used: false
        },
        {
          code: "HKD",
          id: "currencyHKD",
          label: "Hong Kong Dollar - HKD",
          flag: "Hong_Kong",
          amount: 0,
          used: false
        },
        {
          code: "INR",
          id: "currencyINR",
          label: "Indian Rupee - INR",
          flag: "India",
          amount: 0,
          used: false
        },
        {
          code: "IDR",
          id: "currencyIDR",
          label: "Indonesian Rupiah - IDR",
          flag: "Indonesia",
          amount: 0,
          used: true
        },
        {
          code: "JPY",
          id: "currencyJPY",
          label: "Japanese Yen - JPY",
          flag: "Japan",
          amount: 0,
          used: false
        },
        {
          code: "LAK",
          id: "currencyLAK",
          label: "Lao Kip - LAK",
          flag: "Laos",
          amount: 0,
          used: true
        },
        {
          code: "MYR",
          id: "currencyMYR",
          label: "Malaysian Ringgit - MYR",
          flag: "Malaysia",
          amount: 0,
          used: false
        },
        {
          code: "MMK",
          id: "currencyMMK",
          label: "Myanmar Kyat - MMK",
          flag: "Myanmar",
          amount: 0,
          used: false
        },
        {
          code: "PHP",
          id: "currencyPHP",
          label: "Philippine Peso - PHP",
          flag: "Philippines",
          amount: 0,
          used: false
        },
        {
          code: "SGD",
          id: "currencySGD",
          label: "Singapore Dollar - SGD",
          flag: "Singapore",
          amount: 0,
          used: false
        },
        {
          code: "KRW",
          id: "currencyKRW",
          label: "South Korean Won - KRW",
          flag: "South_Korea",
          amount: 0,
          used: false
        },
        {
          code: "THB",
          id: "currencyTHB",
          label: "Thai Baht - THB",
          flag: "Thailand",
          amount: 0,
          used: true
        },
        {
          code: "VND",
          id: "currencyVND",
          label: "Vietnamese Dong - VND",
          flag: "Vietnam",
          amount: 0,
          used: true
        }
      ]
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleUnusedClick = this.handleUnusedClick.bind(this);
    this.handleUsedClick = this.handleUsedClick.bind(this);
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
    for (let i = 0; i < updatedCurrencies.length; i++) {
      if (updatedCurrencies[i].flag === event.target.id) {
        updatedCurrencies[i].used = true;
      }
    }
    this.setState({ currencies: updatedCurrencies });
  }
  handleUsedClick(event) {
    let updatedCurrencies = this.state.currencies;
    for (let i = 0; i < updatedCurrencies.length; i++) {
      console.log(event.target.id);
      if (updatedCurrencies[i].flag === event.target.id) {
        updatedCurrencies[i].used = false;
      }
    }
    this.setState({ currencies: updatedCurrencies });
  }

  convert(fromCurrency, enteredValue) {
    let updatedCurrencies = this.state.currencies;
    let updatedVariableCurrency = this.state.variableCurrency;

    var usdAmount = enteredValue / this.state.rates[0][fromCurrency];
    for (let i = 0; i < updatedCurrencies.length; i++) {
      var amount =
        Math.round(
          usdAmount * this.state.rates[0][updatedCurrencies[i].code] * 100
        ) / 100;
      updatedCurrencies[i].amount = amount;
    }
    var variableAmount =
      Math.round(
        usdAmount *
          this.state.rates[0][this.state.variableCurrency[0].code] *
          100
      ) / 100;
    updatedVariableCurrency[0].amount = variableAmount;
    this.setState({ variableCurrency: updatedVariableCurrency });
    this.setState({ currencies: updatedCurrencies });
  }

  render() {
    let currencyList = [];
    let unusedCurrencyList = [];
    for (let i = 0; i < this.state.currencies.length; i++) {
      if (this.state.currencies[i].used === true) {
        currencyList.push(
          <Currency
            key={this.state.currencies[i].code}
            country={this.state.currencies[i]}
            onChange={this.handleAmountChange}
            onClick={this.handleUsedClick}
          />
        );
      } else {
        unusedCurrencyList.push(
          <UnusedCurrency
            key={this.state.currencies[i].code}
            country={this.state.currencies[i]}
            onClick={this.handleUnusedClick}
          />
        );
      }
    }

    return (
      <div id="currencyBox">
        <div id="data">
          <form>
            <ul id="currencyList" className="sortable">
              <VariableCurrency
                country={this.state.variableCurrency[0]}
                onDropdownChange={this.handleDropdownChange}
                onChange={this.handleAmountChange}
              />
              {currencyList}
            </ul>
          </form>
        </div>
        <div id="unused">
          <div id="unusedHeader">
            <span className="unused"> Click</span> Flags to Add and Remove
          </div>
          <ul id="unusedFlags">{unusedCurrencyList}</ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Converter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
