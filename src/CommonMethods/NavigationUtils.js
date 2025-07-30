/**
 * Navigation Utilities for Global Business Platform
 * 
 * This module provides comprehensive navigation functionality including:
 * - Dynamic routing with parameters
 * - Role-based access control using actual user data
 * - Internationalization support
 * - Analytics tracking
 * - Error handling
 * - Performance optimization
 */

import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useCallback, useMemo, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../ContextOrRedux/AuthContext.js';

// Navigation configuration
export const navigationConfig = {
  // Base routes
  baseRoutes: {
    home: '/',
    signIn: '/SignIn',
    signUp: '/SignUp',
    about: '/About',
    contact: '/ContactUs',
    error: {
      403: '/error/403',
      404: '/error/404',
      500: '/error/500',
      maintenance: '/error/maintenance'
    }
  },

  // Business dashboard routes with dynamic parameters
  businessRoutes: {
    dashboard: '/dashboard/:businessType/:businessId',
    management: '/management/:businessType/:businessId/:module',
    reports: '/reports/:businessType/:businessId',
    settings: '/settings/:businessType/:businessId'
  },

  // Admin routes
  adminRoutes: {
    dashboard: '/AdminDashboard',
    modules: {
      users: '/admin/modules/users',
      locations: '/admin/modules/locations',
      business: '/admin/modules/business'
    }
  },

  // Staff routes
  staffRoutes: {
    dashboard: '/StaffDashboard',
    profile: '/staff/profile',
    services: '/staff/services'
  }
};

