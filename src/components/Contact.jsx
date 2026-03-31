import React, { useContext, useEffect, useState } from 'react';

import Loader from '../reuse/Loader';
import myContext from '../context/myContext';
import { Icon } from '@iconify/react';

const Contact = () => {
    const [isLoadingMap, setIsLoadingMap] = useState(true);
    const context = useContext(myContext);
    const { loading, navigate, contactForm, sendEmail } = context;

    useEffect(() => { }, [navigate]);

    return (
        <>
            <div className="poppins bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 min-h-screen">

                {/* Contact Form Section */}
                <section className="bg-white dark:bg-gray-900 pb-0 sm:py-16">
                    <div className="px-3 py-6 sm:py-4 md:py-8 lg:py-16 mx-auto max-w-screen-xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white text-3xl mb-4 shadow-lg">
                                <Icon icon="mdi:email-outline"></Icon>
                            </div>
                            <h2 className="mb-4 text-4xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Contact Us</h2>
                            <p className="mb-8 font-light text-gray-600 dark:text-gray-400 sm:text-xl leading-relaxed max-w-4xl mx-auto">
                                Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
                            </p>
                        </div>

                        <form ref={contactForm} id='myform' onSubmit={sendEmail} className="poppins space-y-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-4 py-6 sm:p-8 rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-800">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Your Name</label>
                                <input type="text" id="name" name='name' className="block p-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Your Email</label>
                                <input type="email" id="email" name='email' className="block p-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@example.com" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400">Your Message</label>
                                <textarea id="message" name='message' rows="6" className="block p-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Leave a comment..." required></textarea>
                            </div>
                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.009] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    {loading ?
                                        (<><Icon icon="svg-spinners:bars-rotate-fade" class="text-xl sm:text-2xl"></Icon> Sending message...</>) :
                                        (<><Icon icon="material-symbols:lock" class="text-xl sm:text-2xl"></Icon> Send Message</>)
                                    }
                                </button>
                                <button type="reset" className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <Icon icon="material-symbols:refresh" class="text-lg sm:text-2xl"></Icon> Clear
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Map Container */}
                <div className="max-w-screen-xl mx-auto py-20 px-5">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                        Feel Free To <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Contact Us</span>
                    </h1>

                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-800">
                        {isLoadingMap && (
                            <div className="absolute inset-0 flex justify-center items-center bg-white dark:bg-gray-900 z-10">
                                <Loader size="50px" message="maps" />
                            </div>
                        )}
                        <iframe
                            title="map-url"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175316.13336105915!2d80.77769613855456!3d26.848902831417643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1741533743433!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            onLoad={() => setIsLoadingMap(false)}
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
