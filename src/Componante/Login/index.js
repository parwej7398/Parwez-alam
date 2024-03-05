import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstence2 } from '../../Config'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [isVisible, setIsVisible] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password && email) {
            const response = await axios.post('https://dummyjson.com/auth/login', { username: email, password })
            toast.success(response.data.message)
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } else {
            toast.error("Please Fill All Required Fields");
            return
        }
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    console.log(password);
    console.log(email);


    return (
        <div className='flex h-screen justify-center items-center shadow-2xl shadow-black rounded-md border p-2 bg-slate-200'>
            <div className='flex items-center shadow-2xl shadow-black'>
                <div>
                    <img src={'https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo='} alt="" className='h-[25.7rem]' />
                </div>
                <div className='flex flex-col border-2 gap-4 p-7 bg-white'>
                    <p className='text-xl font-bold text-center font-serif'>Login</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 *:border *:p-3 *:rounded-md *:border-blue-600'>
                        <input type="text" placeholder='User Name' onChange={(event) => setEmail(event.target.value)} />
                        <span className='px-3 py-2 flex items-center outline-none border border-blue-500'>
                            <input type={isVisible ? "text" : "password"} name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder='Password' className='outline-none' />
                            <IconButton size='small' onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                        <button type='submit' className='bg-blue-600 text-white hover:bg-blue-500'>Login</button>
                    </form>
                    <div>
                        <button type='button' className='text-blue-600 underline items-center'>Forget Password</button>
                    </div>
                    <div className='flex gap-2'>
                        <p>Don't have an account?</p>
                        <button type='button' className='text-blue-600 underline' onClick={() => navigate('/sign_up')}>Sign Up</button>
                    </div>

                    <button onClick={() => localStorage.clear()} className='text-blue-500 underline'>Logout</button>
                </div>
            </div>

        </div>
    )
}

export default Login