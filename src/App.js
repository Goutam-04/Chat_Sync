
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Components/Chat';

const socket = io.connect("http://localhost:8080");

function App() {

  const [username , setUsername] = useState("");
  const [room,setRoom] = useState("");

  const [showChat,setShowChat] = useState(false);
 
  const joinRoom = ()=>{
    if(username!==""&&room!==""){
      socket.emit("join_server",{room});
      setShowChat(true);
    }
  }

  return (
    <div className="App">
    {/* if else condition */}
    {!showChat ?(

    
    <div className='joinChatContainer'>

      <h3>Join a Chat</h3>
      <input type='text' placeholder='Name...' 
      value={username}
         onChange={(e) => setUsername(e.target.value)}
      />
      <input type='text' placeholder='Room ID...'
      value={room}
       onChange={(e) => setRoom(e.target.value)} />
      <button
      onClick={joinRoom}
      >Join A Room</button>


    </div>
    ):(

      <Chat socket={socket} username={username} room={room}/>
    )
    }
    </div>
  );
}

export default App;
