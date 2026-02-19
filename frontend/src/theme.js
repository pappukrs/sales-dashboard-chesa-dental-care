import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00D1FF',
            light: '#66E3FF',
            dark: '#00A3C7',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            default: '#050505',
            paper: '#0A0A0A',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
        error: {
            main: '#FF4D4D',
        },
        success: {
            main: '#00E676',
        },
    },
    typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 800, letterSpacing: '-0.02em' },
        h4: { fontWeight: 800, letterSpacing: '-0.02em' },
        subtitle1: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 700 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 100,
                    padding: '8px 20px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 209, 255, 0.3)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #00D1FF 0%, #0085FF 100%)',
                    color: '#000',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#0A0A0A',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: 'rgba(0, 209, 255, 0.03)',
                    color: '#94A3B8',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                },
                root: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
                    padding: '16px',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 800,
                    borderRadius: 6,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(0, 209, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00D1FF',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
