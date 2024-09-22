// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { FaShoppingCart, FaBars, FaTimes, FaUserCircle, FaCaretDown } from 'react-icons/fa';
// import axios from 'axios';
// import { REACT_APP_API_PORT } from '../../Api';
// import ConfirmLogoutModal from '../../components/ConfirmLogoutModal';

// const Navbar = () => {
//     const [data,setData] = useState([])
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//     const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
//     const admin = localStorage.getItem("admin")
//     const token = localStorage.getItem("token")
//     const getData = async()=>{
//         try{
//             const res =await axios.get(`${REACT_APP_API_PORT}api/auth/get-profile`,{
//                 headers:{
//                     'Content-Type':'application/json',
//                     'x-access-token':token
//                 }
//             })
//             console.log("res",res)
//             if(res.data.status===true){
//                 setData(res.data.data)
//             }
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

//     useEffect(()=>{
//         const admin = localStorage.getItem("admin")
//         if(admin){
//             getData()
//         }
//     },[])

//     const handleLogout = () => {
//         setIsModalOpen(true); // Open the modal
//     };

//     return (
//         <header className="bg-primary text-white py-4 shadow-md z-10">
//             <nav className="container mx-auto flex justify-between items-center">
//                 <h1 className="text-2xl font-bold">E-Shop</h1>
//                 <div className="flex items-center lg:hidden">
//                     <div className="relative inline-block mx-3">
//                         <button onClick={toggleProfileMenu} className="flex items-center">
//                            <FaUserCircle size={20} className='mx-1'/> {(data.name) ? <span className='mt-0.5'>{data.name}</span> : ""}
//                             <FaCaretDown className="ml-1" />
//                         </button>
//                         {isProfileOpen && (
//                             <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg">
//                                 <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</NavLink>
//                                 <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</NavLink>
//                                 <NavLink to="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</NavLink>
//                             </div>
//                         )}
//                     </div>
//                     <button onClick={toggleMenu} className="text-2xl">
//                         {isMenuOpen ? <FaTimes /> : <FaBars />}
//                     </button>
//                 </div>
//                 <ul className={`lg:flex lg:space-x-6 absolute lg:static top-16 lg:top-auto left-0 w-full lg:w-auto bg-primary lg:bg-transparent flex-col lg:flex-row items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
//                     <li className="my-2 lg:my-0 lg:mx-4 text-center">
//                         <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>Home</NavLink>
//                     </li>
//                     <li className="my-2 lg:my-0 lg:mx-4 text-center">
//                         <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>About Us</NavLink>
//                     </li>
//                     <li className="my-2 lg:my-0 lg:mx-4 text-center">
//                         <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>Contact</NavLink>
//                     </li>
//                     <li className="relative my-2 lg:my-0 lg:mx-4 text-center">
//                         <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>
//                             <div className="relative inline-block">
//                                  <FaShoppingCart className="text-xl" />
//                                 {cartTotalQuantity > 0 && (
//                                     <span className="absolute -top-2 -right-5 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartTotalQuantity}</span>
//                                 )}
//                             </div>
//                         </NavLink>
//                     </li>
//                     {
//                         (!admin) && 
//                         <li className="my-2 lg:my-0 lg:mx-4 text-center">
//                             <NavLink to="/login" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-200">Login</NavLink>
//                         </li>
//                     }
                    
//                     <li className="relative mt-2 lg:my-0 lg:mx-4 text-center hidden lg:block">
//                         <div className="relative inline-block">
//                             <button onClick={toggleProfileMenu} className="flex items-center mx-1">
//                                 <FaUserCircle size={20} className='mx-1'/> {(data.name) ? <span className='mt-0.5'>{data.name}</span> : ""}
//                                 <FaCaretDown className="ml-1" />
//                             </button>
//                             {isProfileOpen && (
//                                 <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg">
//                                     <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</NavLink>
//                                     <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</NavLink>
//                                     <NavLink to="/logout" className="block px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>Logout</NavLink>
//                                 </div>
//                             )}
//                         </div>
//                     </li>
//                 </ul>
//             </nav>
//             <ConfirmLogoutModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 onConfirm={confirmLogout} 
//             />
//         </header>
//     );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import axios from 'axios';
import { REACT_APP_API_PORT } from '../../Api';
import ConfirmLogoutModal from '../../components/ConfirmLogoutModal';

const Navbar = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
    const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    const getData = async () => {
        try {
            const res = await axios.get(`${REACT_APP_API_PORT}api/auth/get-profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            if (res.data.status === true) {
                setData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (admin) {
            getData();
        }
    }, []);

    const handleLogout = () => {
        setIsModalOpen(true); // Open the modal
    };

    const confirmLogout = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        setIsModalOpen(false)
        navigate("/login")
        // window.location.href = '/login'; // Redirect to login page
        window.reload()
    };

    return (
        <header className="bg-primary text-white py-4 shadow-md z-10">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>navigate("/")}>E-Shop</h1>
                <div className="flex items-center lg:hidden">
                {
                    (admin) &&
                
                    <div className="relative inline-block mx-3">
                        <button onClick={toggleProfileMenu} className="flex items-center">
                            <FaUserCircle size={20} className='mx-1' /> {data.name && <span className='mt-0.5'>{data.name}</span>}
                            <FaCaretDown className="ml-1" />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg">
                                <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</NavLink>
                                <NavLink to="/payments" className="block px-4 py-2 hover:bg-gray-200">Payments</NavLink>
                                <NavLink to="#"  onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</NavLink>
                            </div>
                        )}
                    </div>
                }
                    <button onClick={toggleMenu} className="text-2xl">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <ul className={`lg:flex lg:space-x-6 absolute lg:static top-16 lg:top-auto left-0 w-full lg:w-auto bg-primary lg:bg-transparent flex-col lg:flex-row items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <li className="my-2 lg:my-0 lg:mx-4 text-center">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>Home</NavLink>
                    </li>
                    <li className="my-2 lg:my-0 lg:mx-4 text-center">
                        <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>About Us</NavLink>
                    </li>
                    <li className="my-2 lg:my-0 lg:mx-4 text-center">
                        <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>Contact</NavLink>
                    </li>
                    <li className="relative my-2 lg:my-0 lg:mx-4 text-center">
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-gray-200' : 'hover:text-gray-200'}>
                            <div className="relative inline-block">
                                <FaShoppingCart className="text-xl" />
                                {cartTotalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-5 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartTotalQuantity}</span>
                                )}
                            </div>
                        </NavLink>
                    </li>
                    {!admin && (
                        <li className="my-2 lg:my-0 lg:mx-4 text-center">
                            <NavLink to="/login" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-200">Login</NavLink>
                        </li>
                    )}

                    {
                        (admin) &&
                    
                    <li className="relative mt-2 lg:my-0 lg:mx-4 text-center hidden lg:block">
                        <div className="relative inline-block">
                            <button onClick={toggleProfileMenu} className="flex items-center mx-1">
                                <FaUserCircle size={20} className='mx-1' /> {data.name && <span className='mt-0.5'>{data.name}</span>}
                                <FaCaretDown className="ml-1" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg">
                                    <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</NavLink>
                                    <NavLink to="/payments" className="block px-4 py-2 hover:bg-gray-200">Payments</NavLink>
                                    <NavLink to="#" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</NavLink>
                                </div>
                            )}
                        </div>
                    </li>
                    }
                </ul>
            </nav>
            <ConfirmLogoutModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmLogout} 
            />
        </header>
    );
};

export default Navbar;
