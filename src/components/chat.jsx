var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Message = require('./message');
var socket = io();

module.exports = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return { messages: [], message: "" };
  },
  componentDidMount: function () {
    socket.on('chat message', function (message) {
      this.addMessage(message);
    }.bind(this));
  },
  addMessage: function (message){
    var message = { 
      id: this.state.messages.length,
      body: message
    };
    this.state.messages.push(message);
    this.setState({messages: this.state.messages});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.message === "") {
      return;
    }
    var socket = io();
    socket.emit('chat message', this.state.message);
    this.addMessage(this.state.message);
    this.setState({message: ""});
  },
  render: function () {
    return (
      <div>
        <ul id="messages" style={{overflow: 'auto', paddingBottom: '40px'}}>
          {
            this.state.messages.map(function (message) {
              return <Message {...message} key={message.id} />
              })
          }
        </ul>
        <form
          action="">
          <input autoComplete="off" valueLink={this.linkState('message')} />
          <button onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
});
