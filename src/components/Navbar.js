import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {auth,db} from '../firebase'
import {signOut} from 'firebase/auth'
import {doc,updateDoc} from 'firebase/firestore'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate=useNavigate();
  const {user}=useContext(AuthContext)

  const handleSignout=async()=>{
    await updateDoc(doc(db,'users',auth.currentUser.uid),{isOnline:false});
    await signOut(auth);
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Navbar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      {user?
      <>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li>
      <button className='btn btn-outline-light' onClick={handleSignout}>Logout</button>
      </>:
      <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      </>
      }
    </ul>
  </div>
</nav>
  )
}

export default Navbar