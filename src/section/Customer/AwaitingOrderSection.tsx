"use client";
import {useState, useEffect} from "react";
import {orderColumns, Order} from '@/components/Table/Columns';
import TableWithPagi from '@/components/Table/TableWithPagi';
import {getCustomerStatusedOrders} from "@/apis/orderApi/orderApi";
import {getUserID} from "@/utils/tokenUtils";

export const AwaitingOrderSection = () => {
    const [filteredData, setFilteredData] = useState<Order[]>([]);


    useEffect(() => {
        const getData = async () => {
            setFilteredData(await getCustomerStatusedOrders(getUserID(), "Placed"));
        }
        getData()
    }, []);

    const handleEdit = (row: Order) => {
        console.log(row);
    }

    return (
        <>
            <div className="flex justify-between mb-3 mt-6">
                <h5 className="flex items-center text-lg font-semibold font-inter">Awaiting Orders Details</h5>
            </div>
            <div className="w-full">

                <TableWithPagi<Order>
                    columns={orderColumns}
                    data={filteredData}
                    itemsPerPage={15}
                    className='custom-table-class '
                    getRowId={(row) => row.orderId}
                    handleEdit={handleEdit}

                />

            </div>

        </>
    )
}
