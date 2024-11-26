import Table from '@/components/table'
import SearchBar from '@/components/searchbar'

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`);
  const tableData = await response.json();
  

  return (
    <div className="">
      <h1>Steam Games</h1>
      <div className="mb-6">
        <SearchBar />
        <h2>Latest Games</h2>
        <Table tableData={tableData}/>
      </div> 
    </div>
  );
}