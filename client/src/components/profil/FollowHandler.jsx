import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import { followUser } from '../../actions/userActions';

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state)=>state.userReducer);
    const [isFollowed,setIsFollowed] = useState(false)

     // redux store
  const dispatch = useDispatch();


    const handlerFollow = () =>{
        dispatch(followUser(userData._id,idToFollow))
        setIsFollowed(true)
    }
    const handlerUnFollow = () =>{
        
    }

    useEffect(()=>{
        if (!isEmpty(userData.following)) {
            if(userData.following.includes(idToFollow)) setIsFollowed(true)
            else setIsFollowed(false)
        }
    },[userData,idToFollow])


    return (
        <>
        {isFollowed &&  !isEmpty(userData) && (
            <span>
                <button onClick={handlerUnFollow}>Abonné</button>
            </span>
        )}
        {isFollowed === false && !isEmpty(userData) &&(
            <span>
                <button onClick={handlerFollow}>Suivre</button>
            </span>
        )}
        </>
    );
};

export default FollowHandler;