"use client"
import React, { use, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Overview from "@/section/productPageSections/Overview";
import Description from "@/section/productPageSections/Description";
import RatingAndReviews from "@/section/productPageSections/RatingAndReviews";
import { getProductItemDetails } from '@/apis/productApi/productApi';
import {getUserID, getUserName} from "@/utils/tokenUtils";


interface ProductItemType {
    productId: number,
    name: string,
    description: string,
    discount: number,
    price: number,
    stock: number,
    imageUrls: string[],
    avgRatings: number,
    ratingCount: number,
    reviewCount: number,
    isUserRated: boolean,
    isWatchlistAdded: boolean,
    ratingStats: {
        rating5: number,
        rating4: number,
        rating3: number,
        rating2: number,
        rating1: number,
    },
    initialReviews: [],
    relatedItems: []
}

interface ProductItemProps {
    params: Promise<{ productId: number }>
}


const ProductItem: React.FC<ProductItemProps> = ({params}) => {
    const [productItem, setProductItem] = React.useState<Partial<ProductItemType>>({});
    const productId = Number(use(params).productId);


    const userId = getUserID();
    const userName = getUserName();


    const {
        name = "",
        description = "",
        discount = 0,
        price = 0,
        stock = 0,
        imageUrls = [],
        avgRatings = 0,
        ratingCount = 0,
        reviewCount = 0,
        ratingStats = { rating5: 0, rating4: 0, rating3: 0, rating2: 0, rating1: 0 },
        isUserRated = true,
        isWatchlistAdded = false,
        initialReviews = []
    } = productItem || {};

    const productData = {
        productId,
        userId,
        name,
        price,
        discount,
        stock,
        imageUrls, 
        isWatchlistAdded, 
        avgRatings, 
        ratingCount, 
        reviewCount
    };

    const ratingAndReviewsData = {
        productId, 
        userId, 
        userName, 
        avgRatings, 
        ratingCount, 
        reviewCount, 
        ratingStats, 
        isUserRated, 
        reviews: initialReviews
    };


    useEffect(() => {
        const fetchProductDetails = async () => {
            const product = await getProductItemDetails( productId, userId );
            setProductItem(product);
        };

        if (isNaN(productId)) {
            redirect("/product");
        } else {
            fetchProductDetails();
        }

    }, [productId, userId]);


    return (
        <div>
            <Overview {...productData} />
            <Description description={description} />
            <RatingAndReviews {...ratingAndReviewsData} />
            {/*<RelatedItems relatedItems={item.relatedItems} />*/}
        </div>
    );
};


export default ProductItem;
