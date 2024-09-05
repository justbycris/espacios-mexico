import { updateCurrentUser } from 'firebase/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {

  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  //Image file state from firebase 
  const [file, setFile ] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileFileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  
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

  return (
    <div className="p-3 max-w-lg mx-auto">
     
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col ">
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
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
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg my-3" />
        <input type="text" placeholder="email" id="email" className="border p-3 rounded-lg my-3" />
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg my-3" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 font-bold" >Update</button>
      </form>
      <div className="flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
