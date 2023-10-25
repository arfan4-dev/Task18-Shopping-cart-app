import React, { useContext, useState, useEffect, useRef } from 'react';
import logo from '../assests/image.png';
import { ImCart } from 'react-icons/im';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './spinner.css';
import { Context } from './AppContext';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const { currentUser } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto'>
        <NavLink to='/home'>
          <div className='ml-5'>
            <img src={logo} className='h-20' alt='' />
          </div>
        </NavLink>

        <div className='flex items-center font-medium text-slate-100 mr-5 space-x-6 '>
          <NavLink to='/home'>
            <p>Home</p>
          </NavLink>
          <div className='relative'>
            <NavLink to='/cart'>
              <div>
                <ImCart className='text-2xl' />
                {cart.length > 0 && (
                  <span className='absolute -top-1 -right-2 bg-green-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>
                    {cart.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>


          <NavLink to='/productDetail'>
              <div>
                Product Detail
              </div>
            </NavLink>
          <div className='relative'>
            <button onClick={toggleDropdown} className='text-white text-md flex items-center gap-x-1'>
              {/* <CgProfile className='text-3xl' /> */}
              <img src={currentUser.photoURL} className='w-12 h-12 rounded-full bg-cover ' />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className='absolute left-10 mt-2 w-48 bg-white border rounded-md shadow-lg'>
                <div className='flex items-center p-2 space-x-3'>
                  <CgProfile className='text-2xl text-gray-500' />
                  <div>
                    <p className='text-md font-semibold text-gray-700'>{currentUser.displayName}</p>

                  </div>
                </div>
                <hr className='my-2 border-gray-200' />
                <NavLink to='/profile' className='block p-2 text-gray-700 hover:text-gray-800'>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className='block gap-x-1 p-2 text-slate-800 mb-1 hover:text-red-700 flex items-center space-x-1 cursor-pointer'>
                  Logoutx
                  <BsArrowRightSquareFill className='text-xl' />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
