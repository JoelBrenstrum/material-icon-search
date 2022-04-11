import { createMuiTheme } from '@material-ui/core';

const palette = {
    primary: {
        main: '#1b5e20',
        light: '#4c8c4a',
        dark: '#003300',
        contrastText: '#ffffff',

    },
    secondary: {
        main: '#a5d6a7',
        light: '#d7ffd9',
        dark: '#75a478',
        contrastText: '#000000',
    },
};

export const theme = createMuiTheme({
    typography: {
        fontSize: 12,
        fontFamily: ['Roboto', 'Montserrat', 'Helvetica Neue', 'sans-serif'].join(','),
    },
    palette,
    overrides: {},
});

export type Theme = typeof theme;