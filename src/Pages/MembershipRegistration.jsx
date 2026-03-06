import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import uploadImage from '../utils/uploadImage';
import { FaCheck, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCrown, FaUpload, FaArrowLeft, FaArrowRight, FaQrcode, FaFileInvoiceDollar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MembershipRegistration = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Steps: 0: Details, 1: Payment, 2: Proof, 3: Success
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '1',
        section: '',
        membershipTier: searchParams.get('plan') || 'First Year',
        price: searchParams.get('price') || '₹599',
        proofUrl: ''
    });

    const [proofFile, setProofFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Membership Plans
    const plans = [
        { name: 'First Year',  price: '₹599', color: 'from-[#FFA200] to-yellow-600',  qr: './images/599.jpeg'  },
        { name: 'Second Year', price: '₹499', color: 'from-[#FFA200] to-orange-600', qr: './images/499.jpeg' },
        { name: 'Third Year',  price: '₹399', color: 'from-yellow-500 to-[#FFA200]', qr: './images/399.jpeg'  },
        { name: 'Fourth Year', price: '₹299', color: 'from-orange-500 to-[#FFA200]', qr: './images/299.jpeg' },
    ];

    // Update price when tier changes
    useEffect(() => {
        const selectedPlan = plans.find(p => p.name === formData.membershipTier);
        if (selectedPlan) {
            setFormData(prev => ({ ...prev, price: selectedPlan.price }));
        }
    }, [formData.membershipTier]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setProofFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        setError('');
        if (step === 0) {
            if (!formData.name || !formData.email || !formData.phone || !formData.section) {
                setError('Please fill in all fields.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Please enter a valid email address.');
                return;
            }
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setError('');
        if (!proofFile) {
            setError('Please upload the payment proof.');
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Image
            const proofUrl = await uploadImage(proofFile);

            // 2. Save to Firestore
            await addDoc(collection(db, 'membership_requests'), {
                ...formData,
                proofUrl,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            setStep(3); // Success Step
        } catch (err) {
            console.error(err);
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 pt-24 relative overflow-hidden font-sans">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#FFA200]/10 rounded-full blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -60, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#FFA200]/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Info & Progress */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold font-zentry mb-2 bg-gradient-to-r from-[#FFA200] to-yellow-500 bg-clip-text text-transparent">
                                Join PRODDEC
                            </h1>
                            <p className="text-white/60 text-sm mb-8">Unlock your potential with our exclusive membership.</p>

                            {/* Vertical Stepper for Desktop */}
                            <div className="hidden lg:flex flex-col relative pb-0">
                                {/* Connecting Line Background */}
                                <div className="absolute left-[19px] top-5 bottom-8 w-0.5 bg-white/10 -z-10" />
                                
                                {/* Active Progress Line */}
                                <motion.div 
                                    className="absolute left-[19px] top-5 w-0.5 bg-[#FFA200] -z-10 origin-top" 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(step / 3) * 100}%` }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />

                                {['Personal Details', 'Payment', 'Verification', 'Done'].map((label, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-4 relative">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 z-10 ${
                                            step > idx ? 'bg-[#FFA200] border-[#FFA200] text-black' : 
                                            step === idx ? 'bg-[#0a0a0a] border-[#FFA200] text-[#FFA200] shadow-[0_0_15px_rgba(255,162,0,0.3)]' : 
                                            'bg-[#0a0a0a] border-white/10 text-white/30'
                                        }`}>
                                            {step > idx ? <FaCheck /> : idx + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-medium transition-colors ${step >= idx ? 'text-white' : 'text-white/30'}`}>
                                                {label}
                                            </span>
                                            {step === idx && (
                                                <motion.span layoutId="activeStep" className="text-xs text-[#FFA200]">In Progress</motion.span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block pt-8 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <FaCrown className="text-[#FFA200]" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50">Selected Plan</p>
                                    <p className="font-bold text-[#FFA200]">{formData.membershipTier}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form Area */}
                <div className="lg:col-span-2">
                    {/* Mobile Stepper */}
                    <div className="relative flex lg:hidden justify-between mb-8 px-4">
                        {/* Mobile Connecting Line Background */}
                        <div className="absolute left-8 right-8 top-4 h-0.5 bg-white/10 -z-10" />
                        
                        {/* Mobile Active Progress Line */}
                        <motion.div 
                            className="absolute left-8 top-4 h-0.5 bg-[#FFA200] -z-10 origin-left" 
                            initial={{ width: 0 }}
                            animate={{ width: `calc(${step / 3} * (100% - 4rem))` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                         {['Details', 'Payment', 'Proof', 'Done'].map((label, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 z-10 px-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                                    step > idx ? 'bg-[#FFA200] border-[#FFA200] text-black' : 
                                    step === idx ? 'bg-[#0a0a0a] border-[#FFA200] text-[#FFA200]' : 
                                    'bg-[#0a0a0a] border-white/10 text-white/50'
                                }`}>
                                    {step > idx ? <FaCheck /> : idx + 1}
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider ${step >= idx ? 'text-[#FFA200]' : 'text-white/30'}`}>{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFA200]/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div 
                                        key="step0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold font-zentry text-white">Personal Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Full Name</label>
                                                <div className="relative group">
                                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FFA200] transition-colors" />
                                                    <input 
                                                        name="name" 
                                                        value={formData.name} 
                                                        onChange={handleChange} 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-10 text-white focus:outline-none focus:border-[#FFA200] focus:ring-1 focus:ring-[#FFA200] transition-all placeholder:text-white/20"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Email Address</label>
                                                <div className="relative group">
                                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FFA200] transition-colors" />
                                                    <input 
                                                        name="email" 
                                                        type="email"
                                                        value={formData.email} 
                                                        onChange={handleChange} 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-10 text-white focus:outline-none focus:border-[#FFA200] focus:ring-1 focus:ring-[#FFA200] transition-all placeholder:text-white/20"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Phone Number</label>
                                                <div className="relative group">
                                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FFA200] transition-colors" />
                                                    <input 
                                                        name="phone" 
                                                        value={formData.phone} 
                                                        onChange={handleChange} 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-10 text-white focus:outline-none focus:border-[#FFA200] focus:ring-1 focus:ring-[#FFA200] transition-all placeholder:text-white/20"
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Section/Class</label>
                                                <div className="relative group">
                                                    <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FFA200] transition-colors" />
                                                    <input 
                                                        name="section" 
                                                        value={formData.section} 
                                                        onChange={handleChange} 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-10 text-white focus:outline-none focus:border-[#FFA200] focus:ring-1 focus:ring-[#FFA200] transition-all placeholder:text-white/20"
                                                        placeholder="CSE-A"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Academic Year</label>
                                                <select name="year" value={formData.year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#FFA200] cursor-pointer appearance-none">
                                                    <option className="bg-[#1a1a1a]" value="1">1st Year</option>
                                                    <option className="bg-[#1a1a1a]" value="2">2nd Year</option>
                                                    <option className="bg-[#1a1a1a]" value="3">3rd Year</option>
                                                    <option className="bg-[#1a1a1a]" value="4">4th Year</option>
                                                </select>
                                            </div>
                                            
                                            <div className="space-y-1.5">
                                                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold ml-1">Membership Plan</label>
                                                <select name="membershipTier" value={formData.membershipTier} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#FFA200] cursor-pointer appearance-none">
                                                    {plans.map(p => (
                                                        <option className="bg-[#1a1a1a]" key={p.name} value={p.name}>{p.name} - {p.price}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col items-center justify-center p-4"
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-bold font-zentry text-white mb-2">Scan to Pay</h2>
                                            <div className="inline-flex items-center gap-2  rounded-full px-4 py-1.5 text-md border font-bold">
                                                <span>{formData.price}</span>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-br from-[#FFA200] to-yellow-600 rounded-3xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-500"></div>
                                            <div className="relative bg-white p-4 rounded-2xl">
                                                <img 
                                                    key={formData.membershipTier}
                                                    src={plans.find(p => p.name === formData.membershipTier)?.qr}
                                                    alt={`Payment QR for ${formData.membershipTier}`}
                                                    className="w-64 h-64 object-contain" 
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mt-8 flex items-center justify-center gap-3 text-white/50 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                                            <FaQrcode />
                                            <span className="font-mono text-sm">proddec@upi</span>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col text-center justify-center"
                                    >
                                        <h2 className="text-2xl font-bold font-zentry text-white mb-6">Payment Verification</h2>
                                        
                                        <div className="w-full">
                                            <input 
                                                id="file-upload" 
                                                type="file" 
                                                onChange={handleFileChange} 
                                                accept="image/*" 
                                                className="hidden" 
                                            />
                                            <label 
                                                htmlFor="file-upload"
                                                className={`
                                                    group relative flex flex-col items-center justify-center w-full h-64 md:h-80
                                                    border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300
                                                    ${previewUrl 
                                                        ? 'border-[#FFA200] bg-[#FFA200]/5' 
                                                        : 'border-white/20 hover:border-[#FFA200]/50 hover:bg-white/5'}
                                                `}
                                            >
                                                {previewUrl ? (
                                                    <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
                                                        <img src={previewUrl} alt="Preview" className="max-h-[80%] rounded-lg object-contain shadow-lg mb-4" />
                                                        <div className="flex items-center gap-2 text-[#FFA200] text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                                                            <FaCheck /> {proofFile.name}
                                                        </div>
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                                                            <span className="text-white font-medium flex items-center gap-2"><FaUpload /> Change File</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center p-6">
                                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                            <FaUpload className="text-3xl text-white/30 group-hover:text-[#FFA200] transition-colors" />
                                                        </div>
                                                        <p className="text-lg font-medium text-white mb-2">Upload Screenshot</p>
                                                        <p className="text-sm text-white/40">Supported formats: JPG, PNG</p>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div 
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-10"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#FFA200] blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                            <div className="w-24 h-24 bg-gradient-to-br from-[#FFA200] to-yellow-600 rounded-full flex items-center justify-center shadow-xl mb-8 relative z-10">
                                                <FaCheck className="text-black text-5xl" />
                                            </div>
                                        </div>
                                        
                                        <h2 className="text-4xl font-bold font-zentry text-white mb-4">Registration Successful!</h2>
                                        <p className="text-white/60 mb-8 max-w-sm">
                                            Thank you for joining PRODDEC. Your membership request has been submitted and is pending verification.
                                        </p>
                                        
                                        <button 
                                            onClick={() => navigate('/')} 
                                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all"
                                        >
                                            Return to Home
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center mt-4"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Footer Navigation */}
                        {step < 3 && (
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                                <button 
                                    onClick={prevStep} 
                                    disabled={step === 0}
                                    className={`
                                        flex items-center gap-2 text-sm font-medium transition-colors
                                        ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'}
                                    `}
                                >
                                    <FaArrowLeft className="text-xs" /> Back
                                </button>

                                <button 
                                    onClick={step === 2 ? handleSubmit : nextStep} 
                                    disabled={loading}
                                    className="relative group bg-[#FFA200] hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-wider transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="flex items-center gap-2">
                                        {loading ? 'Processing...' : (step === 2 ? 'Submit Request' : 'Next Step')}
                                        {!loading && <FaArrowRight className={`text-xs transition-transform group-hover:translate-x-1`} />}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipRegistration;