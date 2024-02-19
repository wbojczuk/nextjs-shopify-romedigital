"use client"

import styles from "./productlistings.module.css"
import ProductCard from "../ProductCard/ProductCard"
import Loading from "../Loading/Loading"
import { useEffect, useState } from "react"

export default function ProductListings(props: {products: []}) {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const productCardElems = products.map((product, i)=>{
        return <ProductCard key={i} product={product} />
    })

    useEffect(()=>{
        if(props.products.length > 0){
            setProducts(props.products)
            setIsLoading(false)
        }
    }, [props.products])

  return (
    <section className={styles.listings}>
        {isLoading && <Loading />}
        {productCardElems}
    </section>
  )
}
