import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { IFoods, ResultFoods } from '../models/IFoods';
import data from '../data/data.json'
import {  Item } from 'semantic-ui-react'
import Food from '../components/Food/Food'

import BottomPagination from '../components/BottomPagination/BottomPagination'
export default function Home() {

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  const [isloading,setIsloading]= useState(false);
 
async function getData() {
  setIsloading(true);
  

  const dt:IFoods = data;

await  setFoodsArr(dt.result!)




setIsloading(false)
}

  useEffect(() => {
    getData();
  

  }, []);

 
  return (
    <div style={{  }}>
      
      <ToastContainer/>
        {isloading ? <div>Loading...</div> : 
        <div style={{
          marginTop:20
        }}> <h1>Welcome Home</h1>
      <Item.Group divided>
         { foodsArr.map((item, index) => 
       <Food item={item}></Food>
    )}
     </Item.Group>
          <div style={{}}>
            <BottomPagination/>
            </div>

          </div>}
    </div>
    );
}