import React from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FlatwareIcon from "@mui/icons-material/Flatware";
import GarageIcon from "@mui/icons-material/Garage";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import WorkIcon from "@mui/icons-material/Work";

/**
 * Enhanced Sidebar Data for Global Business Platform
 * 
 * This file contains scalable sidebar data structure supporting:
 * - Internationalization (i18n)
 * - Dynamic routing with parameters
 * - Role-based access control
 * - Multi-tenant support
 * - Feature flags
 * - Analytics tracking
 * 
 * Structure:
 * - Each section has a name, items array, icon, and metadata
 * - Items support dynamic URLs with parameters
 * - Permissions and feature flags for access control
 * - Analytics tracking for user behavior
 */

// Internationalization keys for multi-language support
export const i18nKeys = {
  // Business Types
  HOSTELS: "business.hostels",
  HOSPITALS: "business.hospitals", 
  GARAGES: "business.garages",
  BEAUTY_TATTOO: "business.beauty_tattoo",
  FOOD_CATERING: "business.food_catering",
  
  // Common Actions
  DASHBOARD: "common.dashboard",
  MANAGEMENT: "common.management",
  REPORTS: "common.reports",
  SETTINGS: "common.settings",
  BOOKINGS: "common.bookings",
  CUSTOMERS: "common.customers",
  STAFF: "common.staff",
  INVENTORY: "common.inventory",
  BILLING: "common.billing",
  PAYMENTS: "common.payments",
  MAINTENANCE: "common.maintenance",
  
  // Module Types
  USER_MODULES: "modules.users",
  LOCATION_MODULES: "modules.locations", 
  BUSINESS_MODULES: "modules.business"
};

// Feature flags for progressive rollout
export const featureFlags = {
  ADVANCED_ANALYTICS: "advanced_analytics",
  MULTI_CURRENCY: "multi_currency",
  REAL_TIME_NOTIFICATIONS: "real_time_notifications",
  MOBILE_APP: "mobile_app",
  API_INTEGRATIONS: "api_integrations",
  AI_PREDICTIONS: "ai_predictions"
};

// Permission levels for role-based access
export const permissions = {
  READ: "read",
  WRITE: "write", 
  DELETE: "delete",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin"
};

