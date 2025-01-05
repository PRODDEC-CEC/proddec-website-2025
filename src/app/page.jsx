import react from "react";
import Hero from "./_components/Hero/hero"
import Add1 from "./_components/add1"
import Navbar from "./_components/navbar";
import "./globals.css"



export default function Home() {

  return (
    <>
    {/* <div className="bg-[#444444] py-10 px-4"> */}
    <div className="overflow-x-hidden">
    <Navbar></Navbar>
    <Hero></Hero>
    <Add1></Add1>
    </div>
    </>
  );
}
