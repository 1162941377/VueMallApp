import Axios from 'axios';
import baseURL, { urls } from './urls';

const appkey = '1162941377_1615861016532';

const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});

request.interceptors.response.use((value) => value.data);

const getSideBar = (type) => request.get(
  urls.getSideBar,
  { params: { type } },
);

const getGoodsList = (type, page, size, sort) => request.get(
  urls.getGoodsList,
  {
    params: {
      type, page, size, sort,
    },
  },
);

const search = (type, page, size) => request.get(
  urls.search,
  { params: { type, page, size } },
);

const likeSearch = (value) => request.get(
  urls.likeSearch,
  { params: { likeValue: value } },
);

const getGoodsByIds = (value) => request.get(
  urls.getGoodsByIds,
  { params: { value } },
);

export default {
  getSideBar,
  getGoodsList,
  search,
  likeSearch,
  getGoodsByIds,
};
