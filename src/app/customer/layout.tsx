"use client";
import { AppSidebar } from "@/components/NavBar/AppSidebar";
import { Clock9, Heart, User, Gift, Truck } from "lucide-react";
import TopNavbar from "@/components/TopNavbar/TopNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {


    // Account items with dynamic userID
    const acitems = [
        {
            title: "My Profile",
            url: '/customer/profile',
            icon: User,
        },
        {
            title: "Watch List",
            url: "/customer/wishlist",
            icon: Heart,
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
        <div className="flex flex-col min-h-screen">
            <div className="flex-shrink-0 z-50">
                <TopNavbar />
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="flex-shrink-0">
                    <AppSidebar accountItems={acitems} orderItems={oritems} showOrders />
                </div>

                <main className="flex-1 p-6 overflow-y-auto mt-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
