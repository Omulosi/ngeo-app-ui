import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { Avatar, Box, Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight, Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useUser, { useUserAgents } from 'src/data';
import LineProgress from 'src/components/LineProgress';
import { terms } from 'src/config';
import DataGridDisplay from 'src/components/DataGridDisplay';
import AddIcon from '@material-ui/icons/Add';

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
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // get currently logged in user pk
  const { data: user, loading: userLoading, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  const { data, loading, error } = useUserAgents(userPk);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Error fetching agents', {
      variant: 'error'
    });
  }

  let agents = [];
  if (data) {
    agents = data;
  }

  /* eslint-disable */
  const rows = agents
    ? agents.map((agent) => {
        return {
          id: agent.id,
          ...agent.attributes,
          terms: terms[agent.attributes.terms],
          agent: { ...agent.attributes, id: agent.id }
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';

      if (field === 'agent') {
        return;
      }

      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'first_name':
          header = 'First Name';
          break;
        case 'last_name':
          header = 'Last Name';
          break;
        case 'id_number':
          header = 'ID Number';
          break;
        case 'phone_number':
          header = 'Phone Number';
          break;
        case 'email':
          header = 'Email';
          break;
        case 'terms':
          header = 'Terms';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        flex: 1,
        hide: field == 'id' || field == 'projects' || field == 'returns'
      });
    });

    const editField = {
      field: 'agent',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="Edit" placement="bottom">
            <Avatar className={classes.dark}>
              <Edit
                onClick={() => navigate(`/app/agents/edit/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/agents/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(editField);
  }

  const agentData = { columns, rows };

  return (
    <Page title="Agents" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle="Agents"
          navLink="/app/agents/add"
          btnIcon={<AddIcon />}
          btnTitle="New Agent"
        />
        <DataGridDisplay data={agentData} title="Agents" />
      </Container>
    </Page>
  );
};

export default Agents;