// Enhanced sidebar data with internationalization and dynamic routing
export const sidebarData = {
  sections: [
    {
      name: i18nKeys.HOSTELS,
      items: [
        { 
          name: i18nKeys.DASHBOARD, 
          url: "/dashboard/:businessType/:businessId", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ],
          analytics: { category: "navigation", action: "dashboard_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Room Management", 
          url: "/management/:businessType/:businessId/rooms", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "management", action: "room_management" }
        },
        { 
          name: "Customer Management", 
          url: "/management/:businessType/:businessId/customers", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "management", action: "customer_management" }
        },
        { 
          name: "Booking Management", 
          url: "/management/:businessType/:businessId/bookings", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "management", action: "booking_management" }
        },
        { 
          name: "Staff Management", 
          url: "/management/:businessType/:businessId/staff", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "management", action: "staff_management" }
        },
        { 
          name: "Billing & Payments", 
          url: "/management/:businessType/:businessId/billing", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "billing_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Food Catering", 
          url: "/management/:businessType/:businessId/catering", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "services", action: "catering_management" }
        },
        { 
          name: "Reports & Analytics", 
          url: "/reports/:businessType/:businessId", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ],
          analytics: { category: "analytics", action: "reports_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Maintenance", 
          url: "/management/:businessType/:businessId/maintenance", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "operations", action: "maintenance_management" }
        },
        { 
          name: "Settings", 
          url: "/settings/:businessType/:businessId", 
          params: { businessType: "hostel" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "configuration", action: "settings_view" }
        },
      ],
      icon: <HotelIcon color="primary" />,
      metadata: {
        businessType: "hostel",
        supportedRegions: ["IN", "US", "UK", "AU", "CA"],
        compliance: ["GDPR", "CCPA", "ISO27001"],
        features: ["multi_tenant", "real_time_sync", "offline_support"]
      }
    },
    {
      name: i18nKeys.HOSPITALS,
      items: [
        { 
          name: i18nKeys.DASHBOARD, 
          url: "/dashboard/:businessType/:businessId", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ],
          analytics: { category: "navigation", action: "dashboard_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Patient Management", 
          url: "/management/:businessType/:businessId/patients", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "patient_management" },
          compliance: ["HIPAA", "GDPR"]
        },
        { 
          name: "Appointment Management", 
          url: "/management/:businessType/:businessId/appointments", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "appointment_management" }
        },
        { 
          name: "Room Management", 
          url: "/management/:businessType/:businessId/rooms", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "room_management" }
        },
        { 
          name: "Staff Management", 
          url: "/management/:businessType/:businessId/staff", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "staff_management" }
        },
        { 
          name: "Billing & Payments", 
          url: "/management/:businessType/:businessId/billing", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "billing_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Food & Catering", 
          url: "/management/:businessType/:businessId/catering", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "services", action: "catering_management" }
        },
        { 
          name: "Inventory/Pharmacy Management", 
          url: "/management/:businessType/:businessId/inventory", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "inventory_management" }
        },
        { 
          name: "Operation Theater Management", 
          url: "/management/:businessType/:businessId/operation-theater", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "operation_theater_management" }
        },
        { 
          name: "Laboratory Management", 
          url: "/management/:businessType/:businessId/laboratory", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "laboratory_management" }
        },
        { 
          name: "Ambulance Management", 
          url: "/management/:businessType/:businessId/ambulance", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "ambulance_management" }
        },
        { 
          name: "Asset/Equipment Management", 
          url: "/management/:businessType/:businessId/assets", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "asset_management" }
        },
        { 
          name: "Visitor Management", 
          url: "/management/:businessType/:businessId/visitors", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "visitor_management" }
        },
        { 
          name: "Discharge/Transfer Management", 
          url: "/management/:businessType/:businessId/discharge", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "discharge_management" }
        },
        { 
          name: "Reports & Analytics", 
          url: "/reports/:businessType/:businessId", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ],
          analytics: { category: "analytics", action: "reports_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Maintenance", 
          url: "/management/:businessType/:businessId/maintenance", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "operations", action: "maintenance_management" }
        },
        { 
          name: "Settings", 
          url: "/settings/:businessType/:businessId", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "configuration", action: "settings_view" }
        },
        { 
          name: "Admission Requests", 
          url: "/management/:businessType/:businessId/admissions", 
          params: { businessType: "hospital" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "healthcare", action: "admission_management" }
        },
      ],
      icon: <LocalHospitalIcon color="primary" />,
      metadata: {
        businessType: "hospital",
        supportedRegions: ["IN", "US", "UK", "AU", "CA", "EU"],
        compliance: ["HIPAA", "GDPR", "CCPA", "ISO27001", "HITECH"],
        features: ["multi_tenant", "real_time_sync", "offline_support", "audit_logging"]
      }
    },
    {
      name: i18nKeys.GARAGES,
      items: [
        { 
          name: i18nKeys.DASHBOARD, 
          url: "/dashboard/:businessType/:businessId", 
          params: { businessType: "garage" },
          permissions: [permissions.READ],
          analytics: { category: "navigation", action: "dashboard_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Services Offered", 
          url: "/management/:businessType/:businessId/services", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "services_management" }
        },
        { 
          name: "Technician Management", 
          url: "/management/:businessType/:businessId/technicians", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "technician_management" }
        },
        { 
          name: "Customer Management", 
          url: "/management/:businessType/:businessId/customers", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "customer_management" }
        },
        { 
          name: "Vehicle Management", 
          url: "/management/:businessType/:businessId/vehicles", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "vehicle_management" }
        },
        { 
          name: "Bookings", 
          url: "/management/:businessType/:businessId/bookings", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "booking_management" }
        },
        { 
          name: "Job Cards", 
          url: "/management/:businessType/:businessId/job-cards", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "job_card_management" }
        },
        { 
          name: "Inventory", 
          url: "/management/:businessType/:businessId/inventory", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "inventory_management" }
        },
        { 
          name: "Parts Management", 
          url: "/management/:businessType/:businessId/parts", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "parts_management" }
        },
        { 
          name: "Supplier Management", 
          url: "/management/:businessType/:businessId/suppliers", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "supplier_management" }
        },
        { 
          name: "Service History", 
          url: "/management/:businessType/:businessId/service-history", 
          params: { businessType: "garage" },
          permissions: [permissions.READ],
          analytics: { category: "automotive", action: "service_history_view" }
        },
        { 
          name: "Invoices & GST", 
          url: "/management/:businessType/:businessId/invoices", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "invoice_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Payments", 
          url: "/management/:businessType/:businessId/payments", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "payment_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Expenses", 
          url: "/management/:businessType/:businessId/expenses", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "expense_management" }
        },
        { 
          name: "Reports & Analytics", 
          url: "/reports/:businessType/:businessId", 
          params: { businessType: "garage" },
          permissions: [permissions.READ],
          analytics: { category: "analytics", action: "reports_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Reminders", 
          url: "/management/:businessType/:businessId/reminders", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "automotive", action: "reminder_management" },
          featureFlags: [featureFlags.REAL_TIME_NOTIFICATIONS]
        },
        { 
          name: "Offers & Campaigns", 
          url: "/management/:businessType/:businessId/offers", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "marketing", action: "offer_management" }
        },
        { 
          name: "Feedback & Reviews", 
          url: "/management/:businessType/:businessId/feedback", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "customer_service", action: "feedback_management" }
        },
        { 
          name: "Staff Attendance", 
          url: "/management/:businessType/:businessId/attendance", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "hr", action: "attendance_management" }
        },
        { 
          name: "Settings", 
          url: "/settings/:businessType/:businessId", 
          params: { businessType: "garage" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "configuration", action: "settings_view" }
        }
      ],
      icon: <GarageIcon color="primary" />,
      metadata: {
        businessType: "garage",
        supportedRegions: ["IN", "US", "UK", "AU", "CA", "EU"],
        compliance: ["GDPR", "CCPA", "ISO27001"],
        features: ["multi_tenant", "real_time_sync", "offline_support", "gst_compliance"]
      }
    },
    {
      name: i18nKeys.BEAUTY_TATTOO,
      items: [
        { 
          name: i18nKeys.DASHBOARD, 
          url: "/dashboard/:businessType/:businessId", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ],
          analytics: { category: "navigation", action: "dashboard_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Services", 
          url: "/management/:businessType/:businessId/services", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "beauty", action: "services_management" }
        },
        { 
          name: "Artist Management", 
          url: "/management/:businessType/:businessId/artists", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "beauty", action: "artist_management" }
        },
        { 
          name: "Customer Management", 
          url: "/management/:businessType/:businessId/customers", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "beauty", action: "customer_management" }
        },
        { 
          name: "Appointments", 
          url: "/management/:businessType/:businessId/appointments", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "beauty", action: "appointment_management" }
        },
        { 
          name: "Inventory", 
          url: "/management/:businessType/:businessId/inventory", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "beauty", action: "inventory_management" }
        },
        { 
          name: "Invoices", 
          url: "/management/:businessType/:businessId/invoices", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "invoice_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Reports", 
          url: "/reports/:businessType/:businessId", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ],
          analytics: { category: "analytics", action: "reports_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Settings", 
          url: "/settings/:businessType/:businessId", 
          params: { businessType: "beauty_tattoo" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "configuration", action: "settings_view" }
        },
      ],
      icon: <FaceRetouchingNaturalIcon color="primary" />,
      metadata: {
        businessType: "beauty_tattoo",
        supportedRegions: ["IN", "US", "UK", "AU", "CA", "EU"],
        compliance: ["GDPR", "CCPA", "ISO27001"],
        features: ["multi_tenant", "real_time_sync", "offline_support"]
      }
    },
    {
      name: i18nKeys.FOOD_CATERING,
      items: [
        { 
          name: i18nKeys.DASHBOARD, 
          url: "/dashboard/:businessType/:businessId", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ],
          analytics: { category: "navigation", action: "dashboard_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Menu Management", 
          url: "/management/:businessType/:businessId/menu", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "food", action: "menu_management" }
        },
        { 
          name: "Hostel Management", 
          url: "/management/:businessType/:businessId/hostel-catering", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "food", action: "hostel_catering_management" }
        },
        { 
          name: "Personal Catering", 
          url: "/management/:businessType/:businessId/personal-catering", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "food", action: "personal_catering_management" }
        },
        { 
          name: "Bookings", 
          url: "/management/:businessType/:businessId/bookings", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "food", action: "booking_management" }
        },
        { 
          name: "Inventory", 
          url: "/management/:businessType/:businessId/inventory", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "food", action: "inventory_management" }
        },
        { 
          name: "Invoices", 
          url: "/management/:businessType/:businessId/invoices", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "financial", action: "invoice_management" },
          featureFlags: [featureFlags.MULTI_CURRENCY]
        },
        { 
          name: "Reports", 
          url: "/reports/:businessType/:businessId", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ],
          analytics: { category: "analytics", action: "reports_view" },
          featureFlags: [featureFlags.ADVANCED_ANALYTICS]
        },
        { 
          name: "Settings", 
          url: "/settings/:businessType/:businessId", 
          params: { businessType: "food_catering" },
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "configuration", action: "settings_view" }
        },
      ],
      icon: <FlatwareIcon color="primary" />,
      metadata: {
        businessType: "food_catering",
        supportedRegions: ["IN", "US", "UK", "AU", "CA", "EU"],
        compliance: ["GDPR", "CCPA", "ISO27001", "FDA"],
        features: ["multi_tenant", "real_time_sync", "offline_support", "food_safety"]
      }
    },
  ],
};

