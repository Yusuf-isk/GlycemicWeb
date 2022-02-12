import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { IFoods, ResultFoods } from '../models/IFoods';

import { IFoodDetail } from '../models/IFoodDetail';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams
  } from "react-router-dom";

export default function FoodDetail (props){
    const [isloading,setIsloading]= useState(false);
    const [data, setData] = useState<ResultFoods>();

    const { url } = useParams();
    const URL = `/detail/${url}`;
async function getData() {
    setIsloading(true);
    axios.get("http://localhost:8080/foods"+URL).then(res =>{
       const dt:IFoodDetail = res.data;

       setData(dt.result)
  console.log("data:"+data);
      
  
    }).catch();
  setIsloading(false)
  }
useEffect(() => {
    getData();
  

  }, []);


return(<div>
    <h1>Detail Page</h1>
 <h2>{data?.name}</h2> 
<p>{data?.detail}</p>
</div>)
}

