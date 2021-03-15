// export const REMOTE_BASE_URL = 'https://ngeo-api.herokuapp.com/api/v1';
// export const LOCAL_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const BASE_URL = `${process.env.REACT_APP_API_HOST}/api/v1`;
export const BACKEND_HOST = process.env.REACT_APP_API_HOST;
export const HOST = 'http://127.0.0.1:8000';

export const APP_NAME = 'N-Geo';

export default BASE_URL;

export const roles = {
  admin: 1,
  ceo: 2,
  audit: 3,
  finance: 4,
  // Regional
  RM: 5,
  // County Manager
  CM: 6,
  // Field Outreach Officer
  FOO: 7
};

export const roleNames = {
  1: 'admin',
  2: 'ceo',
  3: 'audit',
  4: 'finace',
  5: 'Regional Manager',
  6: 'County Manager',
  7: 'Field Outreach Officer'
};

export const terms = {
  1: 'Permanent',
  2: 'Temporary',
  3: 'Casual'
};

export const projectThemes = {
  1: 'Business Incubation',
  2: 'Agri-business',
  3: 'Water sanitation'
};
