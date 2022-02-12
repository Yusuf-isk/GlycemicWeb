import React, {FormEvent,useState } from 'react';
import { Image, Icon, InputOnChangeData, Form,Header,Segment } from 'semantic-ui-react'
import { categories } from '../data/Datas';

import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
function NewFood (){
  const [name, setName] = useState("")
  const [glycemicindex, setGlycemicindex] = useState(0)
  const [source, setSource] = useState("")
  const [cid, setCid] = useState('0')
  const [base64Image, setBase64Image] = useState("")


  const handleFoodSubmit = (e:FormEvent) => {
    

    const body = {
      name, glycemicindex, cid,source,base64Image
    };
    toast.loading("Yükleniyor.")
 



    axios.post("http://localhost:8080/foods/save",body).then( res => {
     
      toast.dismiss();
      }
   
    ).catch( err => {
      console.log("error:"+err);
      toast.dismiss();
      toast.error( "Bu yetkilerde bir kullanıcı yok!" )
    })
  
  
  }


  const imageOnChange = (e:any, d:InputOnChangeData) => {
    const file = e.target.files[0]
    const size:number = file.size / 1024 // kb
    if ( size > 10 ) { // 10 kb
        toast.error("Lütfen max 10 kb bir resim seçiniz!")
    }else {
        getBase64(file).then( res => {
            console.log('res', res)
        })
    } 
}

const getBase64 = ( file: any ) => {
return new Promise(resolve => {
    let fileInfo;
    let baseURL:any = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result
      resolve(baseURL);
    };
    console.log(fileInfo);
  });
}




return(<div style={{margin:5}}>
      <ToastContainer />
      <div style={{ marginTop:20,display: 'flex',
          justifyContent:"center",
          alignItems:"center",}}>
            </div>
    <Header icon as='h3' >
    <Icon name='save outline' /> Ürün Kayıt Sayfası </Header>

    <Form onSubmit={(e)=>{
                
              
         
        }}
          
          > 
            
     
          <Form.Input icon='food' width='5' fluid label='Adı' placeholder='Adı' />
          <Form.Input icon='chart line'width='5'type='number' min='0' max='150' fluid label='Glisemik İndex' placeholder='Glisemik İndex' />
          <Form.Select  width='5' label='Kategori' value={cid} fluid placeholder='Kategori' options={categories} search onChange={(e,d) => setCid( ""+d.value )} />
        
        
      
            <Form.Input icon='picture'  width='5' onChange={(e, d) => imageOnChange(e,d) } type='file' fluid label='Resim' placeholder='Resim' />
            <Form.Input width='5' icon='external alternate' fluid label='Kaynak' placeholder='Kaynak' />
     
       
        <Form.Button>Kaydet</Form.Button>
      </Form>
      <Segment textAlign='center' size='large' color='blue'>
Ürün eklerken doğru bilgiler girdiğinizden emin olun    </Segment>
</div>)
}

export default NewFood;