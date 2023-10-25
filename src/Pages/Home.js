import React, { useEffect, useState } from 'react'
import Spinner from '../Components/Spinner';
import Products from '../Components/Products';
import Navbar from '../Components/Navbar';
const Home = () => {
    const API_URL='https://fakestoreapi.com/products'
const [loading,setLoading]=useState(false);
const [posts,setPost]=useState([]);
const [selectedCategory, setSelectedCategory] = useState('all');
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [rating,setRating]=useState('');


  // Filter the products based on the selected category
  const filteredProducts = posts.filter((product) => {
    const matchCategory=selectedCategory==='all' || product.category===selectedCategory;
    const minPriceMatch=minPrice==='' || product.price >= parseFloat(minPrice);
    const maxPriceMatch=maxPrice==='' || product.price >= parseFloat(maxPrice)
    const ratingMatch=rating==='' || Math.floor(product.rating.rate)===(parseFloat(rating) );
    return matchCategory && minPriceMatch && maxPriceMatch && ratingMatch
  });


  const resetFilter=()=>{
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
  }
  
    const handleSelectChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    async function getProducts(){
      try {
          setLoading(true);
          const response = await fetch(API_URL);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.log(error);
          setPost([]);
        }
        setLoading(false)

    }

useEffect(() => {
  getProducts()
}, [])


  return (
    <div>
      <div className='bg-slate-800'><Navbar/></div>
         <div className="flex justify-center items-center">
            <div>
            <select
    className=" w-60 ml-4 mt-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
    value={selectedCategory}
    onChange={handleSelectChange}
  >
        <option value="all">All</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelry</option>
        <option value="electronics">Electronics</option>
  </select>
            </div>


  <div className=" ">
        <input
          type="number"
          placeholder="Min Price"
          className="block w-32 ml-4 mt-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      <div className="">
        <input
          type="number"
          placeholder="Max Price"
          className="block w-32 ml-4 mt-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
            <select
    className=" w-60 ml-4 mt-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    >
               <option value="" disabled>Select Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
  </select>
            </div>

            <div>
  <button
    onClick={resetFilter}
    className="bg-white hover:bg-white text-slate-800 ml-5 mt-2 font-bold py-2 px-4 border rounded focus:outline-none hover:bg-slate-700 hover:text-white"
  >
    Reset Filter
  </button>
</div>
            
</div>

       {
  loading ? (
    <div className='flex flex-col items-center justify-center h-screen'><Spinner/></div>
  ) : posts.length >0 ? (
    <div className='grid sx:grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] '>
      {filteredProducts.map((post) => (
        <Products key={post.id} post={post} resetFilter={resetFilter}  />
      ))}
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <p>No Data Found</p>
    </div>
  )
}



    </div>
  )
}

export default Home