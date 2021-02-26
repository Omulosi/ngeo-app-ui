import React, { useState } from 'react';
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

const DisplayAgents = ({ agents, agentBaseUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const baseUrl = agentBaseUrl ? agentBaseUrl : '/app/agents';

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const agentDetails = {};

  /* eslint-disable */
  const rows = agents
    ? agents.map((agent) => {
        return {
          ...agent,
          terms: terms[agent.terms],
          agent: { id: agent.id }
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';

      if (
        field === 'agent' ||
        field === 'returns' ||
        field == 'projects' ||
        field == 'field_officer'
      ) {
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
          {/* display only if user has field officer role */}
          <Tooltip title="Edit" placement="bottom">
            <Avatar className={classes.dark}>
              <Edit
                onClick={() => navigate(`/app/agents/edit/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
          {/*  */}

          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`${baseUrl}/${params.row.id}`)}
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
      <Container maxWidth={false}>
        <DataGridDisplay data={agentData} title="Agents" />
      </Container>
    </Page>
  );
};

export default DisplayAgents;
