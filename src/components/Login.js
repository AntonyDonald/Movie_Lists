import React from 'react'
import { Row , Col } from 'react-bootstrap'

const Login = () => {
    return (
        <div className='LoginView'>
            <div className='LoginSection text-start'>
                <h5>Sign In</h5>
                <p>Sign in to Your Self Service Portal</p>

                <form>
                    <input className='LoginInputs' type="text" placeholder='Username' required />
                    <input className='LoginInputs' type="text" placeholder='Password' required />
                    <button type='submit' className='SubmitBtn'>LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login