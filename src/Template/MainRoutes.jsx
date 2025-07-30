import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CircularProgress, Box } from "@mui/material";
import { DefaultRedirect } from "../DefaultRedirect";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthContext } from "../ContextOrRedux/AuthContext.js";
import { NavigationErrorBoundary } from "../CommonMethods/NavigationUtils.js";

// Error Pages - Lazy loaded
const Error404 = lazy(() => import("./ErrorPages/Error404.jsx"));
const Error403 = lazy(() => import("./ErrorPages/Error403.jsx"));
const Error500 = lazy(() => import("./ErrorPages/Error500.jsx"));
const ErrorMaintenance = lazy(() => import("./ErrorPages/ErrorMaintenance.jsx"));
const ErrorDemo = lazy(() => import("./ErrorPages/ErrorDemo.jsx"));

// Front Website - Lazy loaded
const Home = lazy(() => import("./FrontWebsite/Views/Home/Home.jsx"));
const SignIn = lazy(() => import("./FrontWebsite/Views/Auth/SignIn.jsx"));
const SignUp = lazy(() => import("./FrontWebsite/Views/Auth/SignUp.jsx"));
const About = lazy(() => import("./FrontWebsite/Views/About/About.jsx"));
const OurBusinesses = lazy(() => import("./FrontWebsite/Views/OurBusinesses/OurBusinesses.jsx"));
const NewsRoom = lazy(() => import("./FrontWebsite/Views/NewsRoom/NewsRoom.jsx"));
const ContactUs = lazy(() => import("./FrontWebsite/Views/ContactUs/ContactUs.jsx"));

// Business Details Pages - Lazy loaded
const HostelDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/HostelDetails.jsx"));
const FoodCateringDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/FoodCateringDetails.jsx"));
const HospitalDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/HospitalDetails.jsx"));
const FashionDesignDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/FashionDesignDetails.jsx"));
const GarageDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/GarageDetails.jsx"));
const ProfessionalServicesDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/ProfessionalServicesDetails.jsx"));
const BeautyTattooDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/BeautyTattooDetails.jsx"));

// Admin Dashboard - Lazy loaded
const AdminDashboard = lazy(() => import("./Dashboards/Views/AdminDashboards/AdminDashboard.jsx"));

// Staff Dashboard - Lazy loaded
const StaffDashboard = lazy(() => import("./Dashboards/Views/StaffDashboard/StaffDashboard.jsx"));

// Common Modules - Lazy loaded
const UserTypes = lazy(() => import("../CommonModules/UserModule/UserTypes/UserTypes.jsx"));
const Users = lazy(() => import("../CommonModules/UserModule/Users/Users.jsx"));
const Pages = lazy(() => import("../CommonModules/UserModule/Pages/Pages.jsx"));
const UserPermission = lazy(() => import("../CommonModules/UserModule/UserPermission/UserPermission.jsx"));
const LocationMaster = lazy(() => import("../CommonModules/LocationModule/LocationMaster/LocationMaster.jsx"));
const LocationActivePincode = lazy(() => import("../CommonModules/LocationModule/LocationActivePincode/LocationActivePincode.jsx"));
const BussinessType = lazy(() => import("../CommonModules/BussinessModule/BussinessType/BussinessType.jsx"));
const BusinessCategories = lazy(() => import("../CommonModules/BussinessModule/BusinessCategories/BusinessCategories.jsx"));
const BusinessManUsers = lazy(() => import('../CommonModules/BussinessModule/BusinessManUsers/BusinessManUsers.jsx'));

// Hostel Admin Components - Lazy loaded
const HostelAdminDashboard = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/HostelAdminDashboard.jsx"));
const RoomManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/RoomManagement/RoomManagement.jsx"));
const CustomerManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/CustomerManagement/CustomerManagement.jsx"));
const BookingManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/BookingManagement/BookingManagement.jsx"));
const BillingManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/BillingManagement/BillingManagement.jsx"));
const StaffManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/StaffManagement/StaffManagement.jsx"));
const FoodCatering = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/FoodCatering/FoodCatering.jsx"));
const Reports = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/Reports/Reports.jsx"));
const Maintenance = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/Maintenance/Maintenance.jsx"));
const SystemSettings = lazy(() => import("./Dashboards/Views/BusinessDashboard/HostelAdmin/Settings/Settings.jsx"));

// Hospital Admin Components - Lazy loaded
const HospitalsAdminDashboard = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalsAdminDashboard.jsx"));
const PatientManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/PatientManagement.jsx"));
const AppointmentManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AppointmentManagement.jsx"));
const AdmissionRequests = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AdmissionRequests.jsx"));
const InventoryManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/InventoryManagement.jsx"));
const OperationTheaterManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/OperationTheaterManagement.jsx"));
const LaboratoryManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/LaboratoryManagement.jsx"));
const AmbulanceManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AmbulanceManagement.jsx"));
const AssetManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AssetManagement.jsx"));
const VisitorManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/VisitorManagement.jsx"));
const DischargeManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/DischargeManagement.jsx"));
const HospitalRoomManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalRoomManagement.jsx"));
const HospitalStaffManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalStaffManagement.jsx"));
const HospitalBillingManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalBillingManagement.jsx"));

