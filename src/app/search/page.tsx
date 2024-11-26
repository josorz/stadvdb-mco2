'use client'

import SearchBar from '@/components/searchbar'
import Table from '@/components/table';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const searchParamsArray = Array.from(searchParams.entries());
  const [tableData, setTableData] = useState({})

  useEffect( () => {
    async function getTableData() {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/${searchParamsArray}`)
      let data = await res.json()
      setTableData(data)
    }
    getTableData()
  }, [])

  return (
    <div className="">
      <h1>Search: {searchParamsArray}</h1>
      <div className="mb-6">
        <SearchBar />
        {Array.isArray(tableData) && tableData.length > 0 && <Table tableData={tableData}/> }
      </div> 
    </div>
  )
}