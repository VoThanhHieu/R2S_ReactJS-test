import api from "./api";

const list = () => api.get(api.url.instructors);
const get = (id) => api.get(`${api.url.instructors}/${id}`);
const add = (data) => api.post(api.url.instructors, data);
const update = (id, data) => api.put(`${api.url.instructors}/${id}`, data);
const remove = (id) => api.delete(`${api.url.instructors}/${id}`);

const instructorsService = {
  list,
  get,
  add,
  delete: remove,
  update,
};

export default instructorsService;
