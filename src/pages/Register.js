import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import {setDoc,doc} from 'firebase/firestore'
const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false
});
const {name,email,password,error,loading}=data; 

const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
    e.preventDefault();
    setData({...data,error:null,loading:true})
    if(!name || !password || !email)
    {
        setData({...data,error:"All fields are required"});
    }
    try {
        const result=await createUserWithEmailAndPassword(auth,email,password)
        console.log(result.user)
    } catch (error) {
        
    }
}

  return (
    <div style={{width:'50%',position:'absolute',top:'25%',left:'25%'}} className="register">
        <form>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={name} aria-describedby="emailHelp" placeholder="Enter name" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email" name='email' value={email} onChange={handleChange}aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" value={password} name='password' placeholder="Enter password"onChange={handleChange}/>
  </div>
  {error?<p className='error'>{error}</p>:null}
  <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Register