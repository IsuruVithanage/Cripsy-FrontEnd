"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {FiShoppingCart, FiUser, FiMessageSquare, FiMenu, FiLogOut} from "react-icons/fi";
import SearchBar from "@/components/SearchBar/SearchBar";
import {getProducts} from "@/apis/productApi/productApi";
import {useRouter} from "next/navigation";
import {parseJwt} from "@/utils/tokenUtils";

interface Suggestion {
    productId: number;
    name: string;
}

const TopNavbar: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleSuggestionSelect = (suggestion: Suggestion) => {
        setSearchQuery(suggestion.name);
        router.push(`/product/${suggestion.productId}`);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const products = await getProducts();
                setSuggestions(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full px-6 py-2 bg-white shadow-md z-50">
            <div className="flex items-center justify-between md:justify-start">

                {/* Logo Section */}
                <LogoSection/>

                {/* Desktop and Tablet Navigation Links */}
                <div className="hidden md:flex space-x-6 ml-6">
                    <NavigationLinks/>
                </div>

                {/* Centered Search Bar for Desktop and Tablet */}
                <div className="hidden md:flex flex-1 justify-center">
                    <SearchBarSection
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSuggestionSelect={handleSuggestionSelect}
                        suggestions={suggestions.filter((s) =>
                            s.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                    />
                </div>

                {/* Icons Section for All Screens */}
                <IconsSection/>

                {/* Mobile Hamburger Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <FiMenu className="text-2xl text-black"/>
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar and Links */}
            <div className="md:hidden mt-2 px-4">
                <SearchBarSection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSuggestionSelect={handleSuggestionSelect}
                    suggestions={suggestions.filter((s) =>
                        s.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                />
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
                    <NavigationLinks/>
                </div>
            )}
        </nav>
    );
};

const LogoSection: React.FC = () => (
    <div className="flex items-center">
        <Link href="/" className="flex items-center text-2xl font-bold text-black">
            <Image
                src="/CripsyLogo.png"
                alt="Cripsy Logo"
                width={64}
                height={60}
                priority
            />
        </Link>
    </div>
);

const NavigationLinks: React.FC = () => (
    <div className="flex flex-row space-x-6 font-normal">
        <Link href="/categories" className="text-black hover:text-carnation-400">
            Categories
        </Link>
        <Link href="/deals" className="text-black hover:text-carnation-400">
            Deals
        </Link>
        <Link href="/whats-new" className="text-black hover:text-carnation-400">
            {"What's New"}
        </Link>
    </div>
);

interface SearchBarSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSuggestionSelect: (suggestion: Suggestion) => void;
    suggestions: Suggestion[];
}

const SearchBarSection: React.FC<SearchBarSectionProps> = ({
                                                               searchQuery,
                                                               setSearchQuery,
                                                               handleSuggestionSelect,
                                                               suggestions,
                                                           }) => (
    <div className="w-full max-w-xs md:max-w-md">
        <SearchBar
            id="mainSearchBar"
            placeholder="Search in Cripsy"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suggestions={suggestions.map((s) => s.name)}
            onSuggestionSelect={(name) => {
                const selected = suggestions.find((s) => s.name === name);
                if (selected) {
                    handleSuggestionSelect(selected);
                }
            }}
        />
    </div>
);


const IconsSection: React.FC = () => {
    const router = useRouter();

    const handleUserClick = () => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            // Navigate to customer profile if token exists
            router.push(`/customer/profile`);
        } else {
            // Navigate to login if token doesn't exist
            router.push('/auth/login');
        }
    };

    function handlelogOut() {
        localStorage.clear();
        router.push('/auth/login');

    }

    return (
        <div className="flex items-center space-x-6">
            <Link href="/cart">
                <FiShoppingCart className="text-xl text-black hover:text-carnation-400" />
            </Link>
            <button onClick={handleUserClick} className="focus:outline-none">
                <FiUser className="text-xl text-black hover:text-carnation-400" />
            </button>
            <Link href="/chat/customerChat">
                <FiMessageSquare className="text-xl text-black hover:text-carnation-400" />
            </Link>
            <button onClick={handlelogOut} className="focus:outline-none">
                <FiLogOut className="text-xl text-black hover:text-carnation-400"/>
            </button>
        </div>
    );
};

export default TopNavbar;
