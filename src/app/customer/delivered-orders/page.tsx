import { AppSidebar } from "@/components/NavBar/AppSidebar";
import { Clock9,Heart, Inbox, User,Gift,Truck,ShieldX } from "lucide-react";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import { DeliveredOrdersSection } from "@/section/DeliveredOrdersSection/DeliveredOrdersSection";
import Footer from "@/components/Footer/Footer";

const acitems = [
    {
        title: "My Profile",
        url: "#",
        icon: User,
    },
    {
        title: "Address Book",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Watch List",
        url: "#",
        icon: Heart,
    },
];

const oritems =[
    {
        title: "Awaiting",
        url: "#",
       icon: Clock9,
    },
    {
        title: "Delivered",
        url: "#",
       icon: Gift,
    },
    {
        title: "Return",
        url: "#",
        icon: Truck,
    },

    {
        title: "Cancellation",
        url: "#",
        icon: ShieldX,
    },
];


export default function page({ children }: { children: React.ReactNode }) {
    return (
    <div>
        <DeliveredOrdersSection />
    </div>   
    );
}