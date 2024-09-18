import { updateCurrentUser } from 'firebase/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import {  signOutStart, signOutUserFailure, signOutUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {

  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  //Image file state from firebase 
  const [file, setFile ] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileFileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  
    //Firebase Storage Rules
  // allow read;
  //     allow write: if 
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',  (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error)=> {
        setFileUploadError(true);
      },
      (error)=> {
        getDownloadURL(uploadTask.snapshot.ref).then 
        ((downloadURL) => {
          setFormData({...formData, avatar: downloadURL});
        })
      }
    );
  };

    const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

    }catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      }); 
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch(error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async() => {
    try{
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))
    } catch(error){
      dispatch(signOutUserFailure(error.message))
    }
  };



  return (
    <div className="p-3 max-w-lg mx-auto">
     
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
      <input onChange={(e)=>setFile(e.target.files[0])} 
      type="file" 
      ref={fileRef} 
      hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} 
        alt="Profile Picture." 
        className='rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-3'/>
        <p className="text-sm self-center">
        {fileFileUploadError ? 
        (<span className="text-red-700">Error image upload.(Image must be less than 2mb)</span>) :
        filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">
            {`Uploading ${filePerc}% ` }
          </span>)
          :
          filePerc === 100 ? (
            <span className="text-green-600">Image succesfully uploaded!</span>)
            : (
            ""
          )
      }</p>
        <input type="text" placeholder="username" onChange={handleChange} id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg my-3" />
        <input type="text" placeholder="email" onChange={handleChange} defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg my-3" />
        <input type="password" placeholder="password"  id="password" className="border p-3 rounded-lg my-3" />
        <button disabled ={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 font-bold" >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center mt-3 font-bold hover:opacity-95" to={"/create-listing"}>
        Create Listing</Link>
      </form>
      <div className="flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5 font-bold text-sm">{error ? error : ''}</p>
      <p className="text-green-500 font-bold text-sm">{updateSuccess ? 'Account updated successfully!' : ''}</p>
    </div>
  )
}
