import { BASE_PATH } from '../utils/constants';

export async function getLastGamesApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = '_sort=creatAt:desc';
    const url = `${BASE_PATH}/games?_limit=${limitItems}&${sortItem}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
