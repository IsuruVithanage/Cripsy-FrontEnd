import React from 'react';
import BranchTable from '@/components/TestBranch/BranchTable';
import TextEditor from '@/components/TextEditor/TextEditor';

import WatchListProducts from '@/section/WatchListPageSection/WatchListProducts';
import { RefundDetailsTable } from '@/components/Refund/RefundDetailsTable';
import RefundItemsSection from '@/section/RefundRequestSection/RefundItemsSection';

const Page = () => {


  
  return (
    <div>
      // test page
      <h2 className="text-4xl text-red-600" >Test Page</h2>
      <BranchTable />
      {/* <RefundDetailsTable /> */}
      {/* <TextEditor className="w-4/6 mx-auto" /> */}

      {/* <WatchListProducts/> */}

      {/* <RefundItemsSection/> */}


     
    </div>
  );
};

export default Page;
