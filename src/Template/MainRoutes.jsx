import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CircularProgress, Box } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthContext } from "../ContextOrRedux/AuthContext.js";

// Lazy load components for code splitting
const Home = lazy(() => import("./FrontWebsite/Views/Home/Home.jsx"));
const SignIn = lazy(() => import("./FrontWebsite/Views/Auth/SignIn.jsx"));
const SignUp = lazy(() => import("./FrontWebsite/Views/Auth/SignUp.jsx"));
const About = lazy(() => import("./FrontWebsite/Views/About/About.jsx"));
const OurBusinesses = lazy(() => import("./FrontWebsite/Views/OurBusinesses/OurBusinesses.jsx"));
const NewsRoom = lazy(() => import("./FrontWebsite/Views/NewsRoom/NewsRoom.jsx"));
const ContactUs = lazy(() => import("./FrontWebsite/Views/ContactUs/ContactUs.jsx"));
const HostelDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/HostelDetails.jsx"));
const FoodCateringDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/FoodCateringDetails.jsx"));
const HospitalDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/HospitalDetails.jsx"));
const FashionDesignDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/FashionDesignDetails.jsx"));
const GarageDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/GarageDetails.jsx"));
const ProfessionalServicesDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/ProfessionalServicesDetails.jsx"));
const BeautyTattooDetails = lazy(() => import("./FrontWebsite/Views/AllAppointmentDetails/BeautyTattooDetails.jsx"));

// Admin Dashboard - Lazy loaded
const AdminDashboard = lazy(() => import("./Dashboards/Views/AdminDashboards/AdminDashboard.jsx"));

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

// Staff Dashboard - Lazy loaded
const StaffDashboard = lazy(() => import("./Dashboards/Views/StaffDashboard/StaffDashboard.jsx"));

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

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

var hist = createBrowserHistory();

export default function MainRoutes() {
  const context = useContext(AuthContext);
  
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
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
            <Route
              exact
              path="/BusinessManUsers"
              element={<BusinessManUsers />}
            />
            <Route
              exact
              path="/BusinessCategories"
              element={<BusinessCategories />}
            />
            <Route exact path="/BussinessType" element={<BussinessType />} />
            <Route
              exact
              path="/LocationActivePincode"
              element={<LocationActivePincode />}
            />
            <Route exact path="/LocationMaster" element={<LocationMaster />} />
            <Route exact path="/UserPermission" element={<UserPermission />} />
            <Route exact path="/Pages" element={<Pages />} />
            <Route exact path="/UserTypes" element={<UserTypes />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/AdminDashboard" element={<AdminDashboard />} />
            <Route
              exact
              path="/HostelAdminDashboard"
              element={<HostelAdminDashboard />}
            />
            <Route
              exact
              path="/RoomManagement"
              element={<RoomManagement />}
            />
            <Route
              exact
              path="/CustomerManagement"
              element={<CustomerManagement />}
            />
             <Route
              exact
              path="/BookingManagement"
              element={<BookingManagement />}
            />
           <Route
              exact
              path="/BillingManagement"
              element={<BillingManagement />}
            />
            <Route
              exact
              path="/StaffManagement"
              element={<StaffManagement />}
            />
            <Route
              exact
              path="/FoodCatering"
              element={<FoodCatering />}
            />
            <Route
              exact
              path="/Reports"
              element={<Reports />}
            />
            <Route
              exact
              path="/Maintenance"
              element={<Maintenance />}
            />
            <Route
              exact
              path="/Settings"
              element={<SystemSettings />}
            />
            <Route
              exact
              path="/StaffDashboard"
              element={<StaffDashboard />}
            />
            <Route
              exact
              path="/HospitalsAdminDashboard"
              element={<HospitalsAdminDashboard />}
            />
            <Route
              exact
              path="/PatientManagement"
              element={<PatientManagement />}
            />
            <Route
              exact
              path="/AppointmentManagement"
              element={<AppointmentManagement />}
            />
            <Route
              exact
              path="/AdmissionRequests"
              element={<AdmissionRequests />}
            />
            <Route exact path="/InventoryManagement" element={<InventoryManagement />} />
            <Route exact path="/OperationTheaterManagement" element={<OperationTheaterManagement />} />
            <Route exact path="/LaboratoryManagement" element={<LaboratoryManagement />} />
            <Route exact path="/AmbulanceManagement" element={<AmbulanceManagement />} />
            <Route exact path="/AssetManagement" element={<AssetManagement />} />
            <Route exact path="/VisitorManagement" element={<VisitorManagement />} />
            <Route exact path="/DischargeManagement" element={<DischargeManagement />} />
            <Route exact path="/HospitalRoomManagement" element={<HospitalRoomManagement />} />
            <Route exact path="/HospitalStaffManagement" element={<HospitalStaffManagement />} />
            <Route exact path="/HospitalBillingManagement" element={<HospitalBillingManagement />} />
            <Route exact path="/GarageAdminDashboard" element={<GarageAdminDashboard />} />
            <Route exact path="/GarageServices" element={<GarageServices />} />
            <Route exact path="/GarageTechnicianManagement" element={<GarageTechnicianManagement />} />
            <Route exact path="/GarageCustomerManagement" element={<GarageCustomerManagement />} />
            <Route exact path="/GarageVehicles" element={<GarageVehicles />} />
            <Route exact path="/GarageBookings" element={<GarageBookings />} />
            <Route exact path="/GarageJobCards" element={<GarageJobCards />} />
            <Route exact path="/GarageInventory" element={<GarageInventory />} />
            <Route exact path="/GarageParts" element={<GarageParts />} />
            <Route exact path="/GarageSuppliers" element={<GarageSuppliers />} />
            <Route exact path="/GarageServiceHistory" element={<GarageServiceHistory />} />
            <Route exact path="/GarageInvoices" element={<GarageInvoices />} />
            <Route exact path="/GaragePayments" element={<GaragePayments />} />
            <Route exact path="/GarageExpenses" element={<GarageExpenses />} />
            <Route exact path="/GarageReports" element={<GarageReports />} />
            <Route exact path="/GarageReminders" element={<GarageReminders />} />
            <Route exact path="/GarageOffers" element={<GarageOffers />} />
            <Route exact path="/GarageFeedback" element={<GarageFeedback />} />
            <Route exact path="/GarageAttendance" element={<GarageAttendance />} />
            <Route exact path="/AttendanceCalendar" element={<AttendanceCalendar />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/OurBusinesses" element={<OurBusinesses />} />
          <Route exact path="/NewsRoom" element={<NewsRoom />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/HostelDetails" element={<HostelDetails />} />
          <Route
            exact
            path="/FoodCateringDetails"
            element={<FoodCateringDetails />}
          />
          <Route exact path="/HospitalDetails" element={<HospitalDetails />} />
          <Route
            exact
            path="/FashionDesignDetails"
            element={<FashionDesignDetails />}
          />
          <Route exact path="/GarageDetails" element={<GarageDetails />} />
          <Route
            exact
            path="/ProfessionalServicesDetails"
            element={<ProfessionalServicesDetails />}
          />
          <Route
            exact
            path="/BeautyTattooDetails"
            element={<BeautyTattooDetails />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
