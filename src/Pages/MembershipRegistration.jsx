import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import uploadImage from '../utils/uploadImage';
import { FaCheck, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCrown, FaUpload, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
        { name: 'First Year', price: '₹599', color: 'from-[#FFA200] to-yellow-600' },
        { name: 'Second Year', price: '₹499', color: 'from-[#FFA200] to-orange-600' },
        { name: 'Third Year', price: '₹399', color: 'from-yellow-500 to-[#FFA200]' },
        { name: 'Fourth Year', price: '₹299', color: 'from-orange-500 to-[#FFA200]' },
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
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 pt-24 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFA200]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFA200]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="w-full max-w-3xl relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-zentry mb-3 bg-linear-to-r from-[#FFA200] via-yellow-400 to-[#FFA200] bg-clip-text text-transparent">
                        Join PRODDEC
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">Complete the steps to activate your membership</p>
                </div>

                <div className="bg-linear-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">

                    {/* Progress Bar */}
                    {/* Progress Bar - Step Indicators */}
                    <div className="flex justify-between mb-10 relative px-2">
                        {['Details', 'Payment', 'Proof', 'Done'].map((label, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 relative z-10">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= idx
                                    ? 'bg-linear-to-br from-[#FFA200] to-yellow-500 text-black shadow-lg shadow-[#FFA200]/50 scale-110'
                                    : 'bg-white/10 text-white/50 backdrop-blur-sm'
                                    }`}>
                                    {step > idx ? <FaCheck className="text-lg" /> : idx + 1}
                                </div>
                                <span className={`text-xs md:text-sm font-medium transition-all ${step >= idx ? 'text-white' : 'text-white/40'
                                    }`}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Content Steps */}
                    <div className="min-h-[400px]">
                        {step === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-linear-to-br from-[#FFA200] to-yellow-500 rounded-xl flex items-center justify-center">
                                        <FaUser className="text-black text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold font-zentry text-white">Your Details</h2>
                                        <p className="text-white/50 text-sm">Tell us about yourself</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-4 focus-within:border-[#FFA200] transition-all backdrop-blur-sm">
                                        <FaUser className="text-white/40 mr-3" />
                                        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="bg-transparent outline-none text-white w-full placeholder:text-white/40" />
                                    </div>
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-4 focus-within:border-[#FFA200] transition-all backdrop-blur-sm">
                                        <FaEnvelope className="text-white/40 mr-3" />
                                        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="bg-transparent outline-none text-white w-full placeholder:text-white/40" />
                                    </div>
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-4 focus-within:border-[#FFA200] transition-all backdrop-blur-sm">
                                        <FaPhone className="text-white/40 mr-3" />
                                        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="bg-transparent outline-none text-white w-full placeholder:text-white/40" />
                                    </div>
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-4 focus-within:border-[#FFA200] transition-all backdrop-blur-sm">
                                        <FaGraduationCap className="text-white/40 mr-3" />
                                        <input name="section" placeholder="Section (e.g., CSE-A)" value={formData.section} onChange={handleChange} className="bg-transparent outline-none text-white w-full placeholder:text-white/40" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2 ml-1 font-medium">Academic Year</label>
                                        <select name="year" value={formData.year} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FFA200] outline-none text-white w-full backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all">
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2 ml-1 font-medium">Membership Plan</label>
                                        <select name="membershipTier" value={formData.membershipTier} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FFA200] outline-none text-white w-full backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all">
                                            {plans.map(p => (
                                                <option key={p.name} value={p.name}>{p.name} - {p.price}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-right-4 duration-500">
                                 
                                <h2 className="text-3xl md:text-4xl font-bold font-zentry text-white mb-2">Scan & Pay</h2>
                                <p className="text-white/60 mb-8 max-w-md">
                                    Amount: <span className="text-[#FFA200] font-bold text-2xl">{formData.price}</span> for <span className="text-white font-semibold">{formData.membershipTier}</span>
                                </p>

                                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl mb-6">
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=proddec@upi&pn=PRODDEC&am=${formData.price.replace('₹', '')}&cu=INR`} alt="Payment QR" className="w-52 h-52 md:w-64 md:h-64" />
                                </div>
                                <p className="text-white/40 text-sm">UPI ID: <span className="text-white font-mono font-bold">proddec@upi</span></p>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="text-center animate-in fade-in slide-in-from-right-4 duration-500">
                                
                                <h2 className="text-3xl md:text-4xl font-bold font-zentry text-white mb-2">Upload Proof</h2>
                                <p className="text-white/60 mb-10 max-w-md mx-auto">Upload payment screenshot</p>

                                <div className="border-2 border-dashed border-white/30 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFA200] transition-all bg-white/5 backdrop-blur-sm relative">
                                    <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    {previewUrl ? (
                                        <div className="flex flex-col items-center">
                                            <img src={previewUrl} alt="Preview" className="h-40 object-contain rounded-lg mb-4" />
                                            <span className="text-white font-medium">{proofFile.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FaUpload className="text-4xl text-white/30 mb-4" />
                                            <span className="text-white/70 font-medium">Click to upload</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-linear-to-br from-[#FFA200] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <FaCheck className="text-black text-5xl" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-zentry text-white mb-3">Success!</h2>
                                <p className="text-white/60 mb-10 text-lg">We have received your request.</p>
                                <button onClick={() => navigate('/')} className="px-10 py-4 bg-[#FFA200] text-black rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">Return Home</button>
                            </div>
                        )}

                        {error && <p className="text-red-400 text-center mt-6">{error}</p>}
                    </div>

                    {/* Navigation Buttons */}
                    {step < 3 && (
                        <div className="flex justify-between mt-10 border-t border-white/10 pt-8">
                            {step > 0 ? (
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-6 py-3 rounded-full hover:bg-white/5">
                                    <FaArrowLeft /> Back
                                </button>
                            ) : <div></div>}

                            {step < 2 ? (
                                <button onClick={nextStep} className="bg-gradient-to-r from-[#FFA200] to-yellow-500 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:shadow-xl hover:shadow-[#FFA200]/50 transition-all flex items-center gap-2 transform hover:scale-105">
                                    Next <FaArrowRight />
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={loading} className="bg-gradient-to-r from-[#FFA200] to-yellow-500 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:shadow-xl hover:shadow-[#FFA200]/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                                    {loading ? 'Submitting...' : 'Submit'} <FaCheck />
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div >
        </div >
    );
};

export default MembershipRegistration;