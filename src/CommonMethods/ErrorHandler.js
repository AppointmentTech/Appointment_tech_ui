import { logError } from './DebugUtils.js';

/**
 * Error Handler Utility
 * Handles different types of errors and provides appropriate responses
 */

export class ErrorHandler {
  /**
   * Handle HTTP errors and redirect to appropriate error pages
   * @param {Error} error - The error object
   * @param {Object} navigate - React Router navigate function
   * @param {Function} showSnackbar - Function to show snackbar notifications
   */
  static handleHttpError(error, navigate, showSnackbar) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.message || 'An error occurred';

    console.error('HTTP Error:', error);

    switch (status) {
      case 400:
        showSnackbar?.(message, 'error');
        break;
      case 401:
        showSnackbar?.('Unauthorized access. Please sign in again.', 'error');
        // Clear auth data and redirect to sign in
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
        localStorage.removeItem('usertype');
        localStorage.removeItem('token');
        navigate('/SignIn');
        break;
      case 403:
        showSnackbar?.('Access forbidden. You don\'t have permission to access this resource.', 'error');
        navigate('/error/403');
        break;
      case 404:
        showSnackbar?.('Resource not found.', 'error');
        navigate('/error/404');
        break;
      case 500:
        showSnackbar?.('Server error. Please try again later.', 'error');
        navigate('/error/500');
        break;
      default:
        showSnackbar?.(message, 'error');
        break;
    }
  }

  /**
   * Handle network errors
   * @param {Error} error - The error object
   * @param {Function} showSnackbar - Function to show snackbar notifications
   */
  static handleNetworkError(error, showSnackbar) {
    console.error('Network Error:', error);
    
    if (!navigator.onLine) {
      showSnackbar?.('No internet connection. Please check your network.', 'error');
    } else {
      showSnackbar?.('Network error. Please try again.', 'error');
    }
  }

  /**
   * Handle validation errors
   * @param {Object} errors - Validation errors object
   * @param {Function} showSnackbar - Function to show snackbar notifications
   */
  static handleValidationError(errors, showSnackbar) {
    console.error('Validation Error:', errors);
    
    const errorMessages = Object.values(errors).flat();
    const message = errorMessages.length > 0 ? errorMessages[0] : 'Please check your input.';
    
    showSnackbar?.(message, 'error');
  }

  /**
   * Handle JavaScript runtime errors
   * @param {Error} error - The error object
   * @param {Object} errorInfo - Additional error information
   * @param {Function} showSnackbar - Function to show snackbar notifications
   */
  static handleRuntimeError(error, errorInfo, showSnackbar) {
    console.error('Runtime Error:', error, errorInfo);
    
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
    
    showSnackbar?.('An unexpected error occurred. Please try refreshing the page.', 'error');
  }

  /**
   * Handle API response errors
   * @param {Object} response - API response object
   * @param {Function} showSnackbar - Function to show snackbar notifications
   */
  static handleApiResponseError(response, showSnackbar) {
    console.error('API Response Error:', response);
    
    if (response?.data === "Unauthorized Access") {
      showSnackbar?.('Unauthorized access. Please sign in again.', 'error');
      return 'unauthorized';
    }
    
    if (response?.data?.errno) {
      const message = `Database Error: ${response.data.errno}: ${response.data.sqlMessage}`;
      showSnackbar?.(message, 'error');
      return 'database';
    }
    
    showSnackbar?.('An error occurred. Please try again.', 'error');
    return 'general';
  }

  /**
   * Create a custom error with additional context
   * @param {string} message - Error message
   * @param {string} type - Error type
   * @param {Object} context - Additional context
   */
  static createError(message, type = 'general', context = {}) {
    const error = new Error(message);
    error.type = type;
    error.context = context;
    error.timestamp = new Date().toISOString();
    return error;
  }

  /**
   * Check if error is retryable
   * @param {Error} error - The error object
   * @returns {boolean} - Whether the error is retryable
   */
  static isRetryableError(error) {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    const status = error?.response?.status;
    
    return retryableStatuses.includes(status) || 
           error?.message?.includes('network') ||
           error?.message?.includes('timeout');
  }

  /**
   * Get user-friendly error message
   * @param {Error} error - The error object
   * @returns {string} - User-friendly error message
   */
  static getUserFriendlyMessage(error) {
    const status = error?.response?.status;
    
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Please sign in to continue.';
      case 403:
        return 'You don\'t have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

export default ErrorHandler; 