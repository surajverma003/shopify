import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Users from './components/Users';
import Admin from './components/Admin';
import Footer from './components/Footer';

import Theme from './reuse/Theme';
import Cart from './reuse/Cart';
import ProductDetail from './reuse/ProductDetail';
import ScrollToTop from './reuse/ScrollToTop';
import Error from './reuse/Error';

import Login from './components/Login';
import Register from './components/Register';
import ContextState from './context/ContextState';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import HelpSupport from './components/HelpSupport';

import PrivacyPolicy from "./reuse/PrivacyPolicy";
import TermsOfService from "./reuse/TermsOfService";

const App = () => {
    return (
        <BrowserRouter basename='/sasta-mart'>
            <ContextState>
                <ScrollToTop />
                <ToastContainer />
                <Theme />
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/about' element={<About />} />
                    <Route exact path='/products' element={<Products />} />
                    <Route exact path='/users' element={<Users />} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='/admin' element={<Admin />} />
                    <Route exact path='/profile' element={<Profile />} />

                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/wishlist' element={<Wishlist />} />
                    <Route exact path='/product/:id' element={<ProductDetail />} />
                    <Route exact path='/help' element={<HelpSupport />} />
                    
                    <Route exact path='/privacy' element={<PrivacyPolicy />} />
                    <Route exact path='/terms' element={<TermsOfService />} />

                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    
                    <Route exact path='*' element={<Error />} />
                </Routes>
                <Footer />
            </ContextState>
        </BrowserRouter>
    );
}

export default App;
