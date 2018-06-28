const messages = [];
function createConnection() {
    return new SimpleWebRTC({
      // dom element that will hold local video
      localVideoEl: 'local-video',
      // dom element dom element that will hold remote video
      remoteVideosEl: 'remote-videos',
      // immediately ask for camera access
      autoRequestMedia: true,
      debug: false,
      detectSpeakingEvents: true,
      autoAdjustMic: false,
    });
}

function handleRemoteVideoAdded(webrtc, remoteVideoTemplate, remoteVideosCount) {
    webrtc.on('videoAdded', (video, peer) => {
      const remoteVideosEl = $('#remote-videos');
      const id = webrtc.getDomId(peer);
      console.log("videoAdded....." + id);
      const html = remoteVideoTemplate({ id });
      console.log("remoteVideosCount: " + remoteVideosCount);
      if (remoteVideosCount === 0) {
        remoteVideosEl.html(html);
      } else {
        remoteVideosEl.append(html);
      }

      $(`#${id}`).html(video);
      $(`#${id} video`).addClass('ui image medium'); // Make video element responsive
      remoteVideosCount += 1;
    });
}


function updateChatMessages() {
    const chatContentTemplate = Handlebars.compile($('#chat-content-template').html());
    const html = chatContentTemplate({ messages });
    const chatContentEl = $('#chat-content');
    chatContentEl.html(html);
    // automatically scroll downwards
    const scrollHeight = chatContentEl.prop('scrollHeight');
    chatContentEl.animate({ scrollTop: scrollHeight }, 'slow');
}

function postMessage(webrtc, message) {
    const chatMessage = {
      username,
      message,
      postedOn: new Date().toLocaleString('en-GB'),
    };
    // Send to all peers
    webrtc.sendToAll('chat', chatMessage);
    // Update messages locally
    messages.push(chatMessage);
    $('#post-message').val('');
    updateChatMessages();
}

function showChatRoom(webrtc, room) {
    // Display Chat Interface
    const formEl = $('.form');
    formEl.hide();

    const chatTemplate = Handlebars.compile($('#chat-template').html());
    const chatEl = $('#chat');

    const html = chatTemplate({ room });
    chatEl.html(html);
    const postForm = $('form');
    postForm.form({
      message: 'empty',
    });
    $('#post-btn').on('click', () => {
      const message = $('#post-message').val();
      postMessage(webrtc, message);
    });
    $('#post-message').on('keyup', (event) => {
      if (event.keyCode === 13) {
        const message = $('#post-message').val();
        postMessage(webrtc, message);
      }
    });
}

function createChatRoom(webrtc, roomName) {
    const formEl = $('.form');
    console.info(`Creating new room: ${roomName}`);
    webrtc.createRoom(roomName, (err, name) => {
      formEl.form('clear');
      showChatRoom(webrtc, name);
      postMessage(webrtc, `${username} created chatroom`);
    });
}

function joinChatRoom(webrtc, roomName) {
    // Join existing Chat Room
    console.log(`Joining Room: ${roomName}`);
    webrtc.joinRoom(roomName);
    showChatRoom(webrtc, roomName);
    postMessage(webrtc, `${username} joined chatroom`);
}

function submitRoom(webrtc, event) {
    // Room Submit Button Handler
    /*if (!formEl.form('is valid')) {
      return false;
    }*/
    username = $('#username').val();
    const roomName = $('#roomName').val().toLowerCase();
    if (event.target.id === 'create-btn') {
      createChatRoom(webrtc, roomName);
    } else {
      joinChatRoom(webrtc, roomName);
    }
    return false;
}

window.addEventListener('load', () => {
  const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
  let remoteVideosCount = 0;

  // Local Video display element
  const localImageEl = $('#local-image');
  const localVideoEl = $('#local-video');

  // Hide camera
  localVideoEl.hide();

  //Step 1. create webrtc connection
  const webrtc = createConnection();
  
  //Register callback for local camera access event
  webrtc.on('localStream', () => {
    localImageEl.hide();
    //Start showing the local camera
    localVideoEl.show();
  });

  //Register callback for remote vided added event
  handleRemoteVideoAdded(webrtc, remoteVideoTemplate, remoteVideosCount);

  //Register callback for handling message from remote user
  webrtc.connection.on('message', (data) => {
    if (data.type === 'chat') {
      const message = data.payload;
      messages.push(message);
      updateChatMessages();
    }
  });

  //Creat or Join room UI button action handler
  $('.submit').on('click', (event) => {
    submitRoom(webrtc, event);
  });
});

