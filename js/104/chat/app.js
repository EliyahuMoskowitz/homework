const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require("socket.io")(server);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const chatters = [];
socketIo.on("connection", socket => {
  console.log('server got a connection');

  //socket.emit('message', 'This is a message from the server');

  //socket.on('message', msg => console.log(msg));

  let name;
  socket.on('login', (loginName, callback) => {
    const n = loginName.trim();
    if (!n) {
      callback('Username is required.');
      return;
    }
    if (n.includes('@')) {
      callback('Username can not include @');
      return;
    }
    if (chatters.find(c => c.name === n)) {
      callback(`Username ${n} already used. Please choose another.`);
    } else {
      name = n;
      chatters.push({socket: socket, name: name});
      // chatters.push(name);
      callback();
      // let theChatters = chatters.map(c => c.name);
      socketIo.emit('chatters', chatters.map(c => c.name));

      socket.on('message', msg => {
        const m = msg.trim();
        if(m.startsWith('@')){
          let theChatter = chatters.find(c => c.name ===  m.split('@')[1]);
          if(theChatter){
            theChatter.socket.emit('message', { author: name, msg: msg });
            socket.emit('message', { author: name, msg: msg });
          }else{
            socket.emit('noPrivate', 'There is no such user!');
          }
          
        }else if (m) {
          socketIo.emit('message', { author: name, msg: msg });
        }
      });

      socket.on('typing', name => chatters.filter(ch => ch.name === name)
            .forEach(c => c.socket.emit('typing', 'typing'/*, {expiresInMinutes: 0.1}*/)));
    }
  });
});

app.use('/', (req, res, next) => {
  res.send('Hello World!');
});

server.listen(80);