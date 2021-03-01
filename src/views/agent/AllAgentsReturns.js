import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { Avatar, Box, Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight, Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useUser, { useUserResource } from 'src/data';
import LineProgress from 'src/components/LineProgress';
import { terms } from 'src/config';
import DataGridDisplay from 'src/components/DataGridDisplay';
import AddIcon from '@material-ui/icons/Add';
import ReturnList from './ReturnList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '80vh',
    width: '100%'
  },
  grid: {},
  dark: {
    color: '#263238',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#263238'
    }
  },
  actionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const Agents = () => {
  const classes = useStyles();
  //   const navigate = useNavigate();

  //   const { enqueueSnackbar } = useSnackbar();

  // get currently logged in user pk
  const { data: user, loading: userLoading, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  const { data, loading, error } = useUserResource(userPk, 'returns');

  return (
    <Page title="Returns" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          title="Add Agent Return"
          navLink="/app/returns/add"
          btnIcon={<AddIcon />}
        />
        <ReturnList returns={[]} />
      </Container>
    </Page>
  );
};

export default Agents;
