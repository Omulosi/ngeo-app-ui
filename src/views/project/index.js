import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack';
import { useAxios } from 'src/utils/axios';
import LineProgress from 'src/components/LineProgress';
// import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
  progress: {
    marginTop: '0.3em'
  }
}));

const Projects = () => {
  const classes = useStyles();
  // const [projects, setProjects] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }] = useAxios()('/isiolo_projects');

  // if (loading) {
  //   return <Loading />;
  // }

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch profile data', {
      variant: 'info'
    });
  }

  let projects = [];
  if (data) {
    projects = data.data.results ? data.data.results.features : [];
  }

  /* eslint-disable */
  const rows = projects
    ? projects.map((p) => {
        return { id: p.id, ...p.properties };
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
        case 'objectid':
          header = 'Object ID';
          break;
        case 'fname':
          header = 'Name';
          break;
        case 'latitude':
          header = 'Latitude';
          break;
        case 'longitude':
          header = 'Longitude';
          break;
        case 'altitude':
          header = 'Altitude';
          break;
        case 'couname':
          header = 'County';
          break;
        case 'scouname':
          header = 'Sub-County';
          break;
        case 'divname':
          header = 'Divison';
          break;
        case 'locname':
          header = 'Location';
          break;
        case 'slname':
          header = 'Sub-Location';
          break;
        case 'constname':
          header = 'Constituecy';
          break;
        case 'wardname':
          header = 'Ward';
          break;
        case 'villname':
          header = 'Village';
          break;
        case 'foo':
          header = 'Meta';
          break;
        case 'theme':
          header = 'Theme';
          break;
        case 'control':
          header = 'Control';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        flex: 1,
        hide:
          field == 'id' ||
          field == 'objectid' ||
          field == 'altitude' ||
          field == 'latitude' ||
          field == 'longitude' ||
          field == 'wardname' ||
          field == 'villname' ||
          field == 'foo' ||
          field == 'constname' ||
          field == 'slname'
      });
    });
  }

  const projectData = { columns, rows };

  return (
    <Page title="Projects" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...projectData}
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
