"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainImageCarousel from "@/components/Carosel/MainImageCarousel";
import ProductCard from "@/components/Product/ProductCard";
import { getProducts } from "@/apis/productApi/productApi";

type Product = {
  productId: number;
  name: string;
  price: number;
  description: string;
  ratingCount: number;
  avgRatings: number;
  imageUrl: string;
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleNavigation = () => router.push("/product/allProducts");

  return (
    <div>
      {/* Carousel Section */}
      <div className="max-h-fit">
        <MainImageCarousel />
      </div>

      {/* Products Section */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <h2 className="text-2xl font-bold text-gray-700 mx-4 whitespace-nowrap">
              Best Choice
            </h2>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button
            onClick={handleNavigation}
            className="text-carnation-500 text-sm font-medium ml-4 whitespace-nowrap hover:font-bold"
          >
            View All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
