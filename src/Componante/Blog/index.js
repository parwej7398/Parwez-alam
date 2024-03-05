import { Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileMenu from '../../ProfileMenu'

const Blog = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const fetchProductsFn = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${search}`)
            const res = await response.json()
            setData(res.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProductsFn()
    }, [search])
    // console.log(data);

    return (
        <>
            <div className='flex justify-between p-5 bg-black text-white'>
                <div className='flex gap-10 items-center '>
                    <p className='text-6xl font-bold text-red-600'>BLOG</p>
                    <div className='p-3 flex gap-2 border rounded h-14 bg-white text-black'>
                        <input type="text" placeholder='Search for products...' value={search} onChange={(event) => setSearch(event.target.value)} className='p-4 border-blue-200 outline-white w-[30rem]' /> <IconButton><Search /></IconButton>
                    </div>
                    <div className='flex border gap-1 p-2 rounded'>
                        <button onClick={() => navigate('/sign_up')}>SignUp</button><p>/</p>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
                <div>
                    <ProfileMenu />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-5 border bg-slate-200 p-5'>
                {isLoading ?
                    <div class="flex flex-col items-center w-screen justify-center h-screen">
                        <div
                            class="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                            <span
                                class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]">
                            </span>
                        </div>

                    </div>
                    :
                    data?.map((product) => {
                        return <div key={product.id} className="flex p-2 relative flex-col bg-gray-50" onClick={() => navigate(`/blog/${product.id}`)}>
                            <img src={product.thumbnail} alt="" className='h-44 w-full' />
                            <div>
                                <p>{product.title}</p>
                                <p className='text-red-600'>₹{product.price}</p>
                            </div>
                        </div>
                    })}

                {!isLoading && data?.length === 0 && <p>no data found with keyword : {search}</p>}
            </div>
        </>
    )
}

export default Blog