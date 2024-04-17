import AxiosInstance from "./AxiosInstance";
import { uploadToCloud } from "./function";

export async function signupUser(userData) {
  const config = {
    method: "POST",
    url: `/user/signup`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function fetchUserProfile() {
  try {
    const config = {
      url: `/user/profile`,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(userData) {
  const config = {
    method: "POST",
    url: `/user/login`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function logoutUser() {
  const config = {
    method: "POST",
    url: `/user/logout`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function forgotPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/forgotPassword`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function resetPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/resetPassword/${userData.id}`,
    data: { password: userData.password },
  };
  const response = await AxiosInstance(config);
  return response;
}

export const getAllProducts = async () => {
  const config = {
    url: `/getAllproducts`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getProduct = async (id) => {
  const config = {
    url: `/getproduct/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getProductsOfCategory = async (id) => {
  const config = {
    url: `/getproductsOfCategory/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const addProduct = async (productData) => {
  try {
    const result = Object.keys(productData.images).map(async (key) => {
      return await uploadToCloud(productData.images[key]);
    });
    const imageLinks = await Promise.all(result);
    productData.images = imageLinks;
    const config = {
      method: "POST",
      url: `/addproduct`,
      data: productData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteproduct/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateProduct = async (id, product) => {
  const { images, ...productData } = product;
  try {
    if (images) {
      const result = Object.keys(images).map(async (key) => {
        return await uploadToCloud(images[key]);
      });
      const imageLinks = await Promise.all(result);
      productData.images = imageLinks;
    }
    const config = {
      method: "PATCH",
      url: `/updateproduct/${id}`,
      data: productData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};
export async function addCategory(catData) {
  try {
    const imageLink = await uploadToCloud(catData.image);
    catData.image = imageLink;
    const config = {
      method: "POST",
      url: `/addCategory`,
      data: catData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}

export const updateCategory = async (id, categoryData) => {
  const { image, ...newCategoryData } = categoryData;
  try {
    if (categoryData.image) {
      const imageLink = await uploadToCloud(image);
      newCategoryData.image = imageLink;
    }
    const config = {
      method: "PATCH",
      url: `/updatecategory/${id}`,
      data: newCategoryData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllCategories = async () => {
  const config = {
    url: `/getAllCategories`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteCategory = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteCategory/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const addCartItems = async (items) => {
  const config = {
    method: "POST",
    url: `/addCartItems`,
    data: items,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const postOrder = async (orderData) => {
  try {
    const config = {
      method: "POST",
      url: `/postOrder`,
      data: orderData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserOrders = async () => {
  try {
    const config = {
      method: "get",
      url: `/getUserOrders`,
      withCredentials: true,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllOrders = async () => {
  const config = {
    url: `/getAllOrders`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateOrder = async (updateObj, updateId) => {
  try {
    const config = {
      method: "PATCH",
      url: `/updateOrderStatus/${updateId}`,
      data: updateObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrderById = async (id) => {
  const config = {
    url: `/getOrder/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteOrder = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteOrder/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getTodaysOrders = async () => {
  const config = {
    url: `/getTodaysOrders`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getAccessToken = async () => {
  try {
    const config = {
      url: "/user/getAccessToken",
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUsers = async () => {
  const config = {
    url: `/getAllUsers`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function addUser(userData) {
  const config = {
    method: "POST",
    url: `/user/addUser`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export const deleteUser = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteUser/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateUser = async (newObj, id) => {
  try {
    const config = {
      method: "PATCH",
      url: `/updateUser/${id}`,
      data: newObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const addReview = async (id, reviewObj) => {
  const config = {
    method: "POST",
    url: `/addproductReview/${id}`,
    data: reviewObj,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return { ...response, status: 200 };
};

export const getReview = async (id) => {
  const config = {
    url: `/getReview/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getProductReviews = async (id) => {
  const config = {
    url: `/getproductReviews/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchCategoryByName = (name, data) => {
  const filterdName = name.split(" ").join("").toLowerCase();
  const filteredData = data.filter((item) => {
    const itemName = item.name.split(" ").join("").toLowerCase();
    return itemName.includes(filterdName);
  });

  return filteredData;
};

export const fetchProductByName = (name, data) => {
  const filterdName = name.split(" ").join("").toLowerCase();
  const filteredData = data.filter((item) => {
    const itemName = item.bookName.split(" ").join("").toLowerCase();
    return itemName.includes(filterdName);
  });

  return filteredData;
};

export const sortItems = async (id, name) => {
  const config = {
    url: `/getfilteredproducts/${id}/${name}`,
  };
  const response = await AxiosInstance(config);
  return response;
};
