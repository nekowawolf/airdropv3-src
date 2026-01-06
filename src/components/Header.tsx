'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaXTwitter, FaSun, FaMoon } from 'react-icons/fa6';
import { FaGithub, FaLinkedin, FaBars } from 'react-icons/fa';
import { toggleDarkMode } from '@/utils/darkmode';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const current = typeof window !== 'undefined' && localStorage.getItem('darkmode') === 'active';
    setIsDarkMode(current);
  }, []);

  const onToggle = () => {
    toggleDarkMode();
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header className="w-full border-b border-color navbar-color">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="#" className="text-fill-color text-lg font-semibold hover:opacity-80">
              Airdrops
            </Link>
            <Link href="#" className="text-fill-color text-lg font-semibold hover:opacity-80">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="card-color w-10 h-10 rounded-md border border-color flex justify-center items-center text-fill-color text-xl sm:hidden"
            >
              <FaBars />
            </button>

            <button
              id="theme-switch"
              aria-label="Toggle dark mode"
              onClick={onToggle}
              className="card-color w-10 h-10 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
            >
              <FaMoon id="moon-icon" className={`${isDarkMode ? 'hidden' : ''}`} />
              <FaSun id="sun-icon" className={`${isDarkMode ? '' : 'hidden'}`} />
            </button>

            <Link
              href="#"
              aria-label="GitHub"
              className="card-color w-10 h-10 rounded-md border border-color flex justify-center items-center text-fill-color text-xl hover:opacity-80"
            >
              <FaGithub />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="card-color w-10 h-10 rounded-md border border-color flex justify-center items-center text-fill-color text-xl hover:opacity-80"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="#"
              aria-label="X"
              className="card-color w-10 h-10 rounded-md border border-color flex justify-center items-center text-fill-color text-xl hover:opacity-80"
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden border-t border-color navbar-color">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex flex-col gap-3">
            <Link
              href="#"
              className="text-fill-color text-base font-semibold hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Airdrops
            </Link>
            <Link
              href="#"
              className="text-fill-color text-base font-semibold hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}