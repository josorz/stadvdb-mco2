import EditForm from "@/components/editform"

export default async function Page({
    params, 
  }: {
    params: Promise<{ id: Number }>
  }) {
    const id = (await params).id

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/edit/${id}`);
    const data = await response.json();
    
   return <div>
    <EditForm data={data}/>
   </div>
}
