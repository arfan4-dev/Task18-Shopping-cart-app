import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {add ,remove} from '../redux/CartSlice'
import {toast} from 'react-hot-toast'
import './spinner.css'
const Products = ({post}) => {
const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart)

  const addToCart=()=>{
    dispatch(add(post))
    toast.success('Item added successfully')
  }
  
  const removeToCart=()=>{
    dispatch(remove(post.id))
    toast.error('Item remove successfully')
  } 
  return (
    
    <div className="flex flex-col items-center justify-between  hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5  rounded-xl" id='product'>
    <div >
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
        </div>   
        <div>
        <p className="w-40 text-gray-400 font-normal text-[10px]">{post.description.split(" ").slice(0,10).join(" ")+"..."}</p>
        </div> 
        <div className='h-[180px]'>
        <img src={post.image} alt='' className='h-full w-full'/> 
        </div> 
        
        <div className='flex justify-between gap-12 items-center w-full mt-5'>
        <div>
        <p className="text-green-600 font-semibold ">${post.price}</p>
        </div> 
        <div>
        
            {
                cart.some((p)=>(p.id===post.id)) ? (<button className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in" onClick={removeToCart}>Remove Item</button>) : 
                (<button  className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in" onClick={addToCart}>Add Item</button>)
            }
        
        </div> 
          </div> 
    </div>
  )
}

export default Products