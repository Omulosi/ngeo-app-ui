import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
// import ResultGrid from 'src/components/ResultGrid';
// import DataGridToolbar from 'src/components/DataGridToolbar';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

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
