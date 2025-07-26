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
 * Common Sidebar Data for Dashboard Headers
 * 
 * This file contains shared sidebar data that can be used by both AdminHeader and CoAdminHeader components.
 * 
 * Usage:
 * - Import the specific data you need: { sidebarData, moduleData, additionalMenuItems }
 * - sidebarData: Contains service sections with navigation URLs
 * - moduleData: Contains admin-specific module sections
 * - additionalMenuItems: Contains additional menu items like Share and News Post
 * 
 * Structure:
 * - Each section has a name, items array, and icon
 * - Items can be strings (for simple text) or objects with name and url properties
 * - Icons are React components with color="primary" prop
 */
export const sidebarData = {
  sections: [
    {
      name: "Hostels",
      items: [
        { name: "Dashboard", url: "/HostelAdminDashboard" },
        { name: "Room Management", url: "/RoomManagement" },
        { name: "Customer Management", url: "/CustomerManagement" },
        { name: "Booking Management", url: "/BookingManagement" },
        { name: "Staff Management", url: "/StaffManagement" },
        { name: "Billing & Payments", url: "/BillingManagement" },
        { name: "Food Catering", url: "/FoodCatering" },
        { name: "Reports & Analytics", url: "/Reports" },
        { name: "Maintenance", url: "/Maintenance" },
        { name: "Settings", url: "/Settings" },
      ],
      icon: <HotelIcon color="primary" />,
    },
    {
      name: "Hospitals",
      items: [
        { name: "Dashboard", url: "/HospitalsAdminDashboard" },
        { name: "Patient Management", url: "/PatientManagement" },
        { name: "Appointment Management", url: "/AppointmentManagement" },
        { name: "Room Management", url: "/RoomManagement" },
        { name: "Staff Management", url: "/HospitalStaffManagement" },
        { name: "Billing & Payments", url: "/HospitalBillingManagement" },
        { name: "Food & Catering", url: "/FoodCatering" },
        { name: "Inventory/Pharmacy Management", url: "/InventoryManagement" },
        { name: "Operation Theater Management", url: "/OperationTheaterManagement" },
        { name: "Laboratory Management", url: "/LaboratoryManagement" },
        { name: "Ambulance Management", url: "/AmbulanceManagement" },
        { name: "Asset/Equipment Management", url: "/AssetManagement" },
        { name: "Visitor Management", url: "/VisitorManagement" },
        { name: "Discharge/Transfer Management", url: "/DischargeManagement" },
        { name: "Reports & Analytics", url: "/Reports" },
        { name: "Maintenance", url: "/Maintenance" },
        { name: "Settings", url: "/Settings" },
        { name: "Admission Requests", url: "/AdmissionRequests" },
      ],
      icon: <LocalHospitalIcon color="primary" />,
    },
    {
      name: "Garages",
      items: [
        { name: "Dashboard", url: "/GarageAdminDashboard" },
        { name: "Services Offered", url: "/GarageServices" },
        { name: "Technician Management", url: "/GarageTechnicianManagement" },
        { name: "Customer Management", url: "/GarageCustomerManagement" },
        { name: "Vehicle Management", url: "/GarageVehicles" }, // For two-wheelers, cars, autos, trucks
        { name: "Bookings", url: "/GarageBookings" },
        { name: "Job Cards", url: "/GarageJobCards" }, // Digital job cards with photos, consent
        { name: "Inventory", url: "/GarageInventory" },
        { name: "Parts Management", url: "/GarageParts" },
        { name: "Supplier Management", url: "/GarageSuppliers" },
        { name: "Service History", url: "/GarageServiceHistory" },
        { name: "Invoices & GST", url: "/GarageInvoices" }, // GST-compliant invoices
        { name: "Payments", url: "/GaragePayments" }, // UPI, Paytm, Razorpay, etc.
        { name: "Expenses", url: "/GarageExpenses" },
        { name: "Reports & Analytics", url: "/GarageReports" },
        { name: "Reminders", url: "/GarageReminders" }, // Insurance, PUC, fitness, service
        { name: "Offers & Campaigns", url: "/GarageOffers" }, // Festival/seasonal offers
        { name: "Feedback & Reviews", url: "/GarageFeedback" },
        { name: "Staff Attendance", url: "/GarageAttendance" }, // Optional: Aadhaar/biometric
        { name: "Settings", url: "/Settings" }
      ],
      icon: <GarageIcon color="primary" />,
    },
    {
      name: "Beauty & Tattoo",
      items: [
        { name: "Dashboard", url: "/BeautyTattooDashboard" },
        { name: "Services", url: "/BeautyTattooServices" },
        { name: "Artist Management", url: "/Artists" },
        { name: "Customer Management", url: "/TattooCustomerProfiles" },
        { name: "Appointments", url: "/TattooAppointments" },
        { name: "Inventory", url: "/BeautyTattooInventory" },
        { name: "Invoices", url: "/BeautyTattooInvoices" },
        { name: "Reports", url: "/TattooReports" },
        { name: "Settings", url: "/BeautyTattooSettings" },
      ],
      icon: <FaceRetouchingNaturalIcon color="primary" />,
    },
    {
      name: "Food Catering",
      items: [
        { name: "Dashboard", url: "/FoodCateringDashboard" },
        { name: "Menu Management", url: "/MenuManagement" },
        { name: "Hostel Management", url: "/HostelCateringManagement" },
        { name: "Personal Catering", url: "/PersonalCatering" },
        { name: "Bookings", url: "/FoodCateringBookings" },
        { name: "Inventory", url: "/FoodCateringInventory" },
        { name: "Invoices", url: "/FoodCateringInvoices" },
        { name: "Reports", url: "/FoodCateringReports" },
        { name: "Settings", url: "/FoodCateringSettings" },
      ],
      icon: <FlatwareIcon color="primary" />,
    },
    // {
    //   name: "Fashion Design",
    //   items: [
    //     { name: "Designers", url: "/FashionDesigners" },
    //     { name: "Orders", url: "/FashionOrders" },
    //     { name: "Reports", url: "/FashionReports" },
    //   ],
    //   icon: <ContentCutIcon color="primary" />,
    // },
    // {
    //   name: "Professional Services",
    //   items: [
    //     { name: "Experts", url: "/Experts" },
    //     { name: "Bookings", url: "/ProfessionalServiceBookings" },
    //     { name: "Reports", url: "/ProfessionalServiceReports" },
    //   ],
    //   icon: <HomeRepairServiceIcon color="primary" />,
    // },
  ],
};

