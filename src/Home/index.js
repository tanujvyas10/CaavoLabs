import React,{useState,useEffect,useCallback } from 'react'
import './Home.css'
import {BASE_URL,API_ID} from '../Helper/utilities'
import User from './User'
import Spinner from './Spinner'
import axios from 'axios'
import Button from './Button'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import swal from '@sweetalert/with-react'
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

const saveGroup = function(){

  const groupToSave = {
    groupName :groupName,
    groupDescription :groupDescription,
    groupImage :groupImage,
    selectedUsers:list
  }
  swal("Group Created Successfully!", "","success");
  console.log("Group to be save is",groupToSave)
}
    const removeSelectedUser = function(element,idx){
     
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

const abort = function(){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this group!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your group has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your other groups are safe!");
    }
  });
  console.log("cancel the group Creation")
}
    const groupImageHandler = function(e){
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            SetGroupImage(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
     
//      console.log("final list",list)
// console.log('grpuame',groupName,groupDescription)  
return (
        <div className = "home_main">
        <div>
        <h1 className = "home_heading">Create Group</h1>

        </div>
        
        <div className = "home_group_creation">
      <div className="photo_uploading">
        <div className="photo_container">
            
                <img className="photo-holder"src={groupImage} alt="" id="img" className="img" />
            
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={(e)=>{groupImageHandler(e)}} />
            <div className="label">
  <label className="image-upload" htmlFor="input">
  <p><AddPhotoAlternateIcon/> Group Logo</p> 
            </label>
  </div>
        </div>
    </div>

    <div className = "group_text">
    <div className = "name_section">
   
    <input placeholder = "Group Name" onChange={(e)=> SetGroupName(e.target.value)} type = "text"/>
   
    </div>

    <div className = "description_section">

     <input placeholder = "Group Description" onChange={(e)=> SetGroupDescription(e.target.value)} type = "text"/>
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
        <div className = "button_section">
        <Button   text = {"Create"} color = {"blue"} onClick = {saveGroup}/>
        <Button text = {"Remove"} color = {"red"} onClick = {abort}/>     
        </div>
        </div>
    )
}

export default Home



// <div className = "button_section">
// <div className = "button">
// <Button  text = {"Create"} color = {"blue"} onClick = {saveGroup}/>
// </div>
// <div className = "button">
// <Button text = {"Remove"} color = {"red"} onClick = {abort}/>
// </div>

