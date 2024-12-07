import axios from "axios";
import {showToast} from "@/components/Messages/showMessage";
import {fetchCustomers} from "@/apis/customerAPIs/customerAPI";
import {getDeliveryPersonDetails} from "@/apis/Delivery/DeliveryApi";

// Axios instance with base URL
const api = axios.create({
    baseURL: "http://localhost:8083",
});

// Place order
export const placeOrder = async (userId: number, oderDetails: []) => {
    try {
        await api.post(
            '/api/orders/createOrder',
            { customerID: userId, items: oderDetails }
        );
    } catch (error) {
        console.log("Error placing order:", error);
        showToast({type: "error", message: "Placing order failed!"});
    }
}

const replaceIdsWithNames = async (orders: any[]) => {
    const customers = await fetchCustomers(); // Assuming this returns an array of customers
    const delivery = await getDeliveryPersonDetails();
    return orders.map((order: any) => {
        // Replace customerId with customer name
        const customer = customers.find((customer: { id: number }) => customer.id === order.customerID);
        if (customer) {
            order.customerID = customer.userName; // Replace customerId with customer name
        }

        // Replace deliveryPersonId with delivery person's name
        const deliveryPerson = delivery.find((person: {
            personId: number
        }) => person.personId === order.deliveryPersonId);
        if (deliveryPerson) {
            order.deliveryPersonId = deliveryPerson.name; // Replace deliveryPersonId with delivery person's name
        }

        return order;
    });
};



// Get all orders
export const getAllOrders = async () => {

    try {
        const response = await api.get("/api/orders/getAllOrders");
        const orders = response.data;
        return replaceIdsWithNames(orders)

    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};


// Get order by ID
export const getOrderById = async (orderId: number) => {
    try {
        const response = await api.get(`/api/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        showToast({ type: "error", message: "Order not found!" });
        throw error;
    }
};


export const getOrderByStatus = async (status: string) => {
    try {
        const response = await api.get(`/api/orders/status/${status}`);
        return replaceIdsWithNames(response.data);
    } catch (error) {
        console.error("Error fetching order details:", error);
        showToast({ type: "error", message: "Order not found!" });
        throw error;
    }
};
// Get orders for a specific customer
export const getCustomerOrders = async (customerId: number) => {
    try {
        const response = await api.get(`/api/orders/getAllByCustomer/${customerId}`);
        return replaceIdsWithNames(response.data);;
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        showToast({ type: "error", message: "Failed to fetch customer orders!" });
        throw error;
    }
};

export const getByDeliverIdOrders = async (deliveryId: number) => {
    try {
        const response = await api.get(`/api/orders/getAllByDeliveryPersonId/${deliveryId}`);
        const filteredOrders = response.data.filter((order: { orderStatus: string }) => order.orderStatus !== 'Delivered');
        return replaceIdsWithNames(filteredOrders);

    } catch (error) {
        console.error("Error fetching customer orders:", error);
        showToast({ type: "error", message: "Failed to fetch customer orders!" });
        throw error;
    }
};


export const getCustomerStatusedOrders = async (customerId: number, status: string) => {
    try {
        const response = await getCustomerOrders(customerId);
        return response.filter((order: { orderStatus: string; }) => order.orderStatus === status);
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        showToast({ type: "error", message: "Failed to fetch customer orders!" });
        throw error;
    }
};

export const updateOrderStatus = async (orderId: number | undefined, newStatus: string) => {
    try {
        const response = await api.put(`/api/orders/updateStatus/${orderId}/${newStatus}`);
        if (response.status === 200) {
            console.log("Order status updated successfully:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        showToast({ type: "error", message: "Failed to update order status!" });
        throw error;
    }
};

// Delete an order
export const deleteOrder = async (orderId: number) => {
    try {
        const response = await api.delete(`/api/order/${orderId}`);
        if (response.status === 200) {
            console.log("Order deleted successfully");
            return response.data;
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        showToast({ type: "error", message: "Failed to delete the order!" });
        throw error;
    }
};
