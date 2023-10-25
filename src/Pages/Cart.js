import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CartItem from "../Components/cartItem";
import "./cart.css";
import Navbar from "../Components/Navbar";
import { emptyCart } from '../redux/CartSlice';
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Context } from "../Components/AppContext";

const Cart = () => {
  const [netPrice, setNetPrice] = useState(0);
  const { cart } = useSelector((state) => state);
  const { currentUser } = useContext(Context);
  const [confirm, setConfirm] = useState(true);
  const [customRatings, setCustomRatings] = useState({}); // Store ratings for each product
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Printing Cart");
  console.log(cart);

  const orderPlace = () => {
    setConfirm(false);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  const submitOrder = () => {
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectChange = (e, itemId) => {
    setCustomRatings((prevRatings) => ({
      ...prevRatings,
      [itemId]: e.target.value,
    }));
  };

  const removeProducts = async () => {
    try {
      const productsData = cart.map((item) => ({
        cartId: item.id,
        cartTitle: item.title,
        cartDescription: item.description,
        cartImage: item.image,
        cartPrice: item.price,
        cartRating: customRatings[item.id] || 0, // Use the corresponding rating
      }));

      await setDoc(doc(db, "products", currentUser.uid), {
        productsData,
      });
    } catch (err) {
      console.log('from remove product cart', err);
    }

    dispatch(emptyCart());
    toast.success('Checkout successfully');
  };

  useEffect(() => {
    setNetPrice(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div>
      <div className="bg-slate-800"><Navbar /></div>
      {cart.length > 0 ? (
        <div>
          <div className="flex ">
            <div>
              {cart.map((item, index) => (
                <CartItem key={item.id} itemIndex={index} item={item} />
              ))}
            </div>
            <div>
              <div className="flex flex-col mt-16">
                <div>
                  <div className="uppercase font-bold text-green-600 text-lg">
                    Your cart
                  </div>
                  <div className="uppercase font-bold text-green-700 text-4xl">
                    Summary
                  </div>

                  <p className="mt-4">
                    <span className="font-bold text-green-900 text-lg">
                      Total Items: {cart.length}{" "}
                    </span>
                  </p>
                </div>

                <div className="mr-52">
                  <div>
                    <p className="text-gray-700 font-semibold text-lg">
                      Total Price{" "}
                      <span className="text-black font-bold">:${netPrice}</span>
                    </p>
                  </div>

                  <div>
                    {confirm ? (
                      <div>
                        <button onClick={orderPlace} className="button-37 mt-4 mb-4">
                          Order
                        </button>
                      </div>
                    ) : (
                      <NavLink to="/home">
                        <button onClick={removeProducts} className="button-37 mt-4 mb-4">
                          Checkout Now
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-auto justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-gray-700 font-semibold text-lg">Cart Empty</h1>
            <NavLink to="/home">
              <button className="button-37 mt-4">Shop Now</button>
            </NavLink>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-end items-center">
                <span
                  onClick={closeModal}
                  className="cursor-pointer p-2">
                  &times;
                </span>
              </div>

              <form className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="mb-4">
                    <label className="font-semibold">Rating: {item.title}</label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
                        value={customRatings[item.id] || 0} // Use the corresponding rating
                        onChange={(e) => handleSelectChange(e, item.id)}
                      >
                        <option value="0" disabled>Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M6.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={submitOrder}
                    className="bg-yellow-300 p-2 border-black rounded-xl ">
                    Submit Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