// window.addEventListener('load', () => {
//   // UI Templates
//   const chatTemplate = Handlebars.compile($('#chat-template').html());
//   const chatContentTemplate = Handlebars.compile($('#chat-content-template').html());
//   const chatEl = $('#chat');
//   const formEl = $('.form');
//   const messages = [];
//   let username;


//   // Local Video
//   const localImageEl = $('#local-image');
//   const localVideoEl = $('#local-video');


//   // Remote Videos
//   const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
//   const remoteVideosEl = $('#remote-videos');
//   let remoteVideosCount = 0;
  

//   // Hide camera
//   localVideoEl.hide();

//   //create webrtc connection
//   const webrtc = new SimpleWebRTC({
//     // dom element that will hold local video
//     localVideoEl: 'local-video',
//     // dom element dom element that will hold remote video
//     remoteVideosEl: 'remote-videos',
//     // immediately ask for camera access
//     autoRequestMedia: true,
//     debug: false,
//     detectSpeakingEvents: true,
//     autoAdjustMic: false,
//   });

//   // handler for local camera access
//   webrtc.on('localStream', () => {
//     localImageEl.hide();
//     //Start showing the local camera
//     localVideoEl.show();
//   });


//   // Callback to handle - Remote video is added
//   webrtc.on('videoAdded', (video, peer) => {

//     const id = webrtc.getDomId(peer);
//     console.log("videoAdded....." + id);
//     const html = remoteVideoTemplate({ id });
//     console.log("remoteVideosCount: " + remoteVideosCount);
//     if (remoteVideosCount === 0) {
//       remoteVideosEl.html(html);
//     } else {
//       remoteVideosEl.append(html);
//     }

//     $(`#${id}`).html(video);
//     $(`#${id} video`).addClass('ui image medium'); // Make video element responsive
//     remoteVideosCount += 1;
//   });

//   // Update Chat Messages
//   const updateChatMessages = () => {
//     const html = chatContentTemplate({ messages });
//     const chatContentEl = $('#chat-content');
//     chatContentEl.html(html);
//     // automatically scroll downwards
//     const scrollHeight = chatContentEl.prop('scrollHeight');
//     chatContentEl.animate({ scrollTop: scrollHeight }, 'slow');
//   };

//   // Post Local Message
//   const postMessage = (message) => {
//     const chatMessage = {
//       username,
//       message,
//       postedOn: new Date().toLocaleString('en-GB'),
//     };
//     // Send to all peers
//     webrtc.sendToAll('chat', chatMessage);
//     // Update messages locally
//     messages.push(chatMessage);
//     $('#post-message').val('');
//     updateChatMessages();
//   };



//   // Display Chat Interface
//   const showChatRoom = (room) => {
//     formEl.hide();
//     const html = chatTemplate({ room });
//     chatEl.html(html);
//     const postForm = $('form');
//     postForm.form({
//       message: 'empty',
//     });
//     $('#post-btn').on('click', () => {
//       const message = $('#post-message').val();
//       postMessage(message);
//     });
//     $('#post-message').on('keyup', (event) => {
//       if (event.keyCode === 13) {
//         const message = $('#post-message').val();
//         postMessage(message);
//       }
//     });
//   };

//   // Register new Chat Room
//   const createRoom = (roomName) => {
//     // eslint-disable-next-line no-console
//     console.info(`Creating new room: ${roomName}`);
//     webrtc.createRoom(roomName, (err, name) => {
//       formEl.form('clear');
//       showChatRoom(name);
//       postMessage(`${username} created chatroom`);
//     });
//   };

//   // Join existing Chat Room
//   const joinRoom = (roomName) => {
//     // eslint-disable-next-line no-console
//     console.log(`Joining Room: ${roomName}`);
//     webrtc.joinRoom(roomName);
//     showChatRoom(roomName);
//     postMessage(`${username} joined chatroom`);
//   };

//   // Receive message from remote user
//   webrtc.connection.on('message', (data) => {
//     if (data.type === 'chat') {
//       const message = data.payload;
//       messages.push(message);
//       updateChatMessages();
//     }
//   });

//   // Room Submit Button Handler
//   $('.submit').on('click', (event) => {
//     if (!formEl.form('is valid')) {
//       return false;
//     }
//     username = $('#username').val();
//     const roomName = $('#roomName').val().toLowerCase();
//     if (event.target.id === 'create-btn') {
//       createRoom(roomName);
//     } else {
//       joinRoom(roomName);
//     }
//     return false;
//   });
// });
