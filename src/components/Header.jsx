import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import { Icon } from '@iconify/react';
import ProfilePopup from '../reuse/ProfilePopup';

const Header = () => {
    const context = useContext(myContext);
    const { auth, setAuth, cart, logout, theme, toggleTheme, searchProducts } = context;

    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [announce, setAnnounce] = useState(() => {
        const offer = localStorage.getItem("announcement");
        return offer !== "hidden";
    });

    const closeAnnounce = () => {
        setAnnounce(false);
        localStorage.setItem("announcement", "hidden");
    };

    const navLinks = auth ? [
        { path: '/', label: 'Home', icon: "lucide:home" },
        { path: '/about', label: 'About', icon: "lucide:info" },
        { path: '/products', label: 'Products', icon: "lucide:package" },
        { path: '/contact', label: 'Contact', icon: "lucide:mail" },
        { path: '/users', label: 'Users', icon: "lucide:users" },
    ] : [
        { path: '/', label: 'Home', icon: "lucide:home" },
        { path: '/about', label: 'About', icon: "lucide:info" },
        { path: '/products', label: 'Products', icon: "lucide:package" },
        { path: '/contact', label: 'Contact', icon: "lucide:mail" },
    ];

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setAuth(!!token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const authLinks = auth ? [] : [{ path: '/login', label: 'Login' }, { path: '/register', label: 'Register' }];

    // TOGGLE : Open/Close menu
    const toggleMenu = () => {
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu
    const closeMenu = () => {
        document.body.style.overflow = 'auto';
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`relative top-0 left-0 right-0 z-[999] transition-all duration-300 bg-white dark:bg-zinc-900 shadow-lg border-b border-zinc-200 dark:border-zinc-800`}
        >
            {/* Announcement Bar */}
            {announce && (
                <div className="relative hidden md:flex items-center justify-center py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 text-black dark:text-white text-sm font-semibold">
                    <span className="">Free shipping on orders over $50</span>
                    <span className="mx-3 text-zinc-600 dark:text-zinc-400">|</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Use code <span className="font-bold text-purple-400">WELCOME</span> for 10% off</span>
                    <span className="absolute top-3 right-4 cursor-pointer hover:text-red-400 transition-colors" onClick={closeAnnounce}><Icon icon="lucide:x" className="w-4 h-4" /></span>
                </div>
            )}

            {/* Main Nav */}
            <div className="px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <Link to="/" onClick={closeMenu} data-testid="logo-link" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                            <span className="text-white font-black text-lg">S</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl lg:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                                Sasta<span className="text-purple-600">Mart</span>
                            </span>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 tracking-widest uppercase -mt-0.5">Shop Fast. Save More.</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} data-testid={`nav-${link.label.toLowerCase()}`} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                                    ${location.pathname === link.path
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                            >
                                {link?.label.toUpperCase()}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1.5 lg:gap-0">
                        {/* Search */}
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} required data-testid="search-btn" className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all" >
                            <Icon icon="lucide:search" className="text-gray-500 text-xl" />
                        </button>

                        {/* Cart */}
                        {auth &&
                            (<Link to="/cart" className="relative p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                                <Icon icon="lucide:shopping-cart" class="text-xl" />
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-purple-500/40">{cart.length || "0"}</span>
                            </Link>)
                        }

                        {
                            (!auth) ? <div className="hidden lg:flex items-center gap-2 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-700">
                                {authLinks.map((link) => (
                                    <Link key={link.path} to={link.path} data-testid={`auth-${link.label.toLowerCase()}`} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 
                                    ${link.label === 'Login' ? 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div> : <ProfilePopup logout={logout} closeMenu={closeMenu} />
                        }

                        {/* Mobile Menu Toggle */}
                        <button onClick={toggleMenu} data-testid="mobile-menu-toggle" className="lg:hidden p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                            {isMenuOpen ? <Icon icon="lucide:x" className="hover:text-red-500" /> : <Icon icon="lucide:menu" className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Expanded */}
            <div className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 lg:px-8 py-3 border-t border-zinc-200 dark:border-zinc-800">
                    <form onSubmit={searchProducts} className="relative max-w-2xl mx-auto">
                        <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input type="text" data-testid="search-input" placeholder="Search products..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-purple-500 text-zinc-900 dark:text-white placeholder-zinc-400 outline-none transition-all" />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-2 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm">
                            <Icon icon="lucide:search" className="w-5 h-5 text-white" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMenu} />

                <div data-testid="mobile-menu" className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full">

                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                            <span className="text-lg font-bold text-zinc-900 dark:text-white">Menu</span>
                            <button onClick={closeMenu} data-testid="close-menu" className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                                <Icon icon="lucide:x" className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="relative">
                                <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </div>

                        {/* Mobile Nav Links */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <nav className="space-y-1">
                                {navLinks.map((link) => {
                                    return (
                                        <Link key={link.path} to={link.path} onClick={closeMenu} data-testid={`mobile-nav-${link.label.toLowerCase()}`} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all 
                                                ${location.pathname === link.path
                                                ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                            }`}
                                        ><Icon icon={link.icon} className="text-xl" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Mobile Auth */}
                            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 sm:px-4">Account</p>
                                <div className="space-y-2">
                                    {authLinks.map((link) => (
                                        <Link key={link.path} to={link.path} onClick={closeMenu} className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold transition-all
                                                ${link.label === 'Login'
                                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                                            }`}
                                        ><Icon icon="lucide:users" />
                                            {link.label}
                                        </Link>
                                    ))}

                                    {auth && (
                                        <button onClick={() => logout(closeMenu)} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
                                            <Icon icon="lucide:log-out" /> Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Footer - Theme Toggle */}
                        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
                                <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-all">
                                    {theme ? <Icon icon="lucide:moon" className="w-4 h-4 text-zinc-600 dark:text-zinc-300" /> : <Icon icon="lucide:sun" className="w-4 h-4 text-zinc-600" />}
                                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{theme ? 'Dark' : 'Light'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