// Garage Admin Components - Lazy loaded
const GarageAdminDashboard = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageAdminDashboard.jsx"));
const GarageServices = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageServices.jsx"));
const GarageTechnicianManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageTechnicianManagement.jsx"));
const GarageCustomerManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageCustomerManagement.jsx"));
const GarageVehicles = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageVehicles.jsx"));
const GarageBookings = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageBookings.jsx"));
const GarageJobCards = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageJobCards.jsx"));
const GarageInventory = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageInventory.jsx"));
const GarageParts = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageParts.jsx"));
const GarageSuppliers = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageSuppliers.jsx"));
const GarageServiceHistory = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageServiceHistory.jsx"));
const GarageInvoices = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageInvoices.jsx"));
const GaragePayments = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GaragePayments.jsx"));
const GarageExpenses = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageExpenses.jsx"));
const GarageReports = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageReports.jsx"));
const GarageReminders = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageReminders.jsx"));
const GarageOffers = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageOffers.jsx"));
const GarageFeedback = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageFeedback.jsx"));
const GarageAttendance = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageAttendance.jsx"));
const AttendanceCalendar = lazy(() => import("./Dashboards/Views/BusinessDashboard/GarageAdmin/AttendanceCalendar.jsx"));

// Food Catering Admin Components - Lazy loaded
const FoodCateringDashboard = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/FoodCateringDashboard.jsx"));
const MenuManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/MenuManagement.jsx"));
const HostelCateringManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/HostelCateringManagement.jsx"));
const PersonalCateringManagement = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/PersonalCateringManagement.jsx"));
const FoodCateringBookings = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/FoodCateringBookings.jsx"));
const FoodCateringInventory = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/FoodCateringInventory.jsx"));
const FoodCateringInvoices = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/FoodCateringInvoices.jsx"));
const FoodCateringReports = lazy(() => import("./Dashboards/Views/BusinessDashboard/FoodCateringAdmin/FoodCateringReports.jsx"));

// Loading component with enhanced styling
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    }}
  >
    <CircularProgress color="inherit" size={60} />
  </Box>
);

