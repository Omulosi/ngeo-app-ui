import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import {
  User as UserIcon,
  MapPin
  //   Users as UsersIcon
} from 'react-feather';
import { roles } from 'src/config';

/* eslint-disable */
// Side menu items as a map of their links and components
const getMenuItems = (user) => {
  // check if a user object not empty.
  // Presence of this object shows user is authorized to use the app.
  const isAuthorized = user && Object.entries(user).length !== 0;
  const isFieldOfficer = user && user.role && user.role === roles.FOO;
  const isRegionalManager = user && user.role && user.role === roles.RM;
  const isCountyManager = user && user.role && user.role === roles.CM;
  // const isCEO = !!user.role && user.role === 'CEO';

  const items = [
    {
      href: '/app/map',
      icon: HomeIcon,
      title: 'Home',
      visible: isAuthorized
    },
    {
      href: '/app/map',
      icon: MapIcon,
      title: 'Map',
      visible: true
    },
    {
      href: '/app/dashboard',
      icon: DashboardIcon,
      title: 'Dashboard',
      visible: isAuthorized
    },
    {
      href: '/app/agents',
      icon: PeopleIcon,
      title: 'Agents',
      visible: isAuthorized && isFieldOfficer,
      items: [
        {
          href: '/app/agents',
          title: 'Agents',
          visible: isAuthorized
        },
        {
          href: '/app/returns',
          title: 'Returns',
          visible: isAuthorized
        }
      ]
    },
    {
      href: '/app/field_officers',
      icon: PeopleIcon,
      title: 'FOO',
      visible: isAuthorized && isCountyManager
    },
    {
      href: '/app/county_managers',
      icon: PeopleIcon,
      title: 'County Managers',
      visible: isAuthorized && isRegionalManager
    },
    {
      href: '/app/projects',
      icon: FolderIcon,
      title: 'Projects',
      visible: isAuthorized
    },
    {
      href: '/app/incidents',
      icon: MapPin,
      title: 'Incidents',
      visible: isAuthorized && isFieldOfficer
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account',
      visible: isAuthorized
    }
  ];

  return items;
};

export default getMenuItems;
