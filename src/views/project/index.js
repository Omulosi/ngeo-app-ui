import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { axiosWithAuth } from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  }
}));

const Projects = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('http://127.0.0.1:8000/api/v1/isiolo_projects')
      .then(({ data }) => {
        data = data.data.results ? data.data.results.features : [];
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      columns.push({ field, headerName: header });
    });
  }

  const projectData = { columns, rows };

  return (
    <Page title="Projects" className={classes.root}>
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
