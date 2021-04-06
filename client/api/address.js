import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw 'Server Error';
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressesApi(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw 'Server Error';
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressesApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
