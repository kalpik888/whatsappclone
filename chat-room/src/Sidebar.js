import React from 'react';
import "./Sidebar.css";
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from "./SidebarChat";
import { Avatar } from '@mui/material';


function Sidebar() {
  return (
    <div className="sidebar">
        <div className='sidebar_header'>
        <Avatar src='https://api.dicebear.com/6.x/pixel-art/svg?seed=John'/>
          <div className='sidebar_headerright'>
          <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            
            <IconButton>
            <ChatIcon/>
            </IconButton>

            <IconButton>
            <MoreVertIcon/>
            </IconButton>
          </div>
        </div>
        <div className='sidebar_search'>
          <div className='sidebar_searchcont'>
          <SearchIcon/>
          <input placeholder='search or start a new chat' type='text'></input>
          </div>
        </div>
        <div className='sidebar_chat'>
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
  
        </div>
    </div>
  )
}

export default Sidebar