// Module data for admin header
export const moduleData = {
  sections: [
    {
      name: "User Modules",
      items: [
        { name: "User Types", url: "/UserTypes" },
        { name: "Users", url: "/Users" },
        { name: "Pages", url: "/Pages" },
        { name: "User Permission", url: "/UserPermission" },
        // { name: "Logs", url: "/Logs" },
      ],
      icon: <AccountCircleIcon color="primary" />,
    },
    {
      name: "Location Modules",
      items: [
        { name: "Location Master", url: "/LocationMaster" },
        { name: "Location Active Pin code", url: "/LocationActivePinCode" },
        { name: "Location User Address", url: "/LocationUserAddress" },
      ],
      icon: <MyLocationIcon color="primary" />,
    },
    {
      name: "Bussiness Module",
      items: [
        { name: "Business Man User", url: "/BusinessManUsers" },
        { name: "Business Type", url: "/BussinessType" },
        { name: "Business Categories", url: "/BusinessCategories" },
      ],
      icon: <WorkIcon color="primary" />,
    },
  ],
};

// Additional menu items for admin header
export const additionalMenuItems = [
  { name: "Share", icon: "ShareIcon" },
  { name: "News Post", icon: "NewspaperIcon" },
];

export default {
  sidebarData,
  moduleData,
  additionalMenuItems,
}; 