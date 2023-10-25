import React from 'react'
import {FiDelete} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import {remove} from '../redux/CartSlice'
import {toast} from 'react-hot-toast'
const CartItem = ({item,itemIndex}) => {
  const dispatch= useDispatch();
  const removeFromCart=()=>{
    dispatch(remove(item.id))
    toast.error('Item remove successfully')
  }
  return (
    <div className='border-b border-green-600 w-[50%] mx-auto mb-5 '>
      <div className='flex justify-center mb-5 mt-5'>
      <div className='h-[230px]'>
        <img className='h-full w-full' src={item.image} alt='cartItem'/>
      </div>
      <div className='ml-5 mt-5'>
      <div className='flex flex-col justify-center '>
        <h1 className="text-gray-700 font-semibold text-lg  mt-1">{item.title}</h1>
        <h1  className="w-full text-gray-400 font-normal text-[20px]">{item.description.split(" ").slice(0,20).join(" ")+"..."}</h1>
      </div> 
      <div className='flex flex-row justify-between items-center mt-5'>
        <p className="text-green-600 font-semibold ">${item.price}</p>
        <div onClick={removeFromCart} className= 'mt-2 bg-pink-400 p-2 rounded-full hover:cursor-pointer'>
          <FiDelete/>
        </div>
      </div>
      </div>
     
      </div>
  
    </div>
  )
}

export default CartItem