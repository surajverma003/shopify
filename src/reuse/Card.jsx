import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';

const Card = ({ product }) => {
    const context = useContext(myContext);
    const { loggedInUser, cart, wishlist, deleteProduct, addToCart, removeToCart, addToWishlist, removeFromWishlist } = context;

    const isAddedToWishlist = wishlist.some(item => item.id === product.id);
    const isAddedToCart = cart.some(item => item.id === product.id);

    const cardDetails = {
        id: product.id,
        product: "Desktop",
        image1: product.images[0],
        image2: product.images[1],
        image3: product.images[2],
        category: product.category?.name || "Product",
        name: product.title,
        description: product.description,
        price: product.price,
        dispcount: "500$",
        ratings: "4.5",
        aboutUrl: "https://www.apple.com/in/shop/buy-mac/macbook-pro/16-inch-space-black-apple-m3-max-with-16-core-cpu-and-40-core-gpu-48gb-memory-1tb"
    };

    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return 'https://via.placeholder.com/400x400?text=No+Image';
        return imageUrl.replace(/[{"[\]]/g, '').trim();
    };

    return (
        <>
            <section className="">
                <div className="group relative flex w-full flex-col overflow-hidden rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-2xl dark:hover:shadow-purple-500/20 hover:-translate-y-0.5">

                    {
                        loggedInUser && (
                            <div className="absolute top-4 right-4 z-20 flex justify-center items-center gap-2">

                                {/* Wishlist Button (Heart Fill/Line) */}
                                <button onClick={(e) => { e.stopPropagation(); isAddedToWishlist ? removeFromWishlist(product.id) : addToWishlist(product); }} className={`flex justify-center items-center h-9 w-9 text-xl rounded-full transition-all cursor-pointer hover:rotate-12 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 ${isAddedToWishlist ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 backdrop-blur-sm'}`} aria-label="Wishlist">
                                    <iconify-icon class="text-lg" icon={isAddedToWishlist ? "ph:heart-fill" : "ph:heart-bold"}></iconify-icon>
                                </button>

                                {/* Add/Remove to Cart Button (Plus/Minus) */}
                                <button onClick={(e) => { e.stopPropagation(); isAddedToCart ? removeToCart(product.id) : addToCart(product); }} className={`flex justify-center items-center h-9 w-9 text-xl text-white rounded-full transition-all cursor-pointer hover:rotate-12 shadow-lg hover:shadow-xl hover:scale-110 ${isAddedToCart ? 'bg-gradient-to-r from-orange-500 to-amber-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`} aria-label="Cart Action">
                                    <iconify-icon class="text-lg" icon={isAddedToCart ? "ic:round-minus" : "ic:round-plus"}></iconify-icon>
                                </button>

                                {/* Delete Button (Only for Admin/Owner) */}
                                <button onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }} className="flex justify-center items-center h-9 w-9 text-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full transition-all cursor-pointer hover:rotate-12 shadow-lg hover:shadow-xl hover:scale-110" aria-label="Delete product" >
                                    <iconify-icon class="text-lg" icon="ic:round-delete"></iconify-icon>
                                </button>
                            </div>
                        )
                    }
                    {/* Product Image */}
                    <Link to={`/product/${cardDetails.id}`} className="relative flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 h-80">
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                            {cardDetails.category}
                        </div>

                        <img className="object-cover w-full h-full" src={getCleanImageUrl(cardDetails.image1)} alt={cardDetails.name || "product"} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }} referrerPolicy="no-referrer" crossOrigin="anonymous" />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-col p-6 space-y-4 bg-white dark:bg-gray-900">
                        {/* Product Name */}
                        <div className="">
                            <Link to={`/${cardDetails.id}`}>
                                <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2 min-h-[48px]">
                                    {cardDetails.name}
                                </h5>
                            </Link>
                            <p className="text-sm font-light tracking-tight text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2">
                                {cardDetails.description}
                            </p>
                        </div>

                        {/* Price and Rating */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex flex-col">
                                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                                    ${cardDetails.price}
                                </span>
                                <span className="text-xs text-red-500 dark:text-red-400 line-through font-semibold mt-1">
                                    ${(cardDetails.price * 1.25).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 text-gray-900 dark:text-gray-900 px-4 py-2 rounded-full shadow-md">
                                <iconify-icon icon="material-symbols:star" class="text-xl"></iconify-icon>
                                <span className="text-sm font-extrabold">{cardDetails.ratings}</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* Buy Now Button */}
                        <Link className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 rounded-xl transition-all px-6 py-3.5 text-white font-bold shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/30 hover:scale-[1.01] duration-300" to={`/product/${cardDetails.id}`} >
                            <iconify-icon icon="material-symbols:shopping-cart" class="text-xl"></iconify-icon>
                            <span className="text-sm uppercase tracking-wide">Buy Now</span>
                        </Link>

                        {/* Quick View Link */}
                        <Link to={`/${cardDetails.id}`} className="flex justify-center items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm transition-colors group/link" >
                            <iconify-icon icon="material-symbols:visibility" class="text-lg group-hover/link:scale-110 transition-transform duration-300"></iconify-icon>
                            <span>View Details</span>
                        </Link>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Card;