import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import myContext from '../context/myContext';
import NotLoggedIn from '../reuse/NotLoggedIn';

const Profile = () => {
    const context = useContext(myContext);
    const { loggedInUser, wishlist, updateUser, logout, loading } = context;
    console.log(loggedInUser);

    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState({
        id: loggedInUser?.id,
        avatar: loggedInUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
        name: loggedInUser?.name || '',
        email: loggedInUser?.email || '',
        password: loggedInUser?.password || '',
        role: loggedInUser?.role || '',
        phone: loggedInUser?.phone || '',
        address: loggedInUser?.address || ''
    });

    const onchange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle Avatar Image Upload
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // Upload to API
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.location) {
                setProfile({ ...profile, avatar: data.location });
            }
        } catch (error) {
            console.error('Upload failed:', error);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => { }, [profile]);

    if (!loggedInUser) {
        return <NotLoggedIn />
    }

    return (
        <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-2 sm:mb-6">
                        <Icon icon="material-symbols:person" className="text-white text-4xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">My Profile</h1>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 w-full sm:max-w-xl mx-auto">Manage your account settings and personal information.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); updateUser(profile.id, profile); }}
                    className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden">

                    <div className="relative">
                        <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 border-b border-slate-200 dark:border-slate-700">
                            {!isEditing && (
                                <button type="button" onClick={() => setIsEditing(true)} className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 group" >
                                    <Icon icon="material-symbols:edit" className="text-lg group-hover:rotate-12 transition-transform" />
                                    <span className="hidden sm:inline">Edit Profile</span>
                                </button>
                            )}
                        </div>

                        {/* Avatar Section */}
                        <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2">
                            <div className="relative group">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    {uploading ?
                                        (<div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                            <Icon icon="svg-spinners:bars-rotate-fade" className="text-purple-600 text-3xl" />
                                        </div>) :
                                        (<img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />)
                                    }
                                </div>

                                {isEditing && (
                                    <div className="absolute bottom-1 right-1">
                                        <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        <label htmlFor="avatar" className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer z-20" >
                                            <Icon icon="solar:camera-broken" className="text-lg" />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 sm:pt-20 px-5 sm:px-8 pb-8">
                        {/* Name & Role */}
                        <div className="text-center mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{profile.name || 'User Name'}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                                <Icon icon="material-symbols:verified" className="text-purple-500 text-lg" /> Verified Member
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 sm:p-4 text-center border border-gray-200 dark:border-gray-700">
                                <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Orders</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 sm:p-4 text-center border border-gray-200 dark:border-gray-700">
                                <div className="text-xl sm:text-2xl font-bold text-pink-600 dark:text-pink-400">{wishlist?.length || "0"}</div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Wishlist</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 sm:p-4 text-center border border-gray-200 dark:border-gray-700">
                                <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-gray-900 px-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {isEditing ? 'Edit Details' : 'Account Details'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-7">
                            {/* Name */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:badge" className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" /> Full Name
                                </label>
                                <div className="relative">
                                    <input type="text" name="name" value={profile.name} onChange={onchange} disabled={!isEditing} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg ${!isEditing && 'cursor-not-allowed opacity-70'}`} placeholder="Enter your name" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:person" className="text-lg sm:text-2xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:mail" className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" /> Email Address
                                </label>
                                <div className="relative">
                                    <input type="email" name="email" value={profile.email} onChange={onchange} disabled={!isEditing} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg ${!isEditing && 'cursor-not-allowed opacity-70'}`} placeholder="Enter your email" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:alternate-email" className="text-lg sm:text-2xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                    <Icon icon="material-symbols:key" className="text-purple-600 dark:text-purple-400 text-lg" /> New Password
                                    <span className="text-xs font-normal text-gray-500">(leave blank to keep current)</span>
                                </label>
                                <div className="relative">
                                    <input name="password" disabled={!isEditing} onChange={onchange} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg ${!isEditing && 'cursor-not-allowed opacity-70'}`} placeholder="Enter new password" type={showPassword ? "text" : "password"} value={profile.password} />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Icon icon="material-symbols:password" className="text-xl" />
                                    </div>
                                    <button disabled={!isEditing} type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors disabled:hover:text-gray-400" >
                                        <Icon icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} className="text-xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Role Selector */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">
                                    <Icon icon="material-symbols:admin-panel-settings" className="text-purple-600 dark:text-purple-400 text-lg" /> Role
                                </label>
                                <div className="relative">
                                    <select name="role" disabled={!isEditing} onChange={onchange} value={profile.role} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg ${!isEditing && 'cursor-not-allowed opacity-70'} appearance-none`}>
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Icon icon="material-symbols:shield-person" className="text-xl" />
                                    </div>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <Icon icon="material-symbols:expand-more" className="text-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:call" className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" /> Phone Number
                                </label>
                                <div className="relative">
                                    <input type="tel" name="phone" value={profile.phone} onChange={onchange} disabled={!isEditing} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg ${!isEditing && 'cursor-not-allowed opacity-70'}`} placeholder="Enter your phone number" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:phone-android" className="text-lg sm:text-2xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:location-on" className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" /> Address
                                </label>
                                <div className="relative">
                                    <textarea name="address" rows="3" value={profile.address} onChange={onchange} disabled={!isEditing} className={`text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg resize-none ${!isEditing && 'cursor-not-allowed opacity-70'}`} placeholder="Enter your address" ></textarea>
                                    <div className="absolute left-5 top-4 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:home" className="text-lg sm:text-2xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button disabled={!isEditing || uploading} type="submit" className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 active:scale-95 disabled:active:scale-100 ${isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green-500/20' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-70'}`}>
                                    {loading ?
                                        (<><Icon icon="svg-spinners:bars-rotate-fade" className="text-xl sm:text-2xl" /> Updating...</>) :
                                        (<><Icon icon="material-symbols:save" className={`text-xl ${isEditing ? 'scale-110' : 'opacity-50'}`} /> Save Changes</>)
                                    }
                                </button>

                                <button type="button" onClick={isEditing ? () => setIsEditing(false) : logout} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95" >
                                    <Icon icon={isEditing ? "material-symbols:close" : "material-symbols:logout"} className={`text-lg sm:text-2xl ${!isEditing ? 'text-red-500' : ''}`} />
                                    <span>{isEditing ? "Cancel" : "Logout"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <Link to="/wishlist" className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl hover:border-pink-400 dark:hover:border-pink-600 transition-all group" >
                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-all">
                            <Icon icon="material-symbols:favorite" className="text-pink-600 dark:text-pink-400 text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Wishlist</h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Your saved items</p>
                        </div>
                        <Icon icon="material-symbols:chevron-right" className="text-gray-400 text-2xl ml-auto" />
                    </Link>

                    <Link to="/help" className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-600 transition-all group" >
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-all">
                            <Icon icon="material-symbols:help" className="text-teal-600 dark:text-teal-400 text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Help & Support</h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Get assistance</p>
                        </div>
                        <Icon icon="material-symbols:chevron-right" className="text-gray-400 text-2xl ml-auto" />
                    </Link>
                </div>

                {/* Info Banner */}
                <div className="mt-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-3 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <Icon icon="material-symbols:security" className="text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Account Security</h3>
                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Your account is protected. Enable two-factor authentication for extra security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;