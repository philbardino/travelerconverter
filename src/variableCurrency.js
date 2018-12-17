import React from "react";

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

export default VariableCurrency;
