import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-sm bg-opacity-95" : "shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer relative">
          <i className="bi bi-whatsapp text-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"></i>
          <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-green-200 transition-colors duration-300">
            SwiftChat
          </span>
          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* <a
            href="https://github.com/khushallakhtariya/SwiftChat"
            target="_blank"
            rel="noreferrer"
            className="relative px-3 py-1.5 md:px-5 md:py-2.5 text-white rounded-lg flex items-center text-sm md:text-base font-medium group cursor-pointer hover:bg-white/10 transition-all duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-lg before:border-[1px] before:border-white/30 before:scale-[1.01] before:opacity-0 hover:before:scale-105 hover:before:opacity-100 before:transition-all before:duration-300"
          >
            <i className="bi bi-github mr-2 text-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"></i>
            <span className="group-hover:text-green-200 transition-colors duration-300">
              Code
            </span>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
          </a> */}
          {/* <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=khushallakhatariya@gmail.com&su=Contact%20from%20SwiftChat"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            title="Contact via Email"
          >
            <i className="bi bi-envelope text-xl"></i>
          </a> */}
          <button
            onClick={() => {
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=khushallakhatariya@gmail.com&su=Contact%20from%20SwiftChat",
                "_blank"
              );
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            Help
          </button>
          {/* <a
            href="#"
            className="relative px-3 py-1.5 md:px-5 md:py-2.5 bg-white text-green-700 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-300 text-sm md:text-base font-medium group overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-700 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:origin-center"
          >
            <span className="relative z-10 flex items-center">
              <i className="bi bi-box-arrow-in-right mr-1.5 transition-all duration-300 group-hover:translate-x-0.5"></i>
              Login
            </span>
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
