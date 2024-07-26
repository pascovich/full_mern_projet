import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import {useDispatch, useSelector} from "react-redux"
import UploadImg from './UploadImg';
import { dateParser } from '../../Utils';
import FollowHandler from './FollowHandler';

const UpdateProfil = () => {
    const userData = useSelector((state)=>state.userReducer)
    const usersData = useSelector((state)=>state.usersReducer) 
    const [bio,setBio] = useState('')
    const [updateForm,setUpdateForm] = useState(false)
    const dispatch = useDispatch

    const [followingPopup,setFollowingPopup] = useState(false)
    const [followersPopup,setFollowersPopup] = useState(false)

    const updateBio = () => {
        dispatch(updateBio(userData.__id,bio))
        setUpdateForm(false)
    }


    return (
        <div className='profil-container'>
            <LeftNav/>
            {/* <h3>Profil de <mark>{userData.user.pseudo}</mark> </h3> */}
            <h3>Profil de ... </h3>
            <div>
                <h3>Photo de profil</h3>
                <img src="{userData.picture}" alt="no img" />
                UPLOAD PICTURE
                <UploadImg/>
                {/* <p >{errors.maxSize}</p>
                <p>{errors.format}</p> */}
            </div>
            <div className='right'>
                <h3>Bio</h3>
                {updateForm === false && (
                    <>
                    <p onClick={()=>setUpdateForm(!updateForm)}>userData.user.bio</p>
                    <button onClick={()=>setUpdateForm(!updateForm)}>Modifier Bio</button>
                    </>
                )}
                {updateForm === true && (
                    <>
                    <textarea type="text" defaultValue={userData.bio}  cols="30" onChange={(e)=>setBio(e.target.value)}></textarea>
                    <button onClick={updateBio}>Update Data</button>
                    </>
                )}
                
            </div>
            <h4>Membre depuis le : {dateParser(userData.user.updatedAt)}</h4>
            <h5 onClick={()=>setFollowingPopup(true)}>Abonneement: {userData.user.following? userData.user.following.length: "Aucun"}</h5>
            <h5 onClick={()=>setFollowersPopup(true)} >Abonnees: {userData.user.followers? userData.user.followers.length: "Aucun"}</h5>
        
            {
                followingPopup &&  <div>
                    <div className='modal'>
                    <h4>Abonnements</h4>
                    {/* {userData.user.following && userData.user.following.map((follower)=>(
                        <p key={follower}>{follower}</p>
                    ))} */}
                    <span className='cross' onClick={()=>setFollowingPopup(false)}>&#10005;</span>
                    <ul>
                        {
                            usersData.user.map((user) => {
                                for(let i = 0; i < userData.user.following.length; i++) {
                                    if(user.__id = userData.user.following[i]){
                                        <li key={user.__id}>
                                            <img src="{user.picture}" alt="imgUser" srcset="" />
                                            <h4>{user.pseudo}</h4>
                                            <FollowHandler idToFollow={user._id}/>
                                        </li>
                                    }
                                   
                                }
                            })
                        }
                    </ul>
                    </div>
                    
                </div>

               
            }
            {
                 followersPopup &&  <div>
                 <div className='modal'>
                 <h4>Abonnes</h4>
                 {userData.user.followers && userData.user.followers.map((follower)=>(
                     <p key={follower}>{follower}</p>
                 ))}
                 <span className='cross' onClick={()=>setFollowersPopup(false)}>&#10005;</span>

                 <ul>
                        {
                            usersData.user.map((userr) => {
                                console.log(userr._id+' '+userr.pseudo)
                                // console.log(user.__id)
                                // console.log("----------------");
                                // for(let i = 0; i < userData.user.followers.length; i++) {
                                //     console.log(userData.user.followers[i])
                                
                                // }
                                // console.log("----------------");
                            })
                           
                            
                            // usersData.user.map((user) => {
                            //     for(let i = 0; i < userData.user.followers.length; i++) {
                            //         // if(user.__id = userData.user.followers[i]){
                            //         //     <li key={user.__id}>
                            //         //         <img src="{user.picture}" alt="imgUser" srcset="" />
                            //         //         <h4>{user.pseudo}</h4>
                            //         //         <h2>Follo system</h2>
                            //         //     </li>
                            //         // }
                            //         <li key={userData.user.followers[i]}>{userData.user.followers[i]} ss</li>
                                    
                                    
                            //     }
                            // })
                        }
                        

                    </ul>
                 </div>
 
                 </div>
            }
        
        </div>
        
    );
};

export default UpdateProfil;

