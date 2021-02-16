import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
// import ResultGrid from 'src/components/ResultGrid';
import DataGridToolbar from 'src/components/DataGridToolbar';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { axiosWithAuth } from 'src/utils/axios';

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

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('http://127.0.0.1:8000/api/v1/agents')
      .then(({ respData }) => {
        const res = respData.data.length > 0 ? respData.data : [];
        setAgents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let agentRows = [];

  // create a list of all agents with an added id field.
  // This field is requried by Datagrid component
  if (agents && agents.length > 0) {
    agentRows = agents.map((agent) => {
      return { id: agent.id, ...agent.attributes };
    });
  }

  const agentColumns = [];

  // Make each header name readable
  if (agentRows.length > 0) {
    const colFields = Object.keys(agentRows[0]);

    colFields.forEach((fieldKey) => {
      let header = '';
      switch (fieldKey) {
        case 'first_name':
          header = 'First Name';
          break;
        case 'last_name':
          header = 'Last Name';
          break;
        case 'rating':
          header = 'Rating';
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
        case 'status':
          header = 'Status';
          break;
        case 'terms':
          header = 'Terms';
          break;
        default:
          header = fieldKey;
      }

      // Each column field must match corresponding field name in row
      agentColumns.push({ field: fieldKey, headerName: header, flex: 1 });
    });
  }

  const agentData = { columns: agentColumns, rows: agentRows };

  return (
    <Page title="Agents" className={classes.root}>
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
