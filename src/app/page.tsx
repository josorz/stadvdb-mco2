import Table from '@/components/table';
import SearchBar from '@/components/searchbar';

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`);
  const tableData = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar />
        </div>

        <section>
          <h2 className="text-xl text-center font-semibold mb-4">Latest Games</h2>
          <Table tableData={tableData.rows} />
          <br />
          <h3 className="text-xl text-center mb-4">{tableData.count} games in database</h3>
        </section>
      </main>
    </div>
  );
}
