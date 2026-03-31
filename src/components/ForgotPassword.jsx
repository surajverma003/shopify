import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = ({showForget,notify}) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setEmail("");
            notify("Reset link delivered to your email.","success");
            showForget(false);
        }, 4000);
    };

    return (
        <>
            <section className="poppins bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5 flex items-center sm:min-h-screen">
                <div className="relative max-w-2xl mx-auto w-full">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-6">
                            <iconify-icon icon="material-symbols:lock-reset" class="text-white text-4xl"></iconify-icon>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Forgot Password?</h1>
                        <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 w-full sm:max-w-xl mx-auto">No worries! Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 px-5 py-8 sm:p-8 md:p-12">
                        <form onSubmit={changePassword} className="space-y-0">
                            <div>
                                <label htmlFor="email" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <iconify-icon icon="material-symbols:mail" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></iconify-icon> Email Address
                                </label>
                                <div className="relative">
                                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="Enter your registered email" required />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <iconify-icon icon="material-symbols:alternate-email" class="text-lg sm:text-2xl"></iconify-icon>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ?
                                        (<><iconify-icon icon="svg-spinners:bars-rotate-fade" class="text-2xl"></iconify-icon> Sending Reset Link...</>) :
                                        (<><iconify-icon icon="material-symbols:send" class="text-lg sm:text-2xl"></iconify-icon> Send Reset Link</>)
                                    }
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-gray-900 px-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Remember Password?</span>
                            </div>
                        </div>

                        {/* Back to Login Link */}
                        <div className="text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wide rounded-xl border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                                <iconify-icon icon="material-symbols:arrow-back" class="text-sm sm:text-lg"></iconify-icon> Back to Login
                            </Link>
                        </div>
                    </div>

                    <button onClick={() => showForget(false)} className="absolute top-0 right-0 flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                        <iconify-icon icon="material-symbols:close" class="text-2xl"></iconify-icon>
                    </button>
                </div>
            </section>
        </>
    );
};

export default ForgotPassword;
