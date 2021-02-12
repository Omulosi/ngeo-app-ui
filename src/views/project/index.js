import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
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

const Projects = () => {
  const classes = useStyles();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6
  });

  const newData = {};
  newData.rows = data.rows;
  newData.columns = data.columns.map((col) => ({ ...col, flex: 1 }));

  return (
    <Page title="Projects" className={classes.root}>
      <Container maxWidth={false}>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...newData}
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

export default Projects;
