import React, { useState } from "react";
import { Icon } from "@iconify/react";

const HelpSupport = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openFaq, setOpenFaq] = useState(null);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: "all", name: "All Topics", icon: "material-symbols:apps" },
        { id: "orders", name: "Orders", icon: "material-symbols:shopping-bag" },
        { id: "shipping", name: "Shipping", icon: "material-symbols:local-shipping" },
        { id: "returns", name: "Returns", icon: "material-symbols:assignment-return" },
        { id: "payments", name: "Payments", icon: "material-symbols:credit-card" },
        { id: "account", name: "Account", icon: "material-symbols:person" },
    ];

    const faqs = [
        {
            id: 1,
            category: "orders",
            question: "How can I track my order?",
            answer: "You can track your order by going to 'My Orders' in your account dashboard. Click on the specific order to view real-time tracking information including current location and estimated delivery date."
        },
        {
            id: 2,
            category: "orders",
            question: "Can I modify or cancel my order?",
            answer: "You can modify or cancel your order within 1 hour of placing it. Go to 'My Orders', select the order, and click 'Modify' or 'Cancel'. After this window, please contact our support team for assistance."
        },
        {
            id: 3,
            category: "shipping",
            question: "What are the shipping options available?",
            answer: "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next-Day Delivery for select locations. Free shipping is available on orders over $500."
        },
        {
            id: 4,
            category: "shipping",
            question: "Do you ship internationally?",
            answer: "Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. You can see the exact cost at checkout."
        },
        {
            id: 5,
            category: "returns",
            question: "What is your return policy?",
            answer: "We offer a 30-day hassle-free return policy. Items must be unused, in original packaging, with tags attached. Simply initiate a return from your order history and print the prepaid shipping label."
        },
        {
            id: 6,
            category: "returns",
            question: "How long does it take to process a refund?",
            answer: "Once we receive your returned item, refunds are processed within 3-5 business days. The amount will be credited to your original payment method. You'll receive an email confirmation when processed."
        },
        {
            id: 7,
            category: "payments",
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer Buy Now, Pay Later options through Klarna and Afterpay."
        },
        {
            id: 8,
            category: "payments",
            question: "Is my payment information secure?",
            answer: "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure payment gateways."
        },
        {
            id: 9,
            category: "account",
            question: "How do I reset my password?",
            answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. The link expires after 24 hours for security purposes."
        },
        {
            id: 10,
            category: "account",
            question: "How do I update my account information?",
            answer: "Go to your Profile page and click 'Edit Profile'. You can update your name, email, phone number, and shipping addresses. Don't forget to save your changes!"
        },
    ];

    /* const quickLinks = [
        { title: "Track Order", icon: "material-symbols:location-on", link: "/orders", color: "purple" },
        { title: "Return Item", icon: "material-symbols:assignment-return", link: "/returns", color: "pink" },
        { title: "Shipping Info", icon: "material-symbols:local-shipping", link: "/shipping", color: "orange" },
        { title: "Payment Issues", icon: "material-symbols:credit-card", link: "/payments", color: "teal" },
    ]; */

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            alert("Your message has been sent! We'll get back to you within 24 hours.");
            setContactForm({ name: "", email: "", subject: "", message: "" });
            setLoading(false);
        }, 1500);
    };

    const onchange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    return (
        <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-16 px-2 sm:px-5">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 rounded-2xl shadow-xl mb-6">
                        <Icon icon="material-symbols:support-agent" className="text-white text-4xl" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Help & Support</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        How can we help you today? Search our knowledge base or browse common topics below.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for answers..."
                            className="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-xl text-sm sm:text-base"
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                            <Icon icon="material-symbols:search" className="text-2xl" />
                        </div>
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <Icon icon="material-symbols:close" className="text-xl" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-3">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.link}
                            className="pointer-events-none group flex flex-col items-center gap-3 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all hover:border-purple-400 dark:hover:border-purple-600 hover:scale-[1.02]"
                        >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all
                                ${link.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50' : ''}
                                ${link.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50' : ''}
                                ${link.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50' : ''}
                                ${link.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/30 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50' : ''}
                            `}>
                                <Icon 
                                    icon={link.icon} 
                                    className={`text-2xl sm:text-3xl
                                        ${link.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : ''}
                                        ${link.color === 'pink' ? 'text-pink-600 dark:text-pink-400' : ''}
                                        ${link.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : ''}
                                        ${link.color === 'teal' ? 'text-teal-600 dark:text-teal-400' : ''}
                                    `} 
                                />
                            </div>
                            <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white text-center">{link.title}</span>
                        </Link>
                    ))}
                </div> */}

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-3">

                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-4 sm:p-8">
                            
                            {/* FAQ Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <Icon icon="material-symbols:quiz" className="text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl" />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                            </div>

                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                                            activeCategory === category.id
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <Icon icon={category.icon} className="text-lg" />
                                        <span className="hidden sm:inline">{category.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* FAQ Accordion */}
                            <div className="space-y-3">
                                {filteredFaqs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Icon icon="material-symbols:search-off" className="text-gray-400 dark:text-gray-600 text-5xl mb-4 mx-auto" />
                                        <p className="text-gray-600 dark:text-gray-400">No results found. Try a different search term.</p>
                                    </div>
                                ) : (
                                    filteredFaqs.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className={`border-2 rounded-2xl transition-all overflow-hidden ${
                                                openFaq === faq.id
                                                    ? 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800'
                                            }`}
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                                            >
                                                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{faq.question}</span>
                                                <Icon 
                                                    icon={openFaq === faq.id ? "material-symbols:expand-less" : "material-symbols:expand-more"} 
                                                    className="text-2xl text-purple-600 dark:text-purple-400 flex-shrink-0" 
                                                />
                                            </button>
                                            {openFaq === faq.id && (
                                                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-1 space-y-3">

                        {/* Contact Options */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-5 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                <Icon icon="material-symbols:contact-support" className="text-purple-600 dark:text-purple-400 text-2xl" />
                                Contact Us
                            </h3>

                            <div className="space-y-4">
                                {/* Email */}
                                <a href="mailto:support@example.com" className="w-full flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group">
                                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-all">
                                        <Icon icon="material-symbols:mail" className="text-teal-600 dark:text-teal-400 text-2xl" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900 dark:text-white">Email Us</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">support@example.com</div>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a href="tel:+1234567890" className="w-full flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-all">
                                        <Icon icon="material-symbols:call" className="text-orange-600 dark:text-orange-400 text-2xl" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900 dark:text-white">Call Us</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">+1 (234) 567-890</div>
                                    </div>
                                </a>
                            </div>

                            {/* Working Hours */}
                            <div className="mt-5 pt-5 border-t-2 border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <Icon icon="material-symbols:schedule" className="text-lg" />
                                    <span className="font-bold">Support Hours</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Mon - Fri: 9:00 AM - 8:00 PM EST<br />
                                    Sat - Sun: 10:00 AM - 6:00 PM EST
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-5 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                <Icon icon="material-symbols:edit-note" className="text-purple-600 dark:text-purple-400 text-2xl" />
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={onchange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={onchange}
                                        placeholder="Your Email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <select
                                        name="subject"
                                        value={contactForm.subject}
                                        onChange={onchange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="order">Order Issue</option>
                                        <option value="shipping">Shipping Question</option>
                                        <option value="return">Return Request</option>
                                        <option value="payment">Payment Problem</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={contactForm.message}
                                        onChange={onchange}
                                        rows="4"
                                        placeholder="How can we help you?"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <><Icon icon="svg-spinners:bars-rotate-fade" className="text-xl" /> Sending...</>
                                    ) : (
                                        <><Icon icon="material-symbols:send" className="text-xl" /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Info Banner */}
                <div className="mt-3 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex-shrink-0">
                                <Icon icon="material-symbols:volunteer-activism" className="text-teal-600 dark:text-teal-400 text-2xl sm:text-3xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">We're Here to Help!</h3>
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    Our dedicated support team responds to all queries within 24 hours.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400">
                            <Icon icon="material-symbols:verified" className="text-xl" />
                            <span>98% Satisfaction Rate</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HelpSupport;