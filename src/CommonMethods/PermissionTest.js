/**
 * Permission Test Component
 * 
 * This component helps test and debug permission logic
 * with your actual database structure
 */

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../ContextOrRedux/AuthContext.js';
import { navigationUtils, useEnhancedNavigation } from './NavigationUtils.js';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Divider,
  Alert,
  Button
} from '@mui/material';

export const PermissionTest = () => {
  const context = useContext(AuthContext);
  const { getUserPermissionSummary, canAccessCurrentPage, userType, userPermissions } = useEnhancedNavigation();
  
  const [testResults, setTestResults] = useState({});
  const [contextData, setContextData] = useState({});

  // Get actual user data from context
  const actualUserType = context?.state?.usertype?.User_Type_Name || 'guest';
  const actualUserPermissions = context?.state?.permissions || [];
  const actualUser = context?.state?.user;

  useEffect(() => {
    // Log all context data
    setContextData({
      user: actualUser,
      usertype: context?.state?.usertype,
      permissions: actualUserPermissions,
      isAuthenticated: context?.state?.isAuthenticated
    });

    // Test permission logic
    const results = {
      // Test user type detection
      userTypeDetection: {
        actualUserType,
        userType,
        match: actualUserType === userType
      },

      // Test permission array
      permissionArray: {
        hasPermissions: actualUserPermissions && actualUserPermissions.length > 0,
        permissionCount: actualUserPermissions?.length || 0,
        permissions: actualUserPermissions
      },

      // Test individual permissions
      individualPermissions: {
        canView: navigationUtils.hasPermission(actualUserPermissions, 'Can_View'),
        canCreate: navigationUtils.hasPermission(actualUserPermissions, 'Can_Create'),
        canUpdate: navigationUtils.hasPermission(actualUserPermissions, 'Can_Update'),
        canDelete: navigationUtils.hasPermission(actualUserPermissions, 'Can_Delete')
      },

      // Test permission summary
      permissionSummary: getUserPermissionSummary(),

      // Test access control
      accessControl: {
        canAccessCurrentPage: canAccessCurrentPage(),
        hasRoutePermission: navigationUtils.hasRoutePermission('dashboard', actualUserType, actualUserPermissions),
        canAccessBusinessType: navigationUtils.canAccessBusinessType(actualUserType, actualUserPermissions, 'hostel')
      },

      // Test default page
      defaultPage: {
        userType: actualUserType,
        defaultPage: navigationUtils.getUserDefaultPage(actualUserType),
        contextDefaultPage: context?.state?.usertype?.Default_Page
      }
    };

    setTestResults(results);

    console.log('Permission Test Results:', results);
  }, [actualUserType, actualUserPermissions, userType, userPermissions, getUserPermissionSummary, canAccessCurrentPage]);

  const runPermissionTest = () => {
    console.log('Running permission test...');
    console.log('Context State:', context?.state);
    console.log('Actual User Type:', actualUserType);
    console.log('Actual Permissions:', actualUserPermissions);
    console.log('Navigation User Type:', userType);
    console.log('Navigation Permissions:', userPermissions);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Permission Test Component
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This component helps debug permission logic with your database structure.
        Check the browser console for detailed logs.
      </Alert>

      <Button 
        variant="contained" 
        onClick={runPermissionTest}
        sx={{ mb: 3 }}
      >
        Run Permission Test
      </Button>

      {/* Context Data */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Context Data
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="Is Authenticated"
              secondary={contextData.isAuthenticated ? 'Yes' : 'No'}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="User Type"
              secondary={contextData.usertype?.User_Type_Name || 'Not set'}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Default Page"
              secondary={contextData.usertype?.Default_Page || 'Not set'}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Permissions Count"
              secondary={contextData.permissions?.length || 0}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Test Results */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Results
        </Typography>

        {/* User Type Detection */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            User Type Detection
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`Actual: ${testResults.userTypeDetection?.actualUserType || 'N/A'}`}
              color={testResults.userTypeDetection?.match ? 'success' : 'error'}
            />
            <Chip 
              label={`Navigation: ${testResults.userTypeDetection?.userType || 'N/A'}`}
              color={testResults.userTypeDetection?.match ? 'success' : 'error'}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Permission Array */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Permission Array
          </Typography>
          <Chip 
            label={`Has Permissions: ${testResults.permissionArray?.hasPermissions ? 'Yes' : 'No'}`}
            color={testResults.permissionArray?.hasPermissions ? 'success' : 'error'}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Count: {testResults.permissionArray?.permissionCount}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Individual Permissions */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Individual Permissions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`View: ${testResults.individualPermissions?.canView ? 'Y' : 'N'}`}
              color={testResults.individualPermissions?.canView ? 'success' : 'error'}
            />
            <Chip 
              label={`Create: ${testResults.individualPermissions?.canCreate ? 'Y' : 'N'}`}
              color={testResults.individualPermissions?.canCreate ? 'success' : 'error'}
            />
            <Chip 
              label={`Update: ${testResults.individualPermissions?.canUpdate ? 'Y' : 'N'}`}
              color={testResults.individualPermissions?.canUpdate ? 'success' : 'error'}
            />
            <Chip 
              label={`Delete: ${testResults.individualPermissions?.canDelete ? 'Y' : 'N'}`}
              color={testResults.individualPermissions?.canDelete ? 'success' : 'error'}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Permission Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Permission Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`canView: ${testResults.permissionSummary?.canView ? 'Yes' : 'No'}`}
              color={testResults.permissionSummary?.canView ? 'success' : 'error'}
            />
            <Chip 
              label={`canCreate: ${testResults.permissionSummary?.canCreate ? 'Yes' : 'No'}`}
              color={testResults.permissionSummary?.canCreate ? 'success' : 'error'}
            />
            <Chip 
              label={`canUpdate: ${testResults.permissionSummary?.canUpdate ? 'Yes' : 'No'}`}
              color={testResults.permissionSummary?.canUpdate ? 'success' : 'error'}
            />
            <Chip 
              label={`canDelete: ${testResults.permissionSummary?.canDelete ? 'Yes' : 'No'}`}
              color={testResults.permissionSummary?.canDelete ? 'success' : 'error'}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Access Control */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Access Control
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`Can Access Current Page: ${testResults.accessControl?.canAccessCurrentPage ? 'Yes' : 'No'}`}
              color={testResults.accessControl?.canAccessCurrentPage ? 'success' : 'error'}
            />
            <Chip 
              label={`Has Route Permission: ${testResults.accessControl?.hasRoutePermission ? 'Yes' : 'No'}`}
              color={testResults.accessControl?.hasRoutePermission ? 'success' : 'error'}
            />
            <Chip 
              label={`Can Access Business Type: ${testResults.accessControl?.canAccessBusinessType ? 'Yes' : 'No'}`}
              color={testResults.accessControl?.canAccessBusinessType ? 'success' : 'error'}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Default Page */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Default Page
          </Typography>
          <Typography variant="body2">
            User Type: {testResults.defaultPage?.userType}
          </Typography>
          <Typography variant="body2">
            Calculated Default: {testResults.defaultPage?.defaultPage}
          </Typography>
          <Typography variant="body2">
            Context Default: {testResults.defaultPage?.contextDefaultPage}
          </Typography>
        </Box>
      </Paper>

      {/* Raw Data */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Raw Permission Data
        </Typography>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(actualUserPermissions, null, 2)}
        </pre>
      </Paper>
    </Box>
  );
};

export default PermissionTest; 