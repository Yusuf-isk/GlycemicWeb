import { Button, Checkbox, Form } from 'semantic-ui-react'


import React, {  FormEvent, useState } from "react";

const Login = () => {   
  
 

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

 

 const handleLoginSubmit = (e:FormEvent) => {
    e.preventDefault();
    
  };



    return (
         
            <Form onSubmit={(e)=>{
                
                handleLoginSubmit(e);
         
        }}
          
          > 
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
          
    )
  }


export default Login;