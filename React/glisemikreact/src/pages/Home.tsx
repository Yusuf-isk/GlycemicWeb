import React, { useEffect, useState } from 'react';
import { allFoodsList } from '../services/Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from '../models/IFoods';
import axios from 'axios'
export default function Home() {

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);

 
  useEffect(() => {
    
    toast.loading("Yükleniyor.")
    axios.get("http://localhost:8080/api/1.0/users").then( res => {
        const dt:IFoods = res.data;
        setFoodsArr( dt.result! )
        toast.dismiss();
    }).catch( err => {
        toast.dismiss();
        toast.error( ""+err )
    })

  }, []);

  return (
  <>
    <ToastContainer />
    <h1>Welcome Home</h1>
   
  </>
  );
}