import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8084"
});

export interface getTotalRevenue{
    lastMonthTotalPrice : number;
    percentageDifference : number;
}

//Get Total Revenue with Moth and Year
export const getTotalRevenue = async () => {
    try {
        const response = await api.get(`/api/admin/getMonthlySumTotal`);
        return response.data;
    } catch (error) {
        console.log("Error fetching revenue:", error);
        return [];
    }
}

interface getTotalQuantity{
    thisMonthQuantity : number;
    percentageDifference : number;
}

//Get Total Quatity Month and Year
export const getTotalQuantity = async () => {
    try {
        const response = await api.get(`/api/admin/getMonthlySumQty`);
        return response.data;
    } catch (error) {
        console.log("Error fetching quantity:", error);
        return [];
    }
}

interface getTotalQuantity{
    thisMonthOrders : number;
    percentageDifference : number;
}

//Get  Orders Summery
export const getOrdersSummary = async () => {
    try {
        const response = await api.get(`/api/admin/orderSummery`);
        return response.data;
    } catch (error) {
        console.log("Error fetching orders summary:", error);
        return [];
    }
}

//Get Total Customer
export const getTotalCustomer = async () => {
    try {
        const response = await api.get(`/api/admin/totalCustomer`);
        return response.data;
    } catch (error) {
        console.log("Error fetching total customer:", error);
        return [];
    }
}


//Get Monthly Total Price
export const getMonthlyTotalPrice = async () => {
    try {
        const response = await api.get(`/api/admin/monthly-totals`);
        return response.data;
    } catch (error) {
        console.log("Error fetching total price:", error);
        return [];
    }
}

//Get Best Selling Product
export const getBestSellingProduct = async () => {
    try {
        const response = await api.get(`/api/admin/best-selling`);
        return response.data;
    } catch (error) {
        console.log("Error fetching best selling product:", error);
        return [];
    }
}