// Navigation analytics tracking
export const navigationAnalytics = {
  trackPageView: (page, params = {}) => {
    // Implementation for analytics tracking
    console.log('Navigation Analytics:', {
      page,
      params,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  },

  trackNavigation: (from, to, method = 'click') => {
    console.log('Navigation Event:', {
      from,
      to,
      method,
      timestamp: new Date().toISOString()
    });
  }
};

// Navigation utility functions
export const navigationUtils = {
  // Generate dynamic route URL
  generateRoute: (routeType, params = {}) => {
    let route = navigationConfig[routeType];
    
    if (typeof route === 'string') {
      // Replace parameters in route
      Object.keys(params).forEach(key => {
        route = route.replace(`:${key}`, params[key]);
      });
      return route;
    }
    
    return route;
  },

  // Generate business route URL
  generateBusinessRoute: (businessType, businessId, module = null) => {
    if (module) {
      return `/management/${businessType}/${businessId}/${module}`;
    }
    return `/dashboard/${businessType}/${businessId}`;
  },

  // Check if user has permission for route based on actual database structure
  hasRoutePermission: (route, userType, userPermissions = [], pageId = null) => {
    if (!userType || userType === 'guest') return false;
    if (userType === 'Admin') return true;
    if (!userPermissions || userPermissions.length === 0) return false;
    // If pageId is provided, check for that page
    if (pageId) {
      return userPermissions.some(perm => perm.Page_Id === pageId && perm.Can_View === 'Y');
    }
    // Otherwise, check for any permission
    return userPermissions.some(perm => perm.Can_View === 'Y' || perm.Can_Create === 'Y' || perm.Can_Update === 'Y' || perm.Can_Delete === 'Y');
  },

  // Validate route parameters
  validateRouteParams: (params, requiredParams = []) => {
    const missingParams = requiredParams.filter(param => !params[param]);
    
    if (missingParams.length > 0) {
      throw new Error(`Missing required route parameters: ${missingParams.join(', ')}`);
    }
    
    return true;
  },

  // Get route metadata
  getRouteMetadata: (route) => {
    // Extract metadata from route
    const metadata = {
      isBusinessRoute: route.includes('/dashboard/') || route.includes('/management/'),
      isAdminRoute: route.includes('/admin/'),
      isStaffRoute: route.includes('/staff/'),
      businessType: null,
      businessId: null,
      module: null
    };

    // Extract business information from route
    const routeParts = route.split('/');
    if (routeParts.includes('dashboard') || routeParts.includes('management')) {
      const dashboardIndex = routeParts.findIndex(part => part === 'dashboard' || part === 'management');
      if (routeParts[dashboardIndex + 1]) {
        metadata.businessType = routeParts[dashboardIndex + 1];
      }
      if (routeParts[dashboardIndex + 2]) {
        metadata.businessId = routeParts[dashboardIndex + 2];
      }
      if (routeParts[dashboardIndex + 3]) {
        metadata.module = routeParts[dashboardIndex + 3];
      }
    }

    return metadata;
  },

  // Get user's default page based on user type from database
  getUserDefaultPage: (userType) => {
    if (!userType) return '/AdminDashboard';
    
    // Map user types to default pages based on database
    const defaultPages = {
      'Admin': '/AdminDashboard',
      'Business man': '/HostelAdminDashboard',
      'User': '/HostelAdminDashboard'
    };
    
    return defaultPages[userType] || '/AdminDashboard';
  },

  // Check if user can access specific business type
  canAccessBusinessType: (userType, userPermissions = [], businessType) => {
    // Admin can access all business types
    if (userType === 'Admin') return true;
    
    // Business man can access their own business type
    if (userType === 'Business man') {
      return true;
    }
    
    // User has limited access - check if they have Can_View permission
    if (userType === 'User') {
      return userPermissions.some(perm => perm.Can_View === 'Y');
    }
    
    return false;
  },

  // Permission check utility for a specific page/module
  hasPermission: (permissions, pageId, type = "Can_View") => {
    if (!permissions || !Array.isArray(permissions)) return false;
    return permissions.some(perm => perm.Page_Id === pageId && perm[type] === "Y");
  },

  // Get all permissions for a user
  getUserPermissions: (userPermissions = []) => {
    const permissions = {
      canView: false,
      canCreate: false,
      canUpdate: false,
      canDelete: false
    };

    if (!userPermissions || userPermissions.length === 0) {
      return permissions;
    }

    userPermissions.forEach(perm => {
      if (perm.Can_View === 'Y') permissions.canView = true;
      if (perm.Can_Create === 'Y') permissions.canCreate = true;
      if (perm.Can_Update === 'Y') permissions.canUpdate = true;
      if (perm.Can_Delete === 'Y') permissions.canDelete = true;
    });

    return permissions;
  },

  // Check if user can access a specific page/module
  canAccessPage: (userType, userPermissions = [], pageId) => {
    if (userType === 'Admin') return true;
    if (!userPermissions || userPermissions.length === 0) return false;
    if (!pageId) return false;
    return userPermissions.some(perm => perm.Page_Id === pageId && perm.Can_View === 'Y');
  }
};

// Custom navigation hook with enhanced functionality using actual database structure
export const useEnhancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const context = useContext(AuthContext);

  // Get actual user data from context based on database structure
  const userType = context?.state?.usertype?.User_Type_Name || 'guest';
  const userPermissions = context?.state?.permissions || [];
  const user = context?.state?.user;

  // Enhanced navigate function with analytics and validation using real user data
  const enhancedNavigate = useCallback((to, options = {}) => {
    const {
      replace = false,
      state = {},
      trackAnalytics = true,
      validatePermissions = true,
      userRole = userType, // Use actual user type
      userPermissions: customPermissions = userPermissions // Use actual permissions
    } = options;

    try {
      console.log('Navigation attempt:', { to, userType, userPermissions: customPermissions });

      // Validate route parameters if provided
      if (options.requiredParams) {
        navigationUtils.validateRouteParams(to, options.requiredParams);
      }

      // Check permissions if validation is enabled
      if (validatePermissions && userRole) {
        const routeMetadata = navigationUtils.getRouteMetadata(to);
        const hasPermission = navigationUtils.hasRoutePermission(
          routeMetadata.businessType || 'default',
          userRole,
          customPermissions
        );

        if (!hasPermission) {
          console.warn('Navigation blocked: Insufficient permissions');
          // Redirect to error page instead of returning false
          navigate('/error/403', { replace: true });
          return false;
        }
      }

      // Track analytics
      if (trackAnalytics) {
        navigationAnalytics.trackNavigation(location.pathname, to);
      }

      // Perform navigation
      if (replace) {
        navigate(to, { replace: true, state });
      } else {
        navigate(to, { state });
      }

      return true;
    } catch (error) {
      console.error('Navigation error:', error);
      return false;
    }
  }, [navigate, location.pathname, userType, userPermissions]);

  // Navigate to business dashboard using actual user data
  const navigateToBusiness = useCallback((businessType, businessId, options = {}) => {
    // Check if user can access this business type
    if (!navigationUtils.canAccessBusinessType(userType, userPermissions, businessType)) {
      console.warn('Access denied: Cannot access this business type');
      navigate('/error/403', { replace: true });
      return false;
    }

    const route = navigationUtils.generateBusinessRoute(businessType, businessId);
    return enhancedNavigate(route, {
      ...options,
      userRole: userType,
      userPermissions: userPermissions
    });
  }, [enhancedNavigate, userType, userPermissions, navigate]);

  // Navigate to business module using actual user data
  const navigateToBusinessModule = useCallback((businessType, businessId, module, options = {}) => {
    // Check if user can access this business type
    if (!navigationUtils.canAccessBusinessType(userType, userPermissions, businessType)) {
      console.warn('Access denied: Cannot access this business type');
      navigate('/error/403', { replace: true });
      return false;
    }

    const route = navigationUtils.generateBusinessRoute(businessType, businessId, module);
    return enhancedNavigate(route, {
      ...options,
      userRole: userType,
      userPermissions: userPermissions
    });
  }, [enhancedNavigate, userType, userPermissions, navigate]);

  // Navigate to admin module using actual user data
  const navigateToAdmin = useCallback((module, options = {}) => {
    // Check if user is admin
    if (userType !== 'Admin') {
      console.warn('Access denied: Admin privileges required');
      navigate('/error/403', { replace: true });
      return false;
    }

    const route = navigationConfig.adminRoutes.modules[module] || navigationConfig.adminRoutes.dashboard;
    return enhancedNavigate(route, {
      ...options,
      userRole: userType,
      userPermissions: userPermissions
    });
  }, [enhancedNavigate, userType, userPermissions, navigate]);

  // Navigate to staff module using actual user data
  const navigateToStaff = useCallback((module, options = {}) => {
    // Check if user is staff or manager
    if (!['User'].includes(userType)) {
      console.warn('Access denied: User privileges required');
      navigate('/error/403', { replace: true });
      return false;
    }

    const route = navigationConfig.staffRoutes[module] || navigationConfig.staffRoutes.dashboard;
    return enhancedNavigate(route, {
      ...options,
      userRole: userType,
      userPermissions: userPermissions
    });
  }, [enhancedNavigate, userType, userPermissions, navigate]);

  // Navigate to error page
  const navigateToError = useCallback((errorCode = 404, options = {}) => {
    const route = navigationConfig.baseRoutes.error[errorCode] || navigationConfig.baseRoutes.error[404];
    return enhancedNavigate(route, options);
  }, [enhancedNavigate]);

  // Navigate to user's default page based on user type from database
  const navigateToDefaultPage = useCallback((options = {}) => {
    const defaultPage = navigationUtils.getUserDefaultPage(userType);
    console.log('Navigating to default page:', { userType, defaultPage });
    return enhancedNavigate(defaultPage, {
      ...options,
      userRole: userType,
      userPermissions: userPermissions
    });
  }, [enhancedNavigate, userType, userPermissions]);

  // Get current route metadata
  const getCurrentRouteMetadata = useCallback(() => {
    return navigationUtils.getRouteMetadata(location.pathname);
  }, [location.pathname]);

  // Check if current route is active
  const isRouteActive = useCallback((route) => {
    return location.pathname === route || location.pathname.startsWith(route);
  }, [location.pathname]);

  // Get user's accessible routes based on permissions from database
  const getAccessibleRoutes = useCallback(() => {
    const accessibleRoutes = [];
    
    // Add routes based on user type and permissions
    if (userType === 'Admin') {
      accessibleRoutes.push(...Object.values(navigationConfig.adminRoutes.modules));
      accessibleRoutes.push(navigationConfig.adminRoutes.dashboard);
    }
    
    if (userType === 'User') {
      accessibleRoutes.push(navigationConfig.staffRoutes.dashboard);
      accessibleRoutes.push(navigationConfig.staffRoutes.profile);
    }
    
    // Add business routes if user has Can_View permission
    if (navigationUtils.hasPermission(userPermissions, null, 'Can_View') || userType === 'Business man') {
      accessibleRoutes.push('/dashboard/:businessType/:businessId');
      accessibleRoutes.push('/management/:businessType/:businessId/:module');
    }
    
    return accessibleRoutes;
  }, [userType, userPermissions]);

  // Get user's permission summary
  const getUserPermissionSummary = useCallback(() => {
    return navigationUtils.getUserPermissions(userPermissions);
  }, [userPermissions]);

  // Check if user can access current page
  const canAccessCurrentPage = useCallback(() => {
    return navigationUtils.canAccessPage(userType, userPermissions, null);
  }, [userType, userPermissions]);

  return {
    navigate: enhancedNavigate,
    navigateToBusiness,
    navigateToBusinessModule,
    navigateToAdmin,
    navigateToStaff,
    navigateToError,
    navigateToDefaultPage,
    getCurrentRouteMetadata,
    isRouteActive,
    getAccessibleRoutes,
    getUserPermissionSummary,
    canAccessCurrentPage,
    location,
    params,
    // Expose user data for components
    userType,
    userPermissions,
    user
  };
};

// Route guard component using actual database structure
export const RouteGuard = ({ children, requiredUserType, requiredPermissions = [], fallback = null }) => {
  const context = useContext(AuthContext);
  const userType = context?.state?.usertype?.User_Type_Name || 'guest';
  const userPermissions = context?.state?.permissions || [];
  
  const hasPermission = useMemo(() => {
    console.log('RouteGuard check:', { userType, userPermissions, requiredUserType, requiredPermissions });
    
    if (!requiredUserType && requiredPermissions.length === 0) return true;
    
    if (requiredUserType && userType !== requiredUserType) {
      console.log('User type mismatch:', { userType, requiredUserType });
      return false;
    }
    
    if (requiredPermissions.length > 0) {
      const hasRequiredPermission = requiredPermissions.some(permission => {
        return navigationUtils.hasPermission(userPermissions, null, permission);
      });
      console.log('Permission check result:', { requiredPermissions, hasRequiredPermission });
      return hasRequiredPermission;
    }
    
    return true;
  }, [requiredUserType, requiredPermissions, userType, userPermissions]);

  if (!hasPermission) {
    console.log('Access denied, redirecting to 403');
    return fallback || <Navigate to="/error/403" replace />;
  }

  return children;
};

// Navigation error boundary
export const NavigationErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const { navigateToError } = useEnhancedNavigation();

  useEffect(() => {
    const handleNavigationError = (error) => {
      console.error('Navigation error:', error);
      setHasError(true);
      navigateToError(500);
    };

    window.addEventListener('error', handleNavigationError);
    return () => window.removeEventListener('error', handleNavigationError);
  }, [navigateToError]);

  if (hasError) {
    return <Navigate to="/error/500" replace />;
  }

  return children;
};

export default {
  navigationConfig,
  navigationAnalytics,
  navigationUtils,
  useEnhancedNavigation,
  RouteGuard,
  NavigationErrorBoundary
}; 