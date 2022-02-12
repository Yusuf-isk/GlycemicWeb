import React, { useEffect, useState } from 'react';
import { IFoods, ResultFoods } from '../models/IFoods';
import data from '../data/data.json'
import { Pagination, Item ,Select, Grid,Label,Input,Icon} from 'semantic-ui-react'
import Food from '../components/Food/Food'
import {allFoodsList} from '../services/Services'
import BottomPagination from '../components/BottomPagination/BottomPagination'
import axios from 'axios';
import { categories } from '../data/Datas';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  const [filteredData, setFilteredData] = useState<ResultFoods[]>([]);
  const [isloading,setIsloading]= useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [postsperpage, setPostsPerPage] = useState(5)
  const indexOfLastPost = currentPage * postsperpage;
  const indexOfFirstPost = indexOfLastPost- postsperpage;




const handlePaginationChange =(e,pageInfo) =>{
  setCurrentPage(pageInfo.activePage);
}

const handleSearch = (q:string) => {

  const newArr = foodsArr.filter( item => item.name?.toLowerCase().includes(q) )
  setFilteredData(newArr)

  
  if(Math.round(newArr.length%postsperpage) === 0){
    setTotalPage(newArr.length /postsperpage)            
  }else{           
    setTotalPage(Math.ceil(newArr.length/postsperpage))              
  }

  }

  //Uygulama Giriş - First mount
  useEffect(() => {
    setIsloading(true);
  
     axios.get("http://localhost:8080/foods/list").then(res =>{
       const dt:IFoods = res.data;
   
        setFoodsArr(dt.result!)
        setFilteredData( dt.result!)
   
        if(Math.round(filteredData.length%=postsperpage) === 0){
         console.log(filteredData.length +"--"+postsperpage);
         setTotalPage(filteredData.length /postsperpage)            
         console.log("after notceil:"+totalPage);   
        }
     else{           
         console.log(filteredData.length +"--"+postsperpage);
         setTotalPage(Math.ceil(filteredData.length/postsperpage))  
         console.log("after ceil:"+totalPage);            
      }
   
     }
     
     ).catch(err => {
       toast.dismiss();
       toast.error( ""+err )
     })
      
     
   
   setIsloading(false)
  

  }, []);

  useEffect(() => {
    setTotalPage(filteredData.length)
  
  }, [filteredData]);


  
  return (
    <div style={{  }}>
      <div style={{
         marginLeft:200
         
        }}>
      <Grid> 
  <Grid.Row>
      <Grid.Column width='8'>
      <Input onChange={(e) => handleSearch(e.target.value)} fluid icon='search'  placeholder='Arama...' />
      </Grid.Column>
   

    
 
  
      <Grid.Column width='4'>
     <Select onChange={(e, data) => ( "" +data.value )  } fluid placeholder='Kategori Seç' options={categories} />
  </Grid.Column>
  </Grid.Row>
</Grid>
      </div>

      <ToastContainer/>
        {isloading ? <div>Loading...</div> : 
        <div>
        <div style={{
          marginTop:20,display: 'flex',
          justifyContent:"center",
          alignItems:"center",
          
        }}> 
        <div style={{
          minWidth:600
          ,maxWidth:800
        }}> <Item.Group divided>
         { filteredData.slice(indexOfFirstPost,indexOfLastPost).map((item, index) => 
       <Food item={item}></Food>
    )}
     </Item.Group>
          </div>
     
        

          </div>
            <div style={{ marginTop:20,display: 'flex',
          justifyContent:"center",
          alignItems:"center",}}>
            <Pagination
            activePage={currentPage}
            onPageChange={handlePaginationChange}
            totalPages={totalPage}
             
             
             />
            </div>
           </div>  }
    </div>
    );
}