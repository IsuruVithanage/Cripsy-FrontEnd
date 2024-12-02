"use client";
import MainImageCarousel from "@/components/Carosel/MainImageCarousel";
import ProductCard from "@/components/Product/ProductCard";
import Link from "next/link";
import productItemsData from '@/data/productIem.json';

const page=() => {
  return (
    <>
      <MainImageCarousel />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Super Deals Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <h2 className="text-2xl font-bold text-gray-700 mx-4 whitespace-nowrap">
              Super Deals
            </h2>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <Link
            href="/product/allProducts"
            className="text-carnation-500 text-sm font-medium ml-4 whitespace-nowrap"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productItemsData.SuperDeals.slice(0, 8).map((product, index) => (
            <div key={index} className="w-full flex justify-center">
              <div className="w-full max-w-[300px]">
                <ProductCard
                  imageSrc={product.imageSrc}
                  title={product.title}
                  description={product.description}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={product.price}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default page;