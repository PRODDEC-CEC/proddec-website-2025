import react from "react";
import Hero from "./_components/Hero/hero"
import Events from "./_components/Events/events"
import Navbar from "./_components/navbar";
import "./globals.css"



export default function Home() {

  return (
    <>
    {/* <div className="bg-[#444444] py-10 px-4"> */}
    <div className="overflow-x-hidden">
    <Navbar></Navbar>
    <Hero></Hero>
    <Events></Events>

    </div>
    </>
  );
}
