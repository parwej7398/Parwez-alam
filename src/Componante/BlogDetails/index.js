import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = () => {
    const [data, setData] = useState({})
    const { blog_id } = useParams()
    const navigate = useNavigate()

    const fetchPost = () => {
        fetch(`https://dummyjson.com/products/${blog_id}`).then(res => res.json()).then((res) => {
            console.log(res);
            setData(res)
        })
    }

    useEffect(() => {
        fetchPost('')
    }, [])

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    console.log();

    return (

        <div className='border w-[52rem] ml-80 mt-20 h-fit bg-slate-100'>
            <div className='flex gap-2 justify-center items-center mt-10 p-5'>
                <div>
                    <img src={data.thumbnail} alt="" />
                </div>
                <div className='flex  flex-col gap-1'>
                    <p> {data.description?.slice(0, 40)}</p>
                    <p><span className='border bg-green-600 text-white p-1 rounded-md'>{data.rating}☆</span>  6,481 Ratings & 899 Reviews</p>
                    <p>Extra ₹199 off</p>
                    <p> ₹{data.price} <s>9999</s> <span className='text-green-600'>{data.discountPercentage}% off</span></p>

                    <p>stock: {data.stock}</p>
                    <p>categroy: {data.category}</p>
                </div>
            </div>
            <div className='flex gap-2 justify-center items-center p-5'>
                <Button className='!bg-yellow-600 !text-white' variant='outlined'>Add To Card</Button>
                <Button className='!bg-orange-600 !text-white' variant='outlined'>Buy Now</Button>
            </div>
        </div>

    )
}

export default BlogDetails