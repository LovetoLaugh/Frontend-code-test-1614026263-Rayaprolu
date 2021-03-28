const initialState = {
  apartmentFilter: {
    bedrooms: 0, // min
    bathrooms: 0, // min
    price: 1000, // max
    limit: 5
  },
  apartmentsList: [],
  loading: false,
  error: null
};

export default initialState;
