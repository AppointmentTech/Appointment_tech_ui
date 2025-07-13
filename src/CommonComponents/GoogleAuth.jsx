import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import GoogleUserTypeDialog from "./GoogleUserTypeDialog.jsx";

const GoogleAuth = ({
  clientId,
  userTypes,
  allBussinessType,
  states,
  IndianStatesAndDistricts,
  onSuccess, // callback(userContextData, businessData)
  setSnackOptions,
  setSnackOpen,
  postGoogleSignIn, // async (payload) => response
  postMultipleRecords, // async (url, payload, token) => response
  API_Add_Bussinessman,
}) => {
  const [googleCredential, setGoogleCredential] = useState(null);
  const [userTypeDialogOpen, setUserTypeDialogOpen] = useState(false);
  const [userTypeId, setUserTypeId] = useState("");
  const [thisRegistration, setThisRegistration] = useState({
    User_Type_Id: 0,
    Business_Type_Id: 0,
    State: "",
    City: "",
    Postal_Code: "",
    Address: "",
    Brand_Name: "",
    Added_On: new Date().toISOString(),
  });
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Google button success
  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleCredential(credentialResponse.credential);
    setUserTypeDialogOpen(true);
  };

  // Dialog submit
  const handleGoogleDialogSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        credential: googleCredential,
        token: googleCredential,
        user_type_id: userTypeId || thisRegistration.User_Type_Id,
      };
      if (parseInt(userTypeId || thisRegistration.User_Type_Id) === 2) {
        if (
          !thisRegistration.Brand_Name ||
          selectedBusinessTypes.length === 0 ||
          !thisRegistration.State ||
          !thisRegistration.City ||
          !thisRegistration.Postal_Code ||
          !thisRegistration.Address
        ) {
          setSnackOptions({ color: 'error', message: 'Please fill all required business fields.' });
          setSnackOpen(true);
          setLoading(false);
          return;
        }
        payload.business_type_ids = selectedBusinessTypes;
        payload.brand_name = thisRegistration.Brand_Name;
        payload.state = thisRegistration.State;
        payload.city = thisRegistration.City;
        payload.postal_code = thisRegistration.Postal_Code;
        payload.address = thisRegistration.Address;
      }
      let response;
      try {
        response = await postGoogleSignIn(payload);
        if (response.status === "success" && response) {
          const user = response.user_info || response.user;
          const access_token = response.access_token;
          const user_permission = response.user_permission || [];
          const user_type = response.user_type || response.user_type_id;
          const default_page = response.default_page || (response.user_type && response.user_type.Default_Page);
          if (!user || !access_token) {
            setSnackOptions({ color: 'error', message: 'Login failed: Missing user data in response.' });
            setSnackOpen(true);
            setLoading(false);
            return;
          }
          let userTypeDetails = response.user_type || null;
          const contextData = {
            user: user,
            permissions: user_permission,
            token: access_token,
            usertype: userTypeDetails || user_type,
          };
          // If business user, store business records as in signup
          if (
            (user.User_Type_Id === 2 || user_type === 2 || (userTypeDetails && userTypeDetails.User_Type_Id === 2)) &&
            (user.User_Id || response.user_id)
          ) {
            const userId = user.User_Id || response.user_id;
            const userTypeIdVal = user.User_Type_Id || user_type;
            const addedBy = userId;
            const businessPayload = selectedBusinessTypes.map((typeId) => {
              return {
                User_Id: userId,
                User_Type_Id: userTypeIdVal,
                Business_Type_Id: typeId,
                Business_Type_Name: (allBussinessType.find(x => Number(x.Business_Type_Id) === Number(typeId))?.Business_Type_Name) || "",
                Brand_Name: thisRegistration.Brand_Name || "",
                State: thisRegistration.State || "",
                City: thisRegistration.City || "",
                Postal_Code: thisRegistration.Postal_Code || "",
                Address: thisRegistration.Address || "",
                Business_Code: "",
                Business_Status: "Pending",
                Bussiness_Logo: "",
                Bussiness_Banner: "",
                Bussiness_Description: "",
                Is_Active: "Y",
                Added_By: addedBy,
                Added_On: new Date().toISOString(),
              };
            });
            try {
              const businessResponse = await postMultipleRecords(
                API_Add_Bussinessman,
                businessPayload,
                access_token,
              );
              if (businessResponse.status === "success") {
                onSuccess(contextData, businessResponse.data, default_page);
                setUserTypeDialogOpen(false);
                setUserTypeId("");
                setGoogleCredential(null);
                setSelectedBusinessTypes([]);
                setThisRegistration({
                  User_Type_Id: 0,
                  Business_Type_Id: 0,
                  State: "",
                  City: "",
                  Postal_Code: "",
                  Address: "",
                  Brand_Name: "",
                  Added_On: new Date().toISOString(),
                });
                // Clear all text fields after login
                setTimeout(() => {
                  setThisRegistration({
                    User_Type_Id: 0,
                    Business_Type_Id: 0,
                    State: "",
                    City: "",
                    Postal_Code: "",
                    Address: "",
                    Brand_Name: "",
                    Added_On: new Date().toISOString(),
                  });
                  setSelectedBusinessTypes([]);
                }, 100);
                setLoading(false);
                return;
              } else {
                setSnackOptions({ color: "error", message: businessResponse.error || "Failed to add businesses" });
                setSnackOpen(true);
                setLoading(false);
                return;
              }
            } catch (err) {
              setSnackOptions({ color: "error", message: "Failed to add businesses (exception)" });
              setSnackOpen(true);
              setLoading(false);
              return;
            }
          }
          // Success for normal user
          onSuccess(contextData, null, default_page);
          setUserTypeDialogOpen(false);
          setUserTypeId("");
          setGoogleCredential(null);
          setSelectedBusinessTypes([]);
          setThisRegistration({
            User_Type_Id: 0,
            Business_Type_Id: 0,
            State: "",
            City: "",
            Postal_Code: "",
            Address: "",
            Brand_Name: "",
            Added_On: new Date().toISOString(),
          });
          // Clear all text fields after login
          setTimeout(() => {
            setThisRegistration({
              User_Type_Id: 0,
              Business_Type_Id: 0,
              State: "",
              City: "",
              Postal_Code: "",
              Address: "",
              Brand_Name: "",
              Added_On: new Date().toISOString(),
            });
            setSelectedBusinessTypes([]);
          }, 100);
        } else {
          setSnackOptions({ color: response.color, message: response.message });
          setSnackOpen(true);
        }
      } catch (apiErr) {
        setSnackOptions({ color: 'error', message: 'Google Sign-In API failed: ' + (apiErr?.response?.data?.detail || apiErr.message || 'Unknown error') });
        setSnackOpen(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      let errorMsg = err?.response?.data?.detail || "Google Sign-In failed";
      if (Array.isArray(errorMsg)) {
        errorMsg = errorMsg.map((e) => e.msg).join(" | ");
      } else if (typeof errorMsg === "object") {
        errorMsg = JSON.stringify(errorMsg);
      }
      setSnackOptions({ color: "error", message: errorMsg });
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setSnackOptions({ color: "error", message: "Google Sign-In failed" })}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </GoogleOAuthProvider>
      <GoogleUserTypeDialog
        open={userTypeDialogOpen}
        onClose={() => setUserTypeDialogOpen(false)}
        userTypeId={userTypeId}
        setUserTypeId={setUserTypeId}
        userTypes={userTypes}
        thisRegistration={thisRegistration}
        setThisRegistration={setThisRegistration}
        allBussinessType={allBussinessType}
        selectedBusinessTypes={selectedBusinessTypes}
        setSelectedBusinessTypes={setSelectedBusinessTypes}
        states={states}
        districts={districts}
        setDistricts={setDistricts}
        handleGoogleDialogSubmit={handleGoogleDialogSubmit}
        loading={loading}
        setSnackOptions={setSnackOptions}
        setSnackOpen={setSnackOpen}
        IndianStatesAndDistricts={IndianStatesAndDistricts}
      />
    </>
  );
};

export default GoogleAuth;
