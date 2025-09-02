import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { trackVirtualPageView } from '@/hooks/useSEO';

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
    updateSEOMetadata(path);

    // Handle browser back/forward
    const handlePopState = () => {
      const newPath = window.location.pathname;
      setCurrentRoute(newPath);
      updateSEOMetadata(newPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentRoute) {
      // Get page title for tracking
      const pageTitle = getPageTitle(path);
      
      // Update browser history and track pageview
      trackVirtualPageView(path, pageTitle);
      
      setCurrentRoute(path);
      updateSEOMetadata(path);
    }
  };

  const getPageTitle = (path: string): string => {
    if (path === '/') return 'Numerology Insights - Discover Your Numbers';
    if (path === '/auth') return 'Sign In - Numerology Insights';
    if (path.startsWith('/number/')) {
      const number = path.split('/')[2];
      return `Number ${number} - Numerology Insights`;
    }
    return 'Numerology Insights';
  };

  const updateSEOMetadata = (path: string) => {
    let title = getPageTitle(path);
    let description = 'Unlock the secrets of numerology with personalized insights for numbers 1-9. Discover your strengths, career paths, and life guidance through ancient wisdom.';
    
    if (path.startsWith('/number/')) {
      const number = path.split('/')[2];
      description = `Discover the complete numerology profile for number ${number}. Unlock career insights, personality traits, strengths, and life guidance through ancient numerological wisdom.`;
    } else if (path === '/auth') {
      description = 'Sign in to unlock your personalized numerology career insights and access premium content';
    }
    
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + path);
    }
  };

  return <>{children(currentRoute, navigate)}</>;
}