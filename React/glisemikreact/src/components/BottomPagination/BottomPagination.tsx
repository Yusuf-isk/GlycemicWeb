import React, { Component, useState } from 'react'
import { Menu } from 'semantic-ui-react'

export default function BottomPagination ()  {
    const [activeItem,setActiveItem] = useState("1");

  

 
   

    return (
      <Menu pagination>
        <Menu.Item
          name='1'
          active={activeItem === '1'}
          onClick={()=>{
              setActiveItem('1');
          }}
        />
        <Menu.Item disabled>...</Menu.Item>
        <Menu.Item
          name='10'
          active={activeItem === '10'}
          onClick={()=>{
            setActiveItem('1');
        }}
        />
        <Menu.Item
          name='11'
          active={activeItem === '11'}
          onClick={()=>{
            setActiveItem('1');
        }}
        />
        <Menu.Item
          name='12'
          active={activeItem === '12'}
          onClick={()=>{
            setActiveItem('1');
        }}
        />
      </Menu>
    )
  
}