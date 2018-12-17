import React from "react";

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

export default Currency;
