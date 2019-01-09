import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Bookmark extends React.Component {
  render() {
    const bookmarkCopy = this.props.copySuccess ? (
      <div className="copy" key="bookmark">
        {this.props.copySuccess}
      </div>
    ) : (
      ""
    );

    return (
      <div className="bookmark">
        <CopyToClipboard
          onCopy={this.props.onClick}
          text={generateUrl(this.props.variableCurrency, this.props.currencies)}
        >
          <input id="bookmarkButton" type="button" value="Bookmark Layout" />
        </CopyToClipboard>
        <CSSTransitionGroup
          transitionName="bookmarkCopy"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {bookmarkCopy}
        </CSSTransitionGroup>
        <div id="poweredBy">
          Powered by
          <a href="http://openexchangerates.org/">openexchangerates.org</a>
        </div>
      </div>
    );
  }
}

const generateUrl = (variableCurrency, currencies) => {
  let bookmarkUrl =
    window.location.host + "?variable=" + variableCurrency[0].code + "&";
  for (var i = 0; i < currencies.length; i++) {
    bookmarkUrl += "country=" + currencies[i].code + "&";
  }
  bookmarkUrl = bookmarkUrl.substring(0, bookmarkUrl.length - 1);
  return bookmarkUrl;
};
