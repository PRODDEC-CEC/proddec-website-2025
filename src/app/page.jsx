import react from "react";
import Hero from "./_components/Hero/hero"
import Add1 from "./_components/add1"
import Navbar from "./_components/navbar";
import gsap from "gsap"



export default function Home() {

  return (
    <>
    <div>
    <Navbar></Navbar>
    <Hero></Hero>
    <Add1></Add1>
    </div>
    </>
  );
}
