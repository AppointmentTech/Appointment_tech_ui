/**
 * Security Utilities for Global Business Platform
 * 
 * This module provides comprehensive security features including:
 * - Data encryption/decryption
 * - Input validation and sanitization
 * - XSS protection
 * - CSRF protection
 * - Rate limiting
 * - Audit logging
 * - Compliance features (GDPR, HIPAA, etc.)
 */

import CryptoJS from 'crypto-js';

// Security configuration
export const securityConfig = {
  // Encryption settings
  encryption: {
    algorithm: 'AES-256-GCM',
    keySize: 256,
    ivSize: 16,
    saltSize: 32
  },
  
  // Rate limiting settings
  rateLimiting: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  },
  
  // Session settings
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  },
  
  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxLength: 128
  }
};

// Encryption utilities
export const encryptionUtils = {
  // Generate encryption key
  generateKey: (length = 32) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Encrypt data
  encrypt: (data, key = process.env.REACT_APP_ENCRYPTION_KEY) => {
    try {
      if (typeof data === 'object') {
        data = JSON.stringify(data);
      }
      
      const encrypted = CryptoJS.AES.encrypt(data, key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  },

  // Decrypt data
  decrypt: (encryptedData, key = process.env.REACT_APP_ENCRYPTION_KEY) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      
      // Try to parse as JSON
      try {
        return JSON.parse(result);
      } catch {
        return result;
      }
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  },

  // Hash data (one-way)
  hash: (data, salt = null) => {
    const saltToUse = salt || encryptionUtils.generateKey(16);
    const hashed = CryptoJS.PBKDF2(data, saltToUse, {
      keySize: 256 / 32,
      iterations: 10000
    });
    
    return {
      hash: hashed.toString(),
      salt: saltToUse
    };
  },

  // Verify hash
  verifyHash: (data, hash, salt) => {
    const { hash: computedHash } = encryptionUtils.hash(data, salt);
    return computedHash === hash;
  }
};

// Input validation utilities
export const validationUtils = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone number validation
  isValidPhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Password strength validation
  isStrongPassword: (password) => {
    const {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumbers,
      requireSpecialChars,
      maxLength
    } = securityConfig.password;

    if (password.length < minLength || password.length > maxLength) {
      return { valid: false, error: `Password must be between ${minLength} and ${maxLength} characters` };
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }

    if (requireNumbers && !/\d/.test(password)) {
      return { valid: false, error: 'Password must contain at least one number' };
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one special character' };
    }

    return { valid: true };
  },

  // URL validation
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Credit card validation (Luhn algorithm)
  isValidCreditCard: (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // Sanitize HTML input
  sanitizeHtml: (html) => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  // Sanitize SQL input
  sanitizeSql: (input) => {
    // Remove SQL injection patterns
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
      /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/gi,
      /(\b(OR|AND)\b\s+['"]\w+['"]\s*=\s*['"]\w+['"])/gi,
      /(--)/g,
      /(\/\*|\*\/)/g,
      /(;)/g
    ];

    let sanitized = input;
    sqlPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    return sanitized.trim();
  }
};

// XSS protection utilities
export const xssProtection = {
  // Escape HTML entities
  escapeHtml: (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Unescape HTML entities
  unescapeHtml: (str) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent;
  },

  // Validate and sanitize user input
  sanitizeInput: (input, type = 'text') => {
    if (typeof input !== 'string') return input;

    switch (type) {
      case 'html':
        return xssProtection.escapeHtml(input);
      case 'sql':
        return validationUtils.sanitizeSql(input);
      case 'url':
        return validationUtils.isValidUrl(input) ? input : '';
      case 'email':
        return validationUtils.isValidEmail(input) ? input : '';
      default:
        return input.replace(/[<>]/g, '');
    }
  }
};

// CSRF protection utilities
export const csrfProtection = {
  // Generate CSRF token
  generateToken: () => {
    return encryptionUtils.generateKey(32);
  },

  // Validate CSRF token
  validateToken: (token, storedToken) => {
    return token === storedToken;
  },

  // Add CSRF token to requests
  addTokenToRequest: (headers, token) => {
    return {
      ...headers,
      'X-CSRF-Token': token
    };
  }
};

// Rate limiting utilities
export const rateLimiting = {
  requests: new Map(),
  
  // Check if request is allowed
  isAllowed: (identifier, maxRequests = securityConfig.rateLimiting.maxRequests, windowMs = securityConfig.rateLimiting.windowMs) => {
    const now = Date.now();
    const userRequests = rateLimiting.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    rateLimiting.requests.set(identifier, validRequests);
    
    return true;
  },

  // Get remaining requests
  getRemainingRequests: (identifier, maxRequests = securityConfig.rateLimiting.maxRequests, windowMs = securityConfig.rateLimiting.windowMs) => {
    const now = Date.now();
    const userRequests = rateLimiting.requests.get(identifier) || [];
    const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
    
    return Math.max(0, maxRequests - validRequests.length);
  },

  // Reset rate limiting for an identifier
  reset: (identifier) => {
    rateLimiting.requests.delete(identifier);
  }
};

// Audit logging utilities
export const auditLogger = {
  // Log security events
  logEvent: (event, details = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: localStorage.getItem('userId') || 'anonymous'
    };

    // Send to audit service
    if (process.env.REACT_APP_AUDIT_ENABLED === 'true') {
      console.log('Audit Log:', logEntry);
      // Implementation for sending to audit service
    }

    return logEntry;
  },

  // Log authentication events
  logAuthEvent: (event, userId, success = true) => {
    return auditLogger.logEvent('AUTHENTICATION', {
      event,
      userId,
      success,
      ip: 'client-ip', // Would be set by server
      userAgent: navigator.userAgent
    });
  },

  // Log data access events
  logDataAccess: (resource, action, userId) => {
    return auditLogger.logEvent('DATA_ACCESS', {
      resource,
      action,
      userId,
      timestamp: new Date().toISOString()
    });
  },

  // Log security violations
  logSecurityViolation: (violation, details = {}) => {
    return auditLogger.logEvent('SECURITY_VIOLATION', {
      violation,
      details,
      severity: 'HIGH'
    });
  }
};

// Compliance utilities
export const complianceUtils = {
  // GDPR compliance
  gdpr: {
    // Check if user has consented to data processing
    hasConsent: (purpose) => {
      const consents = JSON.parse(localStorage.getItem('gdpr_consents') || '{}');
      return consents[purpose] === true;
    },

    // Set user consent
    setConsent: (purpose, consented) => {
      const consents = JSON.parse(localStorage.getItem('gdpr_consents') || '{}');
      consents[purpose] = consented;
      localStorage.setItem('gdpr_consents', JSON.stringify(consents));
      
      auditLogger.logEvent('GDPR_CONSENT', { purpose, consented });
    },

    // Request data deletion
    requestDataDeletion: (userId) => {
      auditLogger.logEvent('GDPR_DELETION_REQUEST', { userId });
      // Implementation for data deletion request
    },

    // Export user data
    exportUserData: (userId) => {
      auditLogger.logEvent('GDPR_DATA_EXPORT', { userId });
      // Implementation for data export
    }
  },

  // HIPAA compliance (for healthcare)
  hipaa: {
    // Log PHI access
    logPHIAccess: (userId, phiType, action) => {
      return auditLogger.logEvent('PHI_ACCESS', {
        userId,
        phiType,
        action,
        timestamp: new Date().toISOString(),
        compliance: 'HIPAA'
      });
    },

    // Validate PHI handling
    validatePHIHandling: (data) => {
      // Check for PHI patterns in data
      const phiPatterns = [
        /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
        /\b\d{3}-\d{3}-\d{4}\b/g, // Phone
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g // Email
      ];

      const containsPHI = phiPatterns.some(pattern => pattern.test(JSON.stringify(data)));
      
      if (containsPHI) {
        auditLogger.logSecurityViolation('PHI_DETECTED', { data });
        return false;
      }

      return true;
    }
  },

  // CCPA compliance
  ccpa: {
    // Check if user is California resident
    isCaliforniaResident: () => {
      // Implementation to determine California residency
      return false; // Placeholder
    },

    // Handle CCPA requests
    handleCCPARequest: (requestType, userId) => {
      auditLogger.logEvent('CCPA_REQUEST', { requestType, userId });
      // Implementation for CCPA compliance
    }
  }
};

// Security hooks for React components
export const useSecurity = () => {
  const [securityViolations, setSecurityViolations] = useState([]);

  const logViolation = useCallback((violation, details) => {
    const violationLog = auditLogger.logSecurityViolation(violation, details);
    setSecurityViolations(prev => [...prev, violationLog]);
  }, []);

  const validateInput = useCallback((input, type = 'text') => {
    return xssProtection.sanitizeInput(input, type);
  }, []);

  const encryptData = useCallback((data) => {
    return encryptionUtils.encrypt(data);
  }, []);

  const decryptData = useCallback((encryptedData) => {
    return encryptionUtils.decrypt(encryptedData);
  }, []);

  return {
    logViolation,
    validateInput,
    encryptData,
    decryptData,
    securityViolations
  };
};

// Initialize security monitoring
export const initSecurityMonitoring = () => {
  // Monitor for security violations
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message.includes('security')) {
      auditLogger.logSecurityViolation('JAVASCRIPT_ERROR', {
        message: event.error.message,
        stack: event.error.stack
      });
    }
  });

  // Monitor for XSS attempts
  const originalInnerHTML = Element.prototype.innerHTML;
  Element.prototype.innerHTML = function(value) {
    if (typeof value === 'string') {
      value = xssProtection.escapeHtml(value);
    }
    return originalInnerHTML.call(this, value);
  };

  console.log('Security monitoring initialized');
};

export default {
  encryptionUtils,
  validationUtils,
  xssProtection,
  csrfProtection,
  rateLimiting,
  auditLogger,
  complianceUtils,
  initSecurityMonitoring
}; 