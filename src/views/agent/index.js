import React, { useState } from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { Avatar, Box, Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import DataGridToolbar from 'src/components/DataGridToolbar';
// import DataGrid from 'src/components/DataGrid';
import { ArrowRight, Edit } from 'react-feather';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSnackbar } from 'notistack';
import { useAgents } from 'src/data';
import LineProgress from 'src/components/LineProgress';
import CustomDialog from 'src/components/CustomDialog';
import { terms } from 'src/config';
import EditAgent from './EditAgent';
// import { Scrollbars } from 'react-custom-scrollbars';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
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
    justifyContent: 'space-betweeb',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const Agents = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useAgents();

  const agentDetails = {};

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
          agent: agent.attributes
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
        case 'rating':
          header = 'Rating';
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
              <Edit onClick={handleOpenEditDialog} />
              <CustomDialog
                open={editDialogOpen}
                handleClose={handleCloseEditDialog}
              >
                <EditAgent agentDetails={params.value} />
              </CustomDialog>
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
        <DataGridToolbar title="Add Agent" />
        <div className={classes.gridWrapper}>
          <DataGrid
            {...agentData}
            components={{
              Toolbar: GridToolbar
            }}
            showToolbar
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection
            className={classes.grid}
          />
        </div>
      </Container>
    </Page>
  );
};

export default Agents;
