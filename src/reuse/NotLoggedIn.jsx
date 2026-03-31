import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const NotLoggedIn = () => {
    return (
        <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5 flex items-center justify-center">
            <div className="max-w-lg mx-auto w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl mb-4 sm:mb-6 animate-pulse">
                        <Icon icon="material-symbols:lock-person" className="text-white text-4xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Access Restricted</h1>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">You're not logged in. Please sign in to your account to access this page and continue.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 px-5 py-8 sm:p-8 md:p-10">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                <Icon icon="material-symbols:shield-lock" className="text-4xl text-gray-400 dark:text-gray-500" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <Icon icon="material-symbols:close" className="text-white text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Authentication Required
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            This page requires you to be logged in. Sign in with your credentials to unlock full access to your dashboard.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <Icon icon="material-symbols:login" className="text-lg sm:text-2xl" /> Sign In Now
                        </Link>

                        <Link to="/" className="flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <Icon icon="material-symbols:home" className="text-lg sm:text-2xl" /> Back to Home
                        </Link>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-gray-200 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white dark:bg-gray-900 px-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">New Here?</span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs sm:text-base">Don't have an account yet?</p>
                        <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wide rounded-xl border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Icon icon="material-symbols:person-add" className="text-sm sm:text-lg" /> Create Account
                        </Link>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-3 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <Icon icon="material-symbols:lightbulb" className="text-amber-600 dark:text-amber-400 text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Why Sign In?</h3>
                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Access your orders, manage products, track deliveries, and enjoy a personalized shopping experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotLoggedIn;