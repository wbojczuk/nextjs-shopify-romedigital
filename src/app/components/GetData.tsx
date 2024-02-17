"use client"

import { useEffect, useContext } from "react"
import { ShopContext } from "../shopify/shopContext";
import ProductListings from "./ShopifyComponents/ProductListings/ProductListings";

export default function GetData() {
    const { products } = useContext(ShopContext);

  return (
    <>
    
      
      <ProductListings products={products} />
    </>
  )
}
