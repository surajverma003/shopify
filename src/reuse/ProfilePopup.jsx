import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import myContext from '../context/myContext';

const ProfilePopup = ({ logout, closeMenu }) => {
    const popupRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const context = useContext(myContext);
    const { user, loggedInUser } = context;

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close popup on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleLinkClick = () => setIsOpen(false);

    const menuLinks = [
        { to: '/profile', label: 'Profile', icon: 'mdi:account-outline' },
        { divider: true },
        { to: '/admin', label: 'Create Product', icon: 'mdi:plus-circle-outline' },
        { to: '/cart', label: 'Cart', icon: 'lucide:shopping-cart' },
        { to: '/wishlist', label: 'WishList', icon: 'lucide:heart' },
        // { to: '/login', label: 'Login', icon: 'mdi:login' },
        // { to: '/register', label: 'Sign Up', icon: 'mdi:account-plus-outline' },
    ];

    return (
        <div className="relative" ref={popupRef}>
            {/* Profile Avatar Trigger */}
            <button onClick={() => setIsOpen(!isOpen)} className="relative w-10 h-10 ms-2 rounded-full overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || 'Profile'} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                        {loggedInUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                )}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
            </button>

            {/* Popup Menu */}
            {isOpen && (
                <div className="absolute -right-12 lg:-right-5 mt-3 w-60 z-50 animate-fadeIn shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
                    {/* Arrow Pointer - Default is White */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-slate-800 rotate-45 border-l border-t border-gray-100 dark:border-slate-700"></div>

                    {/* Menu Container - bg-white is now DEFAULT */}
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">

                        {/* User Info Header */}
                        {user && (
                            <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                        {loggedInUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                                {loggedInUser?.name || 'User'}
                                            </p>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${loggedInUser?.role === 'admin' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                                                {loggedInUser?.role || 'customer'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate font-medium">
                                            {loggedInUser?.email || 'user@example.com'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Menu Links */}
                        <div className="py-2">
                            {menuLinks.map((link, index) => (
                                link.divider ? (
                                    <div key={index} className="my-1 border-t border-gray-200 dark:border-slate-700"></div>
                                ) : (
                                    <Link key={index} to={link.to} onClick={handleLinkClick} className="flex items-center gap-3 px-5 py-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-all duration-200" >
                                        <Icon icon={link.icon} className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                        <span className="text-sm font-semibold">{link.label}</span>
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Logout Button */}
                        {loggedInUser && logout && (
                            <div className="p-2 bg-gray-50/30 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700">
                                <button onClick={() => { logout(closeMenu); setIsOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg rounded-ss-none rounded-se-none transition-all duration-200">
                                    <Icon icon="mdi:logout" className="w-5 h-5" />
                                    <span className="text-sm font-bold">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePopup;