import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopNavbar />
            <div className="mt-32 md:mt-20 bg-gray-50">{children}</div>
            <Footer />
        </>
    );
}