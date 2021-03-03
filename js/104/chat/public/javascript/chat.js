(function () {
  const socketIo = io();


let ourChatters = [], myName;
  //socketIo.emit('message', 'This is a message from the client');
  const loginForm = $('#loginForm'), messagesContainer = $('#messagesContainer');
  loginForm.submit(e => {
    e.preventDefault();

    socketIo.emit('login', $('#name').val(), callbackData => {
      if(callbackData) {
        $('#error').text(callbackData);
      } else {
        loginForm.slideUp();
        messagesContainer.slideDown();
        myName = $('#name').val();
        $('header').text(`${myName}'s Chat!!`);
      }
    });
  });

  const messageInput = $('#message');
  $('#messageForm').submit(e => {
    e.preventDefault();
    const msg = messageInput.val().trim();
    if (msg) {
      socketIo.emit('message', messageInput.val());
    }
  });

  const messagesElem = $('#messages');
  socketIo.on('message', msg => {
    messagesElem.append(`<div><span class="chatUsers">${msg.author}:</span> ${msg.msg}</div>`);
  });

  socketIo.on('noPrivate', msg => alert(msg));

  const participants = $('#participants');  let isShowing;
  messagesContainer.append($(`<button>Show Participants</button>`).on('click', function() {
    isShowing = !isShowing; let button = $(this);
    isShowing ? button.text('Hide Participants') : button.text('Show Participants');
    isShowing ? participants.slideDown() : participants.slideUp();
  }));
  
  socketIo.on('chatters', chatters => {
    chatters.filter(ch => !ourChatters.find(oc => oc.name === ch)).forEach(c => {
      const typing = $('<span class="typing">typing....</span>');
      participants.append($(`<div class="chatters">${c} </div>`).append(typing)
              .on('click', () => messageInput.val(`@${c}@(private): `)));
    console.log(chatters);
    ourChatters = chatters.map(c => ({name: c, typing: typing}));
    });
  });

  messageInput.on('input', () => {
    socketIo.emit('typing', myName);
  });

  socketIo.on('typing', () => {console.log('typing event'); ourChatters.forEach(c => c.typing.slideDown())});    
      
}());