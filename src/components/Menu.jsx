import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export function Menu({ currentChapter, onSelectChapter }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-20 p-2 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-gray-800 italic">
              Select Devotional
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-8">
            <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Book
            </h3>
            <div className="bg-sage-50 p-4 rounded-xl border border-sage-200">
              <span className="font-serif text-lg text-sage-800 block">
                Mark
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2 px-1">
              More books coming soon...
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Chapter
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 16 }, (_, i) => i + 1).map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => {
                    onSelectChapter(chapter - 1);
                    setIsOpen(false);
                  }}
                  className={`aspect-square rounded-xl flex items-center justify-center font-serif text-lg transition-all duration-200 ${
                    currentChapter + 1 === chapter
                      ? "bg-sage-500 text-white shadow-md scale-105"
                      : "bg-gray-50 text-gray-600 hover:bg-sage-100 hover:text-sage-700"
                  }`}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 flex flex-col items-center gap-2 opacity-50">
            <img
              src={logo}
              alt="Woodgreen Church"
              className="h-6 object-contain"
            />
            <p className="text-[10px] text-gray-400 font-sans">
              © 2026 Woodgreen Church
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
