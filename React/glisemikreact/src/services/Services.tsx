import axios from "axios";


const axiosConfig = axios.create({
  
    auth:{
        username: process.env.REACT_APP_GLOBAL_USERNAME!,
        password: process.env.REACT_APP_GLOBAL_PASSWORD!
    }
})


// All Foods List
export const allFoodsList = () => {
    return axiosConfig.get("api/1.0/users");
}