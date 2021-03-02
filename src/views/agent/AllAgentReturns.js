import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import useUser, { useUserResource } from 'src/data';
import LineProgress from 'src/components/LineProgress';
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
  let returns = [];
  if (data) {
    returns = data;
  }

  return (
    <Page title="Returns" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          navLink="/app/returns/add"
          btnIcon={<AddIcon />}
          btnTitle="New Return"
          pageTitle="Returns"
        />
        <ReturnList returns={returns} />
      </Container>
    </Page>
  );
};

export default Agents;
