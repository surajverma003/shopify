import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Temp = () => {
    const [images, setImages] = useState();

    // Delete All Users
    const deleteAllUsers = async () => {
        try {
            const res = await axios.get('https://api.escuelajs.co/api/v1/users');
            const users = res.data;

            const deletePromises = users.map(user => axios.delete(`https://api.escuelajs.co/api/v1/users/${user.id}`)
                .then(() => console.log(`User ${user.id} deleted`))
                .catch(err => console.error(`Failed to delete user ${user.id}`, err))
            );

            const promise = await Promise.all(deletePromises);
            console.log(promise);
        } catch (error) {
            console.error("Error deleting users:", error);
        }
    };

    // get images
    const getImages = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getImages();
    }, [])


    return (
        <>
            <div className="bg-gray-50 dark:bg-slate-900 text-white dark:text-white">
                <div className="max-w-screen-xl mx-auto px-10 py-20">
                    <h1 className="text-4xl text-center mb-20 bg-red-800 py-10 underline font-extrabold">Testing Component</h1>

                    <button type="button" onClick={deleteAllUsers} className="bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 active:bg-red-800 transition-all mb-10 px-5 py-3">
                        <iconify-icon icon="material-symbols:delete" class="text-xl"></iconify-icon>
                        <span className="ms-4">Delete All Users</span>
                    </button>

                    {/* All images */}
                    <div className="flex gap-4 flex-wrap">
                        {
                            images?.map((image, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-1">
                                        <img
                                            className="w-12 h-12 mx-auto rounded-full border-4 border-purple-200 dark:border-purple-900 shadow-lg object-cover"
                                            src={image?.avatar ? image.avatar.replace(/[[]"]/g, "") : "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                                            referrerPolicy="no-referrer"
                                            crossOrigin="anonymous"
                                            alt="User_Profile"
                                        />

                                        <span className="text-black text-center text-xs">{image.id}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Temp
