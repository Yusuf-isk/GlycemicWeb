import axios from "axios";
import React, { useState,FormEvent,useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Segment,Modal, Button, Checkbox, Form } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import { userAndAdminLogin } from '../../services/Services';
import { IUser } from '../../models/IUser';

const TopBar = (props) => {
const [activeItem,setActiveitem] = useState("home")
const [open, setOpen] = React.useState(false)
const [open2, setOpen2] = React.useState(false)
const [usermail,setUserMail]=useState("");
const [password,setPassword]=useState("");
const [form, setForm] = useState({
  name: "",
  surname:"" ,
  cityid:"" ,
  mobile: "",
  email: "",
  password: "",
  passwordRepeat:"" ,

});
const [loginStatus, setLoginStatus] = useState(false)
useEffect(() => {
  console.log( "useEffect Call" )
}, [loginStatus])

//Login
const handleLoginSubmit = (e:FormEvent) => {
  console.log(usermail+password);
  toast.loading("Yükleniyor.")
  const params = {
    email: form.email
}
  axios.post("http://localhost:8080/register/login",{auth: {
    username: form.email,
    password: form.password
}},{params}).then( res => {
    console.log("resdata"+res);
    const usr: IUser = res.data
    if ( usr.status! ) {
      const userResult = usr.result!
      const stUserResult = JSON.stringify( userResult )
      localStorage.setItem( "user", stUserResult )
      setLoginStatus( usr.status! )
    }
    toast.dismiss();
  }).catch( err => {
    console.log("error:"+err);
    toast.dismiss();
    toast.error( "Bu yetkilerde bir kullanıcı yok!" )
  })}
   //REgister
const handleRegister = (e:FormEvent) => {
  e.preventDefault();
  
  const { name, surname, cityid,mobile,email,password } = form;

    const body = {
      name, surname, cityid,mobile,email,password
    };
    axios.post("http://localhost:8080/register/userRegister",body);
};




let passwordRepeatError;
if (form.password !== form.passwordRepeat) {
  passwordRepeatError = "Şifre Eşleşmiyor";
}

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
      Ana Sayfa
      </Link>
    </Menu.Item>
      <Menu.Item
        name='kayıt'
        active={activeItem === 'kayıt'}
        onClick={()=>{
            setActiveitem('kayıt');
            
        }}
      >   <Link className="navbar-brand" to="/newfood">
      Ürün Kayıt
      </Link>
    </Menu.Item>
      <Menu.Item
        name='about'
        active={activeItem === 'about'}
        onClick={()=>{
            setActiveitem('about');
           
        }}
      ><Link className="navbar-brand" to="/about">
      Eklediklerim
      </Link>
    </Menu.Item>
    <Menu.Item position="right">
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Link className="navbar-brand" to="#">
      Giriş Yap<hr></hr> 
      </Link>}
    >
      <Modal.Header>Giriş Yap</Modal.Header>
      <Modal.Content >
      <Form onSubmit={(e)=>{
                
                handleLoginSubmit(e);
         
        }}
          
          > 
    <Form.Field>
      <label>Kullanıcı Mail </label>
      <input type="text" placeholder='E-mail' value={usermail}onChange={(e)=>{
        setUserMail(e.target.value)
      }}/>
    </Form.Field>
    <Form.Field>
      <label>Şifre</label>
      <input type="password" placeholder='Şifre'value={password}onChange={(e)=>{
        setPassword(e.target.value)
      }} />
    </Form.Field>
    <Form.Field>
      <Checkbox label='Beni Hatırla' />
    </Form.Field>
    <Button type='submit'>Giriş Yap</Button>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Kapat
        </Button>
      
      </Modal.Actions>
    </Modal>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Modal
      onClose={() => setOpen2(false)}
      onOpen={() => setOpen2(true)}
      open={open2}
      trigger={<Link className="navbar-brand" to="#">
     Kayıt Ol  <hr></hr> 
      </Link>}
    >
      <Modal.Header>Kayıt Ol</Modal.Header>
      <Modal.Content >
      <Form onSubmit={(e)=>{
                
                handleRegister(e);
         
        }}
          
          > 
    <Form.Field>
      <label>Kullanıcı Mail </label>
      <input type="text" placeholder='E-mail' value={form.email}onChange={


e => {
setForm({...form,
  email:e.target.value})
}





      }/>
    </Form.Field>
    <Form.Field>
      <label>Kullanıcı İsmi </label>
      <input type="text" placeholder='E-mail'value={form.name}onChange={ (e) => {
    setForm({
      ...form,
      name: e.target.value
    });
  }} />
    </Form.Field>
    <Form.Field>
      <label>Kullanıcı Soyismi </label>
      <input type="text" placeholder='E-mail' value={form.surname}onChange={ e => {
    setForm({
      ...form,
     surname: e.target.value
    });
  }}/>
    </Form.Field>
    <Form.Field>
      <label> Şehir Kodu </label>
      <input type="text" placeholder='E-mail'value={form.cityid}onChange={ e => {
    setForm({
      ...form,
     cityid : e.target.value
    });
  }} />
    </Form.Field>
    <Form.Field>
      <label> Telefon Numarası </label>
      <input type="text" placeholder='E-mail' value={form.mobile}onChange={ e => {
    setForm({
      ...form,
      mobile: e.target.value
    });
  }}/>
    </Form.Field>
    <Form.Field>
      <label> Şifre </label>
      <input type="text" placeholder='E-mail' value={form.password}onChange={ e => {
    setForm({
      ...form,
     password: e.target.value
    });
  }}/>
    </Form.Field>
    <Form.Field>
      <label>Şifre Tekrar</label>
      <input type="password" placeholder='Şifre'  value={form.passwordRepeat}onChange={ e => {
    setForm({
      ...form,
     passwordRepeat: e.target.value
    });
  }}
 />
    </Form.Field>
    <Form.Field>
      <Checkbox label='Beni Hatırla' />
    </Form.Field>
    <Button type='submit'>Giriş Yap</Button>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen2(false)}>
          Kapat
        </Button>
      
      </Modal.Actions>
    </Modal>
    </Menu.Item>
    </Menu>
  </Segment>
    
   
  );
};

export default TopBar;

  