// Enhanced route configuration
const routeConfig = {
  // Public routes (no authentication required)
  public: [
    { path: "/", element: <Home /> },
    { path: "/SignIn", element: <SignIn /> },
    { path: "/SignUp", element: <SignUp /> },
    { path: "/About", element: <About /> },
    { path: "/OurBusinesses", element: <OurBusinesses /> },
    { path: "/NewsRoom", element: <NewsRoom /> },
    { path: "/ContactUs", element: <ContactUs /> },
    { path: "/HostelDetails", element: <HostelDetails /> },
    { path: "/FoodCateringDetails", element: <FoodCateringDetails /> },
    { path: "/HospitalDetails", element: <HospitalDetails /> },
    { path: "/FashionDesignDetails", element: <FashionDesignDetails /> },
    { path: "/GarageDetails", element: <GarageDetails /> },
    { path: "/ProfessionalServicesDetails", element: <ProfessionalServicesDetails /> },
    { path: "/BeautyTattooDetails", element: <BeautyTattooDetails /> },
    { path: "/AdminDashboard", element: <AdminDashboard />, roles: ["admin"] },
  ],

  // Protected routes (authentication required)
  protected: [
    // Admin routes
    // { path: "/AdminDashboard", element: <AdminDashboard />, roles: ["admin"] },
    { path: "/BusinessManUsers", element: <BusinessManUsers />, roles: ["admin"] },
    { path: "/BusinessCategories", element: <BusinessCategories />, roles: ["admin"] },
    { path: "/BussinessType", element: <BussinessType />, roles: ["admin"] },
    { path: "/LocationActivePincode", element: <LocationActivePincode />, roles: ["admin"] },
    { path: "/LocationMaster", element: <LocationMaster />, roles: ["admin"] },
    { path: "/UserPermission", element: <UserPermission />, roles: ["admin"] },
    { path: "/Pages", element: <Pages />, roles: ["admin"] },
    { path: "/UserTypes", element: <UserTypes />, roles: ["admin"] },
    { path: "/Users", element: <Users />, roles: ["admin"] },

    // Staff routes
    { path: "/StaffDashboard", element: <StaffDashboard />, roles: ["staff", "manager"] },

    // Hostel business routes
    { path: "/HostelAdminDashboard", element: <HostelAdminDashboard />, roles: ["admin", "business_owner", "manager"] },
    { path: "/RoomManagement", element: <RoomManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/CustomerManagement", element: <CustomerManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/BookingManagement", element: <BookingManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/BillingManagement", element: <BillingManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/StaffManagement", element: <StaffManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/FoodCatering", element: <FoodCatering />, roles: ["admin", "business_owner", "manager"] },
    { path: "/Reports", element: <Reports />, roles: ["admin", "business_owner", "manager"] },
    { path: "/Maintenance", element: <Maintenance />, roles: ["admin", "business_owner", "manager"] },
    { path: "/Settings", element: <SystemSettings />, roles: ["admin", "business_owner"] },

    // Hospital business routes
    { path: "/HospitalsAdminDashboard", element: <HospitalsAdminDashboard />, roles: ["admin", "business_owner", "manager"] },
    { path: "/PatientManagement", element: <PatientManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/AppointmentManagement", element: <AppointmentManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/AdmissionRequests", element: <AdmissionRequests />, roles: ["admin", "business_owner", "manager"] },
    { path: "/InventoryManagement", element: <InventoryManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/OperationTheaterManagement", element: <OperationTheaterManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/LaboratoryManagement", element: <LaboratoryManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/AmbulanceManagement", element: <AmbulanceManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/AssetManagement", element: <AssetManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/VisitorManagement", element: <VisitorManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/DischargeManagement", element: <DischargeManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/HospitalRoomManagement", element: <HospitalRoomManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/HospitalStaffManagement", element: <HospitalStaffManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/HospitalBillingManagement", element: <HospitalBillingManagement />, roles: ["admin", "business_owner", "manager"] },

    // Garage business routes
    { path: "/GarageAdminDashboard", element: <GarageAdminDashboard />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageServices", element: <GarageServices />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageTechnicianManagement", element: <GarageTechnicianManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageCustomerManagement", element: <GarageCustomerManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageVehicles", element: <GarageVehicles />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageBookings", element: <GarageBookings />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageJobCards", element: <GarageJobCards />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageInventory", element: <GarageInventory />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageParts", element: <GarageParts />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageSuppliers", element: <GarageSuppliers />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageServiceHistory", element: <GarageServiceHistory />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageInvoices", element: <GarageInvoices />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GaragePayments", element: <GaragePayments />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageExpenses", element: <GarageExpenses />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageReports", element: <GarageReports />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageReminders", element: <GarageReminders />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageOffers", element: <GarageOffers />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageFeedback", element: <GarageFeedback />, roles: ["admin", "business_owner", "manager"] },
    { path: "/GarageAttendance", element: <GarageAttendance />, roles: ["admin", "business_owner", "manager"] },
    { path: "/AttendanceCalendar", element: <AttendanceCalendar />, roles: ["admin", "business_owner", "manager"] },

    // Food Catering business routes
    { path: "/FoodCateringDashboard", element: <FoodCateringDashboard />, roles: ["admin", "business_owner", "manager"] },
    { path: "/MenuManagement", element: <MenuManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/HostelCateringManagement", element: <HostelCateringManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/PersonalCateringManagement", element: <PersonalCateringManagement />, roles: ["admin", "business_owner", "manager"] },
    { path: "/FoodCateringBookings", element: <FoodCateringBookings />, roles: ["admin", "business_owner", "manager"] },
    { path: "/FoodCateringInventory", element: <FoodCateringInventory />, roles: ["admin", "business_owner", "manager"] },
    { path: "/FoodCateringInvoices", element: <FoodCateringInvoices />, roles: ["admin", "business_owner", "manager"] },
    { path: "/FoodCateringReports", element: <FoodCateringReports />, roles: ["admin", "business_owner", "manager"] },
  ],

  // Error routes
  error: [
    { path: "/error/403", element: <Error403 /> },
    { path: "/error/404", element: <Error404 /> },
    { path: "/error/500", element: <Error500 /> },
    { path: "/error/maintenance", element: <ErrorMaintenance /> },
    { path: "/error/demo", element: <ErrorDemo /> },
  ]
};

// Enhanced route component with role-based access
const ProtectedRouteWithRoles = ({ element, roles = [], children }) => {
  const context = useContext(AuthContext);
  const userRole = context?.state?.user?.role || 'guest';
  
  // Check if user has required role
  const hasAccess = roles.length === 0 || roles.includes(userRole);
  
  if (!hasAccess) {
    return <Navigate to="/error/403" replace />;
  }
  
  return element || children;
};

var hist = createBrowserHistory();

export default function MainRoutes() {
  const context = useContext(AuthContext);
  
  return (
    <Router>
      <NavigationErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Default redirect for root route */}
            <Route path="/" element={<DefaultRedirect />} />

            {/* Example protected route usage: */}
            {/* <Route path="/admin/modules/users" element={
              <ProtectedRoute requiredPageId={1} requiredPermission="Can_View">
                <Users />
              </ProtectedRoute>
            } /> */}

            {/* Public Routes */}
            {routeConfig.public.map((route) => (
              <Route
                key={route.path}
                exact
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute
                  isAllowed={
                    context.state &&
                    context.state.isAuthenticated &&
                    !!context.state.user
                  }
                  currentUser={
                    context.state &&
                    context.state.isAuthenticated &&
                    context.state.user
                  }
                />
              }
            >
              {routeConfig.protected.map((route) => (
                <Route
                  key={route.path}
                  exact
                  path={route.path}
                  element={
                    <ProtectedRouteWithRoles
                      element={route.element}
                      roles={route.roles}
                    />
                  }
                />
              ))}
            </Route>

            {/* Error Routes */}
            {routeConfig.error.map((route) => (
              <Route
                key={route.path}
                exact
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Catch-all route for 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </NavigationErrorBoundary>
    </Router>
  );
}
