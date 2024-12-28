import Image from "next/image";
import About from "./about/page";
import Navbar from "@/app/components/navbar/navbar";

export default function Home() {
  return (
    <>
    {/* <div>Home</div> */}
    {/* <About/> */}
    <Navbar/>
    <About/>
    </>
  );
}
