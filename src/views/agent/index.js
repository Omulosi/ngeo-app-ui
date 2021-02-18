import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import DataGridToolbar from 'src/components/DataGridToolbar';
// import { ArrowRight } from 'react-feather';
import { useSnackbar } from 'notistack';
import { useAgents } from 'src/data';
import LineProgress from 'src/components/LineProgress';
import { terms } from 'src/config';
// import { Scrollbars } from 'react-custom-scrollbars';

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
  }
}));

const Agents = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useAgents();

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
          terms: terms[agent.attributes.terms]
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
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
      columns.push({ field, headerName: header, flex: 1 });
    });
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
