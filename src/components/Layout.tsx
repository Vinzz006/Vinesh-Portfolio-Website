import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text transition-colors duration-150">
      <ScrollToTop />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 px-4 py-2 bg-accent text-white rounded font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
