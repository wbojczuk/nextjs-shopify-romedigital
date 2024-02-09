import ProductPage from "@/app/components/ShopifyComponents/ProductPage/ProductPage"
import AppWrapper from "@/app/components/AppWrapper"

export default function ProductPagePage({params}: {params:{handle: string}}) {
    return (
     <AppWrapper elems={<ProductPage productHandle={params.handle} />} />
    )
  }