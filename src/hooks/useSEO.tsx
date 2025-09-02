import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useSEO(data: SEOData, path?: string) {
  useEffect(() => {
    // Update document title
    document.title = data.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', data.description);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const canonicalUrl = data.canonical || `${window.location.origin}${path || window.location.pathname}`;
    canonical.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', data.title);
    updateMetaTag('property', 'og:description', data.description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', 'website');

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary');
    updateMetaTag('name', 'twitter:title', data.title);
    updateMetaTag('name', 'twitter:description', data.description);

    // Track virtual pageview
    if (path && window.gtag) {
      window.gtag('config', 'G-MEASUREMENT_ID', {
        page_path: path,
        page_title: data.title
      });
    }
  }, [data.title, data.description, data.canonical, path]);
}

function updateMetaTag(attributeName: string, attributeValue: string, content: string) {
  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function trackVirtualPageView(path: string, title: string) {
  // Update browser history
  window.history.pushState({}, title, path);
  
  // Track with Google Analytics
  if (window.gtag) {
    window.gtag('config', 'G-MEASUREMENT_ID', {
      page_path: path,
      page_title: title
    });
  }
}