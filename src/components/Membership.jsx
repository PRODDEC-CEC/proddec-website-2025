import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        name: 'First Year',
        price: '₹599',
        features: ['Access to Workshops', 'Mentorship Sessions', 'Basic Projects'],
        color: '#FDE047', // Yellow-300
        gradient: 'from-yellow-400 to-yellow-300',
        shadow: 'rgba(253, 224, 71, 0.3)',
        borderColor: 'border-yellow-300',
    
    },
    {
        name: 'Second Year',
        price: '₹499',
        features: ['Advanced Workshops', 'Hackathon Support', 'Core Projects'],
        color: '#FACC15', // Yellow-400
        gradient: 'from-yellow-500 to-yellow-400',
        shadow: 'rgba(250, 204, 21, 0.3)',
        borderColor: 'border-yellow-400'
    },
    {
        name: 'Third Year',
        price: '₹299',
        features: ['Leadership Roles', 'Industry Networking', 'Flagship Events'],
        color: '#FBBF24', // Yellow-500
        gradient: 'from-amber-500 to-amber-400',
        shadow: 'rgba(234, 179, 8, 0.3)',
        borderColor: 'border-amber-500'
    },
    {
        name: 'Fourth Year',
        price: '₹99',
        features: ['Alumni Access', 'Placement Assist', 'Honorary Membership'],
        color: '#FBBF24', // Yellow-600
        gradient: 'from-amber-600 to-amber-500',
        shadow: 'rgba(217, 119, 6, 0.3)',
        borderColor: 'border-amber-500'
    }
];

const Membership = () => {
    const navigate = useNavigate();
    // Default to First Year selected
    const [selectedPlan, setSelectedPlan] = useState('First Year');

    return (
        <section className="w-[85vw] md:w-full py-10 mx-auto bg-black text-white" id="membership">
            <div className="w-[85vw] mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-[#FFA200] font-bold text-sm uppercase tracking-widest mb-2">PRODDEC MEMBER</p>
                    <h2 className="text-4xl md:text-5xl mb-6">Choose your Membership Tier</h2>
                    <ul className="space-y-3 font-sans text-sm md:text-lg">
                        <li className="flex items-center gap-3 text-white/80">
                            <FaCheck className="text-[#FFA200]" />
                            <span>Exclusive access to PRODDEC resources and tools</span>
                        </li>
                        <li className="flex items-center gap-3 text-white/80">
                            <FaCheck className="text-[#FFA200]" />
                            <span>Network with seniors and industry experts</span>
                        </li>
                        <li className="flex items-center gap-3 text-white/80">
                            <FaCheck className="text-[#FFA200]" />
                            <span>Priority registration for all flagship events</span>
                        </li>
                    </ul>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.name;

                        return (
                            <motion.div
                                key={plan.name}
                                onClick={() => setSelectedPlan(plan.name)}
                                whileHover={{ scale: 1.02 }}
                                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${isSelected
                                    ? `bg-white text-black ${plan.borderColor}`
                                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                                    }`}
                                style={{
                                    boxShadow: isSelected ? `0 0 30px ${plan.shadow}` : 'none'
                                }}
                            >
                                {plan.isBest && (
                                    <div className="absolute top-0 right-0 bg-[#FFA200] text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl z-10 tracking-widest">
                                        BEST VALUE
                                    </div>
                                )}
                                {/* Card Header (Gradient Box) */}
                                <div className={`mb-6 p-4 -mx-6 -mt-6 rounded-t-2xl font-sans font-bold uppercase tracking-wider text-center ${isSelected
                                    ? `bg-linear-to-r ${plan.gradient} text-white`
                                    : 'bg-white/10 text-white/50'
                                    }`}>
                                    {plan.name}
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className={`text-sm ml-1 ${isSelected ? 'text-black/60' : 'text-white/60'}`}>/ Yearly</span>
                                </div>

                                {/* Features */}
                                <div className={`space-y-4 text-sm border-t pt-6 ${isSelected ? 'border-black/10' : 'border-white/10'}`}>
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <FaCheck className={`mt-1`} style={{ color: isSelected ? plan.color : 'rgba(255,255,255,0.5)' }} />
                                            <div>
                                                <p className={`font-medium font-sans ${isSelected ? 'text-black/80' : 'text-white/80'}`}>{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/register-membership?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`);
                                    }}
                                    className={`w-full mt-8 py-3 rounded-2xl font-bold uppercase tracking-wider transition-colors text-white`}
                                    style={{
                                        backgroundColor: isSelected ? plan.color : 'rgba(255,255,255,0.1)',
                                        color: isSelected ? 'white' : 'white'
                                    }}
                                >
                                    Select {plan.name}
                                </button>

                            </motion.div>
                        );
                    })}
                </div>

                <p className="text-center text-white/30 text-xs font-sans mt-12">
                    *Membership validity is for the end of your academic year. Benefits apply accordingly.
                </p>

            </div>
        </section>
    );
};

export default Membership;
