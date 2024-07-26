import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state)=>state.userReducer);
    const [isFollowed,setIsFollowed] = useState(false)



    const handlerFollow = () =>{

    }
    const UnhandlerFollow = () =>{
        
    }

    useEffect(()=>{
        if (!isEmpty(userData.following)) {
            if(userData.following.includes(idToFollow)) setIsFollowed(true)
            else setIsFollowed(false)
        }
    },[userData,idToFollow])


    return (
        <>
        {isFollowed && (
            <span>
                <button>Abonné</button>
            </span>
        )}
        {isFollowed === false && (
            <span>
                <button>Suivre</button>
            </span>
        )}
        </>
    );
};

export default FollowHandler;