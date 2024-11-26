'use client'

import { useRouter } from 'next/navigation';

export default function Table({ tableData } : any) {
  const { push } = useRouter();

    return (
      <div className="">
      <table>
        <thead>
          <tr>
            <th>AppID</th>
            <th>Name</th>
            <th>Release_date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any) => (
            <tr key={item.AppID}>
              <td>{item.AppID}</td>
              <td>{item.Name}</td>
              <td>{item.Release_date.split('T', 1)[0]}</td>
              <td>
                <button onClick={() => push(`/edit/${item.AppID}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }