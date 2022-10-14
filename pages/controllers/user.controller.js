import axios from 'axios'

let axiosConfig = {
  headers: {
      "Content-Type": 'application/json; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

export const getCarOwners = async () => {
    return await axios.get(`/api/car-owner/get`,
        {},
        axiosConfig
    )
}

export const register = async (payload) => {
    return await axios.post(`/api/car-owner/add`,
        payload,
        axiosConfig
    )
};

export const login = async (payload) => {
  return await axios.post(`/api/car-owner/login`,
        payload,
        axiosConfig
  )
};

export const updateUser = async (payload) => {
  return await axios.put(`/api/car-owner/update`,
        payload,
        axiosConfig
  )
};
