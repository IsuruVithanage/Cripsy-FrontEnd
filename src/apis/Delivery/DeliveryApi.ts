import axios from "axios";
// Axios instance with base URL
const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8087"
});

//Get Delivery Person  Details
export const getDeliveryPersonDetails = async () => {
    try {
        const response = await api.get(`/api/delivery/getAll`);
        return response.data;
    } catch (error) {
        console.log("Error fetching customer Details:", error);
        return [];
    }
}

//Get Delervery Person Details by ID
export const getDeliveryPersonDetailsById = async (id: any) => {
    try {
        const response = await api.get(`/api/delivery/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching customer Details:", error);
        return [];
    }
}

//Add Delivery Person
export const addDeliveryPerson = async (data: any) => {
    try {
        const response = await api.post(`/api/delivery`, data);
        return response.data;
    } catch (error) {
        console.log("Error fetching customer Details:", error);
        return [];
    }
}

//Update Delivery Person
export const updateDeliveryPerson = async (id: any, data: any) => {
    try {
        const response = await api.put(`/api/delivery/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Error fetching customer Details:", error);
        return [];
    }
}

//Delete Delivery Person
export const deleteDeliveryPerson = async (id: any) => {
    try {
        const response = await api.delete(`/api/delivery/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching customer Details:", error);
        return
    }
}

//Update Delivery Person by Status
export const updateDeliveryPersonByStatus = async (id: any, availability: boolean) => {
    try {
        const response = await api.put(`/api/delivery/${id}/availability?availability=${availability}`);
        return response.data;
    } catch (error) {
        console.log("Error edit the delivery person availability", error);
        return [];
    }
}


