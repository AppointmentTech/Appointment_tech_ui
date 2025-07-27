// Debug utilities for development

/**
 * Performance monitoring utility
 * @param {string} name - Operation name
 * @param {Function} fn - Function to measure
 * @returns {any} Function result
 */
export const measurePerformance = (name, fn) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
      return result;
    }
    return fn();
  };
  
  /**
   * Async performance monitoring utility
   * @param {string} name - Operation name
   * @param {Function} fn - Async function to measure
   * @returns {Promise<any>} Function result
   */
  export const measureAsyncPerformance = async (name, fn) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = await fn();
      const end = performance.now();
      console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
      return result;
    }
    return fn();
  };
  
  /**
   * Debug render utility
   * @param {string} componentName - Component name
   * @param {any} props - Component props
   */
  export const debugRender = (componentName, props = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} rendered`, props);
    }
  };
  
  /**
   * Debug state change utility
   * @param {string} contextName - Context name
   * @param {any} prevState - Previous state
   * @param {any} newState - New state
   */
  export const debugStateChange = (contextName, prevState, newState) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${contextName} state changed:`, {
        prev: prevState,
        new: newState,
      });
    }
  };
  
  /**
   * Memory usage utility
   * @param {string} label - Label for the measurement
   */
  export const logMemoryUsage = (label = 'Memory Usage') => {
    if (process.env.NODE_ENV === 'development' && performance.memory) {
      const memory = performance.memory;
      console.log(`💾 ${label}:`, {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }
  };
  
  /**
   * Component render counter
   */
  export const createRenderCounter = (componentName) => {
    let renderCount = 0;
    return () => {
      renderCount++;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 ${componentName} rendered ${renderCount} times`);
      }
      return renderCount;
    };
  };
  
  /**
   * Error logging utility
   * @param {Error} error - Error object
   * @param {string} context - Error context
   */
  export const logError = (error, context = 'Unknown') => {
    console.error(`❌ Error in ${context}:`, error);
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error.stack);
    }
  };
  
  /**
   * Warning utility
   * @param {string} message - Warning message
   * @param {any} data - Additional data
   */
  export const logWarning = (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ ${message}`, data);
    }
  };