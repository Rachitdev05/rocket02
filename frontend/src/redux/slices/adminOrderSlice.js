
import { __DO_NOT_USE__ActionTypes, createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch all orders (Admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
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
    }
)

//Update Order Deloivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderstatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
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
    }
)

//Delte an order 
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

//Create Slice
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders :0,
        totalSales : 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers : (builder) => {
        builder
        // Fetch all Orders
        .addCase(fetchAllOrders.pending , (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled , (state , action) => {
            state.loading = false,
            state.orders = action.payload;
            state.totalOrders = action.payload.length; 
            //calculate Total sales
            const totalSales = action.payload.reduce((acc , order) => {
                return acc + order.totalPrice;
            } , 0);
            state.totalSales = totalSales;
        })
        .addCase(fetchAllOrders.rejected , (state , action) => {
            state.loading = false,
            state.error = null;
        })
        //Update Order Status
        .addCase(updateOrderStatus.fulfilled , (state , action) => {
            const updatedOrder = action.payload;
            const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id);
            if(orderIndex !== -1) {
                state.orders[orderIndex] = updatedOrder;
            }
        })
        //Delete an Order
        .addCase(deleteOrder.fulfilled , (state , action) => {
            state.orders = state.orders.filter((order) => order._id !== action.payload);
        });
    }
})

export default adminOrderSlice.reducer;