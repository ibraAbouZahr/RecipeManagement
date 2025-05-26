import React from "react";
import { Home, MessageCircle, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <nav className="flex space-x-8">
            <Link
              to={"/"}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link
              to={"/chatbot"}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <MessageCircle size={16} />
              <span>Chatbot</span>
            </Link>

            <Link
              to={"/about"}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Calendar size={16} />
              <span>About</span>
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-end space-x-1">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>© 2025</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
