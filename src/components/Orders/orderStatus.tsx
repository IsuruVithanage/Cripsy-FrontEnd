import React, {useState} from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import Popup from "../Popup/Popup";
import { Order } from "../Table/Columns";
import {updateOrderStatus} from "@/apis/orderApi/orderApi";

interface OrderStatusPopupProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    selectedOrder: Order | null; // Add type for the selected order
}

const OrderStatusPopup: React.FC<OrderStatusPopupProps> = ({
    isDialogOpen,
    setIsDialogOpen,
    selectedOrder,
}) => {
    const options = [
        { label: "Processing", value: "Processing" },
        { label: "Dispatched", value: "Dispatched" },
        { label: "Delivered", value: "Delivered" },
    ];

    const [selectedOption, setSelectedOption] = useState("");
    console.log(selectedOption)
    console.log(selectedOrder)

    const handleSave = () => {
        console.log("Order Status Updated:", selectedOrder);
        updateOrderStatus(selectedOrder?.orderId,selectedOption)
        setIsDialogOpen(false);
    };

    return (
        <Popup
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="Update Order Status"
            description={`Update the status for Order ID: ${
                selectedOrder?.orderId || "Unknown"
            }`}
            onSaveClick={handleSave}
        >
            <div className="flex flex-row space-x-4 mb-4">
                <div className="w-full">
                    <Dropdown
                        options={options}
                        placeholder="Select Order Status"
                        onChange={(value) => setSelectedOption(value)}
                    />
                </div>
            </div>
        </Popup>
    );
};

export default OrderStatusPopup;
