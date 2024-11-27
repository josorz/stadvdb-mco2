'use client'

import { useRouter } from 'next/navigation';
import edit from "@/assets/edit.svg";
import Image from 'next/image';

export default function Table({ tableData }: any) {
  const { push } = useRouter();

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-3 py-2 w-20 text-left">AppID</th>
            <th className="px-3 py-2 w-40 text-left">Name</th>
            <th className="px-3 py-2 w-32 text-left">Release Date</th>
            <th className="px-3 py-2 w-12 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: number) => (
            <tr
              key={item.AppID}
              className={`border-t ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100`}
            >
              <td className="px-2 py-1 text-sm text-gray-800 truncate">{item.AppID}</td>
              <td className="px-2 py-1 text-sm text-gray-800 truncate">{item.Name}</td>
              <td className="px-2 py-1 text-sm text-gray-800">
                {item.Release_date.split('T', 1)[0]}
              </td>
              <td className="px-2 py-1 text-sm">
                <button
                  onClick={() => push(`/edit/${item.AppID}`)}
                  className="flex items-center justify-center text-blue-600 hover:underline"
                >
                  <Image
                    priority
                    src={edit}
                    alt="Edit"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
