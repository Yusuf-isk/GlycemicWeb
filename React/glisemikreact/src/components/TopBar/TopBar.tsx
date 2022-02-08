import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Segment } from 'semantic-ui-react'
const TopBar = (props) => {
const [activeItem,setActiveitem] = useState("home")



  return (
    <Segment inverted>
    <Menu inverted secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={()=>{
            setActiveitem('home');
           
        }}
    ><Link className="navbar-brand" to="/">
      Home
      </Link>
    </Menu.Item>
      <Menu.Item
        name='profile'
        active={activeItem === 'profile'}
        onClick={()=>{
            setActiveitem('profile');
            
        }}
      >   <Link className="navbar-brand" to="/profile">
      Profile
      </Link>
    </Menu.Item>
      <Menu.Item
        name='about'
        active={activeItem === 'about'}
        onClick={()=>{
            setActiveitem('about');
           
        }}
      ><Link className="navbar-brand" to="/about">
      About
      </Link>
    </Menu.Item>
    </Menu>
  </Segment>
    
   
  );
};

export default TopBar;

     
          