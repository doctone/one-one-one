import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import { useDevotionalContent } from "../context/DevotionalContext";

const normalizeBook = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

export function Menu({ currentBook, currentChapter, currentVerse }) {
  const devotionalContent = useDevotionalContent();
  const books = [
    ...new Set(
      devotionalContent.map((d) => d.book).filter(Boolean)
    ),
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(() => {
    return (
      books.find((b) => normalizeBook(b) === normalizeBook(currentBook)) ||
      books[0] ||
      ""
    );
  });
  const [selectedChapter, setSelectedChapter] = useState(currentChapter || 1);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Update selected chapter when current chapter changes
  useEffect(() => {
    if (currentChapter) {
      setSelectedChapter(currentChapter);
    }
  }, [currentChapter]);

  // Update selected book when current book changes or books load
  useEffect(() => {
    if (!books.length) return;
    const normalizedCurrent = normalizeBook(currentBook);
    const match =
      books.find((b) => normalizeBook(b) === normalizedCurrent) || books[0];
    if (match && match !== selectedBook) {
      setSelectedBook(match);
    }
  }, [books, currentBook]);

  const bookContent = devotionalContent.filter(
    (d) => normalizeBook(d.book) === normalizeBook(selectedBook)
  );

  // Get all unique chapters for selected book
  const chapters = [...new Set(bookContent.map((d) => d.chapter))].sort(
    (a, b) => a - b
  );

  // Get verses for the selected chapter
  const versesInChapter = bookContent.filter(
    (d) => d.chapter === selectedChapter
  );

  // Reset chapter if selected book changes
  useEffect(() => {
    if (!chapters.length) return;
    if (!chapters.includes(selectedChapter)) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters, selectedChapter]);

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
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
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

          <div className="mb-6">
            <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Book
            </h3>
            <div className="flex flex-wrap gap-2">
              {books.map((book) => {
                const firstForBook = devotionalContent.find(
                  (d) => normalizeBook(d.book) === normalizeBook(book)
                );
                const isActive = normalizeBook(currentBook) === normalizeBook(book);

                if (!firstForBook) {
                  return (
                    <button
                      key={book}
                      onClick={() => setSelectedBook(book)}
                      className="px-3 py-2 rounded-xl font-serif text-sm bg-gray-50 text-gray-600"
                    >
                      {book}
                    </button>
                  );
                }

                return (
                  <Link
                    key={book}
                    to="/bible/$book/$chapterId/$verseId"
                    params={{
                      book: firstForBook.book,
                      chapterId: firstForBook.chapter,
                      verseId: firstForBook.verse,
                    }}
                    onClick={() => setSelectedBook(book)}
                    className={`px-3 py-2 rounded-xl font-serif text-sm transition-all duration-200 ${isActive
                      ? "bg-sage-500 text-white shadow-md scale-[1.02]"
                      : "bg-gray-50 text-gray-600 hover:bg-sage-100 hover:text-sage-700"
                      }`}
                  >
                    {book}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Chapter
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {chapters.map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`aspect-square rounded-xl flex items-center justify-center font-serif text-lg transition-all duration-200 ${selectedChapter === chapter
                    ? "bg-sage-500 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-600 hover:bg-sage-100 hover:text-sage-700"
                    }`}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Verses in Chapter {selectedChapter}
            </h3>
            {versesInChapter.length > 0 ? (
              <div className="flex flex-col gap-3">
                {versesInChapter.map((devotional) => {
                  const isActive = currentChapter === devotional.chapter && currentVerse === devotional.verse;

                  return (
                    <Link
                      key={devotional.id}
                      to="/bible/$book/$chapterId/$verseId"
                      params={{
                        book: devotional.book,
                        chapterId: devotional.chapter,
                        verseId: devotional.verse,
                      }}
                      onClick={() => setIsOpen(false)}
                      className={`p-4 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-sage-500 text-white shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-sage-100 hover:text-sage-700"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-serif text-sm">
                            {devotional.verseRef}
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isActive ? "bg-white/20" : "bg-sage-100 text-sage-700"
                          }`}>
                          {devotional.verse}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No devotionals available for this chapter yet.
              </p>
            )}
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
