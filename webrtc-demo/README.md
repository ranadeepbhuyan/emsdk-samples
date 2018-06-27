# WebRTC demo
Simple node.js server with socket.io as signalling mechanism.

# Steps

1. Clone the repo
2. cd webrtc-demo
3. npm install
4. node server/server.js
5. http://localhost:3000

Connect to peer using: [RTCPeerConnection]
https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection

Share a media stream accessed via [getUserMedia]
https://developer.mozilla.org/en-US/docs/NavigatorUserMedia.getUserMedia

Send arbriary data to the peer using the [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel). 

[Node.js] server set-up using socket.io as the signaling mechanism between the peer connections to exchange [ICECandidate](https://developer.mozilla.org/en-US/docs/Web/Events/icecandidate) information in order to be able to do the inital connection.