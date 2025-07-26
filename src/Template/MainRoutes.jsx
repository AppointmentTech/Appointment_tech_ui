import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import ProtectedRoute from "Template/ProtectedRoute.jsx";
import { AuthContext } from "ContextOrRedux/AuthContext.js";
import { default as Home } from "./FrontWebsite/Views/Home/Home.jsx";
import SignIn from "./FrontWebsite/Views/Auth/SignIn.jsx";
import SignUp from "./FrontWebsite/Views/Auth/SignUp.jsx";
import About from "./FrontWebsite/Views/About/About.jsx";
import OurBusinesses from "./FrontWebsite/Views/OurBusinesses/OurBusinesses.jsx";
import NewsRoom from "./FrontWebsite/Views/NewsRoom/NewsRoom.jsx";
import ContactUs from "./FrontWebsite/Views/ContactUs/ContactUs.jsx";
import HostelDetails from "./FrontWebsite/Views/AllAppointmentDetails/HostelDetails.jsx";
import FoodCateringDetails from "./FrontWebsite/Views/AllAppointmentDetails/FoodCateringDetails.jsx";
import HospitalDetails from "./FrontWebsite/Views/AllAppointmentDetails/HospitalDetails.jsx";
import FashionDesignDetails from "./FrontWebsite/Views/AllAppointmentDetails/FashionDesignDetails.jsx";
import GarageDetails from "./FrontWebsite/Views/AllAppointmentDetails/GarageDetails.jsx";
import ProfessionalServicesDetails from "./FrontWebsite/Views/AllAppointmentDetails/ProfessionalServicesDetails.jsx";
import BeautyTattooDetails from "./FrontWebsite/Views/AllAppointmentDetails/BeautyTattooDetails.jsx";
import AdminDashboard from "./Dashboards/Views/AdminDashboards/AdminDashboard.jsx";

