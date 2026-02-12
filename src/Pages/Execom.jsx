import React, { useMemo } from 'react';
import ProfileCard from '../components/ProfileCard';
import useExecom from '../hooks/useExecom';
import SEO from '../components/SEO';

const ExecomSection = ({ title, members }) => {
  if (!members || members.length === 0) return null;

  return (
    <div className="mb-24 relative px-4 md:px-16 w-full">
      <div className="flex items-center mb-10 pl-4 border-l-4 border-[#FFA200]">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-zentry tracking-wide text-[#FFA200]">{title}</h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 md:overflow-visible md:pb-0 md:px-0">
        {members.map((member) => (
          <div key={member.id} className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-auto transform hover:z-10 transition-all duration-300">
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

  // Sort years descending to display latest first
  const sortedYears = useMemo(() => {
    return Object.keys(execom).sort((a, b) => b.localeCompare(a));
  }, [execom]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 overflow-x-hidden w-full">
      <SEO
        title="Execom"
        description="Meet the executive committee members of PRODDEC led by visionary students."
      />
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-zentry font-bold text-center mb-20 uppercase tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Execom</span>{' '}
          <span className="text-[#FFA200]">Members</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Failed to load Execom members.</p>
          </div>
        ) : showCurrentOnly ? (
          /* Show only Current Team */
          <ExecomSection
            key={currentYear}
            title={`Team ${currentYear}`}
            members={currentTeam}
          />
        ) : (
          /* Show All Teams */
          sortedYears.map(year => (
            <ExecomSection
              key={year}
              title={`Team ${year}`}
              members={execom[year]}
            />
          ))
        )}
      </div>
    </div>
  );
}