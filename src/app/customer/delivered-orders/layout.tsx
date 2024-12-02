import { AppSidebar } from "@/components/NavBar/AppSidebar";
import { Clock9,Heart, Inbox, User,Gift,Truck,ShieldX } from "lucide-react";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

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



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="flex-shrink-0 z-50">
                <TopNavbar />
            </div>

            <div className="flex flex-1 overflow-hidden">

                <div className="flex-shrink-0">
                    <AppSidebar accountItems={acitems} orderItems ={oritems} />
                </div>

                <main className="flex-1 p-6 overflow-y-auto mt-20">
                    {children}
                </main>
            </div>

        </div>
    );
}