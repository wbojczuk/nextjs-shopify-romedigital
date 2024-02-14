"use client"
import ShopProvider from "../shopify/shopContext"

export default function AppWrapper(props: {elems: any}) {
  return (
    <ShopProvider>
        {props.elems}
    </ShopProvider>
  )
}
