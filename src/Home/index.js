import React,{useState,useEffect,useCallback } from 'react'
import './Home.css'
import {BASE_URL,API_ID} from '../Helper/utilities'
import User from './User'
import Spinner from './Spinner/Spinner'
import axios from 'axios'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
const Home = () => {

    const [groupImage,SetGroupImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
    const [groupName,SetGroupName] = useState('')
    const [groupDescription,SetGroupDescription] = useState('')
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [list,setList] = useState([])
 
    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/user`, { headers: { 'app-id': API_ID } })
            .then(({ data }) =>{
                console.log(data.data)
                const temp = data.data

                 let arr = [];
                temp.forEach((user)=>{       
                       user.isSelected = false;
                       arr.push(user)
                })
          
                console.log(data)
                setData(arr)

                console.log("INtial data",data)
              })
               
            .catch(console.error)
            .finally(() => setLoading(false));
    },[]);



    const selectedUser = function(element,idx){
      element.isSelected = true
        setList([...list,element])
        data[idx] = element;
        setData(prev=> data);
     //   console.log("adding",data)
      }


    const removeSelectedUser = function(element,idx){
      // let temp_list = 
    
      let temp_list = list
      for(let i in list){
           if(list[i].id === element.id){
      


            element.isSelected = false;
            list.splice(i,1);
            setList([...list]);

            data[idx] = element;
            setData(prev=> data);
             break;
           }
      }

    

    }


    const imageHandler = function(e){
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            SetGroupImage(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
     
      console.log("final list",list)
    return (
        <div className = "home_main">
        <div>
        <h1 className = "home_heading">Create Group</h1>

        </div>
        
        <div className = "home_group_creation">
      <div className="photo_uploading">
        <div className="container">
            <div className="img-holder">
                <img src={groupImage} alt="" id="img" className="img" />
            </div>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={(e)=>{imageHandler(e)}} />
            <div className="label">
  <label className="image-upload" htmlFor="input">
  
  <p><AddPhotoAlternateIcon/> Group Logo</p> 
            </label>
  </div>
        </div>
    </div>

    <div className = "group_text">
    <div className = "name_section">
   
    <input placeholder = "Group Name"  type = "text"/>
   
    </div>

    <div className = "description_section">

     <input placeholder = "Group Description" type = "text"/>
    </div>
    </div>
        </div>

        {loading && <Spinner/>}
        <div className = "user_section">
   
        {
         
         data &&  data.map((element,idx)=>(
           <div className = "user_element">

           <User 
           name = {element.firstName} 
           image = {element.picture} 
           key ={element.id} 
           isSelected = {element.isSelected}
           onClick = {()=>{
            if(element.isSelected ){
            
               removeSelectedUser(element,idx)
             }
         else {
        
              selectedUser(element,idx)
          }
           }  }

           />
           </div> 
           
            ))
        }

        </div>
        </div>
    )
}

export default Home


