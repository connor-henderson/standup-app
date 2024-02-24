/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Theme } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import linearGradient from "../../../assets/theme/functions/linearGradient";
import pxToRem from "../../../assets/theme/functions/pxToRem";
import rgba from "../../../assets/theme/functions/rgba";

export default function sidenavLogoLabel(theme: Theme, miniSidenav: boolean) {
    const { transitions, typography, breakpoints } = theme;
    const { fontWeightMedium } = typography;
  
    return {
      ml: 1,
      fontWeight: fontWeightMedium,
      wordSpacing: pxToRem(-1),
      transition: transitions.create("opacity", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    };
  }
  
function collapseItem(theme: Theme, clickedLink: boolean) {
    const { palette, transitions, breakpoints, borders } = theme;
    const darkMode = palette.mode === 'dark';

    const { white, transparent, dark, grey, gradients } = palette;
    const { borderRadius } = borders;
  
    return {
      background: clickedLink
        ? linearGradient(gradients[palette.mode].state, gradients["info"].main)
        : transparent.main,
      color:
        (!darkMode && !clickedLink)
          ? dark.main
          : white.main,
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: `${pxToRem(8)} ${pxToRem(10)}`,
      margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
      borderRadius: borderRadius.md,
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap",
      boxShadow: "none",
      [breakpoints.up("xl")]: {
        transition: transitions.create(["box-shadow", "background-color"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        }),
      },
  
      "&:hover, &:focus": {
        backgroundColor: rgba(!darkMode ? blue[400] : white.main, 0.2),
      },
    };
  }
  
  function collapseIconBox(theme: Theme, clickedLink: boolean) {
    const { palette, transitions, borders } = theme;
    const darkMode = palette.mode === 'dark';
  
    const { white, dark } = palette;
    const { borderRadius } = borders;
  
    return {
      minWidth: pxToRem(32),
      minHeight: pxToRem(32),
      color: (!darkMode && clickedLink) ? dark.main : white.main, // icon color whiteSidenav && !active ? dark.main : white.main,
      borderRadius: borderRadius.md,
      display: "grid",
      placeItems: "center",
      transition: transitions.create("margin", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
  
      "& svg, svg g": {
        color: (!darkMode && clickedLink) ? dark.main : white.main,
      },
    };
  }
  
  const collapseIcon = ({ palette: { white, gradients } }: Theme, clickedLink: boolean) => ({
    color: clickedLink ? white.main : gradients.dark.state,
  });
  
  function collapseText(theme: Theme, active: boolean, miniSidenav: boolean) {
    const { typography, transitions, breakpoints } = theme;
    const { size, fontWeightRegular, fontWeightLight } = typography;
  
    return {
      marginLeft: pxToRem(10),
      color: blueGrey,
  
      // [breakpoints.up("xl")]: {
      //   maxWidth: miniSidenav ? 0 : "100%", // change to 'miniSidenav'
      //   marginLeft: miniSidenav ? 0 : pxToRem(10), // change to 'miniSidenav'
      //   opacity: miniSidenav ? 1 : 0,
      //   transition: transitions.create(["opacity", "margin"], {
      //     easing: transitions.easing.easeInOut,
      //     duration: transitions.duration.standard,
      //   }),
      // },
  
      "& span": {
        fontWeight: active ? fontWeightRegular : fontWeightLight,
        fontSize: size.sm,
        lineHeight: 0,
      },
    };
  }
  
  export { collapseItem, collapseIconBox, collapseIcon, collapseText };
  