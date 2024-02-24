import {
  AppBar,
  Box,
  // Breadcrumbs,
  Button,
  Icon,
  IconButton,
  Input,
  Theme,
  Toolbar,
  useTheme,
  // Typography,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import navbarContainer from './styles';
// import NextLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MDInput from '../../MD/MDInput';
import Link from 'next/link';

type PropTypes = {
  miniSidenav: boolean;
  setMiniSidenav: (miniSidenav: boolean) => void;
};

const Navbar = ({ setMiniSidenav, miniSidenav }: PropTypes) => {
  // const { palette } = useTheme();
  // const iconColor = palette.mode === 'dark' ? palette.white.main : palette.dark.main;

  const navItems = ['Menu', 'Home', 'About', 'Profile'];
  const handleMiniSidenav = () => setMiniSidenav(!miniSidenav);
  const router = useRouter();
  const routes = router.asPath.split('/');

  return (
    <AppBar component="nav" position="absolute">
      <Toolbar sx={navbarContainer}>
        <Box>
          <IconButton size="small" color="inherit" onClick={handleMiniSidenav}>
            {miniSidenav ? (
              <MenuIcon fontSize="medium" />
            ) : (
              <MenuOpenIcon fontSize="medium" />
            )}
          </IconButton>

          <IconButton
            sx={{ marginLeft: 3 }}
            size="small"
            color="default"
            disableRipple>
            <Link href="/" passHref style={{ color: 'inherit' }}>
              <HomeIcon fontSize="medium" />
            </Link>
          </IconButton>
        </Box>
        <Box>
          <MDInput label="Search by title..."></MDInput>
          <IconButton
            sx={{ marginLeft: 3 }}
            size="small"
            color="default"
            disableRipple>
            <Link href="/about" passHref style={{ color: 'inherit' }}>
              <InfoIcon fontSize="medium" />
            </Link>
          </IconButton>
          <IconButton
            sx={{ marginLeft: 3 }}
            size="small"
            color="default"
            disableRipple>
            <Link href="/account" passHref style={{ color: 'inherit' }}>
              <PersonIcon fontSize="medium" />
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
