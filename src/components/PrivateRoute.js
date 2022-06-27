import React,{useContext} from 'react'
import { AuthContext } from '../context/auth'
import {Navigate,Outlet} from 'react-router-dom'

const PrivateRoute = ({component:Component,...rest}) => {
    const {user}=useContext(AuthContext);
    // return user? <Outlet {...rest}/> : <Navigate to="/login" />;
    return(
        <>
        {user?<Outlet/>:<Navigate to='/'/>}
        </>
        ) 
}

export default PrivateRoute