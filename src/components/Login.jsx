import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import ForgotPassword from "./ForgotPassword";
import myContext from "../context/myContext";

const Login = () => {
    const context = useContext(myContext);
    const { loggedInUser, user, setUser, loginUser, loading, notify } = context;

    const [forget, showForget] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        !loggedInUser && <>
            <section className="poppins h-auto bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5">
                <div className="max-w-2xl mx-auto">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-2 sm:mb-6">
                            <Icon icon="material-symbols:lock" class="text-white text-4xl"></Icon>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Welcome Back</h1>
                        <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 w-full sm:max-w-xl mx-auto">Sign in to your account to access your dashboard and manage your content.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 px-5 py-8 sm:p-8 md:p-12">
                        <form onSubmit={loginUser} id="loginForm" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:mail" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></Icon>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input type="email" onChange={onchange} id="email" name="email" className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="john@example.com" defaultValue={user.email} required />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:alternate-email" class="text-lg sm:text-2xl"></Icon>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:key" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></Icon>
                                    Password
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} onChange={onchange} id="password" name="password" className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 pr-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="Enter your password" defaultValue={user.password} required />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:password" class="text-lg sm:text-2xl"></Icon>
                                    </div>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-7 sm:top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" >
                                        <Icon icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} class="text-lg sm:text-2xl"></Icon>
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex justify-between items-start sm:items-center gap-4 flex-col sm:flex-row">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-2 focus:ring-purple-500" />
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Remember me</span>
                                </label>
                                <button onClick={() => showForget(true)} type="button" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    {loading ?
                                        (<><Icon icon="svg-spinners:bars-rotate-fade" class="text-2xl"></Icon> Signing In...</>) :
                                        (<><Icon icon="material-symbols:login" class="text-lg sm:text-2xl"></Icon> Sign In</>)
                                    }
                                </button>
                                <button type="reset" onClick={() => setUser({ email: "", password: "" })} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <Icon icon="material-symbols:refresh" class="text-lg sm:text-2xl"></Icon> Clear
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
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
                                <Icon icon="material-symbols:person-add" class="text-sm sm:text-lg"></Icon> Create Account
                            </Link>
                        </div>
                    </div>

                    {/* Info Banner */}
                    <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-3 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Icon icon="material-symbols:info" class="text-purple-600 dark:text-purple-400 text-3xl"></Icon>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Demo Credentials</h3>
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    Email: <span className="font-bold">john@mail.com</span> | Password: <span className="font-bold">changeme</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={`fixed top-0 right-0 z-50 ${forget ? "block" : "hidden"} w-full h-screen backdrop-blur-lg overflow-scroll`}>
                <ForgotPassword showForget={showForget} notify={notify} />
            </div>
        </>
    );
};

export default Login;