// Enhanced module data with internationalization and permissions
export const moduleData = {
  sections: [
    {
      name: i18nKeys.USER_MODULES,
      items: [
        { 
          name: "User Types", 
          url: "/admin/modules/users/types", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "user_types_management" }
        },
        { 
          name: "Users", 
          url: "/admin/modules/users/list", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "users_management" }
        },
        { 
          name: "Pages", 
          url: "/admin/modules/users/pages", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "pages_management" }
        },
        { 
          name: "User Permission", 
          url: "/admin/modules/users/permissions", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "permissions_management" }
        },
      ],
      icon: <AccountCircleIcon color="primary" />,
      metadata: {
        moduleType: "user_management",
        permissions: [permissions.ADMIN],
        compliance: ["GDPR", "CCPA", "ISO27001"],
        features: ["role_based_access", "audit_logging", "multi_tenant"]
      }
    },
    {
      name: i18nKeys.LOCATION_MODULES,
      items: [
        { 
          name: "Location Master", 
          url: "/admin/modules/locations/master", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "location_master_management" }
        },
        { 
          name: "Location Active Pin code", 
          url: "/admin/modules/locations/pincodes", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "pincode_management" }
        },
        { 
          name: "Location User Address", 
          url: "/admin/modules/locations/addresses", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "address_management" }
        },
      ],
      icon: <MyLocationIcon color="primary" />,
      metadata: {
        moduleType: "location_management",
        permissions: [permissions.ADMIN],
        compliance: ["GDPR", "CCPA"],
        features: ["geolocation", "address_validation", "multi_region"]
      }
    },
    {
      name: i18nKeys.BUSINESS_MODULES,
      items: [
        { 
          name: "Business Man User", 
          url: "/admin/modules/business/users", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "business_user_management" }
        },
        { 
          name: "Business Type", 
          url: "/admin/modules/business/types", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "business_type_management" }
        },
        { 
          name: "Business Categories", 
          url: "/admin/modules/business/categories", 
          permissions: [permissions.READ, permissions.WRITE],
          analytics: { category: "admin", action: "business_category_management" }
        },
      ],
      icon: <WorkIcon color="primary" />,
      metadata: {
        moduleType: "business_management",
        permissions: [permissions.ADMIN],
        compliance: ["GDPR", "CCPA", "ISO27001"],
        features: ["multi_tenant", "business_intelligence", "analytics"]
      }
    },
  ],
};

