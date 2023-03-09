import React, { useState } from 'react'
import { Row , Col } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Login = ({showLogoutToast , setShowLogoutToast , setShowLoginToast}) => {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const navigate  = useNavigate()

    const handleLogin = (e) =>{
        e.preventDefault()
        if(username === 'antonydonald' && password === 'Antony@123'){
            localStorage.setItem("tokenId" , JSON.stringify("1"));
            setShowLoginToast(true)
            navigate("/home")
        }
        else{
            alert("Invalid User")
        }
    }

    return (
        <div className='LoginView'>
            <ToastContainer position="top-end">
                <Toast  delay={5000} autohide bg="success" show={showLogoutToast} onClose={() => setShowLogoutToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>Logged Out Successfully.</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='LoginSection text-start'>
                <h5>Sign In</h5>
                <p>Sign in to Your Self Service Portal</p>

                <form onSubmit={handleLogin}>
                    <input value={username} onChange={(e) =>setUserName(e.target.value)} className='LoginInputs' type="text" placeholder='Username' required />
                    <input value={password} onChange={(e) =>setPassword(e.target.value)} className='LoginInputs' type="text" placeholder='Password' required />
                    <button type='submit' className='SubmitBtn'>LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login