import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {
    const location = useLocation();

    const footerLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/products', label: 'Products' },
        { path: '/contact', label: 'Contact' },
    ];

    const socialLinks = [
        { icon: 'ri:facebook-fill', label: 'Facebook', url: '#' },
        { icon: 'ri:instagram-fill', label: 'Instagram', url: '#' },
        { icon: 'ri:twitter-x-fill', label: 'Twitter', url: '#' },
        { icon: 'ri:linkedin-fill', label: 'LinkedIn', url: '#' },
    ];

    return (
        <footer className="poppins bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 border-t-2 border-gray-200 dark:border-gray-800">
            <div className="max-w-screen-xl mx-auto px-5 py-16 lg:py-24">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center shadow-lg hover:scale-105 duration-300 transition-all">
                                <Icon icon="simple-icons:theboringcompany" class="text-white text-4xl"></Icon>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Shopify</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Building the future</p>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
                            Delivering innovative solutions and exceptional experiences to help businesses grow and thrive in the digital age.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110" aria-label={social.label}>
                                    <Icon icon={social.icon} class="text-2xl"></Icon>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Icon icon="material-symbols:link" class="text-purple-600 dark:text-purple-400 text-2xl"></Icon> Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 group ${location.pathname === link.path ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400' }`}>
                                        <Icon icon="material-symbols:arrow-right" class={`text-lg transition-transform group-hover:translate-x-1 ${location.pathname === link.path ? 'text-purple-600 dark:text-purple-400' : ''}`}></Icon> {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Icon icon="material-symbols:contact-mail" class="text-purple-600 dark:text-purple-400 text-2xl"></Icon> Contact Info
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Icon icon="material-symbols:mail" class="text-purple-600 dark:text-purple-400 text-xl mt-0.5"></Icon>
                                <a href="mailto:info@suraj003.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">info@suraj003.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon icon="material-symbols:call" class="text-purple-600 dark:text-purple-400 text-xl mt-0.5"></Icon>
                                <a href="tel:+919876543210" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">+91 (9876) 543-210</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon icon="material-symbols:location-on" class="text-purple-600 dark:text-purple-400 text-xl mt-0.5"></Icon>
                                <span className="text-sm text-gray-600 dark:text-gray-400">B-512, Lucknow,<br />Uttar Pradesh, UP-110075</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gray-50 dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">
                            <Icon icon="mdi:heart" class="text-red-500"></Icon>
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                        © {new Date().getFullYear()} <span className="font-bold text-gray-900 dark:text-white">Shopify</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="#" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;