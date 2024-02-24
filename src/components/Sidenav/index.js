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

import { useEffect } from 'react';

// react-router-dom components
// import { useLocation, NavLink } from "react-router-dom";'
import NextLink from 'next/link';

// prop-types is a library for typechecking of props.

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from '../Sidenav/SidenavCollapse';

// Custom styles for the Sidenav
import SidenavRoot from '../Sidenav/SidenavRoot';
import sidenavLogoLabel from '../Sidenav/styles/sidenav';

// Material Dashboard 2 React context
// import { useMaterialUIController, setMiniSidenav, setTransparentSidenav } from "context";
import { useRouter } from 'next/router';
import { Box, Typography, useTheme } from '@mui/material';


function Sidenav({ color, routes, miniSidenav, mobile, setMiniSidenav, ...rest }) {
  const { palette } = useTheme();
  const transparentSidenav = false;
  const darkMode = palette.mode === 'dark';
  const whiteSidenav = !darkMode;

  const router = useRouter();
  const collapseName = router.asPath;

  let textColor = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => setMiniSidenav(true);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, href, route }) => {
      let returnValue;

      if (type === 'collapse') {
        returnValue = href ? (
          <Link
            href={href}
            key={route}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}>
            <a>
              <SidenavCollapse
                name={name}
                icon={icon}
                active={route === collapseName}
                noCollapse={noCollapse}
              />
            </a>
          </Link>
        ) : (
          <NextLink href={`/${route}`} passHref key={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={route === collapseName}
              miniSidenav={miniSidenav}
            />
          </NextLink>
        );
      } else if (type === 'title') {
        returnValue = (
          <Typography
            key={route}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ opacity: miniSidenav ? 0 : 1 }}
            pl={3}
            mt={2}
            mb={1}
            ml={1}>
            {title}
          </Typography>
        );
      } else if (type === 'divider') {
        returnValue = (
          <Divider
            key={route}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      open={false}>
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" color="secondary" sx={{ display: !mobile && 'none' }}>
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </Typography>
        </Box>
        <Box component={NextLink} href="/" display="flex" alignItems="center">
          <Box
            component="img"
            src={darkMode ? "/brand-light.png" : "/brand-dark.png" }
            alt="Brand"
            height="3rem"
            width="3rem"
            marginLeft={-1}
          />
          <Box sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
            <Typography
              variant="button"
              fontWeight="medium"
              fontSize={18}
              marginLeft={2}
              color="text.primary">
              Mindfulnet
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

export default Sidenav;
