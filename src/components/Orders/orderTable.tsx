"use client";
import { useEffect, useState } from "react";
import { orderColumns, Order } from "../Table/Columns";
import TableWithPagi from "../Table/TableWithPagi";
import OrderStatusPopup from "../Orders/orderStatus";
import { Switch } from "@/components/Switch/Switch";
import {getByDeliverIdOrders} from "@/apis/orderApi/orderApi";
import {getUserID} from "@/utils/tokenUtils";
import {getDeliveryPersonDetailsById, updateDeliveryPersonByStatus} from "@/apis/Delivery/DeliveryApi";
import {showToast} from "@/components/Messages/showMessage"; // Import the Switch component

const OrderTable = () => {
    const [filteredData, setFilteredData] = useState<Order[]>([]);
    const [isOrderStatusPopupOpen, setIsOrderStatusPopupOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [isChecked, setIsChecked] = useState(false);


    const handleEdit = (order: Order) => {
        setSelectedOrder(order); // Store the selected order
        setIsOrderStatusPopupOpen(true); // Open the popup
    };

    useEffect(() => {
        const getData = async () => {
            setFilteredData(await getByDeliverIdOrders(getUserID()));
            setIsChecked((await getDeliveryPersonDetailsById(getUserID())).availability)
        }
        getData()
    }, []);

    function handleAvailability() {
        updateDeliveryPersonByStatus(getUserID(),!isChecked)
        setIsChecked(!isChecked)
        console.log(isChecked)
        showToast({
            type: 'success',
            message: 'Product added successfully!'
        })
    }

    return (
        <div className="shadow-xl rounded-lg m-8 px-4 py-9">
            <div className="flex justify-between mb-4">
                <h4 className="flex text-xl items-center font-semibold font-inter">
                    Your Orders
                </h4>

                <div>
                    <p>Anvalabilty : <Switch
                     className="data-[state=checked]:bg-carnation-400 data-[state=unchecked]:bg-slate-200"
                     checked={isChecked}
                     onCheckedChange={handleAvailability}/></p>
                </div>
            </div>

            <TableWithPagi<Order>
                columns={orderColumns}
                data={filteredData}
                itemsPerPage={15}
                className="custom-table-class"
                getRowId={(row) => row.orderId}
                handleEdit={handleEdit} // Pass the edit handler
            />

            {/* Popup for Order Status */}
            {isOrderStatusPopupOpen && (
                <OrderStatusPopup
                    isDialogOpen={isOrderStatusPopupOpen}
                    setIsDialogOpen={setIsOrderStatusPopupOpen}
                    selectedOrder={selectedOrder}
                     // Pass the selected order
                />
            )}
        </div>
    );
};

export default OrderTable;
