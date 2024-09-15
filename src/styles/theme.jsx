import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    textWhite: "var(--color-white)",
    textBlack: "var(--color-black)",
    textDarkGray: "var(--color-dark-gray)",
    textLightGray: "var(--colo-mid-gray)",
    textDarkPurple: "var(--color-dark-purple)",
    textLightPurple: "var(--color-mid-dark-purple)",

    brandCommercialBackground: "var(--color-mid-light-purple)",
    searchbarBackground: "var(--color-light-purple)",
    quantityBackground: "var(--color-light-purple)",
    categoryBackground: "var(--color-soft-secondary)",
    mainBackground: "var(--color-light-gray)",

    ratings: "var(--color-soft-yellow)",
    userFeedback: "var(--color-secondary)",
  },
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;