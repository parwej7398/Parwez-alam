import { Avatar, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [profileDetail, setProfileDetail] = useState({})
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const prodilefn = async () => {
        const response = await axios.get('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        setProfileDetail(response.data)
    }

    useEffect(() => {
        prodilefn()
    }, [])
    console.log(profileDetail);

    return (
        <div className=''>
            <Avatar src={profileDetail?.image} alt={profileDetail?.firstName} className='!size-9' onClick={handleOpen} />
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose} className='!p-4 !mt-2'>
                <MenuItem className='!text-white !bg-black !font-semibold !text-xl !font-serif'>{profileDetail?.firstName + " " + profileDetail?.lastName}</MenuItem>
                <div className='flex p-2'>
                    <MenuItem onClick={() => navigate('/profile_details')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>

            </Menu>
        </div>
    )
}

export default ProfileMenu