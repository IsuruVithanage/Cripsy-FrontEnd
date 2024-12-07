"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/Product/ProductCard";
import { getProducts } from "@/apis/productApi/productApi";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import { FiFrown } from "react-icons/fi";
type Product = {
    productId: number;
    name: string;
    price: number;
    description: string;
    ratingCount: number;
    avgRatings: number;
    imageUrl: string;
};


type Filters = {
    priceRange: { min: number; max: number };
    ratings: string;
    warranty: string;
};

export default function AllProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        priceRange: { min: 100, max: 2000000 },
        ratings: "low-to-high",
        warranty: "low-to-high",
    });

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    const applyFilters = () => {
        const filtered = products.filter((product) => {
            // Price filter
            const withinPriceRange =
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max;

            // Rating filter
            const rating = parseFloat(product.avgRatings.toString());
            const ratingFilterMatch =
                filters.ratings === "low-to-high" ||
                (filters.ratings === "high-to-low" && rating >= 0) ||
                (filters.ratings.includes("-") &&
                    rating >= parseFloat(filters.ratings.split(" ")[0]) &&
                    rating <= parseFloat(filters.ratings.split(" ")[2]));

            return withinPriceRange && ratingFilterMatch;
        });

        setFilteredProducts(filtered);
    };

    // Reset filters and show all products again
    const clearFilters = () => {
        setFilters({
            priceRange: { min: 0, max: 2000000 },
            ratings: "low-to-high",
            warranty: "low-to-high",
        });
        setFilteredProducts(products);
    };

    return (
        <div className="flex">
            <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
            />
            <div className="flex-1 p-4">
                <h2 className="text-xl font-bold mb-4">Explore Products</h2>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full text-center text-xl font-semibold text-red-500 mt-10 mx-auto">
                            <span className="text-3xl">
                                <FiFrown className="inline-block mr-2 text-4xl" />
                                Sorry! </span>
                             No filtered products found here
                        </div>

                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product.productId} className="w-full flex justify-center">
                                <div className="w-full max-w-[300px]">
                                    <ProductCard
                                        key={product.productId}
                                        productId={product.productId}
                                        imageSrc={product.imageUrl}
                                        title={product.name}
                                        description={product.description}
                                        rating={product.avgRatings}
                                        reviews={product.ratingCount}
                                        price={product.price}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
