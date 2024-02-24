import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';
import navbarContainer from '../Desktop/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
  children: React.ReactElement;
  setMiniSidenav: (miniSidenav: boolean) => void;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MobileNavbar(props: Props) {
  const { setMiniSidenav } = props;

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar sx={{ ...navbarContainer, marginLeft: 0 }}>
            <MenuIcon onClick={() => setMiniSidenav(false)} />
            <AccountCircleIcon fontSize="medium" />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
