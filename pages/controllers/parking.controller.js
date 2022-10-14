
import axios from 'axios'

let axiosConfig = {
  headers: {
      "Content-Type": 'application/json; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

export const getParkings = async () => {
    return await axios.get(`/api/parking/get`,
        {},
        axiosConfig
    )
}

export const createParking = async (payload) => {
  return await axios.post(`/api/parking/add`,
      payload,
      axiosConfig
  )
};

export const updateParking = async (payload) => {
  console.log("PYLOAD" , payload)
  return await axios.put(`/api/parking/update`,
      payload,
      axiosConfig
  )
};