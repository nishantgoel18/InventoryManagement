import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
  name: '',
  designation: '',
  email: '',
  mobile_number: '',
  about: '',
  admin: true,
  qualification: '',
  department: {
    id: '',
    name: '',
  },
  marital_status: '',
  nationality: '',
  joining_date: '',
  blood_group: '',
  gender: '',
  casual_leaves: 0,
  sick_leaves: 0,
  floater_leaves: 0,
  leaves: {
    id: '',
    leave_type: '',
    status: '',
    start_date: '',
    end_date: '',
    created_at: '',
  },
  created_at: '',
  date_of_birth: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
