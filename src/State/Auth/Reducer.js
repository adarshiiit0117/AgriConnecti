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

  // ✅ equipment
  EQUIPMENT_CREATE_REQUEST,
  EQUIPMENT_CREATE_SUCCESS,
  EQUIPMENT_CREATE_FAILURE,
  FETCH_EQUIPMENTS_REQUEST,
  FETCH_EQUIPMENTS_SUCCESS,
  FETCH_EQUIPMENTS_FAILURE,
  // bookings
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

const initialState = {
  // ---------- AUTH ----------
  user: null,
  jwt: null,
  loading: false,
  error: null,

  // ---------- EQUIPMENTS ----------
  equipments: [],      // all equipments list
  equipment: null,     // recently created equipment
  equipmentLoading: false,
  equipmentError: null,
   // bookings
  myBookings: [],
  lenderBookings: [],
  bookingLoading: false,
  bookingError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------- AUTH ----------
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case NEWPASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
   case LOGIN_SUCCESS:
  return {
    ...state,
    loading: false,
    error: null,
    jwt: action.payload.accessToken || null,
    user: action.payload.user, // ✅ store full user details
  };

case NEWPASSWORD_SUCCESS:
  return { ...state, loading: false, error: null, user: action.payload };

case REGISTER_FAILURE:
case LOGIN_FAILURE:
case NEWPASSWORD_FAILURE:
  return { ...state, loading: false, error: action.payload };


    // ---------- EQUIPMENT ----------
    case EQUIPMENT_CREATE_REQUEST:
      return { ...state, equipmentLoading: true, equipmentError: null };

    case EQUIPMENT_CREATE_SUCCESS:
      return {
        ...state,
        equipmentLoading: false,
        equipmentError: null,
        equipment: action.payload,
        equipments: [...state.equipments, action.payload], // append new one
      };

    case EQUIPMENT_CREATE_FAILURE:
      return { ...state, equipmentLoading: false, equipmentError: action.payload };

    case FETCH_EQUIPMENTS_REQUEST:
      return { ...state, equipmentLoading: true, equipmentError: null };

    case FETCH_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        equipmentLoading: false,
        equipmentError: null,
        equipments: action.payload, // full list
      };

    case FETCH_EQUIPMENTS_FAILURE:
      return { ...state, equipmentLoading: false, equipmentError: action.payload };

      // ---------- BOOKINGS ----------
    case BOOK_EQUIPMENT_REQUEST:
    case CANCEL_BOOKING_REQUEST:
    case FETCH_MY_BOOKINGS_REQUEST:
    case FETCH_LENDER_BOOKINGS_REQUEST:
      return { ...state, bookingLoading: true, bookingError: null };

    case BOOK_EQUIPMENT_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        myBookings: [...state.myBookings, action.payload],
      };

    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        myBookings: state.myBookings.filter((b) => b.id !== action.payload),
        lenderBookings: state.lenderBookings.filter((b) => b.id !== action.payload),
      };

    case FETCH_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        myBookings: action.payload,
      };

    case FETCH_LENDER_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        lenderBookings: action.payload,
      };

    case BOOK_EQUIPMENT_FAILURE:
    case CANCEL_BOOKING_FAILURE:
    case FETCH_MY_BOOKINGS_FAILURE:
    case FETCH_LENDER_BOOKINGS_FAILURE:
      return { ...state, bookingLoading: false, bookingError: action.payload };

    default:
      return state;
    case MARK_BOOKING_COMPLETED_REQUEST:
  return { ...state, bookingLoading: true, bookingError: null };

case MARK_BOOKING_COMPLETED_SUCCESS:
  return {
    ...state,
    bookingLoading: false,
    // update status locally in myBookings & lenderBookings
    myBookings: state.myBookings.map((b) =>
      b.id === action.payload.bookingId ? { ...b, status: "COMPLETED" } : b
    ),
    lenderBookings: state.lenderBookings.map((b) =>
      b.id === action.payload.bookingId ? { ...b, status: "COMPLETED" } : b
    ),
  };

case MARK_BOOKING_COMPLETED_FAILURE:
  return { ...state, bookingLoading: false, bookingError: action.payload };

      
  }

};



export default authReducer;