// import HostelAdmin from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/AdminManagement/HostelAdmin.jsx";
// import HospitalAdmin from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/AdminManagement/HospitalAdmin.jsx";
// import AddFacility from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CommonFacilities/AddFacility.jsx";
// import UpdateFacility from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CommonFacilities/UpdateFacility.jsx";
// import DeleteFacility from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CommonFacilities/DeleteFacility.jsx";
// import PreviewFacility from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CommonFacilities/PreviewFacility.jsx";
// import AddRoom from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/RoomManagement/AddRoom.jsx";
// import UpdateRoom from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/RoomManagement/UpdateRoom.jsx";
// import DeleteRoom from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/RoomManagement/DeleteRoom.jsx";
// import PreviewRoom from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/RoomManagement/PreviewRoom.jsx";
// import AddBed from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/BedManagement/AddBed.jsx";
// import UpdateBed from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/BedManagement/UpdateBed.jsx";
// import DeleteBed from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/BedManagement/DeleteBed.jsx";
// import PreviewBed from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/BedManagement/PreviewBed.jsx";
// import PreviewRequest from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CustomerRequests/PreviewRequest.jsx";
// import ApproveRequest from "./Dashboards/Views/CoAdminDashboard/HostelAdmin/CustomerRequests/ApproveRequest.jsx";
import HostelAdminDashboard from "./Dashboards/Views/BusinessDashboard/HostelAdmin/HostelAdminDashboard.jsx";
import RoomManagement from "./Dashboards/Views/BusinessDashboard/HostelAdmin/RoomManagement/RoomManagement.jsx";
import CustomerManagement from "./Dashboards/Views/BusinessDashboard/HostelAdmin/CustomerManagement/CustomerManagement.jsx";
import BookingManagement from "./Dashboards/Views/BusinessDashboard/HostelAdmin/BookingManagement/BookingManagement.jsx";
import BillingManagement from "./Dashboards/Views/BusinessDashboard/HostelAdmin/BillingManagement/BillingManagement.jsx";
import StaffManagement from "./Dashboards/Views/BusinessDashboard/HostelAdmin/StaffManagement/StaffManagement.jsx";
import FoodCatering from "./Dashboards/Views/BusinessDashboard/HostelAdmin/FoodCatering/FoodCatering.jsx";
import Reports from "./Dashboards/Views/BusinessDashboard/HostelAdmin/Reports/Reports.jsx";
import Maintenance from "./Dashboards/Views/BusinessDashboard/HostelAdmin/Maintenance/Maintenance.jsx";
import SystemSettings from "./Dashboards/Views/BusinessDashboard/HostelAdmin/Settings/Settings.jsx";
import UserTypes from "CommonModules/UserModule/UserTypes/UserTypes.jsx";
import Users from "../CommonModules/UserModule/Users/Users.jsx";
import Pages from "../CommonModules/UserModule/Pages/Pages.jsx";
import UserPermission from "../CommonModules/UserModule/UserPermission/UserPermission.jsx";
import LocationMaster from "../CommonModules/LocationModule/LocationMaster/LocationMaster.jsx";
import LocationActivePincode from "../CommonModules/LocationModule/LocationActivePincode/LocationActivePincode.jsx";
import BussinessType from "../CommonModules/BussinessModule/BussinessType/BussinessType.jsx";
import BusinessCategories from "../CommonModules/BussinessModule/BusinessCategories/BusinessCategories.jsx";
import BusinessManUsers from '../CommonModules/BussinessModule/BusinessManUsers/BusinessManUsers.jsx'
import StaffDashboard from "./Dashboards/Views/StaffDashboard/StaffDashboard.jsx";
import HospitalsAdminDashboard from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalsAdminDashboard.jsx";
import PatientManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/PatientManagement.jsx";
import AppointmentManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AppointmentManagement.jsx";
import AdmissionRequests from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AdmissionRequests.jsx";
import InventoryManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/InventoryManagement.jsx";
import OperationTheaterManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/OperationTheaterManagement.jsx";
import LaboratoryManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/LaboratoryManagement.jsx";
import AmbulanceManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AmbulanceManagement.jsx";
import AssetManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/AssetManagement.jsx";
import VisitorManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/VisitorManagement.jsx";
import DischargeManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/DischargeManagement.jsx";
import HospitalRoomManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalRoomManagement.jsx";
import HospitalStaffManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalStaffManagement.jsx";
import HospitalBillingManagement from "./Dashboards/Views/BusinessDashboard/HospitalsAdmin/HospitalBillingManagement.jsx";
import GarageAdminDashboard from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageAdminDashboard.jsx";
import GarageServices from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageServices.jsx";
import GarageTechnicianManagement from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageTechnicianManagement.jsx";
import GarageCustomerManagement from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageCustomerManagement.jsx";
import GarageVehicles from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageVehicles.jsx";
import GarageBookings from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageBookings.jsx";
import GarageJobCards from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageJobCards.jsx";
import GarageInventory from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageInventory.jsx";
import GarageParts from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageParts.jsx";
import GarageSuppliers from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageSuppliers.jsx";
import GarageServiceHistory from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageServiceHistory.jsx";
import GarageInvoices from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageInvoices.jsx";
import GaragePayments from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GaragePayments.jsx";
import GarageExpenses from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageExpenses.jsx";
import GarageReports from "./Dashboards/Views/BusinessDashboard/GarageAdmin/GarageReports.jsx";
var hist = createBrowserHistory();
export default function MainRoutes() {
  const context = useContext(AuthContext);
  return (
    <Router>
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
            element={
              
                <StaffDashboard />
             
            }
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

        {/* <Route exact path="/hospital-admin" element={<HospitalAdmin/>} /> 
      <Route exact path="/add-facility" element={<AddFacility/>} />
      <Route exact path="/update-facility" element={<UpdateFacility/>} />
      <Route exact path="/delete-facility" element={<DeleteFacility/>} />
      <Route exact path="/preview-facility" element={<PreviewFacility/>} />
      <Route exact path="/add-room" element={<AddRoom/>} />
      <Route exact path="/update-room" element={<UpdateRoom/>} />
      <Route exact path="/delete-room" element={<DeleteRoom/>} />
      <Route exact path="/preview-room" element={<PreviewRoom/>} />
      <Route exact path="/add-bed" element={<AddBed/>} />
      <Route exact path="/update-bed" element={<UpdateBed/>} />
      <Route exact path="/delete-bed" element={<DeleteBed/>} />
      <Route exact path="/preview-bed" element={<PreviewBed/>} />
      <Route exact path="/preview-request" element={<PreviewRequest/>} />
      <Route exact path="/approve-request" element={<ApproveRequest/>} />*/}
      </Routes>
    </Router>
  );
}
