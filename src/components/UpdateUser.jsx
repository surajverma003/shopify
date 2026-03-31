import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import myContext from '../context/myContext';

const UpdateUser = ({ user, isOpen, onClose, loading = false }) => {
    const context = useContext(myContext);
    const { updateUser, updateUserData, setUpdateUserData } = context;
    const [showPassword, setShowPassword] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (user) {
            setUpdateUserData({ name: user.name || '', email: user.email || '', password: '', role: user.role || 'customer', avatar: user.avatar || '' });
        } // eslint-disable-next-line
    }, [user]);

    const onchange = (e) => { setUpdateUserData({ ...updateUserData, [e.target.name]: e.target.value }); };
    if (!isOpen) return null;

    return (
        <div onClick={handleBackdropClick} className="scrollbar scroll-smooth fixed inset-0 z-[999] flex justify-center items-start sm:items-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg relative border-2 border-gray-200 dark:border-gray-800 my-2 sm:my-8 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg bg-white/20">
                            {updateUserData?.avatar ?
                                (<img src={updateUserData.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />) :
                                (<div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">{updateUserData.name?.charAt(0)?.toUpperCase() || 'U'}</div>)
                            }
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Update User</h2>
                            <p className="text-white/70 text-sm">ID: #{user?.id}</p>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all">
                    <Icon icon="material-symbols:close" className="text-xl" />
                </button>

                {/* Form */}
                <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
                    <form className="poppins space-y-4" onSubmit={(e) => { e.preventDefault(); updateUser(user.id, updateUserData); }}>

                        {/* Name Field */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                <Icon icon="material-symbols:badge" className="text-purple-600 dark:text-purple-400 text-lg" /> Full Name
                            </label>
                            <div className="relative">
                                <input name="name" onChange={onchange} className="block p-3.5 pl-11 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter full name" type="text" value={updateUserData.name} required />
                                <Icon icon="material-symbols:person" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                <Icon icon="material-symbols:mail" className="text-purple-600 dark:text-purple-400 text-lg" /> Email Address
                            </label>
                            <div className="relative">
                                <input name="email" onChange={onchange} className="block p-3.5 pl-11 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@example.com" type="email" value={updateUserData.email} required />
                                <Icon icon="material-symbols:alternate-email" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                <Icon icon="material-symbols:key" className="text-purple-600 dark:text-purple-400 text-lg" /> New Password
                                <span className="text-xs font-normal text-gray-400">(optional)</span>
                            </label>
                            <div className="relative">
                                <input name="password" onChange={onchange} className="block p-3.5 pl-11 pr-11 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter new password" type={showPassword ? "text" : "password"} value={updateUserData.password} />
                                <Icon icon="material-symbols:password" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                                    <Icon icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                <Icon icon="material-symbols:admin-panel-settings" className="text-purple-600 dark:text-purple-400 text-lg" /> Role
                            </label>
                            <div className="relative">
                                <select name="role" onChange={onchange} value={updateUserData.role} className="block p-3.5 pl-11 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all dark:text-white appearance-none cursor-pointer">
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <Icon icon="material-symbols:shield-person" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <Icon icon="material-symbols:expand-more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                            </div>
                        </div>

                        {/* Avatar URL Field */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                <Icon icon="material-symbols:image" className="text-purple-600 dark:text-purple-400 text-lg" /> Avatar URL
                            </label>
                            <div className="relative">
                                <input name="avatar" onChange={onchange} className="block p-3.5 pl-11 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com/avatar.jpg" type="url" value={updateUserData.avatar} />
                                <Icon icon="material-symbols:link" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4">
                            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                {loading ? <><Icon icon="svg-spinners:bars-rotate-fade" className="text-xl" /> Updating...</> : <><Icon icon="material-symbols:save" className="text-xl" /> Save</>}
                            </button>
                            <button type="button" onClick={onClose} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-gray-900 dark:text-white rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 uppercase tracking-wide disabled:opacity-50">
                                <Icon icon="material-symbols:close" className="text-xl" /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
