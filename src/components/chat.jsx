var React = require('react');

module.exports = React.createClass({
  componentDidMount: function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });

  },
  render: function () {
    return (
      <div>
        <ul id="messages"></ul>
        <form
          action="">
          <input
            id="m"
            autoComplete="off"
          /><button>Send</button>
        </form>
      </div>
    );
  }
});
