import api from "../../../../api";

export async function getAllProducts(data) {
  let queryString = "";
  queryString += `page=${data.panigation.page}&pagesize=${data.panigation.pageSize}&`;
  queryString += `sort=${data.sort.sort}&order=${data.sort.order}`;
  try {
    const res = await api.get(`/products?${queryString}`);

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getSingleProduct(id) {
  try {
    const res = await api.get(`products/details/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function createProduct(formData) {
  try {
    const res = await api.post("/admin/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
    
  } catch (error) {
    throw error.response.data;
  }
}
