'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const { push } = useRouter()
    const [searchQuery, setQuery] = useState('')

    const search = (e : any) => {
        push(`/search?${searchQuery}`)
    }

    return (
        <form action={(e) => search(e)} className='w-full max-w-md mx-auto mb-4'>
            <input type="text"
            id="password" 
            name="searchQuery"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"            placeholder="Search Games" 
            onChange={(e) => setQuery(e.target.value)}
            />
        </form>
        
    );
}