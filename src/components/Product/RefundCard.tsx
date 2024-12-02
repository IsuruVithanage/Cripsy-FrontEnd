"use client";
import React from 'react'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-separator'
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { Icon } from 'lucide-react';


export interface RefundCardProps {
    productName: string;
    orderId: string;
    price: number;
    reason: string;
    orderDate: string;
    deliveredDate: string;
    customerName: string;
}
const RefundCard: React.FC<RefundCardProps> = ({
    productName,
    orderId,
    price,
    reason,
    orderDate,
    deliveredDate,
    customerName,
}) => {
    function acsseptClick(): void {
        throw new Error('Function not implemented.');
    }

  return (
    
    <div className='flex items-start gap-3'>
        {/* Image */}
        <div className='flex-shrink-0 p-0 rounded-lg h-full w-1/6 '>
            <Image src="/images/Refund.png" alt="Refund" width={100} height={100} />
        </div>

        
        {/* Action */}
        <div className=' flex-shrink-0  mt-4 pl-8  py-3 '>
            
            <div className='shadow-xl flex shadow-gray-500 rounded-3xl w-fit  '>
            <FaRegCircleCheck onClick={acsseptClick} className='text-green-600 rounded-full hover:text-green-500 text-3xl'/>
            </div>
            
            
            <Separator orientation="vertical" className='w-1 h-5 bg-opacity-15 bg-slate-700 rounded-full flex'/>

            <div className='shadow-xl shadow-gray-500 rounded-3xl w-fit flex '>      
            <RxCrossCircled className='text-carnation-550 rounded-full hover:text-carnation-600 text-3xl '/>
            </div>

        </div>

        {/* Product Details */}
        <div className='flex-shrink-0'>
            <div className='flex-1'>
                <h2 className='text-3xl font-bold'>{productName}</h2>
                <div>
                <p>Order ID : </p> <span className='text-carnation-400'>{orderId}</span>
                <p className='text-xl'>Price : </p> <span className='text-carnation-400 text-xl'>{price}</span>
                </div>

                <div>
                <p>Reason: </p>
                <p>{reason}</p>
                </div>

                <div>
                <p>Order Date : </p> <span className='text-carnation-400'>{orderDate}</span>
                <p>Delivered Date: </p> <span className='text-carnation-400'>{deliveredDate}</span>
                <p>Customer Name : </p> <span className='text-carnation-400'>{customerName}</span>
                </div>

            </div>
        </div>





    </div>
  )
}

export default RefundCard;
