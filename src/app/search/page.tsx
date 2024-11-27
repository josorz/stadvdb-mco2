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
      setTableData({})
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/${searchParamsArray}`)
      let data = await res.json()
      setTableData(data)
    }
    getTableData()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar />
      </div>

      <section>
        <h2 className="text-xl text-center font-semibold mb-4">Search: {searchParamsArray}</h2>
        {Array.isArray(tableData) && tableData.length > 0 && <Table tableData={tableData}/> }
      </section>
    </main>
    </div>
  )
}