"use client";
import { useState, useEffect } from "react";
import ProductTableWithPagi from "@/components/Table/TableWithPagi";
import { deliveryPersonColumns } from "@/components/Table/Columns";
import CustomButton from "@/components/Button/CustomButton";
import DeleteConfirm from "@/components/DeletePopup/DeleteConfirm";
import { DeliveryPerson } from "@/components/Table/Columns";
import AddDeliveryPerson from "@/components/Admin/AddNewDelieveryPerson";
import {getDeliveryPersonDetails,deleteDeliveryPerson} from "@/apis/Delivery/DeliveryApi"



const DeliveryPersonDetailsTable = () => {
    const [isNewAdminPopupOpen, setIsNewAdminPopupOpen] = useState(false);
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState<DeliveryPerson | null>(null);
    const [filteredData, setFilteredData] = useState<DeliveryPerson[]>([]);

    useEffect(() => {
        const getData = async () => {
        setFilteredData(await getDeliveryPersonDetails());
        } 
        getData();
        console.log("Data:",filteredData);
    }, []);

    
    const handleDelete = (admin: DeliveryPerson) => {
        if (admin) {
            setSelectedDeliveryPerson(admin);
            setIsDeleteConfirmPopupOpen(true);
        }
    };

    // const handleAddAdmin = (newAdmin: DeliveryPerson) => {
    //     setFilteredData((prevData) => [...prevData, newAdmin]);
    // };

    // const handleCancelAddAdmin = () => {
    //     setIsNewAdminPopupOpen(false);
    // };

    // const handleAddNewDeliveryPerson = (newPerson: DeliveryPersonFormData) => {
    //     // Update your delivery person list with the new person
    //     console.log("New Delivery Person:", newPerson);
    // };

    return (
        <>
            <div className="flex justify-between mb-4 mt-6">
                <h5 className="flex  font-semibold font-inter ">
                    Delivery Person Details
                </h5>
                <CustomButton
                    onClick={() => setIsNewAdminPopupOpen(true)}
                    buttonLabel="New "
                    buttonClassName="text"
                />
            </div>

            <ProductTableWithPagi<DeliveryPerson>
                columns={deliveryPersonColumns}
                data={filteredData}
                itemsPerPage={15}
                className="custom-table-class"
                handleDelete={handleDelete}
                getRowId={(row) => row.personId}
                handleEdit={() => { }}
                

            />

            {/* {isNewAdminPopupOpen && (
                <AddDeliveryPersonForm
                // onSubmit={(newAdmin) => {
                //     handleAddAdmin(newAdmin);
                //     setIsNewAdminPopupOpen(false);
                // }}
                // onCancel={handleCancelAddAdmin}
                />
            )} */}

            {/* Order Popup */}
            {isNewAdminPopupOpen && (
                <AddDeliveryPerson
                    isOpen={isNewAdminPopupOpen}
                    onClose={() => setIsNewAdminPopupOpen(false)}
                    //title={`Order ID: ${selectedDeliveryPerson.} - ${selectedDeliveryPerson.productName}`}
                    title={"New Delivery Person"}
                    description=""
                    onSave={() => setIsNewAdminPopupOpen(false)}
                >

                </AddDeliveryPerson>
            )}

            {isDeleteConfirmPopupOpen && selectedDeliveryPerson && (
                <DeleteConfirm
                    element={selectedDeliveryPerson?.name}
                    onDelete={async() => {
                        setFilteredData((prevData) =>
                            prevData.filter((admin) => admin.personId !== selectedDeliveryPerson.personId)
                        );
                        await deleteDeliveryPerson(selectedDeliveryPerson.personId)
                        setIsDeleteConfirmPopupOpen(false);
                    }}
                    onCancel={() => setIsDeleteConfirmPopupOpen(false)}
                    isVisible={isDeleteConfirmPopupOpen}
                />
            )}
        </>
    );
};

export default DeliveryPersonDetailsTable;
