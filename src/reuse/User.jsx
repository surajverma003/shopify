import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';
import UpdateUser from '../components/UpdateUser';

const User = ({ user }) => {
    const context = useContext(myContext);
    const { showMenu, setShowMenu, deleteUser, loading } = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openEditModal = (user) => { setSelectedUser(user); setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); setSelectedUser(null); };

    return (
        <>
            <div className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                <div className="flex justify-between items-center p-5 gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img className="w-14 h-14 rounded-full border-4 border-purple-200 dark:border-purple-900 shadow-lg object-cover"
                            src={user.avatar && user.avatar.startsWith('http') ? user.avatar : 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="User_Profile"
                            onError={(e) => {
                                e.currentTarget.src = 'https://api.dicebear.com/7.x/initials/svg?seed=Err&backgroundColor=ef4444';
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white truncate">{user.id}. &nbsp; {user.name}</h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>

                    <div className="relative inline-block">
                        <div className="hidden md:flex items-center gap-3">
                            <span className="px-3 py-1.5 text-xs font-bold uppercase bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">
                                {user.role}
                            </span>

                            <button onClick={() => openEditModal(user)} className="flex items-center justify-center w-10 h-10 text-xl text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-all duration-200 hover:scale-110">
                                <iconify-icon icon="jam:write"></iconify-icon>
                            </button>

                            <button onClick={(e) => deleteUser(e, user.id)} className="flex items-center justify-center w-10 h-10 text-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 hover:scale-110">
                                <iconify-icon icon="material-symbols:delete"></iconify-icon>
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setShowMenu(showMenu === user.id ? null : user.id)} className="flex items-center justify-center w-10 h-10 text-2xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                                <iconify-icon icon="mage:dots"></iconify-icon>
                            </button>

                            {showMenu === user.id && (
                                <div className="absolute right-0 mt-2 z-50 w-40 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in duration-200">
                                    <div className="flex flex-col gap-1">
                                        <div className="px-3 py-2 text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 border-b border-gray-50 dark:border-gray-800 mb-1">
                                            {user.role}
                                        </div>
                                        <button onClick={() => openEditModal(user)} className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">
                                            <iconify-icon icon="jam:write"></iconify-icon> Edit
                                        </button>
                                        <button onClick={(e) => deleteUser(e, user.id)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                            <iconify-icon icon="material-symbols:delete"></iconify-icon> Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="">
                    <UpdateUser user={selectedUser} isOpen={isModalOpen} onClose={closeModal} loading={loading} />
                </div>
            </div>
        </>
    );
};

export default User;


/* 
<img className="w-14 h-14 rounded-full border-4 border-purple-200 dark:border-purple-900 shadow-lg object-cover"
    src={user.avatar && user.avatar.startsWith('http') ? user.avatar : 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} alt="User_Profile" referrerPolicy="no-referrer" crossOrigin="anonymous" 
    onError={(e) => {
        e.currentTarget.src = 'https://api.dicebear.com/7.x/initials/svg?seed=Err&backgroundColor=ef4444';
    }}
/>
 */