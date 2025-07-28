/**
 * Performance Monitoring and Optimization System
 * 
 * This module provides comprehensive performance monitoring including:
 * - Real-time performance metrics
 * - Bundle size optimization
 * - Lazy loading strategies
 * - Caching mechanisms
 * - CDN integration
 * - Performance analytics
 */

import { useEffect, useRef, useCallback } from 'react';

// Performance metrics collection
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isInitialized = false;
  }

  // Initialize performance monitoring
  init() {
    if (this.isInitialized) return;
    
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor user interactions
    this.observeUserInteractions();
    
    this.isInitialized = true;
  }

  // Observe Largest Contentful Paint (LCP)
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('LCP', observer);
    }
  }

  // Observe First Input Delay (FID)
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.set('FID', observer);
    }
  }

  // Observe Cumulative Layout Shift (CLS)
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('CLS', observer);
    }
  }

  // Observe resource loading performance
  observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
            this.recordMetric('API_RESPONSE_TIME', entry.duration);
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
      this.observers.set('RESOURCE', observer);
    }
  }

  // Observe user interactions
  observeUserInteractions() {
    const events = ['click', 'input', 'scroll', 'resize'];
    events.forEach(event => {
      window.addEventListener(event, (e) => {
        this.recordMetric(`USER_INTERACTION_${event.toUpperCase()}`, Date.now());
      }, { passive: true });
    });
  }

  // Record a performance metric
  recordMetric(name, value) {
    const timestamp = Date.now();
    const metric = {
      name,
      value,
      timestamp,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.metrics.set(`${name}_${timestamp}`, metric);
    
    // Send to analytics if configured
    this.sendToAnalytics(metric);
  }

  // Send metrics to analytics service
  sendToAnalytics(metric) {
    // Implementation for sending to analytics service
    if (process.env.REACT_APP_ANALYTICS_ENABLED === 'true') {
      // Send to Google Analytics, Mixpanel, etc.
      console.log('Performance Metric:', metric);
    }
  }

  // Get all recorded metrics
  getMetrics() {
    return Array.from(this.metrics.values());
  }

  // Get metrics by name
  getMetricsByName(name) {
    return Array.from(this.metrics.values()).filter(metric => metric.name === name);
  }

  // Calculate average for a metric
  getAverageMetric(name) {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
    this.isInitialized = false;
  }
}

// Bundle size optimization utilities
export const bundleOptimizer = {
  // Track bundle size
  trackBundleSize: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        return {
          totalSize: navigation.transferSize,
          decodedSize: navigation.decodedBodySize,
          encodedSize: navigation.encodedBodySize
        };
      }
    }
    return null;
  },

  // Lazy load components with loading state
  lazyLoadComponent: (importFn, fallback = null) => {
    const LazyComponent = React.lazy(importFn);
    
    return (props) => (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  },

  // Preload critical resources
  preloadResource: (href, as = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Prefetch non-critical resources
  prefetchResource: (href) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Caching utilities
export const cacheManager = {
  // Cache data in memory
  memoryCache: new Map(),
  
  // Cache data in localStorage
  localStorageCache: {
    set: (key, value, ttl = 3600000) => { // Default 1 hour TTL
      const item = {
        value,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(key, JSON.stringify(item));
    },
    
    get: (key) => {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      const now = Date.now();
      
      if (now - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed.value;
    },
    
    remove: (key) => {
      localStorage.removeItem(key);
    },
    
    clear: () => {
      localStorage.clear();
    }
  },

  // Cache data in sessionStorage
  sessionStorageCache: {
    set: (key, value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    
    get: (key) => {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    
    remove: (key) => {
      sessionStorage.removeItem(key);
    },
    
    clear: () => {
      sessionStorage.clear();
    }
  },

  // HTTP cache headers
  setCacheHeaders: (response, maxAge = 3600) => {
    response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
    response.headers.set('ETag', `"${Date.now()}"`);
  }
};

// CDN utilities
export const cdnUtils = {
  // Get CDN URL for assets
  getCDNUrl: (path, region = null) => {
    const cdnBase = process.env.REACT_APP_CDN_BASE_URL || '';
    const currentRegion = region || navigator.language.split('-')[1] || 'US';
    
    // Region-specific CDN endpoints
    const cdnRegions = {
      'US': 'us-east-1',
      'EU': 'eu-west-1',
      'AP': 'ap-southeast-1',
      'IN': 'ap-south-1'
    };
    
    const cdnRegion = cdnRegions[currentRegion] || 'us-east-1';
    return `${cdnBase}/${cdnRegion}${path}`;
  },

  // Load image with CDN optimization
  loadOptimizedImage: (src, options = {}) => {
    const {
      width,
      height,
      quality = 80,
      format = 'webp',
      region = null
    } = options;

    const cdnUrl = cdnUtils.getCDNUrl(src, region);
    const params = new URLSearchParams({
      w: width,
      h: height,
      q: quality,
      f: format
    });

    return `${cdnUrl}?${params.toString()}`;
  }
};

// Performance hooks for React components
export const usePerformanceMonitor = (componentName) => {
  const startTime = useRef(Date.now());
  const performanceMonitor = useRef(new PerformanceMonitor());

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.current.init();

    // Record component mount time
    const mountTime = Date.now() - startTime.current;
    performanceMonitor.current.recordMetric(`${componentName}_MOUNT_TIME`, mountTime);

    return () => {
      // Record component unmount time
      const unmountTime = Date.now() - startTime.current;
      performanceMonitor.current.recordMetric(`${componentName}_UNMOUNT_TIME`, unmountTime);
    };
  }, [componentName]);

  return performanceMonitor.current;
};

export const useLazyLoading = (importFn, options = {}) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        const module = await importFn();
        setComponent(() => module.default || module);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [importFn]);

  return { Component, loading, error };
};

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    setEntry(entry);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    return () => observer.disconnect();
  }, [callback, options]);

  return [elementRef, isIntersecting, entry];
};

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function calls
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function calls
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Memoize expensive calculations
  memoize: (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  },

  // Batch DOM updates
  batchUpdates: (updates) => {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  }
};

// Initialize global performance monitoring
const globalPerformanceMonitor = new PerformanceMonitor();
globalPerformanceMonitor.init();

export default globalPerformanceMonitor;