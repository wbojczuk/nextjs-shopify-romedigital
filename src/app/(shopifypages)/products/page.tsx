import AppWrapper from "@/app/components/AppWrapper"
import ProductListings from "@/app/components/ShopifyComponents/ProductListings/ProductListings"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Products',
    description: 'Site\'s Products'
  }
  
export default function page() {
  return (
        <ProductListings />
  )
}
