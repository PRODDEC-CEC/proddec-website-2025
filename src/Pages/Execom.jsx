import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';

const execom2025 = [
  { id: 1, name: 'John Doe', title: 'Chairperson', handle: 'john_doe', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 2, name: 'Jane Smith', title: 'Vice Chairperson', handle: 'jane_smith', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 3, name: 'Alice Johnson', title: 'Secretary', handle: 'alice_j', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 4, name: 'Bob Brown', title: 'Treasurer', handle: 'bob_b', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 5, name: 'Charlie Green', title: 'Tech Lead', handle: 'charlie_g', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
];

const execom2024 = [
  { id: 1, name: 'Charlie Davis', title: 'Chairperson', handle: 'charlie_d', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 2, name: 'Diana Evans', title: 'Vice Chairperson', handle: 'diana_e', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 3, name: 'Evan Foster', title: 'Program Operation Manager', handle: 'evan_f', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 4, name: 'Fiona Green', title: 'Documentation Lead', handle: 'fiona_g', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
   { id: 5, name: 'George Harris', title: 'R & D Software Lead', handle: 'george_h', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
];

const ExecomSection = ({ title, members }) => {
  return (
    <div className="mb-24 relative px-4 md:px-16">
      <div className="flex items-center mb-10 pl-4 border-l-4 border-[#FFA200]">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-zentry tracking-wide text-[#FFA200]">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
          {members.map((member) => (
            <div key={member.id} className="transform hover:z-10 transition-all duration-300">
               <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                avatarUrl={member.avatarUrl}
                className="shadow-2xl"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default function Execom() {
  const [selectedYear, setSelectedYear] = useState('2025');

  const execomData = {
    '2025': { title: 'Team 2024-2025', members: execom2025 },
    '2024': { title: 'Team 2023-2024', members: execom2024 },
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 overflow-x-hidden">
       <div className="container mx-auto relative">
            <div className="absolute top-0 right-4 md:right-16 z-20">
                <div className="relative">
                    <select
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-zinc-900 border border-[#FFA200] text-[#FFA200] pl-6 pr-12 py-2 rounded-md focus:outline-none font-zentry tracking-wide font-bold cursor-pointer text-lg appearance-none"
                    >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#FFA200]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-zentry font-bold text-center mb-20 uppercase tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Execom</span>{' '}
                <span className="text-[#FFA200]">Members</span>
            </h1>
            
            {execomData[selectedYear] && (
                <ExecomSection 
                    title={execomData[selectedYear].title} 
                    members={execomData[selectedYear].members} 
                />
            )}
       </div>
    </div>
  );
}