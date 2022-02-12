import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Form, Header, InputOnChangeData, Segment } from 'semantic-ui-react'
import TopBar from '../components/TopBar/TopBar'
import { categories } from '../data/Datas';

export default function FoodsAdd() {

  // form item states
  const [name, setName] = useState("")
  const [glycemicindex, setGlycemicindex] = useState(0)
  const [source, setSource] = useState("")
  const [cid, setCid] = useState('0')
  const [base64Image, setBase64Image] = useState("")

  const fncSend = () => {
      console.log('fncSend Call')
  }

  // image to base64
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

  return (
    <>
    <ToastContainer />
    <Header as='h3' block>
        Gıda Ekle
    </Header>
    <Segment>
      Burada eklediğiniz gıdalar, admin onayını gidip denetimden geçtikten sonra yayına alınır.
    </Segment>

    <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Adı' placeholder='Adı' />
          <Form.Input type='number' min='0' max='150' fluid label='Glisemik İndex' placeholder='Glisemik İndex' />
          <Form.Select  label='Kategori' value={cid} fluid placeholder='Kategori' options={categories} search onChange={(e,d) => setCid( ""+d.value )} />
        </Form.Group>
        
        <Form.Group widths='equal'>
            <Form.Input onChange={(e, d) => imageOnChange(e,d) } type='file' fluid label='Resim' placeholder='Resim' />
            <Form.Input fluid label='Kaynak' placeholder='Kaynak' />
        </Form.Group>
       
        <Form.Button>Submit</Form.Button>
      </Form>

    </>
  )
}