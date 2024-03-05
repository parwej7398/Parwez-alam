import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstence2 } from '../../Config'

const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isVisible, setIsVisible] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await axiosInstence2.post('signup', { name, email, password })
        console.log(response.data.message);
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token)
        navigate('/')
    }


    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/blog')
        }
    }, [])
    const isLogin = Boolean(localStorage.getItem('token'))
    console.log(isLogin);
    return (
        <div className='flex h-screen justify-center items-center border bg-slate-100'>
            <div className='flex rounded-lg shadow-2xl shadow-black justify-center items-center'>
                <div>
                    <img src={'https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg'} alt="" className='h-[33.9rem] w-[36rem] rounded-l-md' />
                </div>
                <div className='flex flex-col border-2 gap-2 p-7 bg-white rounded-r-md'>
                    <p className='text-center  text-3xl font-serif font-extrabold p-2'>Sign Up</p>
                    <p className='text-center font-bold'>Create your account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 *:border *:p-3 *:rounded-md *:border-blue-600'>
                        <input type="text" name='name' id='name' onChange={(event) => setName(event.target.value)} placeholder='Username' />
                        <input type="email" name='email' id='email' onChange={(event) => setEmail(event.target.value)} placeholder='Email' />
                        <span className='px-3 py-2 flex items-center outline-none border border-blue-500'>
                            <input type={isVisible ? "text" : "password"} name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder='Password' className='outline-none' />
                            <IconButton size='small' onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                        <span className='px-3 py-2 flex items-center outline-none border border-blue-500'>
                            <input type={isVisible ? "text" : "password"} name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder='Confirm Password' className='outline-none' />
                            <IconButton size='small' onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                        <button type='submit' className='bg-blue-600 text-white hover:bg-blue-500' >Sign Up</button>
                    </form>
                    <p className='text-center'>Or</p>
                    <div className='flex gap-2'>
                        <p>Already have an account?</p>
                        <button type='button' className='text-blue-600 underline' onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp