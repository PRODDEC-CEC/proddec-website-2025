import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLightbulb, FaUser, FaIdCard, FaPhone, FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Idea = () => {
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        membershipId: '',
        description: '',
        phone: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'ideas'), {
                ...formData,
                createdAt: serverTimestamp()
            });
            console.log("Idea Submitted:", formData);
            setSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting idea. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center pt-24 font-sans">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full flex flex-col items-center"
                >
                    <div className="w-20 h-20 border-2 border-[#FFA200] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,162,0,0.2)]">
                        <FaLightbulb className="text-4xl text-[#FFA200]" />
                    </div>
                    <h2 className="text-4xl font-black font-zentry uppercase mb-4 text-white">Idea Submitted!</h2>
                    <p className="text-gray-500/80 mb-8 font-medium text-lg">Thank you for sharing your innovative idea with us. We'll review it and get back to you soon!</p>
                    <Link 
                        to="/"
                        className="inline-block border border-[#FFA200] text-[#FFA200] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#FFA200] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,162,0,0.1)] hover:shadow-[0_0_30px_rgba(255,162,0,0.4)]"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-[95vw] mx-auto bg-black text-white pt-32 pb-20 overflow-x-hidden flex flex-col font-sans">
            
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                 <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFA200]/5 rounded-full blur-[120px]" />
                 <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl flex-grow flex flex-col justify-center">
                
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#FFA200] transition-colors mb-8 group uppercase tracking-widest text-xs font-bold">
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-black font-zentry uppercase text-white leading-[0.9]"
                        >
                            Have an <br /> <span className="text-transparent bg-clip-text bg-[#FFA200]">Idea?</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-sm md:text-lg font-medium md:max-w-sm leading-relaxed md:text-right"
                        >
                            Share your thoughts, projects, or innovations with PRODDEC. 
                        </motion.p>
                    </div>
                </div>

                {/* Form Section */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full"
                >
                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Name Input */}
                            <div className="space-y-4 group">
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-[#FFA200] transition-colors">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Full Name"
                                    className="w-full bg-transparent border-b border-white/20 py-2 md:text-2xl text-white placeholder-white/10 focus:outline-none focus:border-[#FFA200] transition-all font-light"
                                />
                            </div>

                            {/* Phone Number Input */}
                            <div className="space-y-4 group">
                                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-[#FFA200] transition-colors">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-transparent border-b border-white/20 py-2 md:text-2xl text-white placeholder-white/10 focus:outline-none focus:border-[#FFA200] transition-all font-light"
                                />
                            </div>

                            {/* Class Input */}
                            <div className="space-y-4 group">
                                <label htmlFor="class" className="block text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-[#FFA200] transition-colors">Class</label>
                                <input
                                    type="text"
                                    id="class"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    placeholder="e.g. S4 G"
                                    className="w-full bg-transparent border-b border-white/20 py-2 md:text-2xl text-white placeholder-white/10 focus:outline-none focus:border-[#FFA200] transition-all font-light"
                                />
                            </div>

                            {/* Membership ID Input (Optional) */}
                            <div className="space-y-4 group">
                                <label htmlFor="membershipId" className="block text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-[#FFA200] transition-colors">
                                    Proddec Membership ID <span className="opacity-50 font-normal normal-case ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="membershipId"
                                    name="membershipId"
                                    value={formData.membershipId}
                                    onChange={handleChange}
                                    placeholder="e.g. PROXXXXX"
                                    className="w-full bg-transparent border-b border-white/20 py-2 md:text-2xl text-white placeholder-white/10 focus:outline-none focus:border-[#FFA200] transition-all font-light"
                                />
                            </div>

                            {/* Idea Description Input */}
                            <div className="space-y-4 group md:col-span-2">
                                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 group-focus-within:text-[#FFA200] transition-colors">Brief your Idea</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell us about what you want to build...?"
                                    className="w-full bg-transparent border-b border-white/20 py-2 md:text-xl text-white placeholder-white/10 focus:outline-none focus:border-[#FFA200] transition-all resize-none font-light leading-relaxed"
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="order-2 md:order-1 text-gray-500 text-sm font-medium max-w-xs text-center md:text-left leading-relaxed">
                                Need to discuss in person? <br/>
                                <a href="mailto:contact@proddec.com" className="text-[#FFA200] hover:text-white transition-colors">Contact the team</a>
                            </div>

                            <button
                                type="submit"
                                className="order-1 md:order-2 group relative px-12 py-5 bg-[#FFA200] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,162,0,0.4)]"
                            >
                                <span className="flex items-center gap-3 relative z-10">
                                    Submit Idea 
                                    <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>

                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default Idea;
