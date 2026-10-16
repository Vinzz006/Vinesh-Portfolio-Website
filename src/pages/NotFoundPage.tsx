import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
  });

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-24 text-left">
      <h1 className="text-3xl sm:text-4xl font-semibold text-text tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-text-muted leading-relaxed mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-4 py-2.5 rounded text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
      >
        Return to Home
      </Link>
    </div>
  );
}
