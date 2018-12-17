import React from "react";

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

export default UnusedCurrency;
