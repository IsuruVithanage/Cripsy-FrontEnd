"use client";
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";



// Interfaces
export interface Branch {
    branchId: string;
    branchName: string;
    address: string;
    email: string;
    contactNo: string;
}

export interface Product {
    productId: string;
    productName: string;
    qty: number;
    price: number;
}

// Admin Interface
export interface Admin {
    adminId: string;
    adminName: string;
    email: string;
    contactNo: string;
}

// order interface
export interface Order {
    orderId:string;
    fullName: string;
    district: string;
    address: string;
    postalCode: string;
    contactNo: string;
}

// Refund interface
export interface Refund {
    orderId: string;
    customerName: string;
    refundItemQty: number;
    refundAmount: number;
}

// Column Type Definition
type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (
        value: T[keyof T] | undefined,
        row: T,
        handlers?: Record<string, (row: T) => void>
    ) => React.ReactNode;
};

// Branch Columns
export const branchColumns: Column<Branch>[] = [
    { header: "Branch ID", accessor: "branchId" },
    { header: "Branch Name", accessor: "branchName" },
    { header: "Email", accessor: "email" },
    { header: "Contact No", accessor: "contactNo" },
    {
        header: "Action",
        accessor: "action" as keyof Branch,
        render: (_value, row, handlers) => (
            <div className="flex space-x-4">
                <FaTrash
                    className="text-gray-400 hover:text-red-700 cursor-pointer"
                    onClick={() => handlers?.delete(row)}
                    aria-label="Delete Branch"
                />
            </div>
        ),
    },
];

// Product Columns
export const productColumns: Column<Product>[] = [
    { header: "Product ID", accessor: "productId" },
    { header: "Product Name", accessor: "productName" },
    { header: "Quantity", accessor: "qty" },
    { header: "Price", accessor: "price" },
    {
        header: "Action",
        accessor: "action" as keyof Product,
        render: (_value, row, handlers) => (
            <div className="flex space-x-4">
                <FaTrash
                    className="text-gray-400 hover:text-red-700 cursor-pointer"
                    onClick={() => handlers?.delete(row)}
                    aria-label="Delete Product"
                />
            </div>
        ),
    },
];

// Admin Columns
export const adminColumns: Column<Admin>[] = [
    { header: "Admin ID", accessor: "adminId" },
    { header: "Admin Name", accessor: "adminName" },
    { header: "Email", accessor: "email" },
    { header: "Contact No", accessor: "contactNo" },
    {
        header: "Action",
        accessor: "action" as keyof Admin,
        render: (_value, row, handlers) => (
            <div className="flex space-x-4">
                <FaTrash
                    className="text-gray-400 hover:text-red-700 cursor-pointer"
                    onClick={() => handlers?.delete(row)}
                    aria-label="Delete Admin"
                />
            </div>
        ),
    },
];


//order details table
export const orderColumns: Column<Order>[] = [
    { header: "Full Name", accessor: "fullName" },
    { header: "District", accessor: "district" },
    { header: "Postal Code", accessor: "postalCode" },
    { header: "Contact No", accessor: "contactNo" },
    {
        header: "Action",
        accessor: "action" as keyof Order,
        render: (_value, row, handlers) => (
            <div className="flex space-x-4">
                <FaRegEdit
                    className="text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => handlers?.edit(row)}
                    aria-label="Edit Order"
                />
            </div>
        ),
    },
];

//Refund Details Table
export const refundColumns: Column<Refund>[] = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Refund Item Qty", accessor: "refundItemQty" },
    { header: "Refund Amount", accessor: "refundAmount" },
    {
        header: "Action",
        accessor: "action" as keyof Refund,
        render: (_value, row, handlers) => (
            <div className="flex space-x-4">
                <FaRegEdit
                    className="text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => handlers?.edit(row)}
                    aria-label="Action Refund"
                />
            </div>
        ),
    }
];