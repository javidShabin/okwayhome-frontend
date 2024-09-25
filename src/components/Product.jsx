import React, { useEffect } from 'react'
import { axiosInstants } from '../config/axiosInstants'

const Product = () => {
    const getAllProducts = async () => {
        try {
            const response = await axiosInstants({
                method: "GET",
                url: "/product/list"
            })
            console.log(response, "====response")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllProducts()
    },[])
  return (
    <main>
      
    </main>
  )
}

export default Product
