import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

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
        <input
          id="bookmarkButton"
          type="button"
          value="Bookmark Layout"
          onClick={this.props.onClick}
        />
        <CSSTransitionGroup
          transitionName="bookmarkCopy"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {bookmarkCopy}
        </CSSTransitionGroup>
        {/*<input id="bookmarkInput" type="text" value={this.props.url} />*/}
        <div id="poweredBy">
          Powered by
          <a href="http://openexchangerates.org/">openexchangerates.org</a>
        </div>
      </div>
    );
  }
}
