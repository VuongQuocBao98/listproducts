import axiosClient from "./axiosClients";

const productAPi = {
  async getAll(params) {
    const url = "/products";
    // transform _page to _start
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page < 1
        ? 0
        : (params._page - 1) * (params._limit || 50);

    //Remove param._page key ( unneeded )
    delete newParams._page;
    // fetch productlist + count
    const productList = await axiosClient.get(url, { params: newParams });
    const count = await axiosClient.get(`${url}/count`, { params: newParams });
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/products`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productAPi;
