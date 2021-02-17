import { axiosWithAuth } from 'src/utils/axios';

export default async (url) => {
  try {
    const result = await axiosWithAuth().get(url);
    return result.data;
  } catch (error) {
    console.log(`Error in swr fetcher: ${error}`);
    throw error;
  }
};
