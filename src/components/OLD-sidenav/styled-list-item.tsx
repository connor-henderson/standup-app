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

// @mui material components
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import { Box } from '@mui/material';

// Custom styles for the SidenavCollapse
import {
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText,
} from './styles';
import NextLink from 'next/link';

type PropTypes = {
  icon: string;
  name: string;
  active: boolean;
  miniSidenav: boolean;
};

function SidenavCollapse({ icon, name, active, miniSidenav }: PropTypes) {
  return <p>test</p>
  // return (
  //   <NextLink href={`/${name}`} passHref>
  //     <ListItem component="li">
  //       <Box sx={(theme) => collapseItem(theme, active)}>
  //         <ListItemIcon sx={(theme) => collapseIconBox(theme, active)}>
  //           <Icon sx={(theme) => collapseIcon(theme, active)}>{icon}</Icon>
  //         </ListItemIcon>
  //         <ListItemText
  //           primary={name}
  //           sx={(theme) => collapseText(theme, active, miniSidenav)}
  //         />
  //       </Box>
  //     </ListItem>
  //   </NextLink>
  // );
}

export default SidenavCollapse;
