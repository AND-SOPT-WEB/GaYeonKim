import { Theme } from '@emotion/react';

// 컬러
const theme = {
    colors: {
        gray_background: '#fdfdfd',
        primary_700: '#72BF78',
        primary_400: '#A0D683',
        primary_300: '#D3EE98',
        secondary: '#FEFF9F',
        gray: '#8f8f8f',
        error: '#ff0000',
    },
}

export default theme;

// 테마 타입 정의
export type ColorsTypes = typeof theme.colors;

// 테마 객체 정의
export const themeType: Theme = {
    colors: theme.colors,
};
