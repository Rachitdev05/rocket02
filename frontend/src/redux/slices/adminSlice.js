import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all users (Admin Only)
export const fetchUsers = createAsyncThunk("/admin/fetchUsers" , async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`},
        }
    );
    response.data;
})

//Add  the create user action
export const addUser = createAsyncThunk("/admin/addUser" , async (userData , {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
         );
         return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Update USer Info
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id , name , email , role}) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {name, email, role},
        {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    response.data;
})

//Delete User
export const deleteUser = createAsyncThunk("admin/deleteUser" , async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return id;
})

//Create Slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //Fetch All users
        .addCase(fetchUsers.pending , (state) => {
            state.loading = true
        })
        .addCase(fetchUsers.fulfilled , (state , action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state , action) => {
            state.loading = false;
            state.error = action.error;
        })
        //update the user
        .addCase(updateUser.fulfilled, (state , action) => {
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
            if( userIndex !== -1) {
                state.users[userIndex] = updateUser;
            }
        })
        //delete USer
        .addCase(deleteUser.fulfilled , (state , action) => {
            state.users = state.users.filter((user) => user._id !== action.payload);
        })
        //ADD A NEW USER
        .addCase(addUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled , (state , action) => {
            state.loading = false;
            state.users.push(action.payload.user); // Add new User to the state
        })
        .addCase(addUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        
    },
});

export default adminSlice.reducer;