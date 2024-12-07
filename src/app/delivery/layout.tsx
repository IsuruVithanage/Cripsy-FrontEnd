import React from "react";
import AdminTopNavbar from "@/components/Admin/SideBars/AdminTopNavbar";
import AdminSidebar from "@/components/Admin/SideBars/AdminSidebar";
import {AppSidebar} from "@/components/NavBar/AppSidebar";
import {Clock9, Gift, Heart, Truck, User} from "lucide-react";

export default function AllProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const acitems = [
        {
            title: "My Profile",
            url: '#',
            icon: User,
        },
        {
            title: "My Order",
            url: "/delivery/order",
            icon: Truck,
        },
    ];

    const oritems = [
        {
            title: "Awaiting",
            url: "/customer/awaiting",
            icon: Clock9,
        },
        {
            title: "Delivered",
            url: "/customer/delivered",
            icon: Gift,
        },
        {
            title: "Return",
            url: "/customer/refund",
            icon: Truck,
        },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Admin Sidebar */}
            <div className="w-52 fixed top-0 left-0 h-ful shadow-md">
                <AppSidebar accountItems={acitems} orderItems={oritems} showOrders={false} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-52 flex flex-col">
                {/* Admin Top Navbar */}
                <AdminTopNavbar />

                {/* Page Content */}
                <main className="flex-1 p-4 overflow-y-auto mt-12 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
