import React from 'react';
import LeftNav from '../LeftNav';
import {useSelector} from "react-redux"
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const userData = useSelector((state)=>state.userReducer)
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
                {/* <p>{errors.maxSize}</p>
                <p>{errors.format}</p> */}
            </div>
        </div>
    );
};

export default UpdateProfil;