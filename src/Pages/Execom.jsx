import React, { useMemo, useState, useEffect, useRef } from 'react';
import ProfileCard from '../components/ProfileCard';
import useExecom from '../hooks/useExecom';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const ExecomSection = ({ title, members, filter }) => {
  if (!members || members.length === 0) return null;

  return (
    <div className="mb-24 relative px-4 md:px-0 w-[90vw] mx-auto md:w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pl-4 border-l-4 border-[#FFA200]">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-zentry tracking-wide text-[#FFA200]">{title}</h2>
        <div className="mt-4 md:mt-0">
          {filter}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
        {members.map((member) => (
          <div key={member.id} className="w-full transform hover:z-10 transition-all duration-300">
            <ProfileCard
              name={member.name}
              title={member.title}
              handle={member.handle}
              avatarUrl={member.avatarUrl}
              className="shadow-2xl h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Execom({ showCurrentOnly = false }) {
  const { execom, currentTeam, currentYear, loading, error } = useExecom();
  const [selectedYear, setSelectedYear] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sort years descending to display latest first
  const sortedYears = useMemo(() => {
    return Object.keys(execom).sort((a, b) => b.localeCompare(a));
  }, [execom]);

  // Set default selected year when data loads
  useEffect(() => {
    if (sortedYears.length > 0 && !selectedYear) {
      setSelectedYear(sortedYears[0]);
    }
  }, [sortedYears, selectedYear]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 overflow-x-hidden w-full">
      <SEO
        title="Execom"
        description="Meet the executive committee members of PRODDEC led by visionary students."
      />
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-zentry font-bold text-center mb-10 uppercase tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Execom</span>{' '}
          <span className="text-[#FFA200]">Members</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : null}

        {error ? (
          <div className="text-center text-red-500">
            <p>Failed to load Execom members.</p>
          </div>
        ) : null}

        {/* Show Selected Team with Filter */}
        {!showCurrentOnly && !loading && !error && sortedYears.length > 0 && selectedYear && execom[selectedYear] ? (
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExecomSection
              title={`Team ${selectedYear}`}
              members={execom[selectedYear]}
              filter={
                <div ref={dropdownRef} className="relative z-40">
                  {/* Segmented Trigger */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                      group relative flex items-center gap-2.5 pl-4 pr-3 py-2
                      bg-black/60 backdrop-blur-sm
                      border rounded-lg
                      font-zentry tracking-wider
                      transition-all duration-300 cursor-pointer
                      overflow-hidden
                      ${isDropdownOpen
                        ? 'border-[#FFA200]/70 ring-1 ring-[#FFA200]/20'
                        : 'border-zinc-800 hover:border-[#FFA200]/30'}
                    `}
                  >
                    {/* Animated glow line at bottom */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFA200] to-transparent"
                      initial={{ width: '0%', left: '50%' }}
                      animate={isDropdownOpen
                        ? { width: '100%', left: '0%' }
                        : { width: '0%', left: '50%' }}
                      transition={{ duration: 0.3 }}
                    />

                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#FFA200] shrink-0">
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span className="text-sm text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                      {selectedYear || 'Select Year'}
                    </span>

                    {/* Divider */}
                    <span className="w-px h-5 bg-zinc-700/60 mx-0.5" />

                    <motion.span
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800/80 text-zinc-400 group-hover:text-[#FFA200] transition-colors"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  </button>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-full mt-2 min-w-[220px] origin-top-right z-[60]
                          bg-[#0c0c0c] border border-zinc-800/70
                          rounded-xl overflow-hidden
                          shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)]"
                      >
                        {/* Top accent bar */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-[#FFA200]/0 via-[#FFA200]/60 to-[#FFA200]/0" />

                        {/* Label row */}
                        <div className="flex items-center justify-between px-4 pt-3 pb-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-montserrat font-semibold">
                            Batch Year
                          </span>
                          <span className="text-[10px] text-zinc-700 font-montserrat">
                            {sortedYears.length} batches
                          </span>
                        </div>

                        {/* Separator */}
                        <div className="mx-3 h-px bg-zinc-800/50" />

                        {/* Options List */}
                        <div className="py-1 max-h-60 overflow-y-auto scrollbar-hide">
                          {sortedYears.map((yearKey, index) => {
                            const isSelected = selectedYear === yearKey;

                            return (
                              <motion.button
                                key={yearKey}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.15 }}
                                onClick={() => {
                                  setSelectedYear(yearKey);
                                  setIsDropdownOpen(false);
                                }}
                                className={`
                                  w-full px-4 py-2.5 flex items-center gap-3
                                  text-left transition-all duration-150 cursor-pointer relative
                                  ${isSelected
                                    ? 'bg-[#FFA200]/[0.06]'
                                    : 'hover:bg-white/[0.03]'}
                                `}
                              >
                                {/* Active indicator bar */}
                                {isSelected && (
                                  <motion.div
                                    layoutId="activeYear"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#FFA200]"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                  />
                                )}

                                {/* Checkbox style */}
                                <span className={`
                                  flex items-center justify-center w-[18px] h-[18px] rounded
                                  border transition-all duration-200 shrink-0
                                  ${isSelected
                                    ? 'border-[#FFA200] bg-[#FFA200]'
                                    : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'}
                                `}>
                                  {isSelected && (
                                    <motion.svg
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                      width="10" height="8" viewBox="0 0 10 8" fill="none"
                                    >
                                      <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </motion.svg>
                                  )}
                                </span>

                                <div className="flex flex-col">
                                  <span className={`
                                    font-zentry tracking-wide text-sm leading-tight transition-colors duration-150
                                    ${isSelected ? 'text-[#FFA200]' : 'text-zinc-400'}
                                  `}>
                                    {yearKey}
                                  </span>
                                </div>

                                {isSelected && (
                                  <span className="ml-auto text-[10px] text-[#FFA200]/60 font-montserrat uppercase tracking-wider">
                                    Active
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              }
            />
          </motion.div>
        ) : null}

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : showCurrentOnly ? (
          /* Show only Current Team */
          <ExecomSection
            key={currentYear}
            title={`Team ${currentYear}`}
            members={currentTeam}
          />
        ) : null}
      </div>
    </div>
  );
}