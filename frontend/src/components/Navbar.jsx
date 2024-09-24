import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems}=useContext(ShopContext);
    const [visible,setvisible]=useState(false);
    
    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('');
        setCartItems({})
        
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
        <img src={assets.logo3}  className='w-36' alt='Logo'/>
        </Link>
        
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1 '>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1 '>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=''/>

            <div className='group relative'>
               
               <img onClick={()=> token ? null :navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon}/>
               {/* Drop down menu  */}
               {
                token &&   //when will availabke then this div will display
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <p className='cursor-pointer hover:text-black'>MY Profile</p>
                  <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={()=>logout()} className='cursor-pointer hover:text-black'>LogOut</p>
                </div>
              </div>
               }
            </div>
            <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5'/>
              <p className='absolute right-[-5px] bottom-[-5px] w-4 leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px] text-center'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'/>
        </div>

        {/* {sidebar menu for smaller screen }  */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-200 ${visible? 'w-full':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon}/>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setvisible(false)} to='/'className='py-2 pl-6 border'>HOME</NavLink>
                <NavLink onClick={()=>setvisible(false)} to='/collection'className='py-2 pl-6 border'>COLLECTION</NavLink>
                <NavLink onClick={()=>setvisible(false)} to='/about'className='py-2 pl-6 border'>ABOUT</NavLink>
                <NavLink onClick={()=>setvisible(false)} to='/contact'className='py-2 pl-6 border'>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar