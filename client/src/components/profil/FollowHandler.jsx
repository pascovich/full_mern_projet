import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import { followUser,unFollowUser } from '../../actions/userActions';

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state)=>state.userReducer);
    const [isFollowed,setIsFollowed] = useState(false)

     // redux store
  const dispatch = useDispatch();
  


    const handlerFollow = () =>{
        dispatch(followUser(userData.user._id,idToFollow))
        setIsFollowed(true)
    }
    const handlerUnFollow = () =>{
        dispatch(unFollowUser(userData.user._id,idToFollow))
        setIsFollowed(false)
    }

    useEffect(()=>{
        if (!isEmpty(userData.user.following)) {
            if(userData.user.following.includes(idToFollow)) setIsFollowed(true)
            else setIsFollowed(false)
        }
    },[userData.user,idToFollow])


    return (
        <>
        {isFollowed &&  !isEmpty(userData.user) && (
            <span>
                <button onClick={handlerUnFollow}>Abonné</button>
            </span>
        )}
        {isFollowed === false && !isEmpty(userData.user) &&(
            <span>
                <button onClick={handlerFollow}>Suivre</button>
            </span>
        )}
        </>
    );
};

export default FollowHandler;