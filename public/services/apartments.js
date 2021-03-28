import env from "../config/env";
import initialState from '../config/store'

const svc = {
  getApartments: async (filterParams = {}) => {
    filterParams = {
      ...initialState.apartmentFilter,
      ...filterParams,
    };
    const resp = await fetch(
      `${env.API_URL}?${new URLSearchParams(filterParams)}`
    );
    const data = await resp.json();
    return data;
  },
};

export default svc;
