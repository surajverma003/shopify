import React, { useContext } from "react";
import myContext from "../context/myContext";
import { Icon } from "@iconify/react";
import NotLoggedIn from "./NotLoggedIn";

const Cart = () => {
    const context = useContext(myContext);
    const { loggedInUser, cart, loading, setLoading, removeToCart, clearCart, updateQuantity, notify } = context;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 500 ? 0 : 15.99;
    const total = subtotal + tax + shipping;

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            notify("Proceeding to checkout...", "success");
            setLoading(false);
        }, 1500);
    };

    if (!loggedInUser) {
        return <NotLoggedIn />
    }

    return (
        <>
            <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-16 px-2 sm:px-5">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-6">
                            <Icon icon="material-symbols:shopping-cart" class="text-white text-4xl"></Icon>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Shopping Cart</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {cart.length === 0 ? "Your cart is empty" : `You have ${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
                        </p>
                    </div>

                    {cart.length === 0 ? (
                        /* Empty Cart State */
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-12 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                    <Icon icon="material-symbols:shopping-cart-outline" class="text-gray-400 dark:text-gray-600 text-4xl"></Icon>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet. Start shopping to fill it up!</p>
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
                                            Add items to your cart to track price drops and get notified when they go on sale!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-2">
                            {/* Cart Items Section */}
                            <div className="lg:col-span-2 space-y-2">
                                {/* Clear Cart Button */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cart Items</h2>
                                    <button onClick={clearCart} className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold">
                                        <Icon icon="material-symbols:delete" class="text-xl"></Icon> Clear Cart
                                    </button>
                                </div>

                                {/* Cart Items List */}
                                {cart.map((item) => (
                                    <div key={item.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-2xl">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-full h-full hover:scale-105 object-cover transition-all" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                                                    {!item.inStock && (
                                                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold uppercase">Out of Stock</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item?.description?.split(" ").slice(0, 10).join(" ") + " ..."}</p>
                                                        </div>
                                                        <button onClick={() => removeToCart(item.id)} className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                                                            <Icon icon="material-symbols:close" class="text-2xl"></Icon>
                                                        </button>
                                                    </div>

                                                    {/* Stock Status */}
                                                    {!item.inStock && (
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Icon icon="material-symbols:error" class="text-red-500 text-xl"></Icon>
                                                            <span className="text-sm font-bold text-red-500">This item is currently out of stock</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Qty:</span>
                                                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
                                                                <Icon icon="material-symbols:remove" class="text-xl"></Icon>
                                                            </button>
                                                            <span className="w-12 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-colors" >
                                                                <Icon icon="material-symbols:add" class="text-xl"></Icon>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</div>
                                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary Section */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 px-6 py-4 sm:px-5 sm:py-5">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">Order Summary</h2>

                                        {/* Summary Items */}
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 dark:border-gray-800">
                                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                                <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 dark:border-gray-800">
                                                <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                                                <span className="font-bold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                                    {shipping === 0 && (
                                                        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">Free</span>
                                                    )}
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white">${shipping.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-xl font-bold text-gray-900 dark:text-white uppercase">Total</span>
                                                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Coupon Code */}
                                        <div className="mb-4">
                                            <label className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                                <Icon icon="material-symbols:confirmation-number" class="text-purple-600 dark:text-purple-400 text-xl"></Icon> Coupon Code
                                            </label>
                                            <div className="flex gap-2 flex-row w-full items-stretch">
                                                <input type="text" placeholder="Enter code" className="flex-1 w-full sm:w-fit px-4 py-3 bg-gray-50 dark:bg-gray-800 border sm:border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
                                                <button className="flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors uppercase text-sm shadow-sm">
                                                    <Icon icon="formkit:submit" className="text-base md:hidden" />
                                                    <span className="text-xs hidden md:block">Apply</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Checkout Button */}
                                        <button onClick={handleCheckout} disabled={loading || cart.some(item => !item.inStock)} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" >
                                            {loading ?
                                                (<><Icon icon="svg-spinners:bars-rotate-fade" class="text-xl"></Icon> Processing...</>) :
                                                (<><Icon icon="material-symbols:lock" class="text-lg"></Icon> Proceed to Checkout</>)
                                            }
                                        </button>

                                        {/* Free Shipping Banner */}
                                        {subtotal < 500 && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                                                <div className="flex items-start gap-3">
                                                    <Icon icon="material-symbols:local-shipping" className="text-purple-600 dark:text-purple-400 text-2xl flex-shrink-0"></Icon>
                                                    <div>
                                                        <p className="text-sm lg:text-[10px] xl:text-sm font-bold text-gray-900 dark:text-white mb-2.5">Add ${(500 - subtotal).toFixed(2)} more for FREE shipping!</p>
                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(subtotal / 500) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Security Badges */}
                                    <div className="mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 p-4 lg:p-6">
                                        <div className="flex items-center justify-around text-center gap-4">
                                            <div>
                                                <Icon icon="material-symbols:lock" class="mx-auto text-green-500 text-3xl mb-2"></Icon>
                                                <p className="text-[11px] lg:text-xs font-bold text-gray-600 dark:text-gray-400">Secure Payment</p>
                                            </div>
                                            <div>
                                                <Icon icon="material-symbols:verified-user" class="mx-auto text-blue-500 text-3xl mb-2"></Icon>
                                                <p className="text-[11px] lg:text-xs font-bold text-gray-600 dark:text-gray-400">Buyer Protection</p>
                                            </div>
                                            <div>
                                                <Icon icon="material-symbols:local-shipping" class="mx-auto text-purple-500 text-3xl mb-2"></Icon>
                                                <p className="text-[11px] lg:text-xs font-bold text-gray-600 dark:text-gray-400">Fast Delivery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;
