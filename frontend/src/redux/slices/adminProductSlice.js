import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEN_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//Async thunk to fetch admin products
export const fetchAdminProucts = createAsyncThunk("adminProducts/fetchProducts", async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
            Authorization: USER_TOKEN,
        },
    });
    return response.data;
}
);

//Async function to create a new Product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData) => {
    const response = await axios.post(`${API_URL}/api/admin/products`, productData,
        {
            headers: {
                Authorization: USER_TOKEN,
            },
        });
    return response.data;
})

//Async thunk to update an existing product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async (id, productData) => {
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productData,
        {
            headers: {
                Authorization: USER_TOKEN,
            },
        });
    return response.data;
})

//Async thunk to delete a product
export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (id) => {
    const response = await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: USER_TOKEN }
    })
    return id;
})

//Create Slice
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProucts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProucts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProucts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            //Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            //Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            });
    },
});

export default adminProductSlice.reducer;