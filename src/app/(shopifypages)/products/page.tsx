import AppWrapper from "@/app/components/AppWrapper"
import GetData from "@/app/components/GetData"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Products',
    description: 'Site\'s Products'
  }
  
export default function page() {
  return (
        <GetData />
  )
}
