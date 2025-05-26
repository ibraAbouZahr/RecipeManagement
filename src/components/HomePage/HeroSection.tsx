import React from "react";
import {
  faUtensils,
  faSearch,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "calc(100vh - 4rem)",
        background: "var(--color-bg)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, transparent 70%)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              <span className="block">Cook Smarter,</span>
              <span
                className="block mt-2"
                style={{ color: "var(--color-primary)" }}
              >
                Organize Effortlessly
              </span>
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl leading-relaxed opacity-80"
              style={{ color: "var(--color-text)" }}
            >
              Discover, save, and manage your favorite recipes—all in one
              deliciously simple app. Plan meals, explore cuisines, and cook
              with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => (window.location.href = "/recipes")}
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 font-semibold rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                Browse Recipes
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <Link
                to="/about"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 border font-semibold rounded-lg transition duration-300 transform hover:scale-105 hover:opacity-80"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-text)",
                  backgroundColor: "transparent",
                }}
              >
                See How It Works
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div
                  className="p-3 rounded-lg mb-2 bg-white/10" // background with opacity
                >
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-text text-2xl font-bold"
                    bounce
                  />
                </div>
                <span
                  className="text-sm opacity-70"
                  style={{ color: "var(--color-text)" }}
                >
                  Recipe Organizer
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div
                  className="p-3 rounded-lg mb-2 bg-white/10" // background with opacity
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-text text-2xl font-bold"
                    beat
                  />
                </div>
                <span
                  className="text-sm opacity-70"
                  style={{ color: "var(--color-text)" }}
                >
                  Ingredient Search
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div
                  className="p-3 rounded-lg mb-2 bg-white/10" // background with opacity
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-text text-2xl font-bold"
                    shake
                  />
                </div>
                <span
                  className="text-sm opacity-70"
                  style={{ color: "var(--color-text)" }}
                >
                  Easy Editing
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual UI Mock */}
          <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 p-6"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="rounded-lg p-4 mb-4 border"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-primary)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div
                    className="h-4 rounded animate-pulse"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.3,
                      width: "75%",
                    }}
                  ></div>
                  <div
                    className="h-3 rounded opacity-20"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "100%",
                    }}
                  ></div>
                  <div
                    className="h-3 rounded opacity-20"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "83%",
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3 border"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    opacity: 0.1,
                    borderColor: "var(--color-primary)",
                  }}
                >
                  <div
                    className="h-2 rounded mb-2"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.5,
                      width: "67%",
                    }}
                  ></div>
                  <div
                    className="h-2 rounded mb-1 opacity-30"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "100%",
                    }}
                  ></div>
                  <div
                    className="h-2 rounded opacity-30"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "75%",
                    }}
                  ></div>
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    opacity: 0.1,
                    borderColor: "var(--color-primary)",
                  }}
                >
                  <div
                    className="h-2 rounded mb-2"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.5,
                      width: "50%",
                    }}
                  ></div>
                  <div
                    className="h-2 rounded mb-1 opacity-30"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "100%",
                    }}
                  ></div>
                  <div
                    className="h-2 rounded opacity-30"
                    style={{
                      backgroundColor: "var(--color-text)",
                      width: "80%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs flex items-center gap-2 text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Updating Recipe...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
