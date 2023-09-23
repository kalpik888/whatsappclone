import React from 'react'
import "./SidebarChat.css";
import { Avatar } from '@mui/material';
function SidebarChat() {
  return (
    <div className='sidebarchat'>
        <div className='sidebarchat_info'>
            <Avatar src='https://api.dicebear.com/6.x/pixel-art/svg?seed=John'/>
            <h2>Room Name</h2>
            <p>This is the last msg</p>
        </div>
    </div>
  )
}

export default SidebarChat