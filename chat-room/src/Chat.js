import React, { useState } from 'react'
import "./Chat.css";
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import MicIcon from '@mui/icons-material/Mic';
import axios from "./axios";

function Chat({messages}) {
const [input,setinput]= useState("");
  const sendmsg= async(e)=>{
    e.preventDefault();

   await axios.post('/messages/new',{
    message: input,
    name: "ghost",
    times: "abhi",
    rec: false
    })
    setinput("");
  };

  return <div className='chat'>
   <div className='chatheader'>
    <div className='chatheader_info'>
      <h3>Room Name</h3>
      <p>Last seen at...</p>
    </div>
    <div className='chatheader_right'>
    <IconButton>
            <SearchIcon/>
            </IconButton>
            
            <IconButton>
            <AttachFileIcon/>
            </IconButton>

            <IconButton>
            <MoreVertIcon/>
            </IconButton>
    </div>
   </div>
   <div className='chatbody'>
    {messages.map((message)=>(
      <p 
      className={`chat_msg ${message.rec && "chat_rcv"}`}>
      <span className='chat_name'>{message.name}</span>
      {message.message}
      <span className='chat_time'>{message.times}</span>
    </p>
    ))}
    
    
    
   </div>
   <div className='chatfoot'>
  <MoodIcon/>
  <form>
    <input placeholder="Type a message" value={input}  onChange={(e)=>{setinput(e.target.value)}} type="text" />
    <button onClick={sendmsg} type="submit">Send a message</button>
  </form>
  <MicIcon/>
   </div>
  </div>
    
  
}

export default Chat;