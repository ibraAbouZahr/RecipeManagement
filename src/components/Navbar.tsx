import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  faHouseChimney,
  faBars,
  faXmark,
  faUserCircle,
  faLanguage,
  faNoteSticky,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggle from "../components/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { icon: faHouseChimney, text: "Home", link: "/" },
    { icon: faRobot, text: "Chatbot", link: "/Chatbot" },
    { icon: faUserCircle, text: "About", link: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-nav shadow-md border-b-1 border-gray-500">
      <div className="container w-11/12 md:w-4/5 mx-auto flex flex-row justify-between items-center p-4 text-text">
        {/* Logo */}
        <div className="hover:text-accent transition-colors duration-150">
          <Link to="/" onClick={() => handleNavClick("/")}>
            <h1 className="text-2xl">
              {" "}
              <FontAwesomeIcon icon={faNoteSticky} /> Notes.
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-x-6 text-text ">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="hover:text-bg transition-colors duration-150"
            >
              <Link
                to={item.link}
                className="flex items-center gap-2"
                onClick={() => handleNavClick(item.link)}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side items */}
        <div className="hidden md:flex gap-2 items-center">
          <div className="pr-5">
            <ThemeToggle />
          </div>
          <div className="hover:text-accent transition-colors duration-150 text-nav cursor-pointer">
            <FontAwesomeIcon icon={faLanguage} className="text-xl" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-nav hover:text-accent transition-colors duration-150"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faXmark : faBars}
              className="text-2xl"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-main border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
          <ul className="flex flex-col w-full">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <Link
                  to={item.link}
                  className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors duration-150"
                  onClick={() => {
                    toggleMenu();
                    handleNavClick(item.link);
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5" />
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center hover:text-accent transition-colors duration-150 text-nav cursor-pointer gap-3">
                <FontAwesomeIcon icon={faLanguage} className="w-5" />
                <h2>Languages</h2>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
