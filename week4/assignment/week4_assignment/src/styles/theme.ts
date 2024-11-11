import { DefaultTheme } from "styled-components";

const colors = {
    gray_background : '#fdfdfd',
    primary_700: '#72BF78',
    primary_400 : '#A0D683',
    primary_300: '#D3EE98',
    secondary : '#FEFF9F',
    gray: '#8f8f8f',   
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
    colors,
};