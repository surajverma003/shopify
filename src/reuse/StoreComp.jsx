import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const StoreComp = ({ title, image }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="poppins">
                <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2 max-w-screen-xl mx-auto py-20 px-5 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h3 className="text-sm uppercase font-bold text-purple-600 dark:text-purple-400 tracking-widest">Welcome to</h3>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas error soluta non tempora sapiente aperiam porro doloremque ratione molestiae iste?
                        </p>
                        <button onClick={() => navigate('/products')} type="button" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 px-8 py-4 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.01] group">
                            Shop Now
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                                <Icon icon="mdi:arrow-right-thin" className="text-3xl" />
                            </span>
                        </button>
                    </div>

                    {/* Image with Decorative Background */}
                    <div className="relative group">
                        <img src={image} className="relative z-10 rounded-2xl shadow-2xl dark:shadow-purple-500/10 pt-10 pe-10 lg:pt-12 lg:pe-12 transition-transform duration-500 group-hover:scale-105" alt={title} />
                        <div className="absolute top-0 right-0 w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-2xl -z-0 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreComp