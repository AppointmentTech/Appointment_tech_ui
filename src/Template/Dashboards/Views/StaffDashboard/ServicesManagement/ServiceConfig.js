import React from 'react';
import {
  Home as HotelIcon,
  LocalHospital as LocalHospitalIcon,
  Face as FaceRetouchingNaturalIcon,
  Restaurant as FlatwareIcon,
  Build as GarageIcon,
  Handyman as HomeRepairServiceIcon,
  ContentCut as ContentCutIcon,
  Brush as CleaningIcon,
  Restaurant as FoodIcon,
  Build as MaintenanceIcon,
  LocalShipping as DeliveryIcon,
  Security as SecurityIcon,
  Spa as SpaIcon,
  LocalLaundryService as LaundryIcon,
  RoomService as RoomServiceIcon,
  LocalPharmacy as PharmacyIcon,
  LocalTaxi as TransportIcon,
  Event as EventIcon,
  Business as BusinessIcon,
  School as EducationIcon,
  SportsEsports as EntertainmentIcon,
  FitnessCenter as FitnessIcon,
  Pool as PoolIcon,
  RestaurantMenu as MenuIcon,
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationIcon,
  Help as SupportIcon
} from '@mui/icons-material';

// Import SidebarData for dynamic service configuration
import { sidebarData } from '../../../../../CommonComponents/SidebarData.js';

// Dynamic service configuration based on SidebarData.js
export const DYNAMIC_SERVICE_TYPES = {
  // Hostel Services
  hostel: {
    label: 'Hostel Management',
    icon: <HotelIcon />,
    color: 'primary',
    duration: 120,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Room Management', 'Customer Management', 'Booking Management', 'Staff Management', 'Billing & Payments', 'Food Catering', 'Reports & Analytics', 'Maintenance', 'Settings']
  },
  
  // Hospital Services
  hospital: {
    label: 'Hospital Management',
    icon: <LocalHospitalIcon />,
    color: 'error',
    duration: 180,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Patient Management', 'Appointment Management', 'Room Management', 'Staff Management', 'Billing & Payments', 'Food & Catering', 'Inventory/Pharmacy', 'Operation Theater', 'Laboratory', 'Ambulance', 'Asset/Equipment', 'Visitor Management', 'Discharge/Transfer', 'Reports & Analytics', 'Maintenance', 'Settings', 'Admission Requests']
  },
  
  // Garage Services
  garage: {
    label: 'Garage Management',
    icon: <GarageIcon />,
    color: 'warning',
    duration: 240,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
    categories: ['Services Offered', 'Technician Management', 'Customer Management', 'Vehicle Management', 'Bookings', 'Job Cards', 'Inventory', 'Parts Management', 'Supplier Management', 'Service History', 'Invoices & GST', 'Payments', 'Expenses', 'Reports & Analytics', 'Reminders', 'Offers & Campaigns', 'Feedback & Reviews', 'Staff Attendance', 'Settings']
  },
  
  // Beauty & Tattoo Services
  beauty: {
    label: 'Beauty & Tattoo',
    icon: <FaceRetouchingNaturalIcon />,
    color: 'secondary',
    duration: 90,
    slots: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Services', 'Artist Management', 'Customer Management', 'Appointments', 'Inventory', 'Invoices', 'Reports', 'Settings']
  },
  
  // Food Catering Services
  food: {
    label: 'Food & Catering',
    icon: <FlatwareIcon />,
    color: 'success',
    duration: 60,
    slots: ['07:00', '08:00', '12:00', '18:00', '20:00'],
    categories: ['Menu Management', 'Hostel Management', 'Personal Catering', 'Bookings', 'Inventory', 'Invoices', 'Reports', 'Settings']
  },
  
  // Fashion Design Services
  fashion: {
    label: 'Fashion Design',
    icon: <ContentCutIcon />,
    color: 'info',
    duration: 120,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Designers', 'Orders', 'Reports']
  },
  
  // Professional Services
  professional: {
    label: 'Professional Services',
    icon: <HomeRepairServiceIcon />,
    color: 'primary',
    duration: 150,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Experts', 'Bookings', 'Reports']
  },
  
  // Cleaning Services
  cleaning: {
    label: 'Cleaning Services',
    icon: <CleaningIcon />,
    color: 'primary',
    duration: 120,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Room Cleaning', 'Common Area', 'Deep Cleaning', 'Laundry']
  },
  
  // Maintenance Services
  maintenance: {
    label: 'Maintenance Services',
    icon: <MaintenanceIcon />,
    color: 'warning',
    duration: 180,
    slots: ['08:00', '10:00', '14:00', '16:00'],
    categories: ['Electrical', 'Plumbing', 'HVAC', 'General Repairs']
  },
  
  // Delivery Services
  delivery: {
    label: 'Delivery Services',
    icon: <DeliveryIcon />,
    color: 'info',
    duration: 30,
    slots: ['09:00', '11:00', '14:00', '16:00', '18:00'],
    categories: ['Package Delivery', 'Grocery', 'Medicine', 'Other Items']
  },
  
  // Security Services
  security: {
    label: 'Security Services',
    icon: <SecurityIcon />,
    color: 'error',
    duration: 45,
    slots: ['00:00', '06:00', '12:00', '18:00'],
    categories: ['Patrol', 'Access Control', 'Emergency Response', 'Monitoring']
  },
  
  // Wellness & Spa Services
  spa: {
    label: 'Wellness & Spa',
    icon: <SpaIcon />,
    color: 'secondary',
    duration: 90,
    slots: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Massage', 'Facial', 'Therapy', 'Wellness Consultation']
  },
  
  // Laundry Services
  laundry: {
    label: 'Laundry Services',
    icon: <LaundryIcon />,
    color: 'primary',
    duration: 60,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
    categories: ['Washing', 'Ironing', 'Dry Cleaning', 'Express Service']
  },
  
  // Room Service
  roomService: {
    label: 'Room Service',
    icon: <RoomServiceIcon />,
    color: 'success',
    duration: 30,
    slots: ['07:00', '08:00', '12:00', '18:00', '20:00'],
    categories: ['Food Delivery', 'Housekeeping', 'Amenities', 'Special Requests']
  },
  
  // Pharmacy Services
  pharmacy: {
    label: 'Pharmacy Services',
    icon: <PharmacyIcon />,
    color: 'error',
    duration: 45,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Medicine Delivery', 'Prescription', 'Health Consultation', 'Emergency Medicine']
  },
  
  // Transport Services
  transport: {
    label: 'Transport Services',
    icon: <TransportIcon />,
    color: 'info',
    duration: 60,
    slots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    categories: ['Pickup & Drop', 'Airport Transfer', 'Local Tours', 'Emergency Transport']
  },
  
  // Event Services
  event: {
    label: 'Event Services',
    icon: <EventIcon />,
    color: 'secondary',
    duration: 240,
    slots: ['09:00', '12:00', '15:00', '18:00'],
    categories: ['Event Planning', 'Decoration', 'Catering', 'Entertainment']
  },
  
  // Business Services
  business: {
    label: 'Business Services',
    icon: <BusinessIcon />,
    color: 'primary',
    duration: 120,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Consulting', 'Training', 'Support', 'Documentation']
  },
  
  // Education Services
  education: {
    label: 'Education Services',
    icon: <EducationIcon />,
    color: 'info',
    duration: 90,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Tutoring', 'Workshops', 'Online Classes', 'Certification']
  },
  
  // Entertainment Services
  entertainment: {
    label: 'Entertainment Services',
    icon: <EntertainmentIcon />,
    color: 'secondary',
    duration: 120,
    slots: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Gaming', 'Movies', 'Music', 'Activities']
  },
  
  // Fitness Services
  fitness: {
    label: 'Fitness Services',
    icon: <FitnessIcon />,
    color: 'success',
    duration: 60,
    slots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Personal Training', 'Group Classes', 'Equipment', 'Nutrition']
  },
  
  // Pool Services
  pool: {
    label: 'Pool Services',
    icon: <PoolIcon />,
    color: 'info',
    duration: 90,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Swimming Lessons', 'Pool Maintenance', 'Safety', 'Equipment']
  },
  
  // Menu Services
  menu: {
    label: 'Menu Services',
    icon: <MenuIcon />,
    color: 'success',
    duration: 30,
    slots: ['07:00', '08:00', '12:00', '18:00', '20:00'],
    categories: ['Menu Planning', 'Special Diets', 'Seasonal Items', 'Custom Orders']
  },
  
  // Inventory Services
  inventory: {
    label: 'Inventory Services',
    icon: <InventoryIcon />,
    color: 'warning',
    duration: 60,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
    categories: ['Stock Management', 'Ordering', 'Tracking', 'Reports']
  },
  
  // Payment Services
  payment: {
    label: 'Payment Services',
    icon: <PaymentIcon />,
    color: 'success',
    duration: 30,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Billing', 'Collections', 'Refunds', 'Reports']
  },
  
  // Reports Services
  reports: {
    label: 'Reports Services',
    icon: <ReportsIcon />,
    color: 'info',
    duration: 45,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Analytics', 'Performance', 'Financial', 'Operational']
  },
  
  // Settings Services
  settings: {
    label: 'Settings Services',
    icon: <SettingsIcon />,
    color: 'primary',
    duration: 30,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['System', 'User', 'Security', 'Preferences']
  },
  
  // Person Services
  person: {
    label: 'Person Services',
    icon: <PersonIcon />,
    color: 'primary',
    duration: 60,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Profile', 'Preferences', 'History', 'Settings']
  },
  
  // Group Services
  group: {
    label: 'Group Services',
    icon: <GroupIcon />,
    color: 'secondary',
    duration: 90,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Team Management', 'Collaboration', 'Communication', 'Projects']
  },
  
  // Assignment Services
  assignment: {
    label: 'Assignment Services',
    icon: <AssignmentIcon />,
    color: 'primary',
    duration: 120,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Task Management', 'Scheduling', 'Tracking', 'Reporting']
  },
  
  // Schedule Services
  schedule: {
    label: 'Schedule Services',
    icon: <ScheduleIcon />,
    color: 'info',
    duration: 30,
    slots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    categories: ['Appointments', 'Bookings', 'Availability', 'Calendar']
  },
  
  // Notification Services
  notification: {
    label: 'Notification Services',
    icon: <NotificationIcon />,
    color: 'warning',
    duration: 15,
    slots: ['00:00', '06:00', '12:00', '18:00'],
    categories: ['Alerts', 'Reminders', 'Updates', 'Emergency']
  },
  
  // Support Services
  support: {
    label: 'Support Services',
    icon: <SupportIcon />,
    color: 'primary',
    duration: 60,
    slots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    categories: ['Help Desk', 'Technical Support', 'Training', 'Documentation']
  }
};

// Service type mapping from SidebarData sections
export const SERVICE_TYPE_MAPPING = {
  'Hostels': 'hostel',
  'Hospitals': 'hospital',
  'Garages': 'garage',
  'Beauty & Tattoo': 'beauty',
  'Food Catering': 'food',
  'Fashion Design': 'fashion',
  'Professional Services': 'professional'
};

// Get service types from SidebarData
export const getServiceTypesFromSidebar = (sidebarData) => {
  const serviceTypes = {};
  
  sidebarData.sections.forEach(section => {
    const serviceKey = SERVICE_TYPE_MAPPING[section.name];
    if (serviceKey && DYNAMIC_SERVICE_TYPES[serviceKey]) {
      serviceTypes[serviceKey] = {
        ...DYNAMIC_SERVICE_TYPES[serviceKey],
        categories: section.items.map(item => 
          typeof item === 'string' ? item : item.name
        )
      };
    }
  });
  
  return serviceTypes;
};

// Generate mock data for dynamic services
export const generateMockDataForServices = (serviceTypes) => {
  const mockData = {
    overview: {
      totalServices: 0,
      activeServices: 0,
      completedToday: 0,
      pendingServices: 0,
      averageRating: 0,
      efficiency: 0
    },
    serviceTypes: {},
    recentActivities: [],
    upcomingServices: [],
    topPerformers: []
  };

  let totalServices = 0;
  let activeServices = 0;
  let completedToday = 0;
  let pendingServices = 0;
  let totalRating = 0;
  let serviceCount = 0;

  Object.entries(serviceTypes).forEach(([key, config]) => {
    const total = Math.floor(Math.random() * 50) + 10;
    const active = Math.floor(Math.random() * 10) + 1;
    const completed = Math.floor(Math.random() * 30) + 5;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

    mockData.serviceTypes[key] = {
      total,
      active,
      completed,
      rating: parseFloat(rating)
    };

    totalServices += total;
    activeServices += active;
    completedToday += completed;
    pendingServices += (total - active - completed);
    totalRating += parseFloat(rating);
    serviceCount++;
  });

  mockData.overview = {
    totalServices,
    activeServices,
    completedToday,
    pendingServices,
    averageRating: (totalRating / serviceCount).toFixed(1),
    efficiency: Math.floor(Math.random() * 20) + 80
  };

  return mockData;
};

export default DYNAMIC_SERVICE_TYPES; 