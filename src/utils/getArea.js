import capitalize from 'src/utils/capitalize';

/* eslint-disable */
export default function getArea({
  user = {},
  roles = {},
  fieldOfficer = {},
  countyManager = {}
}) {
  let areas = [];
  let subCounty = '';
  let district = '';
  let location = '';
  let subLocation = '';

  if (user.role === roles.FOO) {
    let fooAreas = [];
    if (fieldOfficer) {
      fooAreas =
        (fieldOfficer.areas && fieldOfficer.areas) ||
        (fieldOfficer.attributes && fieldOfficer.attributes.areas) ||
        [];
    }

    fooAreas = fooAreas.map((area) => {
      return {
        subCounty: area.sub_county || '',
        district: area.district || '',
        location: area.location || '',
        subLocation: area.sub_location || ''
      };
    });
    fooAreas.forEach((area) => {
      subCounty += `${area.subCounty}`;
      district += `${area.district}`;
      location += `${area.location}`;
      subLocation += `${area.subLocation}`;
    });

    areas = [
      { type: 'Sub-County', name: capitalize(subCounty) },
      { type: 'District', name: capitalize(district) },
      { type: 'Location', name: capitalize(location) },
      { type: 'Sub-Location', name: capitalize(subLocation) }
    ];

    areas = areas.filter((a) => Boolean(a.name));
  }

  if (user.role === roles.CM) {
    let cmArea = {};
    if (countyManager) {
      let county = countyManager.attributes
        ? countyManager.attributes.areas
        : [{}];
      [cmArea] = county;
    }

    cmArea = { type: 'County', name: capitalize(cmArea.county || '') };
    areas = [cmArea];

    areas = areas.filter((a) => Boolean(a.name));
  }

  return areas;
}

export const getProjects = ({ data = {} }) => {
  let projects = [];
  if (data) {
    projects = data.attributes && data.attributes.projects;
  }

  return projects;
};

export const getInstallations = ({ data = {} }) => {
  let installtions = [];

  if (data) {
    installtions = data.attributes && data.attributes.installation;
  }

  return installtions;
};
