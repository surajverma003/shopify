import React, { useContext } from "react";
import myContext from "../context/myContext";
import { Icon } from "@iconify/react";
import NotLoggedIn from "../reuse/NotLoggedIn";

const Wishlist = () => {
    const context = useContext(myContext);
    const { loggedInUser, wishlist, loading, removeFromWishlist, clearWishlist, addToCart } = context;

    if (!loggedInUser) {
        return <NotLoggedIn />;
    }

    const addAllToCart = () => {
        if (wishlist.length > 0) {
            wishlist.forEach((product) => {
                addToCart(product);
            });
        }
    }

    return (
        <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-16 px-2 sm:px-5">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 dark:from-pink-400 dark:to-red-400 rounded-2xl shadow-xl mb-6">
                        <Icon icon="material-symbols:favorite" className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Saved Favorites</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {wishlist?.length === 0 ? "Your wishlist is empty" : `You have ${wishlist?.length} item${wishlist?.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>

                {wishlist?.length === 0 ? (
                    /* Empty Wishlist State */
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                <Icon icon="material-symbols:favorite-outline" className="text-gray-400 dark:text-gray-600 text-4xl" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Wishlist is Empty</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 mx-auto">
                                Save items you love by clicking the heart icon. They'll appear here so you can easily find and purchase them later!
                            </p>
                        </div>

                        {/* Tips Banner */}
                        <div className="mt-3 bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-2xl p-4 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Icon icon="material-symbols:lightbulb" className="text-pink-600 dark:text-pink-400 text-2xl sm:text-3xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Pro Tip</h3>
                                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                        Add items to your wishlist to track price drops and get notified when they go on sale!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Saved Items</h2>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={addAllToCart} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" >
                                    {
                                        loading ?
                                            (<Icon icon="svg-spinners:bars-rotate-fade" className="text-xl" />) :
                                            (<Icon icon="material-symbols:add-shopping-cart" className="text-xl" />)
                                    } Add All to Cart
                                </button>
                                <button onClick={clearWishlist} className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm border-2 border-red-200 dark:border-red-800">
                                    <Icon icon="material-symbols:delete" className="text-xl" /> Clear All
                                </button>
                            </div>
                        </div>

                        {/* Wishlist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {wishlist?.map((product) => {
                                return (
                                    <div key={product.id} className="group bg-white dark:bg-gray-900 rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-pink-300 dark:hover:border-pink-700">
                                        {/* Product Image */}
                                        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" crossOrigin="anonymous" />

                                            {/* Overlay Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                {product.discount && (
                                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                        -{product.discount}%
                                                    </span>
                                                )}
                                                {product.inStock === false && (
                                                    <span className="px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-full shadow-lg">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>

                                            {/* Remove Button */}
                                            <button onClick={() => removeFromWishlist(product.id)} className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 text-pink-500 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                <Icon icon="material-symbols:favorite" className="text-xl" />
                                            </button>

                                            {/* Quick Add Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                                <button onClick={() => addToCart(product)} disabled={product.inStock === false} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-sm rounded-xl hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" >
                                                    <Icon icon="material-symbols:add-shopping-cart" className="text-xl" />
                                                    {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4 sm:p-5">
                                            <div className="mb-3">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                    {product.description ? product.description.split(" ").slice(0, 8).join(" ") + "..." : "No description available"}
                                                </p>
                                            </div>

                                            {/* Rating */}
                                            {product.rating && (
                                                <div className="flex items-center gap-1 mb-3">
                                                    <Icon icon="material-symbols:star" className="text-yellow-500 text-lg" />
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews || 0})</span>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                                        ${product.price?.toFixed(2) || '0.00'}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ${product.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Mobile Add to Cart Button */}
                                            <button onClick={() => addToCart(product)} disabled={product.inStock === false} className="sm:hidden w-full flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed" >
                                                <Icon icon="material-symbols:add-shopping-cart" className="text-xl" />
                                                {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Bottom Info Banner */}
                        <div className="mt-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex-shrink-0">
                                        <Icon icon="material-symbols:notifications-active" className="text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Price Drop Alerts</h3>
                                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                            Get notified when items in your wishlist go on sale!
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-sm rounded-xl border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white hover:border-purple-600 transition-all shadow-lg">
                                    <Icon icon="material-symbols:mail" className="text-xl" /> Enable Alerts
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Wishlist;