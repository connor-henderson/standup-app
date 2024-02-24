import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import boxShadows from '../../assets/theme/base/boxShadows';
import darkBoxShadows from '../../assets/theme-dark/base/boxShadows';
import pxToRem from '../../assets/theme/functions/pxToRem';

export default styled(Drawer)(({ theme, open }) => {
  const { palette, transitions, breakpoints } = theme;
  const darkMode: boolean = palette.mode === 'dark';

  const drawerOpenStyles = () => ({
    background: '#00000',
    transform: 'translateX(0)',
    transition: transitions.create('transform', {
    easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up('lg')]: {
      marginBottom: 'inherit',
      left: '0',
      width: 250,
      height: 'fit-content',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  const drawerClosedStyles = () => ({
      background: palette.background,
      transform: `translateX(${pxToRem(-320)})`,
      transition: transitions.create("transform", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up("lg")]: {
        marginBottom: "inherit",
        left: "0",
        width: pxToRem(96),
        height: "fit-content",
        overflowX: "hidden",
        transform: "translateX(0)",
        transition: transitions.create(["width", "background-color"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),
      },
    });

  return {
    '& .MuiDrawer-paper': {
      boxShadow: darkMode ? boxShadows.xxl : darkBoxShadows.xxl,
      border: 'none',

      ...open ? drawerOpenStyles(): drawerClosedStyles(),
    },
  };
});
