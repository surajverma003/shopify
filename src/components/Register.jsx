import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import myContext from '../context/myContext';

const Register = () => {
    const context = useContext(myContext);
    const { loggedInUser, navigate, notify } = context;

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileMessage, setFileMessage] = useState('Drag and drop or click to upload');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Create a User
    const createUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                avatar = response.data.location;
            }

            const userInfo = { "name": e.target.name.value, "email": e.target.email.value, "password": e.target.password.value, "avatar": avatar, };
            const response = await axios.post('https://api.escuelajs.co/api/v1/users/', userInfo);

            if (response.status === 201) {
                notify("Account created successfully! Redirecting to login...", "success");
                e.target.reset();
                if (typeof removeFile === 'function') removeFile();
                setTimeout(() => { navigate('/login', { replace: true }); }, 3000);
            } else {
                notify("Failed to create account. Please try again.", "error");
            }

        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            notify("Failed to create account. Please try again.","error");
        } finally {
            setLoading(false);
        }
    };

    const onDragOver = (e) => { e.preventDefault(); };

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFileMessage(file.name);
            setPreviewUrl(URL.createObjectURL(file));
            notify('File uploaded successfully!', "success");
        } else {
            notify('Please upload a valid image file', "error");
        }
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFileMessage(file.name);
            setPreviewUrl(URL.createObjectURL(file));
            notify('File uploaded successfully!', "success");
        } else {
            notify('Please upload a valid image file', "error");
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileMessage('Drag and drop or click to upload');
        // document.getElementById('input-file').value = '';
    };

    return (
        !loggedInUser && <>
            <section className="poppins h-auto bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-2 sm:mb-6">
                            <Icon icon="material-symbols:person-add" class="text-white text-4xl"></Icon>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Create Account</h1>
                        <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 w-full sm:max-w-xl mx-auto">Join our community today and get access to amazing features and exclusive content.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 px-5 py-8 sm:p-8 md:p-12">
                        <form onSubmit={createUser} id="registerForm" className="space-y-6">
                            {/* Avatar Upload */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:image" class="text-purple-600 dark:text-purple-400 text-xl"></Icon> Profile Picture
                                </label>
                                <div onDrop={onDrop} onDragOver={onDragOver} className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 transition-all hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer group" >
                                    <input id="input-file" onChange={onFileChange} name="file" type="file" accept="image/*" className="hidden" />
                                    <label htmlFor="input-file" className="cursor-pointer">
                                        {previewUrl ? (
                                            <div className="relative">
                                                <img src={previewUrl} alt="Preview" className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg" />
                                                <button type="button" onClick={removeFile} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all" >
                                                    <Icon icon="material-symbols:close" class="text-xl"></Icon>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-20 h-20 mx-auto mb-4 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                    <Icon icon="material-symbols:cloud-upload" class="text-5xl text-purple-600 dark:text-purple-400"></Icon>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2 text-xs sm:text-base">Drag and drop your image here</p>
                                                <p className="text-xs sm:text-base text-gray-500 dark:text-gray-400 mb-1">or click to browse</p>
                                            </div>
                                        )}
                                        <p className="text-center text-xs sm:text-base font-semibold text-purple-600 dark:text-purple-400 mt-3">{fileMessage}</p>
                                    </label>
                                </div>
                            </div>

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:person" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></Icon> Full Name
                                </label>
                                <div className="relative">
                                    <input type="text" id="name" name="name" required className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="John Doe" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:badge" class="text-lg sm:text-2xl"></Icon>
                                    </div>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:mail" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></Icon> Email Address
                                </label>
                                <div className="relative">
                                    <input type="email" id="email" name="email" required className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="john@example.com" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:alternate-email" class="text-lg sm:text-2xl"></Icon>
                                    </div>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    <Icon icon="material-symbols:key" class="text-purple-600 dark:text-purple-400 text-lg sm:text-xl"></Icon> Password
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" required minLength="6" className="text-sm sm:text-base w-full px-5 py-3 sm:py-4 pl-14 pr-14 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl" placeholder="Create a strong password" />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                        <Icon icon="material-symbols:password" class="text-lg sm:text-2xl"></Icon>
                                    </div>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                        <Icon icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"} class="text-lg sm:text-xl"></Icon>
                                    </button>
                                </div>
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Password must be at least 6 characters long</p>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 border-2 border-purple-200 dark:border-purple-800">
                                <label className="flex items-center gap-3 flex-wrap cursor-pointer group">
                                    <input type="checkbox" required className="mt-1 w-5 h-5 rounded-lg border-2 border-purple-300 dark:border-purple-600 text-purple-600 focus:ring-2 focus:ring-purple-500" />
                                    <span className="relative top-0.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                        I agree to the <Link to="#" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">Terms of Service</Link> and <Link to="#" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" >
                                    {loading ?
                                        (<><Icon icon="svg-spinners:bars-rotate-fade" class="text-lg sm:text-2xl"></Icon>Creating Account...</>) :
                                        (<><Icon icon="material-symbols:person-add" class="text-lg sm:text-2xl"></Icon>Create Account</>)
                                    }
                                </button>
                                <button type="reset" onClick={removeFile} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700" >
                                    <Icon icon="material-symbols:refresh" class="text-lg sm:text-2xl"></Icon> Reset
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-gray-900 px-4 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Already Have an Account?</span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wide rounded-xl border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Icon icon="material-symbols:login" class="text-sm sm:text-lg"></Icon> Sign In Instead
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
