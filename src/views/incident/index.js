import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight } from 'react-feather';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import { useIncidents } from 'src/data';
import LineProgress from 'src/components/LineProgress';
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

const Incidents = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useIncidents();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch incidents', {
      variant: 'error'
    });
  }

  let incidents = [];
  if (data) {
    incidents = data.features;
  }

  /* eslint-disable */
  const rows = incidents
    ? incidents.map((p) => {
        return { id: p.id, ...p.properties, Actions: <ArrowRight /> };
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
        case 'title':
          header = 'Title';
          break;
        case 'description':
          header = 'Description';
          break;
        case 'date_reported':
          header = 'Date Reported';
          break;
        default:
          header = field;
      }
      columns.push({ field, headerName: header, flex: 1 });
    });
  }

  const incidentData = { columns, rows };

  return (
    <Page title="Incidents" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle="Add Incident"
          navLink="/app/incidents/add"
          btnIcon={<AddIcon />}
          btnTitle="New Incident"
        />
        <div className={classes.gridWrapper}>
          <DataGrid
            {...incidentData}
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

export default Incidents;
