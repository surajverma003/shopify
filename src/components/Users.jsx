import React, { useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import myContext from '../context/myContext';

import User from '../reuse/User';
import Loader from '../reuse/Loader';
import NotLoggedIn from '../reuse/NotLoggedIn';

const Users = () => {
    const context = useContext(myContext);
    const { loggedInUser, users, search, setSearch, loading, fetchUsers, searchUser, findUserById, navigate } = context;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('auth-token'))) {
            fetchUsers();
        } else {
            navigate('/login');
        } // eslint-disable-next-line
    }, [navigate ]);

    
    if (!loggedInUser) {
        return <NotLoggedIn />
    }

    return (
        <>
            <div className="poppins md:py-10 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 sm:min-h-screen">
                <div className="max-w-screen-xl mx-auto rounded-3xl px-2 py-4 md:p-10">

                    {/* Header Section */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl border-2 border-gray-200 dark:border-gray-800 pb-3 rounded-3xl">
                        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-ss-3xl rounded-se-3xl">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl sm:text-4xl text-white">
                                    <Icon icon="mdi:account-group"></Icon>
                                </span>
                                <label className='text-xl font-bold text-white'>Find Members</label>
                            </div>
                            <span onClick={() => { fetchUsers(); setSearch(""); }} className={`text-white text-2xl sm:text-4xl cursor-pointer transition-all duration-300 flex items-center justify-center ${loading ? 'animate-spin pointer-events-none' : 'hover:scale-110 active:scale-90'}`}>
                                <Icon icon="mdi:reload"></Icon>
                            </span>
                        </div>

                        {/* Search Form */}
                        <div className="px-6 py-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                            <form className="flex gap-3" onSubmit={findUserById}>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Icon icon="material-symbols:search" style={{ color: '#9ca3af', fontSize: '20px' }}></Icon>
                                    </div>
                                    <input onChange={searchUser} id='name' name='name' className='block pl-12 p-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white' type="search" placeholder='Search User Name' value={search} required />
                                </div>

                                <button type="submit" disabled={!search.trim() || loading} className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all justify-center text-center rounded-xl shadow-lg px-8 py-4 hidden sm:flex items-center text-sm font-bold text-white uppercase tracking-wide duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale-[0.5] disabled:hover:scale-100 enabled:hover:shadow-xl enabled:hover:scale-[1.01]'>
                                    {loading ? "Searching..." : "Search"}
                                </button>
                            </form>
                        </div>

                        {/* Users List */}
                        <div className='bg-white dark:bg-gray-900 divide-y-2 divide-gray-200 dark:divide-gray-800'>
                            {loading ? (
                                <><Loader size="50px" message="Users" /></>
                            ) : users.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                                users.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((user) => (
                                        <User key={user.id} user={user} />
                                    ))
                            ) : (
                                <div className="flex flex-col justify-center items-center py-20 gap-4">
                                    <span className="text-7xl text-gray-300 dark:text-gray-700">
                                        <Icon icon="mdi:account-off"></Icon>
                                    </span>
                                    <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">No users found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;
