import React from "react";
import { Link } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import { EventCard } from "./EventCard";

const PastEvents = () => {
  const { events, loading, error } = useEvents();

  // Show only the first 3 events
  const recentEvents = events.slice(0, 3);

  return (
    <section id="past-events" className="w-full py-20 px-4 md:px-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-[#FFA200]">Past <span className="text-white">Events</span></h2>
      <p className="text-white/50 mb-12 text-5xl text-center">
        Highlighting our journey through tech excellence.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 mb-8">Failed to load events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl justify-items-center mb-12">
          {recentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <Link to="/events">
        <button className="px-8 py-3 rounded-full border border-[#FFA200] text-[#FFA200] font-bold uppercase tracking-widest hover:bg-[#FFA200] hover:text-black transition-all duration-300">
          See All Events
        </button>
      </Link>
    </section>
  );
};

export default PastEvents;


