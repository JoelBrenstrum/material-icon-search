import { createMuiTheme } from '@material-ui/core';

const palette = {
    // primary: {
    //   main: primary.main,
    //   light: primary.light,
    //   contrastText: primary.contrastText,
    // },
    // secondary: {
    //   main: secondary.main,
    //   light: secondary.light,
    //   contrastText: secondary.contrastText,
    // },
    // error: {
    //   main: error.main,
    //   light: error.light,
    //   contrastText: error.contrastText,
    // },
    // base,
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

