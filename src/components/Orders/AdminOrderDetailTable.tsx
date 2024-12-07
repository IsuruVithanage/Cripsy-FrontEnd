"use client";
import {useState, useEffect} from "react";
import TableWithPagi from "@/components/Table/TableWithPagi";
import {Order, orderColumns} from "@/components/Table/Columns";
import DeleteConfirm from "@/components/DeletePopup/DeleteConfirm";
import {Separator} from "@radix-ui/react-separator";
import {getAllOrders} from "@/apis/orderApi/orderApi";
import OrderPopup from "@/components/Admin/OrderDetailsPopup";
import axios from "axios";

const AdminOrderDetailTable = () => {
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filteredData, setFilteredData] = useState<Order[]>([]);
    const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const fetchedOrders = await getAllOrders();
            console.log(fetchedOrders)
            setFilteredData(fetchedOrders);
        };
        fetchOrderDetails();

    }, []);

    const handleEdit = (order: Order) => {
        if (order) {
            setSelectedOrder(order); // Set the selected order details
            setIsOrderPopupOpen(true); // Open the edit popup
        }
    };

    const handleOrderStatusChange = (newStatus: string) => {
        if (selectedOrder) {
            const updatedOrder = { ...selectedOrder, orderStatus: newStatus };
            setSelectedOrder(updatedOrder);

            // Update the filtered data array with the new status
            setFilteredData((prevData) =>
                prevData.map((order) =>
                    order.orderId === selectedOrder.orderId ? updatedOrder : order
                )
            );

            // Optionally send the status update to the server
            updateOrderStatusOnServer(selectedOrder.orderId, newStatus);
        }
    };

    const updateOrderStatusOnServer = async (orderId: number, newStatus: string) => {
        try {
            await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
            alert("Order status updated successfully!");
        } catch (error) {
            console.error("Failed to update order status:", error);
            alert("Failed to update order status.");
        }
    };


    return (
        <>
            <div className="flex justify-between mb-3 mt-6">
                <h5 className="flex items-center text-lg font-semibold font-inter">Order Details</h5>
            </div>

            <TableWithPagi<Order>
                columns={orderColumns}
                data={filteredData}
                itemsPerPage={20}
                className="custom-table-class"
                getRowId={(row) => row.orderId}
                handleEdit={handleEdit} // Pass the handleEdit method here
            />


            <Separator orientation="vertical" className="mt-4 mb-4 border-2 bg-black"/>

            <Separator
                className="SeparatorRoot h-5"
                decorative
                orientation="vertical"
                style={{margin: "0 15px"}}
            />

            {isOrderPopupOpen && selectedOrder && (
                <OrderPopup
                    isOpen={isOrderPopupOpen}
                    onClose={() => setIsOrderPopupOpen(false)}
                    title={`Order ID: ${selectedOrder.orderId}`}
                    description="Manage the details of the selected order."
                >
                    {/* Order details */}
                    {/* Dropdown Section */}
                    <div className="flex justify-end mt-6"> {/* Flexbox to align right */}
                        <select
                            className="border border-gray-300 rounded px-4 py-2 w-auto"
                            value={selectedOrder.orderStatus}
                            onChange={(e) => handleOrderStatusChange(e.target.value)}
                        >
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                        </select>
                    </div>
                    <div>
                        <h5 className="font-semibold">Order Details</h5>
                        <p>DeliveryPerson: {selectedOrder.deliveryPersonId}</p>
                        <p>Price: {selectedOrder.totalPrice}</p>
                        <p>Purchased Date: {selectedOrder.purchasedDate}</p>
                    </div>

                    <div className="mt-4">
                        <h5 className="font-semibold">Receiver Details</h5>
                        <p>Name: {selectedOrder.customerID}</p>
                        <p>Address: {selectedOrder.address}</p>
                        <p>District: {selectedOrder.district}</p>
                        <p>Contact No: {selectedOrder.contactNo}</p>
                    </div>
                </OrderPopup>
            )}

            {isDeleteConfirmPopupOpen && selectedOrder && (
                <DeleteConfirm
                    element={selectedOrder?.orderId.toString()}
                    onDelete={async () => {
                        setFilteredData((prevData) =>
                            prevData.filter((product) => product.orderId !== selectedOrder.orderId)
                        );
                        setIsDeleteConfirmPopupOpen(false);
                    }}
                    onCancel={() => setIsDeleteConfirmPopupOpen(false)}
                    isVisible={isDeleteConfirmPopupOpen}
                />
            )}
        </>
    );
};

export default AdminOrderDetailTable;
