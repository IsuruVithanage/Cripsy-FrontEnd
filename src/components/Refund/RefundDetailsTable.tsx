"use client";
import { useState, useEffect } from "react";
import { Refund, refundColumns } from '@/components/Table/Columns';
import TableWithPagi from '../Table/TableWithPagi';
import jsonData from "@/data/data.json";

export const RefundDetailsTable = () => {
    const [filteredData, setFilteredData] = useState<Refund[]>([]);

    useEffect(() => {
        setFilteredData(jsonData?.refund || []);
    }, []);

    const handleEdit = (row: Refund) => {
        console.log(row);
    }

  return (
    <>
    <div className='flex justify-between mb-2'>
        <h3 className='flex items-center font-semibold font-inter'>Refund Details</h3>  

    </div>
    <div className="w-2/3">

    <TableWithPagi<Refund>
        columns={refundColumns}
        data={filteredData}
        itemsPerPage={5}
        className='custom-table-class '
        getRowId={(row) => row.orderId}
        handleEdit={handleEdit}
        
    
        />

</div>
    
    </>
  )
}
