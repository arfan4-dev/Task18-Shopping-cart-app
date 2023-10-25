import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
const ProductDetail = () => {
    const [products, setProducts] = useState([]);
    const db = getFirestore();
    const productsCollection = collection(db, 'products');
  
    const fetchData = async () => {
        const querySnapshot = await getDocs(productsCollection);
        const productData = [];
        querySnapshot.forEach((doc) => {
          // Get the data for each product
          productData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // Update the products state with the data from Firestore
        setProducts(productData[0].productsData);
      };
      
      console.log('products',products)
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div>
        <div className='bg-slate-800'><Navbar/></div>
        <h2 className="text-3xl font-bold mb-4">Product List</h2>
       <ul className="space-y-4">
       {products.length > 0 ? (
  <ul className="space-y-4">
    {products.map((product, index) => (
      <li key={index} className="border p-4 rounded shadow-md">
  
       <h3 className="text-xl font-semibold">Title: {product.cartTitle}</h3>
        <p className="text-gray-700">Price: ${product.cartPrice}</p>
        <p className="text-gray-700">Description: {product.cartDescription}</p>
        <p className="text-gray-700">Rating: {Math.floor(product.cartRating)}</p>
      </li>
    ))}
  </ul>
) : (
  <p>Loading products...</p>
)}

      </ul>
      
    </div>
  )
}

export default ProductDetail