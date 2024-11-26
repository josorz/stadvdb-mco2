'use server'
 
import { redirect } from 'next/navigation'
 
export async function search(data: FormData) {
  redirect(`/search?search=${data.get('searchQuery')}`)
}