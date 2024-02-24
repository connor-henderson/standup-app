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

import { Box } from '@mui/material';
import { ReactFragment } from 'react';
import pxToRem from '../assets/theme/functions/pxToRem';

type PropTypes = {
  children: ReactFragment;
  miniSidenav: boolean;
};

function NavLayout({ children, miniSidenav }: PropTypes) {
  return (
    <Box
      sx={({ breakpoints, transitions }) => ({
        p: 3,
        position: 'relative',

        [breakpoints.up('lg')]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}>
      {children}
    </Box>
  );
}

export default NavLayout;
