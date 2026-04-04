import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction', icon: 'material-symbols:info' },
        { id: 'collect', title: 'Information We Collect', icon: 'material-symbols:database' },
        { id: 'use', title: 'How We Use Your Information', icon: 'material-symbols:settings' },
        { id: 'sharing', title: 'Information Sharing', icon: 'material-symbols:share' },
        { id: 'cookies', title: 'Cookies & Tracking', icon: 'material-symbols:cookie' },
        { id: 'security', title: 'Data Security', icon: 'material-symbols:security' },
        { id: 'rights', title: 'Your Rights', icon: 'material-symbols:gavel' },
        { id: 'contact', title: 'Contact Us', icon: 'material-symbols:contact-support' },
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
                        <Icon icon="material-symbols:privacy-tip" className="text-white text-4xl" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                                        Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                                    </p>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Information We Collect */}
                                <section id="collect" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:database" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Information We Collect
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We may collect information about you in a variety of ways. The information we may collect includes:
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'Personal Data', desc: 'Name, email address, phone number, and billing information that you voluntarily provide.' },
                                            { title: 'Derivative Data', desc: 'Information our servers automatically collect, such as IP address, browser type, and access times.' },
                                            { title: 'Financial Data', desc: 'Payment information required to process orders (handled securely by payment processors).' },
                                            { title: 'Mobile Device Data', desc: 'Device information when accessing our platform via mobile devices.' },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                                <Icon icon="material-symbols:check-circle" className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* How We Use Your Information */}
                                <section id="use" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:settings" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        How We Use Your Information
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We use the information we collect to:
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            'Process and fulfill your orders',
                                            'Send you order confirmations and updates',
                                            'Respond to your inquiries and support requests',
                                            'Improve our website and services',
                                            'Send promotional communications (with your consent)',
                                            'Prevent fraudulent transactions and monitor against theft',
                                            'Comply with legal obligations',
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                <Icon icon="material-symbols:arrow-right" className="text-purple-500 text-lg flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Information Sharing */}
                                <section id="sharing" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:share" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Information Sharing
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We may share your information with third parties only in the following situations:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            { icon: 'material-symbols:local-shipping', title: 'Shipping Partners', desc: 'To deliver your orders' },
                                            { icon: 'material-symbols:credit-card', title: 'Payment Processors', desc: 'To process transactions securely' },
                                            { icon: 'material-symbols:gavel', title: 'Legal Requirements', desc: 'When required by law' },
                                            { icon: 'material-symbols:handshake', title: 'Business Transfers', desc: 'In case of merger or acquisition' },
                                        ].map((item, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                                <Icon icon={item.icon} className="text-purple-600 dark:text-purple-400 text-2xl mb-2" />
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Cookies */}
                                <section id="cookies" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:cookie" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Cookies & Tracking
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                    </p>
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <Icon icon="material-symbols:lightbulb" className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0" />
                                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                                <strong>Note:</strong> If you disable cookies, some features of our website may not function properly.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Data Security */}
                                <section id="security" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:security" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Data Security
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        We implement appropriate security measures to protect your personal information. This includes:
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        {[
                                            { icon: 'material-symbols:lock', title: 'SSL Encryption' },
                                            { icon: 'material-symbols:verified-user', title: 'PCI Compliance' },
                                            { icon: 'material-symbols:shield', title: 'Secure Servers' },
                                        ].map((item, index) => (
                                            <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center">
                                                <Icon icon={item.icon} className="text-green-600 dark:text-green-400 text-3xl mx-auto mb-2" />
                                                <p className="text-sm font-bold text-green-700 dark:text-green-400">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Your Rights */}
                                <section id="rights" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:gavel" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Your Rights
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        Depending on your location, you may have the following rights regarding your personal data:
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            'Right to access your personal data',
                                            'Right to correct inaccurate data',
                                            'Right to delete your data',
                                            'Right to restrict processing',
                                            'Right to data portability',
                                            'Right to withdraw consent',
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                <Icon icon="material-symbols:check-box" className="text-purple-500 text-lg" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <hr className="border-gray-200 dark:border-gray-800" />

                                {/* Contact */}
                                <section id="contact" className="scroll-mt-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Icon icon="material-symbols:contact-support" className="text-purple-600 dark:text-purple-400 text-xl" />
                                        </span>
                                        Contact Us
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        If you have questions about this Privacy Policy, please contact us:
                                    </p>
                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Icon icon="material-symbols:mail" className="text-purple-600 dark:text-purple-400 text-xl" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">privacy@example.com</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Icon icon="material-symbols:call" className="text-purple-600 dark:text-purple-400 text-xl" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">+1 (234) 567-890</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Icon icon="material-symbols:location-on" className="text-purple-600 dark:text-purple-400 text-xl" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">123 Privacy Street, Data City, DC 12345</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>

                        {/* Related Links */}
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Link to="/terms" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-600 transition-all">
                                <Icon icon="material-symbols:description" className="text-lg" />
                                Terms of Service
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

export default PrivacyPolicy;
