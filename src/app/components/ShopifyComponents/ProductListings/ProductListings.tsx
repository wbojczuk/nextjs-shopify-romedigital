"use client"

import styles from "./productlistings.module.css"
import ProductCard from "../ProductCard/ProductCard"
import Loading from "../Loading/Loading"
import { useEffect, useState, useContext } from "react"
import { ShopContext } from "@/app/shopify/shopContext"
import gsap from "gsap"

export default function ProductListings() {


    const {products}: {products: productType[]} = useContext(ShopContext)

    const [isLoading, setIsLoading] = useState(true)

    const productCardElems = products.map((product, i)=>{
        return <ProductCard key={i} product={product} />
    })

    useEffect(()=>{
        if(products.length > 0){
            setIsLoading(false)
            const observer = new IntersectionObserver((elems)=>{
                const elemArray: HTMLElement[] = []
                elems.forEach((elem)=>{
                    if(elem.isIntersecting){
                        elemArray.push(elem.target as HTMLElement)
                        observer.unobserve(elem.target)
                    }
                })
                if(elemArray.length > 0){
                    animateElems(elemArray)
                }
            })

            document.querySelectorAll(`.${styles.listings} a`).forEach((elem)=>{
                observer.observe(elem)
            })
        }
    }, [products])

    function animateElems(elems: HTMLElement[]){
        gsap.to(elems, {
            y: 0,
            opacity: 1,
            ease: "power2inOut",
            duration: 0.4,
            stagger: 0.05
        })
    }

  return (
    <section className={styles.listings}>
        {isLoading && <Loading />}
        {productCardElems}
    </section>
  )
}
