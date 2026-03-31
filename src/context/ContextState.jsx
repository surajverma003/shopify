import React, { useRef, useState } from 'react'
import myContext from './myContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContextState = (props) => {
    const contactForm = useRef();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({ email: "john@mail.com", password: "changeme" });
    const [users, setUsers] = useState([]);
    const [showMenu, setShowMenu] = useState(null);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    const [products, setProducts] = useState([]);
    const [lowRange, setLowRange] = useState(0);
    const [highRange, setHighRange] = useState(5000);
    const [, setCategoryData] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [updateUserData, setUpdateUserData] = useState({ name: '', email: '', password: '', role: 'customer', avatar: '' });
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user-detail')) || null;
        } catch (e) {
            return null;
        }
    });

    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('myCart')) || [];
        } catch (e) {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('myWishlist')) || [];
        } catch (e) {
            return [];
        }
    });

    const [theme, setTheme] = useState(() => {
        const mode = localStorage.getItem('theme');
        return mode !== 'light';
    });

    // THEME : Toggle dark/light mode
    const toggleTheme = () => {
        setTheme(prev => !prev);
    };

    // FETCH PRODUCTS : ALL Products
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=84`);
            // const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
            const data = await response.json();
            setProducts(data);
            setTotalProducts(data.length);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH PRODUCTS : By Categories
    const getCategories = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories`);
            const data = await response.json();
            setCategoryData(data);
        } catch (error) {
            console.error(error);
        }
    };

    // FETCH PRODUCTS : By Price Filter
    const priceFilter = async () => {
        const low = parseInt(document.getElementById('lowRange').value, 10);
        const high = parseInt(document.getElementById('highRange').value, 10);
        setLowRange(low);
        setHighRange(high);

        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?price_min=${low}&price_max=${high}`);
            const data = await response.json();
            setProducts(data);
            setTotalProducts(data.length);
        } catch (error) {
            console.error("Error filtering by price:", error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH PRODUCTS : By Search Prodct
    const searchProducts = async (e) => {
        e.preventDefault();
        if (!(e.target.value)) return;

        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?title=${e.target.value}`);
            const data = await response.json();
            console.log(data);

            setTotalProducts(data.length);
            setProducts(data);
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH PRODUCTS : By Category
    const fetchCategoryProducts = async (categoryId) => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`);
            const data = await response.json();
            setTotalProducts(data.length);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching category products:", error);
        } finally {
            setLoading(false);
        }
    };

    // DELETE PRODUCT
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) {
            notify("Product deletion cancelled", "info");
            return;
        }

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { method: "DELETE" });
            const data = await response.json();

            if (data === true) { notify("Product deleted successfully!", "success"); fetchData() }
            else if (data.name === "EntityNotFoundError") { notify("Product not found!", "error"); }
            else { notify("Failed to delete product!", "error"); }

        } catch (error) {
            console.error("Error deleting product:", error);
            notify("Error deleting product!", "error");
        }
    };

    // CART : ADD TO CART ITEM
    const addToCart = (apiProduct) => {
        setCart((prevCart) => {
            const isItemInCart = prevCart.find((item) => item.id === apiProduct.id);
            if (isItemInCart) {
                const updatedCart = prevCart.map((item) =>
                    item.id === apiProduct.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return updatedCart;
            }

            const newCartItem = {
                id: apiProduct.id,
                name: apiProduct.title,
                description: apiProduct.description,
                price: apiProduct.price,
                quantity: 1,
                image: apiProduct.images?.[0] || apiProduct.image,
                inStock: true,
                category: apiProduct.category?.name || "General"
            };

            const finalCart = [...prevCart, newCartItem];
            localStorage.setItem('myCart', JSON.stringify(finalCart));
            notify("cart added successfully!", "success");
            return finalCart;
        });
    };

    // CART : REMOVE TO CART ITEM
    const removeToCart = (id) => {
        const itemToRemove = cart.find(item => String(item.id) === String(id));
        if (itemToRemove) {
            const updatedCart = cart.filter(item => String(item.id) !== String(id));
            setCart(updatedCart);
            localStorage.setItem('myCart', JSON.stringify(updatedCart));
            notify(`${itemToRemove.title || 'Product'} removed from cart`, "info");
        } else {
            console.warn("Product not found in cart state!");
        }
    };

    // CART : UPDATE QUANTITY
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        setCart((prevItems) => {
            const updatedCart = prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem('myCart', JSON.stringify(updatedCart));
            return updatedCart;
        });

        notify("Cart quantity updated", "success");
    };

    // CART : CLEAR CART
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('myCart');
        notify("Cart cleared", "info");
    };

    // EMAIL : send feedback throght contact form
    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm('service_w873nio', 'template_vp7edbr', contactForm.current, {
            publicKey: 'hYsP1MoVqvbaUyEBe',
        }).then(() => {
            notify("Your message sent successfully!", "success");
            setTimeout(() => document.getElementById("myform").reset(), 2000);
        }, () => {
            notify("Your message couldn't be sent!", "error");
        });
        setTimeout(() => { setLoading(false); }, 2000);
    }

    // WISHLIST : ADD TO WISHLIST ITEM
    const addToWishlist = (apiProduct) => {
        setWishlist((prevWishlist) => {
            const isItemInWishlist = prevWishlist.find((item) => item.id === apiProduct.id);
            if (isItemInWishlist) {
                const updatedWishlist = prevWishlist.map((item) =>
                    item.id === apiProduct.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return updatedWishlist;
            }

            const newWishlistItem = {
                id: apiProduct.id,
                name: apiProduct.title,
                description: apiProduct.description,
                price: apiProduct.price,
                quantity: 1,
                image: apiProduct.images[0],
                inStock: true,
                category: apiProduct.category.name
            };

            const finalWishlist = [...prevWishlist, newWishlistItem];
            localStorage.setItem('myWishlist', JSON.stringify(finalWishlist));
            notify("wishlist added successfully!", "success");
            return finalWishlist;
        });
    };

    // WISHLIST : REMOVE FROM WISHLIST ITEM
    const removeFromWishlist = (id) => {
        const itemToRemove = wishlist.find(item => String(item.id) === String(id));
        if (itemToRemove) {
            const updatedWishlist = wishlist.filter(item => String(item.id) !== String(id));
            setWishlist(updatedWishlist);
            localStorage.setItem('myWishlist', JSON.stringify(updatedWishlist));
            notify(`${itemToRemove.title || 'Product'} removed from wishlist`, "info");
        } else {
            console.warn("Product not found in cart state!");
        }
    };

    // CART : CLEAR CART
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('myWishlist');
        notify("Wishlist cleared", "info");
    };


    // USER : Fetch all Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.escuelajs.co/api/v1/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // USER : Find user by search name
    const searchUser = async (e) => {
        setSearch(e.target.value);
    }

    // USER : Find user by ID
    const findUserById = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('https://api.escuelajs.co/api/v1/users/' + e.target[0].value);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();
            setUsers([data]);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // USER : Update User
    const updateUser = async (id, saveData) => {
        setLoading(true);

        if (saveData?.password === "") { delete saveData?.password; }
        if (saveData?.phone === "") { delete saveData?.phone; }
        if (saveData?.address === "") { delete saveData?.address; }

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users/' + id, {
                method: 'PUT',
                body: JSON.stringify(saveData),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const data = await response.json();

            if (loggedInUser?.id === id) {
                localStorage.setItem("user-detail", JSON.stringify(data));
                setLoggedInUser(data);
            }
            
            if (data.error) { notify("User Couldn't be Updated!", "error"); return; }
            else { notify("User Updated successfully!", "success"); fetchUsers(); }

            setVisible(false);
        } catch (error) {
            console.error('Something went wrong!', error.message);
            notify("Something went wrong!", "error");
        } finally {
            setLoading(false);
        }
    }

    // USER : Delete User
    const deleteUser = async (e, id) => {
        e.preventDefault();

        try {
            if (window.confirm("Do You Want to Delete this User?")) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, { method: 'DELETE' });
                const data = await response.json();

                if (data.error) {
                    notify("User Couldn't be Deleted!", "error");
                    return;
                } else {
                    notify("User Deleted successfully!", "success");
                    setShowMenu(showMenu === id ? null : id);
                    setTimeout(() => {
                        fetchUsers();
                    }, 3000);
                }
            } else { return; }
        } catch (error) {
            console.error('Something went wrong!');
            notify("Something went wrong!", "error");
        }
    }


    // LOGOUT : Terminate session
    const logout = (closeMenu) => {
        const confirm = window.confirm("Do you want to logout?")
        if (!confirm) return;

        localStorage.removeItem('auth-token');
        localStorage.removeItem("user-detail");
        setLoggedInUser(null);
        setAuth(false);
        closeMenu();
        notify("Logout successful! Redirecting... ", "success");
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    // LOGGED IN USER : Get User Profile
    const getLoggedInUser = async (data) => {
        try {
            const token = data?.access_token;
            if (!token) {
                console.error("We couldn't find your account details. Please sign in.");
                return;
            }

            const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user-detail", JSON.stringify(data));
                setLoggedInUser(data);
                notify("Login successful! Redirecting...", "success");
            } else {
                console.error("Failed to fetch profile. Status:", response.status);
            }

        } catch (error) {
            console.error("Auth Error:", error.message);
        }
    };

    // LOGIN : login user
    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });

            const data = await response.json();
            if (data.statusCode === 401 || !data.access_token) {
                notify("Invalid credentials! Please try again.", "error");
                setLoading(false);
                return;
            }

            localStorage.setItem('auth-token', JSON.stringify(data));
            getLoggedInUser(data);
            e.target.reset();
            setTimeout(() => { navigate('/', { replace: true }); }, 3000);
        } catch (error) {
            console.error("Login error:", error);
            notify("Something went wrong! Please try again.", "error");
            setLoading(false);
        }
    };

    // POPUP : Notification
    const notify = (message, type = "default") => {
        toast(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            type: type,
        });
    };

    return (
        <>
            <myContext.Provider value={{
                fetchData, getCategories, priceFilter, searchProducts, fetchCategoryProducts, addToCart, removeToCart, addToWishlist, removeFromWishlist, updateQuantity, clearCart, clearWishlist, deleteProduct, deleteUser, updateUser,

                fetchUsers, searchUser, findUserById, logout, toggleTheme, getLoggedInUser,
                sendEmail, loginUser, setShowMenu,

                user, auth, products, users, cart, wishlist, lowRange, highRange, totalProducts, loading, search, visible, showMenu, theme, contactForm, loggedInUser, updateUserData,

                setUser, setAuth, setCart, setWishlist, setSearch, setVisible, setLoading,
                notify, navigate, setUpdateUserData
            }}>
                {props.children}
            </myContext.Provider>
        </>
    )
}

export default ContextState
