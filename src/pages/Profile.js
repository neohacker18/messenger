import React, { useState,useEffect } from "react";
import image1 from "../images/image1.jpg";
import Camera from "../components/svg/Camera";
import Delete from "../components/svg/Delete";
import { storage,db,auth } from "../firebase";
import {ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import {getDoc,doc, DocumentSnapshot,updateDoc} from 'firebase/firestore'
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate();
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db,'users',auth.currentUser.uid)).then(DocumentSnapshot=>{
      if(DocumentSnapshot.exists)
      {
        setUser(DocumentSnapshot.data())
      }
    })
    if(img)
    {
      const uploadImg=async()=>{
        const imgRef=ref(storage,`avatar/${new Date().getTime()} - ${img.name}`);

        try {
          if(user.avatarPath)
          {
            await deleteObject(ref(storage,user.avatarPath));
          }
        const snap=await uploadBytes(imgRef,img);
        const url=await getDownloadURL(ref(storage,snap.ref.fullPath))
        
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
          avatar:url,
          avatarPath:snap.ref.fullPath
        });
        console.log(url)
        setImg(""); 
        } catch (error) {
          console.log(error.message)
        }
      }
      uploadImg();
    }
  }, [img])
  const deleteImage=async()=>{
    try {
      const confirm=window.confirm('Delete Avatar?');
      if(confirm)
      {
        await deleteObject(ref(storage,user.avatarPath))
        
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
          avatar:'',
          avatarPath:''
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return user?(
    <section style={{ position: "absolute", top: "40%", left: "38%" }}>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || image1} alt="default_pic" id="dp" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar?<Delete deleteImage={deleteImage}/>:null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr/>
          <small style={{color:'grey'}}>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ):null;
};

export default Profile;
