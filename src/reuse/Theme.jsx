import React, { useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import myContext from '../context/myContext';

const Theme = () => {
    const context = useContext(myContext);
    const { theme, toggleTheme } = context;

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        <>
            <button
                onClick={toggleTheme}
                className="fixed bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 z-50 active:scale-95"
                aria-label="Back to top"
            >
                <div className={`flex items-center justify-center transition-transform duration-500 ease-in-out ${theme ? 'rotate-[360deg]' : 'rotate-0'}`}>
                    {theme ?
                        <Icon icon="lucide:sun" className="text-xl" /> :
                        <Icon icon="lucide:moon" className="text-xl" />
                    }
                </div>
            </button>
        </>
    );
};

export default Theme;
