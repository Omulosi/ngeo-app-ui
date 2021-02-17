export const REMOTE_BASE_URL = 'https://ngeo-api.herokuapp.com/api/v1';
export const LOCAL_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default REMOTE_BASE_URL;

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
