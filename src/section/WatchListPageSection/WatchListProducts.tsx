'use client';
import React, {useEffect, useState} from 'react'
import WatchlistCard from '@/components/Product/WatchlistCard';
import {getWatchlistItems} from "@/apis/watchlistApi/watchlistApi";
import {getUserID} from "@/utils/tokenUtils";

interface ProductItemType {
    productId: number;
    imageUrl: string;
    price: number;
    name: string;
    description: string;
    ratingCount: number

}

const WatchListProducts = () => {
    const [products, setProducts] = useState<ProductItemType[]>([]);
    const userId = getUserID();



    useEffect(() => {
        const getData = async () => {
            const productList = await getWatchlistItems(userId);
            setProducts(productList)
            console.log(productList)
        }
        getData();


    }, []);


    return (
        <div>
            {products.map((productData) => (
                <div className="px-10 py-5">
                    <WatchlistCard
                        key={productData.productId}
                        imageSrc={productData.imageUrl}
                        title={productData.name}
                        description={productData.description}
                        availableItems={productData.availableItems}
                        rating={productData.ratingCount}
                        reviews={productData.reviews}
                        price={productData.price}

                    />
                </div>
            ))}
        </div>
    )
}

export default WatchListProducts