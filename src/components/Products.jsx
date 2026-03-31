import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import myContext from '../context/myContext';
import Loader from '../reuse/Loader';
import Card from '../reuse/Card';

const Products = () => {
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

    const context = useContext(myContext);
    const { fetchData, getCategories, priceFilter, searchProducts, fetchCategoryProducts, products, lowRange, highRange, totalProducts, loading } = context;

    useEffect(() => {
        fetchData();
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // FETCH DATA : By clicking on change category
    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            fetchData();
            setIsProductMenuOpen(false);
            window.document.body.style.overflow = 'auto';
        } else {
            fetchCategoryProducts(categoryId);
            setIsProductMenuOpen(false);
            window.document.body.style.overflow = 'auto';
        }
    };

    // TOGGLE : Product Menu (hide/show)
    const toggleProductMenu = () => {
        if (!isProductMenuOpen) {
            window.document.body.style.overflow = 'hidden';
            setIsProductMenuOpen(true);
        } else {
            window.document.body.style.overflow = 'auto';
            setIsProductMenuOpen(false);
        }
    };

    // CLOSE : Product Menu
    const closeProductMenu = () => {
        window.document.body.style.overflow = 'auto';
        setIsProductMenuOpen(false);
    };

    // UPDATE : Category style
    const updateCategoryStyle = (e) => {
        document.querySelectorAll('#Categories li').forEach(li => {
            li.classList.remove('text-white', 'dark:text-white', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'dark:from-purple-500', 'dark:to-pink-500', 'px-4', 'py-2.5', 'rounded-xl', 'shadow-lg', 'font-bold');
            li.classList.add('text-gray-700', 'dark:text-gray-300');
        });
        e.target.classList.remove('text-gray-700', 'dark:text-gray-300');
        e.target.classList.add('text-white', 'dark:text-white', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'dark:from-purple-500', 'dark:to-pink-500', 'px-4', 'py-2.5', 'rounded-xl', 'shadow-lg', 'font-bold');
    };

    return (
        <>
            <div className="poppins py-5 lg:py-10 px-5 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 min-h-screen">
                <div className="flex justify-between items-end md:items-center gap-3 max-w-screen-xl mx-auto text-gray-900 dark:text-white flex-col-reverse md:flex-row mb-5">

                    {/* Search Input */}
                    <div className="px-1 w-full relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                            <Icon icon="material-symbols:search" className="text-gray-400 dark:text-gray-500 text-2xl"></Icon>
                        </div>
                        <input type="search" id="title" name="title" className="block pl-14 pr-4 py-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 dark:text-white shadow-lg hover:shadow-xl" placeholder="Search product by name..." onChange={searchProducts} required />
                    </div>

                    {/* Products Count Badge */}
                    <div className="flex w-full md:justify-center md:w-fit gap-3">
                        <div className="flex flex-1 justify-center items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
                            <Icon icon="mdi:package-variant-closed" className="text-2xl"></Icon>
                            <span className="font-bold text-xl">{totalProducts}</span>
                            <span className="text-sm uppercase tracking-wide">Products</span>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button onClick={toggleProductMenu} className="lg:hidden h-full px-6 py-5 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                            <Icon icon="rivet-icons:filter"></Icon>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-gray-900 dark:text-white max-w-screen-xl  mx-auto flex gap-5 mt-5">

                    {/* Sidebar Filters */}
                    <div className={`absolute top-16 left-0 z-50 w-full h-[calc(100vh-75px)] lg:h-fit overflow-y-scroll  lg:overflow-visible font-bold transition-all duration-300 ease-in-out lg:sticky lg:top-4 lg:w-1/2 lg:block lg:translate-x-0 lg:left-0 lg:border-none lg:bg-white dark:lg:bg-gray-900 lg:rounded-3xl lg:p-6 lg:shadow-xl backdrop-blur-2xl bg-white/95 dark:bg-gray-900/95 border-2 border-gray-200 dark:border-gray-800 rounded-e-3xl p-8 shadow-2xl ${isProductMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                        {/* Categories Header */}
                        <div className="flex justify-between items-center gap-3 text-lg mb-4">
                            <div className="flex justify-start items-center gap-3">
                                <span className="text-4xl text-purple-600 dark:text-purple-400">
                                    <Icon icon="material-symbols:category"></Icon>
                                </span>
                                <span className="text-gray-900 dark:text-white font-bold text-xl">Categories</span>

                            </div>
                            <button onClick={closeProductMenu} className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                                <Icon icon="basil:cross-outline" class="text-3xl"></Icon>
                            </button>
                        </div>
                        <hr className="border-2 border-gray-200 dark:border-gray-700 my-5 rounded-full" />

                        {/* Categories List */}
                        <ul id="Categories" className="mb-5 uppercase cursor-pointer space-y-2" onClick={updateCategoryStyle}>
                            <li id="all" className="text-white dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-4 py-2.5 rounded-xl shadow-lg font-bold hover:shadow-xl transition-all duration-200" onClick={() => handleCategoryClick('all')} > All </li>
                            <li id="clothes" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer py-2 px-2" onClick={() => handleCategoryClick(1)} > Clothes </li>
                            <li id="electronics" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer py-2 px-2" onClick={() => handleCategoryClick(2)} > Electronics </li>
                            <li id="furniture" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer py-2 px-2" onClick={() => handleCategoryClick(3)} > Furniture </li>
                            <li id="shoes" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer py-2 px-2" onClick={() => handleCategoryClick(4)} > Shoes </li>
                            <li id="miscellaneous" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer py-2 px-2" onClick={() => handleCategoryClick(5)} > Miscellaneous </li>
                        </ul>

                        {/* Price Filter */}
                        <div className="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Icon icon="mdi:currency-usd" className="text-3xl text-purple-600 dark:text-purple-400"></Icon>
                                <h3 className="text-gray-900 dark:text-white font-bold text-lg">Price Range</h3>
                            </div>
                            <div className="text-base font-bold text-white dark:text-white mb-5 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 py-3 rounded-xl shadow-md">
                                ${lowRange} - ${highRange}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold block mb-2">Min: ${lowRange}</label>
                                    <input onChange={priceFilter} id="lowRange" type="range" min={0} max={5000} step={100} defaultValue={0} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold block mb-2">Max: ${highRange}</label>
                                    <input onChange={priceFilter} id="highRange" type="range" min={0} max={5000} step={100} defaultValue={5000} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="w-full">
                        <div className={`poppins ${products.length > 0 ? '' : 'min-h-[500px]'}`}>
                            <div className="h-full">
                                {/* Loading Spinner */}
                                {loading && (
                                    <><Loader size="50px" message="products" /></>
                                )}

                                {/* Products Display */}
                                {!loading && products.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                                        {products.map((product) => (
                                            <Card key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}

                                {/* No Products Found */}
                                {!loading && products.length === 0 && (
                                    <div className="flex flex-col justify-center items-center min-h-[500px] gap-5 bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-10">
                                        <span className="text-8xl text-gray-300 dark:text-gray-700">
                                            <Icon icon="mdi:package-variant-closed-remove"></Icon>
                                        </span>
                                        <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">No products found</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your filters or search</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
