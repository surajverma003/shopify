import { Icon } from '@iconify/react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const uploadedImageUrls = await Promise.all(
                images.map(async (img) => {
                    if (typeof img === 'string' && img.startsWith('http')) return img;
                    const formData = new FormData();
                    formData.append("file", img.file || img);

                    const uploadRes = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    return uploadData.location;
                })
            );

            const ADD_PRODUCT_MUTATION = `
            mutation {
              addProduct(
                data: {
                  title: "${product.title}",
                  price: ${Number(product.price)},
                  description: "${product.description}",
                  categoryId: ${Number(product.category)},
                  images: ${JSON.stringify(uploadedImageUrls)}
                }
              ) {
                id
                title
              }
            }
        `;

            const response = await fetch('https://api.escuelajs.co/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: ADD_PRODUCT_MUTATION }),
            });

            const result = await response.json();

            if (result.errors) {
                notify(result.errors[0].message, "error");
            } else {
                notify("Chocolate Added Successfully!", "success");
                setProduct({});
                setImages([]);
            }

        } catch (error) {
            console.error("Upload failed:", error);
            notify("Image upload failed!", "error");
        }
    };

    const onchange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const notify = (message, type = "default") => {
        toast(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            type: type,
        });
    };

    // Handle file selection
    const handleFiles = (files) => {
        const newImages = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file),
            size: (file.size / 1024).toFixed(2) + ' KB'
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    // Drag & Drop handlers
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('auth-token'))) { }
        else {
            navigate('/login');
        }
    }, [navigate]);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.preview) URL.revokeObjectURL(img.preview);
            });
        }; // eslint-disable-next-line
    }, []);

    return (
        <>
            <section className="bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 poppins min-h-screen">
                <div className="py-4 pt-12 lg:py-20 px-4 mx-auto max-w-screen-md">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white text-4xl mb-6 shadow-lg">
                            <Icon icon="mdi:package-variant-add"></Icon>
                        </div>
                        <h2 className="mb-4 text-4xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white uppercase">
                            Add Product
                        </h2>
                        <p className="mb-8 font-light text-gray-600 dark:text-gray-400 sm:text-xl leading-relaxed">
                            Could you please provide more details about the product and the information you want to include in the product details.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={addProduct} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800">

                        <div>
                            <label htmlFor="title" className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                                <Icon icon="mdi:package-variant" className="text-lg text-purple-600 dark:text-purple-400"></Icon> Product Name
                            </label>
                            <input type="text" id="title" name='title' className="block p-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter product name" onChange={onchange} required />
                        </div>

                        <div>
                            <label htmlFor="price" className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                                <Icon icon="mdi:currency-usd" className="text-lg text-purple-600 dark:text-purple-400"></Icon> Price
                            </label>
                            <input type="number" id="price" name='price' className="block p-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter product price (1-10000)" required onChange={onchange} />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-400 flex items-center gap-2">
                                <Icon icon="mdi:text-box" className="text-lg text-purple-600 dark:text-purple-400"></Icon> Description
                            </label>
                            <textarea id="description" name='description' rows="6" className="block p-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter product description" required onChange={onchange} ></textarea>
                        </div>

                        <div>
                            <label htmlFor="category" className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                                <Icon icon="mdi:shape" className="text-lg text-purple-600 dark:text-purple-400"></Icon> Category ID
                            </label>
                            <select type="number" id="category" name='category' className="block p-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" min={1} max={100} placeholder="" required onChange={onchange}>
                                <option value="1">None</option>
                                <option value="1">Clothes</option>
                                <option value="2">Electronics</option>
                                <option value="3">Furniture</option>
                                <option value="4">Shoes</option>
                                <option value="5">Miscellaneous</option>
                            </select>
                        </div>

                        {/* Enhanced Image Upload Section */}
                        <div>
                            <label className="mb-3 text-sm font-bold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                                <Icon icon="mdi:image-multiple" className="text-lg text-purple-600 dark:text-purple-400"></Icon> Upload Product Images
                            </label>

                            {/* Drag & Drop Zone */}
                            <div onClick={openFileDialog} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-[1.02]' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'}`}>
                                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileInput} className="hidden" />

                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-purple-500 text-white scale-110' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' }`}>
                                        <Icon icon="mdi:cloud-upload" className="text-3xl"></Icon>
                                    </div>

                                    <div>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{isDragging ? 'Drop images here' : 'Drag & drop images here'}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">or <span className="text-purple-600 dark:text-purple-400 font-medium hover:underline">browse files</span></p>
                                    </div>

                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Supports: JPG, PNG, GIF, WEBP • No limit on images</p>
                                </div>
                            </div>

                            {/* Uploaded Images List */}
                            {images.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Icon icon="mdi:check-circle" className="text-green-500"></Icon> {images.length} image{images.length > 1 ? 's' : ''} selected
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                                        {images.map((img) => (
                                            <div key={img.id} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 group hover:border-purple-400 transition-all" >
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                                                    <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{img.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{img.size}</p>
                                                </div>
                                                <button type="button" onClick={() => removeImage(img.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100" >
                                                    <Icon icon="mdi:close" className="text-lg"></Icon>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button type="submit" className="w-full py-4 px-6 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/30 hover:scale-[1.01] duration-300 uppercase tracking-wide flex items-center justify-center gap-2">
                                <Icon icon="mdi:plus-circle" className="text-2xl"></Icon> Create Product
                            </button>
                            <button type="button" onClick={() => { setProduct({}); setImages([]); }} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm sm:text-base uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700" >
                                <Icon icon="material-symbols:refresh" className="text-lg sm:text-2xl"></Icon> Clear
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Admin;
