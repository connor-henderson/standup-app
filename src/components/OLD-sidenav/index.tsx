import { Box, Divider, Icon, List, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import StyledDrawer from './styled-drawer';
import CloseIcon from '@mui/icons-material/Close';
import NextLink from 'next/link';
// import { Link as MUILink } from '@mui/material';
// import SidenavCollapse from './styled-list-item';
import sidenavLogoLabel from './styles';

const Sidenav = () => {
  const [openSidenav, setOpenSidenav] = useState(true);
  const { palette } = useTheme();

  return (
    <StyledDrawer variant="permanent" open={openSidenav}>
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={() => setOpenSidenav(false)}
          sx={{ cursor: 'pointer' }}>
          <CloseIcon fontSize="small" />
        </Box>
        <Box display="flex" alignItems="center">
          <Box component="img" src="favicon.ico" alt="Brand" width="2rem" />
          <Box sx={(theme) => sidenavLogoLabel(theme, openSidenav)}>
            <Typography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={
                palette.mode === 'light'
                  ? palette.dark.main
                  : palette.white.main
              }>
              Mindfulnet
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      {/* <List>
        <NextLink href="/authors" passHref>
          <SidenavCollapse name="Authors" icon="book" />
        </NextLink>
        <NextLink href="/works" passHref>
          <SidenavCollapse name="Works" icon="book" />
        </NextLink>
      </List> */}
    </StyledDrawer>
  );
};

export default Sidenav;
