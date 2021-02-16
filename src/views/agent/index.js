import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
// import ResultGrid from 'src/components/ResultGrid';
// import DataGridToolbar from 'src/components/DataGridToolbar';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { axiosWithAuth } from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '60vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  }
}));

const Agents = () => {
  const classes = useStyles();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6
  });

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axiosWithAuth()
    .get('http://127.0.0.1:8000/api/v1/agents')
    .then(({ data }) => {
      let res = data.data.length > 0? data.data: [];
      setAgents(res);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  let agentRows = [];

  if (agents && agents.length > 0) {
    agentRows = agents.map(agent => {
      return {id: agent.id, ...agent.attributes}
    })
  }

  let agentColumns = [];

  if (agentRows.length > 0) {
    let colFields = Object.keys(agentRows[0]);
    for (let elem of colFields) {
      let header = "";
      switch (elem) {
        case "first_name":
          header = "First Name";
          break;
        case "last_name":
            header = "Last Name";
            break;
        case "rating":
              header = "Rating";
              break;
        case "id_number":
          header = "ID Number";
          break;
        case "phone_number":
          header = "Phone Number";
          break;
        default:
          header = elem;
      }

      agentColumns.push({field: elem, headerName: header })
    }
  }

  let agentData = { columns: agentColumns, rows: agentRows };

  return (
    <Page title="Agents" className={classes.root}>
      <Container maxWidth={false}>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...data}
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