// Enhanced additional menu items with analytics and feature flags
export const additionalMenuItems = [
  { 
    name: "Share", 
    icon: "ShareIcon",
    url: "/share",
    permissions: [permissions.READ],
    analytics: { category: "social", action: "share_feature" },
    featureFlags: [featureFlags.API_INTEGRATIONS]
  },
  { 
    name: "News Post", 
    icon: "NewspaperIcon",
    url: "/news",
    permissions: [permissions.READ, permissions.WRITE],
    analytics: { category: "content", action: "news_management" },
    featureFlags: [featureFlags.API_INTEGRATIONS]
  },
];

// Utility functions for enhanced sidebar functionality
export const sidebarUtils = {
  // Generate dynamic URLs with parameters
  generateUrl: (item, params = {}) => {
    let url = item.url;
    if (item.params) {
      Object.keys(item.params).forEach(key => {
        url = url.replace(`:${key}`, item.params[key]);
      });
    }
    // Add additional parameters
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
    return url;
  },

  // Check if user has permission for an item
  hasPermission: (item, userPermissions = []) => {
    if (!item.permissions) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  },

  // Check if feature flags are enabled
  isFeatureEnabled: (item, enabledFeatures = []) => {
    if (!item.featureFlags) return true;
    return item.featureFlags.every(feature => enabledFeatures.includes(feature));
  },

  // Track analytics event
  trackAnalytics: (item, additionalData = {}) => {
    if (item.analytics) {
      // Implementation for analytics tracking
      console.log('Analytics Event:', {
        ...item.analytics,
        ...additionalData,
        timestamp: new Date().toISOString()
      });
    }
  },

  // Filter items based on user permissions and feature flags
  filterItems: (items, userPermissions = [], enabledFeatures = []) => {
    return items.filter(item => 
      sidebarUtils.hasPermission(item, userPermissions) &&
      sidebarUtils.isFeatureEnabled(item, enabledFeatures)
    );
  }
};

export default {
  sidebarData,
  moduleData,
  additionalMenuItems,
  i18nKeys,
  featureFlags,
  permissions,
  sidebarUtils
}; 