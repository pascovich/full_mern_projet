import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/userActions';

const UploadImg = () => {
    const [file,setFile] =useState()
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.userReducer)
    const handlePicture = (e) =>{
        e.preventDefault()
        const data = new FormData();
        data.append("name",userData.user.pseudo);
        data.append("userId",userData.user._id);
        data.append("file",file);

        dispatch(uploadPicture(data,userData._id))
    }
    return (
        <div>
            <form action="" onSubmit={handlePicture} >
                <label htmlFor="file">Change img</label>
                <input type="file" id='file' name='file' accept='.jpg, .jpeg, .png' 
                onChange={(e) => setFile(e.target.files[0])}/>
                <br />
                <input type="submit"  value="envoyer"/>
            </form>
        </div>
    );
};

export default UploadImg;