import React, { FormEvent, useState } from "react";
import {
  Image,
  Icon,
  InputOnChangeData,
  Form,
  Header,
  Segment,
} from "semantic-ui-react";
import { categories } from "../data/Datas";
import { foodAdd } from "../services/Services";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function NewFood() {
  const [name, setName] = useState("");
  const [glycemicindex, setGlycemicindex] = useState(0);
  const [source, setSource] = useState("");
  const [cid, setCid] = useState("");
  const [base64Image, setBase64Image] = useState<string>();
  const [errors, setErrors] = useState({});
  const [detail, setDetail] = useState("");

  const handleFoodSubmit = (e: FormEvent) => {
    const body = {
      name,
      glycemicindex,
      cid: parseInt(cid),
      source,
      image: base64Image,
      detail,
      enabled: false,
    };
    toast.loading("Yükleniyor.");

    foodAdd(body)
      .then((res) => {
        toast.dismiss();
        toast.success("Ürün Başarıyla Kaydedildi");
      })
      .catch((err) => {
        if (err.response.data.validationErrors) {
          setErrors(err.response.data.validationErrors);
        }
        toast.dismiss();
        toast.error("Ürün Kaydedilemedi");
      });
  };

  //base64

  const onChange = (e: any) => {
    console.log("file", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64Image(btoa(binaryString));
  };

  const buttonEnabled =
    name && base64Image && cid && glycemicindex && source && detail;

  return (
    <div style={{ margin: 5 }}>
      <ToastContainer />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <Header icon as="h3">
        <Icon name="save outline" /> Ürün Kayıt Sayfası{" "}
      </Header>

      <Form onSubmit={(e) => {}}>
        <Form.Input
          icon="food"
          width="5"
          fluid
          label="Adı"
          placeholder="Adı"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Input
          icon="chart line"
          width="5"
          type="number"
          min="0"
          max="150"
          fluid
          label="Glisemik İndex"
          placeholder="Glisemik İndex"
          onChange={(e, d) => setGlycemicindex(+d.value)}
        />
        <Form.Select
          width="2"
          label="Kategori"
          value={cid}
          fluid
          placeholder="Kategori"
          options={categories}
          search
          onChange={(e, d) => setCid("" + d.value)}
        />

        <Form.Group>
          <Form.Input
            icon="picture"
            width="5"
            onChange={(e) => onChange(e)}
            type="file"
            fluid
            label="Resim"
            placeholder="Resim"
          />

          {/* <Form.Input  icon='food' width='5'size='large' fluid label='Resim Url' placeholder='Resim Url' onChange={(e)=>{setBase64Image(e.target.value)}} /> */}
        </Form.Group>
        <Form.TextArea
          width="5"
          size="large"
          icon="info circle"
          fluid
          label="Detay"
          placeholder="Detay"
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
        <Form.Input
          width="5"
          icon="external alternate"
          fluid
          label="Kaynak"
          placeholder="Kaynak"
          onChange={(e) => {
            setSource(e.target.value);
          }}
        />

        <Form.Button disabled={!buttonEnabled} onClick={handleFoodSubmit}>
          Kaydet
        </Form.Button>
      </Form>
      <Segment textAlign="center" size="large" color="blue">
        Ürün eklerken doğru bilgiler girdiğinizden emin olun{" "}
      </Segment>
      <div style={{ marginBottom: 600 }}></div>
    </div>
  );
}

export default NewFood;
