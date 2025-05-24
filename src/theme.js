import { createTheme } from '@mui/material/styles';

// src/theme.js

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff5200', // Bright orange
        },
        secondary: {
            main: '#2ecc71', // Green
        },
        background: {
            // default: '#ecf0f1', // Light gray
            paper: '#ffffff', // White for paper elements
        },
        text: {
            primary: '#2c3e50', // Dark blue-gray
            secondary: '#7f8c8d', // Medium gray
        },
        divider: '#bdc3c7', // Light gray for dividers
        table: {
            header: '#f0f3f4', // Very light gray for table headers
            row: '#ffffff', // White for table rows
            hover: '#e5e8e8', // Light gray on hover
        },
        card: {
            background: '#ffffff', // White card background
            shadow: '#d0d3d4', // Light gray shadow
        },
        button:{
            primary: '#FF671F',
            secondary: '#2ecc71',
        },
        error: {
            main: '#e74c3c', // Red for errors
        },
        warning: {
            main: '#f39c12', // Orange for warnings
        },
        info: {
            main: '#3498db', // Blue for informational messages
        },
        success: {
            main: '#27ae60', // Green for success messages
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: '#bdc3c7',
                },
            },
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        code: {
            fontFamily: 'Courier, monospace',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF671F', // Blue
        },
        secondary: {
            main: '#2ecc71', // Green
        },
        background: {
            default: '#040D12', // Deep dark gray
            paper: '#1b262c', // Dark gray for paper
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#bdc3c7', // Light gray
        },
        divider: '#2f3640', // Dark gray for dividers
        table: {
            header: '#2d3436', // Dark gray for table headers
            row: '#1b262c', // Slightly lighter dark gray for rows
            hover: '#35404a', // Medium gray on hover
        },
        card: {
            background: '#1b262c', // Dark gray for card background
            shadow: '#000000', // Black shadow
        },
        error: {
            main: '#e74c3c', // Red for errors
        },
        warning: {
            main: '#f39c12', // Orange for warnings
        },
        info: {
            main: '#3498db', // Blue for informational messages
        },
        success: {
            main: '#27ae60', // Green for success messages
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1b262c',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1b262c',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2f3640',
                },
            },
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        code: {
            fontFamily: 'Courier, monospace',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
});

export { lightTheme, darkTheme };
