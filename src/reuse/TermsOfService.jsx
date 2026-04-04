
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction', icon: 'material-symbols:info' },
        { id: 'account', title: 'Account Terms', icon: 'material-symbols:person' },
        { id: 'orders', title: 'Orders & Payments', icon: 'material-symbols:shopping-cart' },
        { id: 'shipping', title: 'Shipping & Delivery', icon: 'material-symbols:local-shipping' },
        { id: 'returns', title: 'Returns & Refunds', icon: 'material-symbols:assignment-return' },
        { id: 'prohibited', title: 'Prohibited Activities', icon: 'material-symbols:block' },
        { id: 'liability', title: 'Limitation of Liability', icon: 'material-symbols:shield' },
        { id: 'changes', title: 'Changes to Terms', icon: 'material-symbols:edit-document' },
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="poppins min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-10 sm:py-16 px-3 sm:px-5">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-2xl shadow-xl mb-4 sm:mb-6">
                        <Icon icon="material-symbols:description" className="text-white text-4xl" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Terms of Service</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services. By accessing our website, you agree to these terms.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                        Last updated: January 15, 2026
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-800 p-4 overflow-hidden">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm">
                                <Icon icon="material-symbols:list" className="text-purple-600 dark:text-purple-400 text-xl" />
                                Contents
                            </h3>
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-xl transition-all ${
                                            activeSection === section.id
                                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-bold'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <Icon icon={section.icon} className="text-lg flex-shrink-0" />
                                        <span className="truncate">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-5 sm:p-8">
                            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">

                                {/* Introduction */}
                                <section id="intro" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:info" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Introduction
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Welcome to our e-commerce platform. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.
                                    </p>
                                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <Icon icon="material-symbols:info" className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0" />
                                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                                By creating an account or making a purchase, you acknowledge that you have read and understood these Terms.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Account Terms */}
                                <section id="account" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:person" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Account Terms
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        When creating an account, you agree to:
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            'Provide accurate and complete information',
                                            'Maintain the security of your account credentials',
                                            'Be at least 18 years old or have parental consent',
                                            'Not share your account with others',
                                            'Notify us immediately of any unauthorized access',
                                            'Accept responsibility for all activities under your account',
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                <Icon icon="material-symbols:check-circle" className="text-green-500 text-lg flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Orders & Payments */}
                                <section id="orders" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:shopping-cart" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Orders & Payments
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                <Icon icon="material-symbols:receipt" className="text-purple-500" />
                                                Order Acceptance
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including pricing errors or stock limitations.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                <Icon icon="material-symbols:credit-card" className="text-purple-500" />
                                                Payment Methods
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                We accept major credit cards, PayPal, and other payment methods as displayed at checkout. All payments are processed securely through encrypted connections.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                <Icon icon="material-symbols:price-change" className="text-purple-500" />
                                                Pricing
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                All prices are displayed in USD and are subject to change without notice. Applicable taxes and shipping costs will be calculated at checkout.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Shipping & Delivery */}
                                <section id="shipping" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:local-shipping" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Shipping & Delivery
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            { icon: 'material-symbols:schedule', title: 'Processing Time', desc: '1-2 business days' },
                                            { icon: 'material-symbols:local-shipping', title: 'Standard Shipping', desc: '5-7 business days' },
                                            { icon: 'material-symbols:bolt', title: 'Express Shipping', desc: '2-3 business days' },
                                            { icon: 'material-symbols:public', title: 'International', desc: '10-15 business days' },
                                        ].map((item, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                                                <Icon icon={item.icon} className="text-purple-600 dark:text-purple-400 text-2xl mx-auto mb-2" />
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                                        Delivery times are estimates and may vary based on location and other factors. We are not responsible for delays caused by carriers or customs.
                                    </p>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Returns & Refunds */}
                                <section id="returns" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:assignment-return" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Returns & Refunds
                                    </h2>
                                    <div className="p-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl mb-4">
                                        <h4 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                            <Icon icon="material-symbols:check-circle" className="text-xl" />
                                            30-Day Return Policy
                                        </h4>
                                        <p className="text-green-700 dark:text-green-400 text-sm">
                                            We offer a 30-day hassle-free return policy on most items. Items must be unused, in original packaging, with all tags attached.
                                        </p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                        <strong>Non-returnable items:</strong>
                                    </p>
                                    <ul className="space-y-1">
                                        {['Personalized or custom items', 'Perishable goods', 'Intimate or sanitary products', 'Hazardous materials'].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                <Icon icon="material-symbols:close" className="text-red-500 text-lg" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Prohibited Activities */}
                                <section id="prohibited" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:block" className="text-red-600 dark:text-red-400 text-xl" />
                                        </span>
                                        Prohibited Activities
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        You may not use our platform to:
                                    </p>
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                                        <ul className="space-y-2">
                                            {[
                                                'Violate any laws or regulations',
                                                'Infringe on intellectual property rights',
                                                'Transmit harmful or malicious code',
                                                'Attempt to gain unauthorized access',
                                                'Harass or harm other users',
                                                'Engage in fraudulent activities',
                                                'Scrape or collect data without permission',
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-red-700 dark:text-red-400 text-sm">
                                                    <Icon icon="material-symbols:dangerous" className="text-lg flex-shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Limitation of Liability */}
                                <section id="liability" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:shield" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Limitation of Liability
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill. Our total liability shall not exceed the amount you paid for the product or service in question.
                                    </p>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Changes to Terms */}
                                <section id="changes" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:edit-document" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Changes to Terms
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the new Terms.
                                    </p>
                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            <Icon icon="material-symbols:contact-support" className="text-purple-600 dark:text-purple-400 text-xl" />
                                            Questions?
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                                            If you have any questions about these Terms, please contact us:
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <a href="mailto:legal@example.com" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-bold hover:underline">
                                                <Icon icon="material-symbols:mail" />
                                                legal@example.com
                                            </a>
                                            <span className="text-gray-400">|</span>
                                            <Link to="/help" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-bold hover:underline">
                                                <Icon icon="material-symbols:help" />
                                                Help Center
                                            </Link>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>

                        {/* Related Links */}
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Link to="/privacy" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-600 transition-all">
                                <Icon icon="material-symbols:privacy-tip" className="text-lg" />
                                Privacy Policy
                            </Link>
                            <Link to="/help" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-600 transition-all">
                                <Icon icon="material-symbols:help" className="text-lg" />
                                Help Center
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TermsOfService;
