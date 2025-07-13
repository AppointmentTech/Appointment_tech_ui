import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  MenuItem,
  Grid,
} from "@mui/material";

const GoogleUserTypeDialog = ({
  open,
  onClose,
  userTypeId,
  setUserTypeId,
  userTypes,
  thisRegistration,
  setThisRegistration,
  allBussinessType,
  selectedBusinessTypes,
  setSelectedBusinessTypes,
  states,
  districts,
  setDistricts,
  handleGoogleDialogSubmit,
  loading,
  setSnackOptions,
  setSnackOpen,
  IndianStatesAndDistricts,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle color="primary" style={{ fontWeight: 700, textAlign: 'center', fontSize: 22 }}>
      Select Account Type
    </DialogTitle>
    <DialogContent>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" color="primary" style={{ fontWeight: 600, fontSize: 17 }}>Select Type</FormLabel>
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
        >
          {userTypes.map((type) => (
            <FormControlLabel
              value={type.User_Type_Id}
              control={<Radio color="primary" size="medium" />}
              key={type.User_Type_Id}
              label={<span style={{ fontWeight: 500, fontSize: 16 }}>{type.User_Type_Desc}</span>}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* Show business type selection and brand name if user_type_id === 2 */}
      {Number(userTypeId) === 2 && (
        <Box width="100%">
          <TextField
            fullWidth
            label="Brand Name"
            variant="outlined"
            margin="normal"
            required
            name="Brand_Name"
            color="primary"
            size="medium"
            value={thisRegistration.Brand_Name}
            onChange={e => setThisRegistration({ ...thisRegistration, Brand_Name: e.target.value })}
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend" color="primary" style={{ fontWeight: 600, fontSize: 16 }}>Business Type</FormLabel>
            <FormGroup row>
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
                        color="primary"
                      />
                    }
                    label={<span style={{ fontWeight: 500, fontSize: 15 }}>{type.Business_Type_Name}</span>}
                  />
                ))}
            </FormGroup>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="State"
                variant="outlined"
                margin="normal"
                required
                name="State"
                color="primary"
                value={thisRegistration.State}
                onChange={e => {
                  setThisRegistration({ ...thisRegistration, State: e.target.value, City: '' });
                  const stateData = IndianStatesAndDistricts.states.find(item => item.state === e.target.value);
                  setDistricts(stateData ? stateData.districts : []);
                }}
              >
                {states &&
                  states.length > 0 &&
                  states.map((state, i) => (
                    <MenuItem value={state} key={i}>
                      {state}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="District"
                variant="outlined"
                margin="normal"
                required
                name="City"
                color="primary"
                value={thisRegistration.City}
                onChange={e => setThisRegistration({ ...thisRegistration, City: e.target.value })}
              >
                {districts &&
                  districts.length > 0 &&
                  districts.map((district, i) => (
                    <MenuItem value={district} key={i}>
                      {district}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pin Code"
                variant="outlined"
                margin="normal"
                required
                name="Postal_Code"
                color="primary"
                value={thisRegistration.Postal_Code}
                onChange={e => {
                  if (!/^[\d]{0,6}$/.test(e.target.value)) return;
                  setThisRegistration({ ...thisRegistration, Postal_Code: e.target.value });
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                multiline
                rows={2}
                required
                name="Address"
                color="primary"
                value={thisRegistration.Address}
                onChange={e => setThisRegistration({ ...thisRegistration, Address: e.target.value })}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        color="secondary"
        variant="outlined"
        size="large"
        style={{ fontWeight: 600 }}
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
        size="large"
        style={{ fontWeight: 700 }}
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
      >
        Continue
      </Button>
    </DialogActions>
  </Dialog>
);

export default GoogleUserTypeDialog;
