import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import myContext from '../context/myContext';
import { Icon } from '@iconify/react';
import Loader from './Loader';

const ProductDetail = () => {
    const context = useContext(myContext);
    const { cart, wishlist, loading, setLoading, addToCart, removeToCart, addToWishlist, removeFromWishlist, notify } = context;

    const param = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    const isAdded = product ? cart.some(item => item.id === product.id) : false;
    const isWishlisted = product ? wishlist?.some(item => item.id === product.id) : false;

    // GET Single Product Detail
    const getSingleProductDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.escuelajs.co/api/v1/products/' + param.id);
            if (!response.ok) { throw new Error("Product not found"); }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        return imageUrl.replace(/[{"[\]]/g, '').trim();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: product?.title, text: product?.description, url: window.location.href, });
            } catch (err) {
                console.log('Share failed');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            notify("🔗 Link copied to clipboard!", "success");
        }
    };

    useEffect(() => {
        getSingleProductDetail();
        setSelectedImage(0);
        // eslint-disable-next-line
    }, [param.id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
                <div className="w-full text-center text-purple-600 dark:text-purple-400">
                    <Loader size="50px" message="product details" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
                <div className="text-center">
                    <Icon icon="material-symbols:error" className="text-6xl text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
                    <Link to="/shop" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const images = product?.images?.map(img => getCleanImageUrl(img)).filter(Boolean) || [];

    return (
        <div className="poppins bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 min-h-screen">

            {/* Breadcrumb */}
            <div className="max-w-screen-xl mx-auto px-3 sm:px-5 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
                    <Icon icon="material-symbols:chevron-right" className="text-lg" />
                    <Link to="/shop" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Shop</Link>
                    <Icon icon="material-symbols:chevron-right" className="text-lg" />
                    <span className="text-purple-600 dark:text-purple-400 font-semibold truncate max-w-[200px]">{product?.title}</span>
                </nav>
            </div>

            <div className="px-3 sm:px-5 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-screen-xl mx-auto bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800">

                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in">
                            <img className={`w-full h-full object-cover transition-transform duration-300`} src={images[selectedImage]} alt={product?.title} referrerPolicy="no-referrer" crossOrigin="anonymous" />

                            {/* Discount Badge */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">-20% OFF</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button onClick={() => isWishlisted ? removeFromWishlist(product?.id) : addToWishlist(product)} className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-pink-500 hover:text-white' }`}>
                                    <Icon icon={isWishlisted ? "material-symbols:favorite" : "material-symbols:favorite-outline"} className="text-xl" />
                                </button>
                                <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:bg-purple-500 hover:text-white transition-all" >
                                    <Icon icon="material-symbols:share" className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-purple-500 ring-2 ring-purple-500/30 scale-105' : 'border-gray-200 dark:border-gray-700 hover:border-purple-400' }`}>
                                        <img className="w-full h-full object-cover" src={img} alt={`Product ${index + 1}`} referrerPolicy="no-referrer" crossOrigin="anonymous" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="text-gray-900 dark:text-white space-y-5">

                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wide">
                                {product?.category?.name || 'Category'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {product?.title}
                        </h1>

                        {/* Rating & Reviews */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1 text-yellow-500 text-xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Icon key={star} icon="material-symbols:star" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">5.0</span>
                            <span className="text-sm text-gray-400">|</span>
                            <button onClick={() => setActiveTab('reviews')} className="text-sm text-purple-600 dark:text-purple-400 font-semibold hover:underline">58 Reviews</button>
                            <span className="text-sm text-gray-400">|</span>
                            <span className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                <Icon icon="material-symbols:check-circle" className="text-lg" /> 150+ Sold
                            </span>
                        </div>

                        {/* Price Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 sm:p-5 border-2 border-purple-100 dark:border-purple-800/50">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">${product?.price}</span>
                                <span className="text-lg text-gray-400 line-through">${(product?.price * 1.2).toFixed(2)}</span>
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg">Save 20%</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <Icon icon="material-symbols:local-offer" className="text-purple-500" /> Deal of the Day - Limited Time Offer!
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button onClick={() => isAdded ? removeToCart(product?.id) : addToCart(product)} className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-bold uppercase rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] text-base ${isAdded ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 text-white' }`}>
                                <Icon icon={isAdded ? "material-symbols:remove-shopping-cart" : "material-symbols:add-shopping-cart"} className="text-2xl" /> {isAdded ? 'Remove from Cart' : 'Add to Cart'}
                            </button>
                            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold uppercase rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                                <Icon icon="material-symbols:bolt" className="text-2xl" /> Buy Now
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                            {[
                                { icon: "tdesign:secured", label: "2 Year Warranty" },
                                { icon: "material-symbols:local-shipping", label: "Free Delivery" },
                                { icon: "material-symbols:assignment-return", label: "Easy Returns" },
                                { icon: "material-symbols:verified", label: "100% Authentic" },
                            ].map((feature, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all group">
                                    <Icon icon={feature.icon} className="text-2xl sm:text-3xl text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs text-center font-semibold text-gray-700 dark:text-gray-300">{feature.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <Icon icon="material-symbols:local-shipping" className="text-3xl text-green-600 dark:text-green-400" />
                            <div>
                                <p className="font-bold text-green-700 dark:text-green-400">Free Delivery</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated delivery: <span className="font-semibold">Jan 15 - Jan 18</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="max-w-screen-xl mx-auto mt-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden">

                    {/* Tab Headers */}
                    <div className="flex border-b-2 border-gray-200 dark:border-gray-800 overflow-x-auto">
                        {[
                            { id: 'description', label: 'Description', icon: 'material-symbols:description' },
                            { id: 'reviews', label: 'Reviews (58)', icon: 'material-symbols:rate-review' },
                            /* { id: 'shipping', label: 'Shipping', icon: 'material-symbols:local-shipping' } */
                        ].map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 sm:px-8 py-4 font-bold text-sm sm:text-base transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                <Icon icon={tab.icon} className="text-xl" /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-5 sm:p-8">
                        {activeTab === 'description' && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Description</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product?.description}</p>
                                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Highlights</h4>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-center gap-2"><Icon icon="material-symbols:check-circle" className="text-green-500" /> Premium Quality Materials</li>
                                            <li className="flex items-center gap-2"><Icon icon="material-symbols:check-circle" className="text-green-500" /> Durable & Long-lasting</li>
                                            <li className="flex items-center gap-2"><Icon icon="material-symbols:check-circle" className="text-green-500" /> Eco-friendly Production</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Specifications</h4>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <li><span className="font-semibold">Brand:</span> {product?.category?.name}</li>
                                            <li><span className="font-semibold">SKU:</span> PRD-{product?.id}</li>
                                            <li><span className="font-semibold">Weight:</span> 0.5 kg</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex text-yellow-500 text-xl">
                                                {[1, 2, 3, 4, 5].map(s => <Icon key={s} icon="material-symbols:star" />)}
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white">5.0</span>
                                            <span className="text-gray-500 dark:text-gray-400">based on 58 reviews</span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">Write a Review</button>
                                </div>

                                {/* Sample Reviews */}
                                {[
                                    { name: "John D.", rating: 5, date: "Jan 5, 2026", comment: "Absolutely love this product! Quality exceeded my expectations. Fast shipping too!" },
                                    { name: "Sarah M.", rating: 5, date: "Jan 3, 2026", comment: "Great value for money. Would definitely recommend to others." },
                                    { name: "Mike R.", rating: 4, date: "Dec 28, 2025", comment: "Good product overall. Delivery was quick and packaging was secure." },
                                ].map((review, index) => (
                                    <div key={index} className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                                                    <div className="flex text-yellow-500 text-sm">
                                                        {[...Array(review.rating)].map((_, i) => <Icon key={i} icon="material-symbols:star" />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* {activeTab === 'shipping' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Information</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: "material-symbols:local-shipping", title: "Standard Shipping", desc: "5-7 business days", price: "FREE on orders $500+" },
                                        { icon: "material-symbols:bolt", title: "Express Shipping", desc: "2-3 business days", price: "$9.99" },
                                        { icon: "material-symbols:rocket-launch", title: "Next Day Delivery", desc: "Order before 2 PM", price: "$19.99" },
                                        { icon: "material-symbols:public", title: "International", desc: "10-15 business days", price: "From $24.99" },
                                    ].map((option, index) => (
                                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                                            <Icon icon={option.icon} className="text-3xl text-purple-600 dark:text-purple-400" />
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{option.title}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-1">{option.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
