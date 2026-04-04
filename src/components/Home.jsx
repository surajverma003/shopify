import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import myContext from '../context/myContext';

import StoreComp from '../reuse/StoreComp';
import Loader from '../reuse/Loader';
import Card from '../reuse/Card';

const Home = () => {
    const context = useContext(myContext);
    const { products, loading, fetchData, navigate, loggedInUser } = context;

    useEffect(() => {
        if (loggedInUser) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, loggedInUser]);

    return (
        <>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">

                {/* Hero Section */}
                <section className="poppins relative z-10 text-gray-900 dark:text-white py-20 overflow-hidden ">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pt-0 md:pt-40 md:pb-20">
                            <div className="text-center pb-12 md:pb-16">
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">Make your Shop &nbsp;<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 animate-gradient">wonderful</span></h1>
                                <div className="max-w-5xl mx-auto">
                                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere soluta iusto expedita veniam asperiores, cumque id.
                                    </p>
                                    <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
                                        <Link className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 px-8 py-4 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto mb-4 sm:mb-0" to="/products">Start Shopping</Link>
                                        <Link className="inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-8 py-4 rounded-xl text-gray-900 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto border border-gray-300 dark:border-gray-700" to="/about">Learn more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative SVG Background */}
                    <div className="absolute xl:left-1/2 lg:left-1/3 hidden lg:block transform -translate-x-1/2 bottom-0 pointer-events-none -z-10 opacity-40 dark:opacity-20" aria-hidden="true">
                        <svg className="relative" width="1200" height="490" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                                    <stop stopColor="#A685FA" offset="0%"></stop>
                                    <stop stopColor="#8254F8" offset="77.402%"></stop>
                                    <stop stopColor="#703BF7" offset="100%"></stop>
                                </linearGradient>
                            </defs>
                            <g fill="url(#illustration-01)" fillRule="evenodd">
                                <circle cx="1232" cy="128" r="128"></circle>
                                <circle cx="155" cy="443" r="64"></circle>
                            </g>
                        </svg>
                    </div>
                </section>
            </div>

            {/* Store Component Section */}
            <div className="py-20 pt-0 lg:pt-20 bg-white dark:bg-gray-950">
                <StoreComp title="Online Store" image="/sasta-mart/online-store.png" />
            </div>

            {/* Featured Products Section */}
            <div className="poppins bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950">
                <div className="grid grid-cols-1 gap-3 max-w-screen-lg mx-auto py-20 px-3">
                    <div className="text-gray-900 dark:text-white">
                        <h3 className="text-sm uppercase font-bold text-purple-600 dark:text-purple-400 mb-2 tracking-wider">Check now</h3>
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">Our Feature Services</h1>
                    </div>

                    {/* Loading Spinner */}
                    {loading && (
                        <div className="w-full text-center text-purple-600 dark:text-purple-400">
                            <Loader size="50px" message="products" />
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {!loading && products.length > 0 && products.slice(0, 3).map((product) => {
                            return <Card key={product.id} product={product} />
                        })}
                    </div>

                    {/* No Products Found */}
                    {!loading && products.length === 0 && (
                        <div className="flex flex-col justify-center items-center min-h-[500px] gap-5 bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-10">
                            <span className="text-8xl text-gray-300 dark:text-gray-700">
                                <Icon icon="mdi:package-variant-closed-remove"></Icon>
                            </span>
                            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">No products found</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your filters or search</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Services/Features Section */}
            <div className="bg-white dark:bg-gray-950 py-20">
                <div className="px-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 justify-center items-stretch gap-3 max-w-screen-lg mx-auto text-center font-semibold">

                    {/* Fast Delivery */}
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-12 w-full h-full flex justify-center items-center flex-col rounded-3xl shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-gray-800 group">
                        <div className="text-6xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="tabler:truck-delivery"></Icon>
                        </div>
                        <h5 className="text-sm uppercase text-gray-900 dark:text-white font-bold tracking-wide">Super Fast and Free Delivery</h5>
                    </div>

                    {/* Two Stacked Cards */}
                    <div className="flex gap-3 flex-col w-full h-full">
                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-12 w-full h-full flex justify-center items-center flex-col rounded-3xl shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-gray-800 group">
                            <div className="text-6xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon icon="material-symbols:security-rounded"></Icon>
                            </div>
                            <h5 className="text-sm uppercase text-gray-900 dark:text-white font-bold tracking-wide">Non-contact Shipping</h5>
                        </div>
                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-12 w-full h-full flex justify-center items-center flex-col rounded-3xl shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-gray-800 group">
                            <div className="text-6xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon icon="mingcute:coin-fill"></Icon>
                            </div>
                            <h5 className="text-sm uppercase text-gray-900 dark:text-white font-bold tracking-wide">Money-back Guaranteed</h5>
                        </div>
                    </div>

                    {/* Secure Payment */}
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-12 w-full h-full flex justify-center items-center flex-col rounded-3xl shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] border border-gray-200 dark:border-gray-800 group">
                        <div className="text-6xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon icon="tdesign:secured"></Icon>
                        </div>
                        <h5 className="text-sm uppercase text-gray-900 dark:text-white font-bold tracking-wide">Super Secure Payment System</h5>
                    </div>
                </div>
            </div>

            {/* Trusted Companies Section */}
            <div className="poppins bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 px-5 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-screen-lg mx-auto">
                    <h3 className="text-sm uppercase font-bold text-center my-6 text-gray-600 dark:text-gray-400 tracking-widest">Trusted By 1000+ Companies</h3>
                    <div className="companies grid grid-cols-3 md:grid-cols-5 items-center gap-8 py-2.5 overflow-hidden">
                        {
                            companies && companies?.map((company, index) => {
                                return (
                                    <div key={index} className="text-6xl flex justify-center items-center text-purple-600 dark:text-purple-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                                        <Icon icon={company}></Icon>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

const companies = [
    "fluent-mdl2:react-logo", "ion:logo-sass", "simple-icons:theboringcompany", "ion:logo-npm", "fontisto:wifi-logo"
]