import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface VirtualRouterProps {
  user: User | null;
  children: (currentRoute: string, navigate: (path: string) => void) => React.ReactNode;
}

export function VirtualRouter({ user, children }: VirtualRouterProps) {
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Initialize route from URL
    const path = window.location.pathname;
    setCurrentRoute(path);

    // Handle browser back/forward
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentRoute) {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      
      // Update document title and meta tags
      updateSEOMetadata(path);
      
      // Send virtual pageview to analytics (if configured)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: path,
        });
      }
    }
  };

  const updateSEOMetadata = (path: string) => {
    let title = 'Numerology Career Guidance';
    let description = 'Discover your destiny career through ancient numerology wisdom';
    
    if (path.startsWith('/number/')) {
      const number = path.split('/')[2];
      title = `Number ${number} - Numerology Career Guidance`;
      description = `Discover the career path and personality traits for numerology number ${number}`;
    } else if (path === '/auth') {
      title = 'Sign In - Numerology Career Guidance';
      description = 'Sign in to unlock your personalized numerology career insights';
    }
    
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + path);
    }
  };

  return <>{children(currentRoute, navigate)}</>;
}