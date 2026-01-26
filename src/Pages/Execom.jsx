import React from 'react';
import ProfileCard from '../components/ProfileCard';

const execom2026 = [
  { id: 1, name: 'John Doe', title: 'Chairperson', handle: 'john_doe', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 2, name: 'Jane Smith', title: 'Vice Chairperson', handle: 'jane_smith', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 3, name: 'Alice Johnson', title: 'Secretary', handle: 'alice_j', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 4, name: 'Bob Brown', title: 'Treasurer', handle: 'bob_b', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
  { id: 5, name: 'Charlie Green', title: 'Tech Lead', handle: 'charlie_g', avatarUrl: 'https://reactbits.dev/assets/demo/person.webp' },
];

const execom2025 = [
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
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 overflow-x-hidden">
       <div className="container mx-auto">
            <h1 className="text-5xl md:text-7xl font-zentry font-bold text-center mb-20 uppercase tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Execom</span>{' '}
                <span className="text-[#FFA200]">Members</span>
            </h1>
            
            <ExecomSection title="Team 2025-2026" members={execom2026} />
            <ExecomSection title="Team 2024-2025" members={execom2025} />
       </div>
    </div>
  );
}