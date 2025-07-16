
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import GoogleUserTypeDialog from "./GoogleUserTypeDialog.jsx";

function loadFacebookSDK(appId, callback) {
  if (window.FB) {
    callback();
    return;
  }
  window.fbAsyncInit = function () {
    window.FB.init({
      appId,
      cookie: true,
      xfbml: false,
      version: "v19.0",
    });
    callback();
  };
  if (!document.getElementById("facebook-jssdk")) {
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(script);
  }
}

const FacebookAuth = ({
  appId,
  userTypes,
  allBussinessType,
  states,
  IndianStatesAndDistricts,
  onSuccess,
  setSnackOptions,
  setSnackOpen,
  postFacebookSignIn,
  postMultipleRecords,
  API_Add_Bussinessman,
}) => {
  const [fbReady, setFbReady] = useState(false);
  const [fbResponse, setFbResponse] = useState(null);
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

  useEffect(() => {
    loadFacebookSDK(appId, () => setFbReady(true));
  }, [appId]);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      setSnackOptions({ color: "error", message: "Facebook SDK not loaded" });
      setSnackOpen(true);
      return;
    }
    setLoading(true);
    window.FB.login(
      (response) => {
        setLoading(false);
        if (response.authResponse) {
          window.FB.api(
            "/me",
            { fields: "id,name,email,picture" },
            (userInfo) => {
              setFbResponse({ ...response.authResponse, ...userInfo });
              setUserTypeDialogOpen(true);
            }
          );
        } else {
          setSnackOptions({ color: "error", message: "Facebook login cancelled" });
          setSnackOpen(true);
        }
      },
      { scope: "public_profile,email" }
    );
  };

  // Dialog submit
  const handleFacebookDialogSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        access_token: fbResponse.accessToken,
        user_type_id: userTypeId || thisRegistration.User_Type_Id,
        fb_user_id: fbResponse.id,
        email: fbResponse.email,
        name: fbResponse.name,
        picture: fbResponse.picture?.data?.url,
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
        response = await postFacebookSignIn(payload);
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
                setFbResponse(null);
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
          setFbResponse(null);
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
        } else {
          setSnackOptions({ color: response.color, message: response.message });
          setSnackOpen(true);
        }
      } catch (apiErr) {
        setSnackOptions({ color: 'error', message: 'Facebook Sign-In API failed: ' + (apiErr?.response?.data?.detail || apiErr.message || 'Unknown error') });
        setSnackOpen(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      let errorMsg = err?.response?.data?.detail || "Facebook Sign-In failed";
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
      <Button
        onClick={handleFacebookLogin}
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        disabled={loading || !fbReady}
        style={{ textTransform: "none", borderRadius: 8 }}
      >
        Continue with Facebook
      </Button>
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
        handleGoogleDialogSubmit={handleFacebookDialogSubmit}
        loading={loading}
        setSnackOptions={setSnackOptions}
        setSnackOpen={setSnackOpen}
        IndianStatesAndDistricts={IndianStatesAndDistricts}
      />
    </>
  );
};

export default FacebookAuth;
