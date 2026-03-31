import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Error = () => {
    return (
        <section className="fixed top-0 right-0 z-[1000] w-full h-screen text-black dark:text-white bg-white dark:bg-slate-950 flex justify-center items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-zinc-500 dark:text-zinc-400">Oops! The page you are looking for doesn't exist or has been moved. Continue exploring our latest collections directly from the homepage.</p>
                    <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 transition-all duration-200 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500 shadow-sm hover:shadow-md active:scale-95 group">
                        <Icon icon="mdi:arrow-left-thin" className="text-3xl ml-2 group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Error
