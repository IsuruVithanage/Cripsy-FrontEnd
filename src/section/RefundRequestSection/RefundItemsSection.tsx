"use client";
import RefundCard from '@/components/Product/RefundCard';
import React from 'react'

const RefundItemsSection = () => {
  return (
    <div>
        <RefundCard
         productName={'POLO T-Shirt'} 
         orderId={'p002'} 
         price={23000} 
         reason={'qkddnffoifnnvk nvc'} 
         orderDate={'02/03/2021'} 
         deliveredDate={'02/03/2021'} 
         customerName={'Isuru Vithanage'}        />
    </div>
  )
}

export default RefundItemsSection