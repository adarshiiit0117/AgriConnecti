import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEWPASSWORD_FAILURE,
  NEWPASSWORD_REQUEST,
  NEWPASSWORD_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  EQUIPMENT_CREATE_REQUEST,
  EQUIPMENT_CREATE_SUCCESS,
  EQUIPMENT_CREATE_FAILURE,
  FETCH_EQUIPMENTS_REQUEST,
  FETCH_EQUIPMENTS_SUCCESS,
  FETCH_EQUIPMENTS_FAILURE,
BOOK_EQUIPMENT_REQUEST,
  BOOK_EQUIPMENT_SUCCESS,
  BOOK_EQUIPMENT_FAILURE,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAILURE,
  FETCH_MY_BOOKINGS_REQUEST,
  FETCH_MY_BOOKINGS_SUCCESS,
  FETCH_MY_BOOKINGS_FAILURE,
  FETCH_LENDER_BOOKINGS_REQUEST,
  FETCH_LENDER_BOOKINGS_SUCCESS,
  FETCH_LENDER_BOOKINGS_FAILURE,
  MARK_BOOKING_COMPLETED_REQUEST,
  MARK_BOOKING_COMPLETED_SUCCESS,
  MARK_BOOKING_COMPLETED_FAILURE,
} from "./ActionType";


import axios from "axios";

const baseUrl = "https://agriheleper-3.onrender.com/api";

// ================== REGISTER ==================
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${baseUrl}/signup`, userData);
    const user = response.data;

    if (user.accessToken) {
      localStorage.setItem("jwt", user.accessToken);
    }

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================== LOGIN ==================
export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${baseUrl}/login`, loginData);

   if (data.accessToken) {
  localStorage.setItem("jwt", data.accessToken);
}

const userData = {
  fullName: data.fullName,
  email: data.email,
  phoneNumber: data.phoneNumber,
  country: data.country,
  state: data.state,
  pincode: data.pincode,
  address: data.address,
  id: data.id || data.userId || null,  // backend might send
  createdAt: data.createdAt || null,   // join date if backend sends
};

dispatch({
  type: LOGIN_SUCCESS,
  payload: {
    accessToken: data.accessToken,
    user: userData,
  },
});

// ✅ Save immediately (before Redux updates)
localStorage.setItem("userData", JSON.stringify(userData));

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ================== CREATE EQUIPMENT ==================
export const createEquipment = (equipmentData) => async (dispatch) => {
  dispatch({ type: EQUIPMENT_CREATE_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.post(
      `https://agriheleper-3.onrender.com/equipment/register`,
      equipmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: EQUIPMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EQUIPMENT_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================== FETCH EQUIPMENTS ==================
export const fetchEquipments = (category) => async (dispatch) => {
  dispatch({ type: FETCH_EQUIPMENTS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(
      `https://agriheleper-3.onrender.com/equipment/category/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: FETCH_EQUIPMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EQUIPMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
// ========== BOOK EQUIPMENT ==========
export const bookEquipment = (equipmentId) => async (dispatch) => {
  dispatch({ type: BOOK_EQUIPMENT_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.post(
      `https://agriheleper-3.onrender.com/bookings/${equipmentId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: BOOK_EQUIPMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: BOOK_EQUIPMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// ========== CANCEL BOOKING ==========
export const cancelBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: CANCEL_BOOKING_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`https://agriheleper-3.onrender.com/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: bookingId });
    return data;
  } catch (error) {
    dispatch({
      type: CANCEL_BOOKING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// ========== FETCH MY BOOKINGS ==========
export const fetchMyBookings = () => async (dispatch) => {
  dispatch({ type: FETCH_MY_BOOKINGS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`https://agriheleper-3.onrender.com/bookings/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_MY_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_BOOKINGS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ========== FETCH LENDER BOOKINGS ==========
export const fetchLenderBookings = () => async (dispatch) => {
  dispatch({ type: FETCH_LENDER_BOOKINGS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`https://agriheleper-3.onrender.com/bookings/lender`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_LENDER_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_LENDER_BOOKINGS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
// ========== MARK BOOKING COMPLETED ==========
export const markAsCompleted  = (bookingId) => async (dispatch) => {
  dispatch({ type: MARK_BOOKING_COMPLETED_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(
      `https://agriheleper-3.onrender.com/bookings/${bookingId}/complete`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: MARK_BOOKING_COMPLETED_SUCCESS, payload: { bookingId } });

    // Refresh lender bookings so UI updates
    dispatch(fetchLenderBookings());

    return data;
  } catch (error) {
    dispatch({
      type: MARK_BOOKING_COMPLETED_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
