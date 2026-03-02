import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative w-24 h-24">
                {/* Background (Empty/Ghost version) */}
                <img 
                    src="/images/logo.png" 
                    alt="PRODDEC Background" 
                    className="absolute inset-0 w-full h-full object-contain opacity-20 filter grayscale"
                />

                {/* Foreground (Filling version) */}
                <div className="absolute inset-0 w-full h-full animate-[fill-logo_2.5s_linear_forwards] overflow-hidden">
                    <img 
                        src="/images/logo.png" 
                        alt="PRODDEC Filled" 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <style>{`
                @keyframes fill-logo {
                    0% { clip-path: inset(100% 0 0 0); filter: grayscale(100%); }
                    100% { clip-path: inset(0 0 0 0); filter: grayscale(0%); }
                }
            `}</style>
        </div>
    );
};

export default Loader;
