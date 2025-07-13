import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Link,
  Avatar,
  IconButton,
  InputAdornment,
  FormControl,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Snackbar from "SnackBar/Snackbar.jsx";
import {
  authPostRecord,
  getRecord,
  postMultipleRecords,
} from "services/services";
import { AuthContext } from "ContextOrRedux/AuthContext";
import { onlyPassword, onlyEmail } from "CommonMethods/Validatations";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import IndianStatesAndDistricts from "../../../../CommonComponents/IndianStatesAndDistricts.json";
const API_Login = "api/v1/authrouter/login";
const API_Get_All_UserType = "api/v1/usertypes/all-usertypes";
const API_Add_Bussinessman =
  "api/v1/businessmanuser/add-multiplebusinessmanusers";
const API_Get_All_Bussiness_Type = "api/v1/businesstype/all-businesstypes";

export default function SignIn() {
  let navigate = useNavigate();
  const initialLoginState = {
    User_Email: "",
    User_Password: "",
  };
  const initialState = {
    User_Type_Id: 0,
    Business_Type_Id: 0,
    State: "",
    City: "",
    Postal_Code: "",
    Address: "",
    Brand_Name: "",
    Added_On: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  };
  // const { ErrorCode } = useParams();
  const { dispatch } = useContext(AuthContext);
  const [thisLogin, setThisLogin] = useState(initialLoginState);
  const [thisRegistration, setThisRegistration] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState({
    color: "success",
    message: "Hi",
  });
  const [googleCredential, setGoogleCredential] = useState(null);
  const [userTypeDialogOpen, setUserTypeDialogOpen] = useState(false);
  const [userTypeId, setUserTypeId] = useState("");
  const [userTypes, setUserTypes] = useState([]);
  const [allBussinessType, setAllBussinessType] = useState([]);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  /** ------------------ useEffects ------------------------ */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThisLogin({ ...thisLogin, [name]: value });
  };
  const handleLoginRedirect = (user) => {
    navigate(user.Default_Page);
  };
  const handleSubmitLogin = () => {
    const loginObj = {
      Email: thisLogin.User_Email,
      Password: thisLogin.User_Password,
    };
    authPostRecord(API_Login, loginObj)
      .then((response) => {
        if (response.status === "success") {
          if (response) {
            let result = response;
            if (result.status === "success") {
              setSnackOptions({
                color: result.color,
                message: result.message,
              });
              setSnackOpen(true);
              var contextData = {
                user: result.data.user_info,
                permissions: result.data.user_permission,
                token: result.data.access_token,
                usertype: result.data.user_type,
              };
              dispatch({ type: "LOGIN", payload: contextData });
              navigate(response.data.default_page);
            } else {
              setSnackOptions({
                color: result.color,
                message: result.message,
              });
              setSnackOpen(true);
            }
          } else {
            setSnackOptions({
              color: "error",
              message: response.data,
            });
            setSnackOpen(true);
          }
        } else {
          setSnackOptions({
            color: "error",
            message: response.statusText,
          });
          setSnackOpen(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setSnackOptions({
          color: "error",
          message: err.response.data.detail,
        });
        setSnackOpen(true);
        setLoading(false);
      });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Fetch user types for dropdown
  useEffect(() => {
    getRecord(API_Get_All_UserType, {})
      .then((response) => {
        if (response.status === "success") {
          var typeData = response.data.filter((item) => {
            return item.User_Type_Id !== 1 && item.Is_Active === "Y";
          });
          setUserTypes(typeData);
        }
      })
      .catch((err) => {
        setSnackOptions({
          color: "error",
          message: err.response.data.detail,
        });
        setSnackOpen(true);
      });
  }, []);
  // Fetch business types for dropdown
  useEffect(() => {
    let componentMounted = true;
    getRecord(API_Get_All_Bussiness_Type, {})
      .then((response) => {
        if (response.status === "success" && componentMounted) {
          setAllBussinessType(response.data);
        }
      })
      .catch((err) => {
        setSnackOptions({
          color: "error",
          message: err.response.data.detail,
        });
        setSnackOpen(true);
      });
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    const allStates = IndianStatesAndDistricts.states.map((item) => item.state);
    setStates(allStates);
  }, []);
  useEffect(() => {
    if (thisRegistration.State) {
      const stateData = IndianStatesAndDistricts.states.find(
        (item) => item.state === thisRegistration.State,
      );
      setDistricts(stateData ? stateData.districts : []);
    } else {
      setDistricts([]);
    }
  }, [thisRegistration.State]);
  // Add Google Sign-In handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleCredential(credentialResponse.credential);
    setUserTypeDialogOpen(true); // Open dialog to collect user_type_id
  };
  // Called when user submits dialog
  const handleGoogleDialogSubmit = async () => {
    setLoading(true);
    try {
      // Always use the latest userTypeId and registration state
      const payload = {
        credential: googleCredential,
        token: googleCredential,
        user_type_id: userTypeId || thisRegistration.User_Type_Id,
      };
      if (parseInt(userTypeId || thisRegistration.User_Type_Id) === 2) {
        // Validate all required fields for business user
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
      // Debug: log payload before sending
      // console.log('Google Sign-In payload:', payload);
      let response;
      try {
        response = await authPostRecord(
          'api/v1/GoogleSignIn/auth/google',
          payload,
        );
        // console.log('Google Sign-In API response:', response);
        if (response.status === "success" && response) {
          // console.log('Google Sign-In successful:', response);
          // Support new backend structure
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
          // Use user_type object if available, else fallback to id
          let userTypeDetails = response.user_type || null;
          // Get selected business type details (array of objects) (no longer storing in context)
          const contextData = {
            user: user,
            permissions: user_permission,
            token: access_token,
            usertype: userTypeDetails || user_type,
          };
          // console.log('Context data for login:', contextData);
          dispatch({ type: "LOGIN", payload: contextData });
          setUserTypeDialogOpen(false);
          setUserTypeId("");
          setGoogleCredential(null);
          setSelectedBusinessTypes([]);
          setThisRegistration(initialState);
          // If business user, store business records as in signup
          if (
            (user.User_Type_Id === 2 || user_type === 2 || (userTypeDetails && userTypeDetails.User_Type_Id === 2)) &&
            (user.User_Id || response.user_id)
          ) {
            const userId = user.User_Id || response.user_id;
            const userTypeIdVal = user.User_Type_Id || user_type;
            const addedBy = userId;
            const businessPayload = selectedBusinessTypes.map((typeId) => {
              const businessTypeObj = allBussinessType.find(
                (x) => x.Business_Type_Id === typeId,
              );
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
                // Update context with business info only
                dispatch({ type: "LOGIN", payload: { ...contextData, business: businessResponse.data } });
                navigate(default_page || "/dashboard");
                return;
              } else {
                setSnackOptions({
                  color: "error",
                  message: businessResponse.error || "Failed to add businesses",
                });
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
          // Always navigate after context is set and dialog is closed
          navigate(default_page || "/dashboard");
          return;
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

  const handleBusinessTypeChange = (event) => {
    const id = parseInt(event.target.value); // or use `Number()` if preferred
    setSelectedBusinessTypes((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
    // const { value, checked } = event.target;
    // console.log("value----------", checked);
    // setSelectedBusinessTypes((prev) =>
    //   checked ? [...prev, value] : prev.filter((type) => type !== value),
    // );
  };

  const handleGoogleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "Postal_Code") {
      if (!/^\d{0,6}$/.test(value)) return; // Only allow up to 6 digits
    }
    setThisRegistration({ ...thisRegistration, [name]: value });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url("https://img.freepik.com/premium-vector/technology-background-with-hitech-digital-data_29971-1134.jpg?w=1060")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "70%", md: "40%" },
            backgroundColor: "rgba(255, 255, 255)",
            borderRadius: 4,
            boxShadow: 5,
            padding: 4,
            backdropFilter: "blur(5px)",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                width: 70,
                height: 70,
                margin: "0 auto",
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography
              variant="h5"
              fontWeight="bold"
              mt={2}
              color="primary.main"
            >
              Welcome Back
            </Typography>
          </Box>

          {/* Form Section */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!onlyEmail(thisLogin.User_Email)) {
                setSnackOptions({
                  color: "warning",
                  message: "Please Enter Valid Email",
                });
                setSnackOpen(true);
              } else if (!onlyPassword(thisLogin.User_Password)) {
                setSnackOptions({
                  color: "error",
                  message:
                    "Password must contain at least 8 characters, one uppercase and one lowercase character, one number and a special character",
                });
                setSnackOpen(true);
              } else {
                setLoading(true);
                handleSubmitLogin();
              }
            }}
          >
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              required
              name="User_Email"
              onChange={handleInputChange}
              value={thisLogin.User_Email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              // type="password"
              variant="outlined"
              margin="normal"
              required
              type={showPassword ? "text" : "password"}
              name="User_Password"
              onChange={handleInputChange}
              value={thisLogin.User_Password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Box
              sx={{
                textAlign: "right",
                mb: 2,
              }}
            >
              <Link href="#" underline="hover" color="primary">
                Forgot Password?
              </Link>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: 3,
            }}
          >
            <Box
              sx={{ flexGrow: 1, height: "1px", backgroundColor: "#e0e0e0" }}
            />
            <Typography variant="body2" sx={{ px: 2, color: "grey.600" }}>
              OR
            </Typography>
            <Box
              sx={{ flexGrow: 1, height: "1px", backgroundColor: "#e0e0e0" }}
            />
          </Box>
          {/* Social Sign-In Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <GoogleOAuthProvider clientId="9138237898-jrcvs13hjvjqc0rfnsska86kq1mjsao7.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() =>
                    setSnackOptions({
                      color: "error",
                      message: "Google Sign-In failed",
                    })
                  }
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  logo_alignment="left"
                />
              </GoogleOAuthProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="large"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                }}
                disabled
              >
                Sign in with Facebook
              </Button>
            </Grid>
          </Grid>

          {/* Register Link */}
          <Box
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="grey.700">
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/SignUp")}
                underline="hover"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackOpen}
        setOpen={setSnackOpen}
        options={snackOptions}
        // message={snackOptions.message}
      />
      {/* User Type Dialog for Google Sign-In */}
      <Dialog
        open={userTypeDialogOpen}
        onClose={() => setUserTypeDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: 10,
            minWidth: { xs: 320, sm: 400 },
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            p: 2,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(2px)',
          },
        }}
      >
        <DialogTitle sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          fontSize: 24,
          letterSpacing: 1,
          pb: 1,
        }}>
          Select Account Type
        </DialogTitle>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend" sx={{ fontWeight: 600, color: 'primary.dark', mb: 1 }}>Select Type</FormLabel>
            <RadioGroup
              row
              required
              value={userTypeId}
              name="User_Type_Id"
              onChange={e => {
                setUserTypeId(e.target.value);
                setThisRegistration({ ...thisRegistration, User_Type_Id: e.target.value });
                if (parseInt(e.target.value) !== 2) {
                  setSelectedBusinessTypes([]);
                  setThisRegistration({ ...thisRegistration, Brand_Name: '', State: '', City: '', Postal_Code: '', Address: '' });
                }
              }}
              sx={{ justifyContent: 'center', gap: 3 }}
            >
              {userTypes.map((type) => (
                <FormControlLabel
                  value={type.User_Type_Id}
                  control={<Radio sx={{ color: 'primary.main' }} />}
                  key={type.User_Type_Id}
                  label={<span style={{ fontWeight: 500 }}>{type.User_Type_Desc}</span>}
                  sx={{ mx: 1, borderRadius: 2, px: 2, py: 1, background: '#fff', boxShadow: 1, minWidth: 120 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {/* Show business type selection and brand name if user_type_id === 2 */}
          {Number(userTypeId) === 2 && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <TextField
                fullWidth
                label="Brand Name"
                variant="outlined"
                margin="normal"
                required
                name="Brand_Name"
                value={thisRegistration.Brand_Name}
                onChange={e => setThisRegistration({ ...thisRegistration, Brand_Name: e.target.value })}
                sx={{ borderRadius: 2, background: '#f9fafb' }}
              />
              <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
                <FormLabel component="legend" sx={{ fontWeight: 600, color: 'primary.dark', mb: 1 }}>Business Type</FormLabel>
                <FormGroup row sx={{ gap: 1, flexWrap: 'wrap' }}>
                  {allBussinessType &&
                    allBussinessType.length > 0 &&
                    allBussinessType.map((type, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={selectedBusinessTypes.includes(type.Business_Type_Id)}
                            onChange={e => {
                              const id = type.Business_Type_Id;
                              setSelectedBusinessTypes(prev =>
                                e.target.checked ? [...prev, id] : prev.filter(item => item !== id)
                              );
                            }}
                            value={type.Business_Type_Id}
                            sx={{ color: 'primary.main' }}
                          />
                        }
                        label={<span style={{ fontWeight: 500 }}>{type.Business_Type_Name}</span>}
                        sx={{ mx: 0.5, borderRadius: 2, px: 2, py: 0.5, background: '#fff', boxShadow: 1, minWidth: 120 }}
                      />
                    ))}
                </FormGroup>
              </FormControl>
              <TextField
                select
                fullWidth
                label="State"
                variant="outlined"
                margin="normal"
                required
                name="State"
                value={thisRegistration.State}
                onChange={e => {
                  setThisRegistration({ ...thisRegistration, State: e.target.value, City: '' });
                  const stateData = IndianStatesAndDistricts.states.find(item => item.state === e.target.value);
                  setDistricts(stateData ? stateData.districts : []);
                }}
                sx={{ borderRadius: 2, background: '#f9fafb' }}
              >
                {states &&
                  states.length > 0 &&
                  states.map((state, i) => (
                    <MenuItem value={state} key={i}>
                      {state}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="District"
                variant="outlined"
                margin="normal"
                required
                name="City"
                value={thisRegistration.City}
                onChange={e => setThisRegistration({ ...thisRegistration, City: e.target.value })}
                sx={{ borderRadius: 2, background: '#f9fafb' }}
              >
                {districts &&
                  districts.length > 0 &&
                  districts.map((district, i) => (
                    <MenuItem value={district} key={i}>
                      {district}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                fullWidth
                label="Pin Code"
                variant="outlined"
                margin="normal"
                required
                name="Postal_Code"
                value={thisRegistration.Postal_Code}
                onChange={e => {
                  if (!/^\d{0,6}$/.test(e.target.value)) return;
                  setThisRegistration({ ...thisRegistration, Postal_Code: e.target.value });
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 6,
                }}
                sx={{ borderRadius: 2, background: '#f9fafb' }}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                multiline
                rows={2}
                required
                name="Address"
                value={thisRegistration.Address}
                onChange={e => setThisRegistration({ ...thisRegistration, Address: e.target.value })}
                sx={{ borderRadius: 2, background: '#f9fafb' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={() => setUserTypeDialogOpen(false)}
            color="secondary"
            sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              // Validate all required fields for business user
              if (
                Number(userTypeId) === 2 &&
                (
                  !thisRegistration.Brand_Name ||
                  selectedBusinessTypes.length === 0 ||
                  !thisRegistration.State ||
                  !thisRegistration.City ||
                  !thisRegistration.Postal_Code ||
                  !thisRegistration.Address
                )
              ) {
                setSnackOptions({ color: 'error', message: 'Please fill all required business fields.' });
                setSnackOpen(true);
                return;
              }
              await handleGoogleDialogSubmit();
            }}
            color="primary"
            variant="contained"
            disabled={
              !userTypeId ||
              (Number(userTypeId) === 2 &&
                (
                  selectedBusinessTypes.length === 0 ||
                  !thisRegistration.Brand_Name ||
                  !thisRegistration.State ||
                  !thisRegistration.City ||
                  !thisRegistration.Postal_Code ||
                  !thisRegistration.Address
                )
              ) ||
              loading
            }
            sx={{ borderRadius: 2, px: 4, fontWeight: 600, boxShadow: 2 }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
