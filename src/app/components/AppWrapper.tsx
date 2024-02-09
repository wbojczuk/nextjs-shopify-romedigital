"use client"
import GetData from "./GetData"
import ShopProvider from "../shopify/shopContext"

export default function AppWrapper(props: {elems: any}) {
  return (
    <ShopProvider>
        {props.elems}
    </ShopProvider>
  )
}
