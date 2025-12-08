import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <h1 className="text-8xl font-extrabold mb-6 animate-pulse">404!</h1>
      <Image
        src="/images/chill-guy.png"
        alt="Chill Guy 404"
        width={300}
        height={300}
        priority
         
      />
      
      <p className="text-xl mt-4 italic">
        "404, but I'm a chill guy, so we'll find it eventually"
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
