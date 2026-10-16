import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 dark:bg-[#0B0F14]/95 backdrop-blur-sm transition-colors duration-150">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-base font-semibold text-text hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          Vinesh Shanmugam
        </NavLink>

        {/* Desktop Nav - exactly 5 items */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 hover:text-accent hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${
                  isActive
                    ? 'text-accent font-semibold underline'
                    : 'text-text-muted hover:text-text'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="p-2 -mr-2 text-text hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div id="mobile-nav" className="md:hidden border-b border-border bg-surface dark:bg-[#0E131A] px-4 pt-2 pb-4">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-accent font-semibold bg-white dark:bg-[#151C24]'
                      : 'text-text-muted hover:text-text hover:bg-white/50 dark:hover:bg-[#151C24]/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
