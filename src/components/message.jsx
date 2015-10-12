var React = require('react');

module.exports = React.createClass({
  scroll: function (li) {
    li.scrollIntoView();
  },
  render: function () {
    return (
      <li key={this.props.id} ref={this.scroll}>
        { this.props.body }
      </li>
    );
  }
});
