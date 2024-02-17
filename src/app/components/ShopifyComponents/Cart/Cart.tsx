"use client"

import { useContext, useEffect, useRef, useState } from "react"
import formatCurrency from "@/app/shopify/formatCurrency"
import styles from "./cart.module.css"
import { ShopContext } from "@/app/shopify/shopContext"
import CartItem from "./CartItem/CartItem"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export default function Cart() {

    const pathName = usePathname()
    const [isUpdating, setIsUpdating] = useState(false)

    const sideBarRef: any = useRef()
    const cartShaderRef: any = useRef()

    const [checkoutUrl, setCheckoutUrl] = useState("")
    const [subtotal, setSubtotal] = useState("$0.00")

    const {checkout}: {checkout: cartType} = useContext(ShopContext)

    const [items, setItems]: [items: lineItemType[], setItems: any] = useState([]!)

    const [isFilled, setIsFilled] = useState(false)

    const lineItemElems = items.map((item, i)=>{
        return(
            <CartItem key={i} closeCart={closeCart} setIsUpdating={setIsUpdating} isUpdating={isUpdating} {...item} />
        )
    })



    // --------------- Init
    useEffect(()=>{
    if(checkout.id){

        setIsFilled(checkout.lineItems.length > 0)
        setItems(checkout.lineItems)
        setSubtotal(formatCurrency(checkout.subtotalPrice.amount, checkout.subtotalPrice.currencyCode))
        setCheckoutUrl(checkout.webUrl)

    }   
    }, [checkout])



    // --------------- HOOKS

    // On Route/Path Change
    useEffect(()=>{
        closeCart()
    }, [pathName])


    // --------------- Helper Functions

    function openCart(){
        gsap.to(sideBarRef.current, {
            x: 0,
            duration: 0.5,
            ease: "power3.inOut"
        })

        cartShaderRef.current.style.visibility = "visible"
        gsap.to(cartShaderRef.current,{
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut"
        })
    }

    function closeCart(){
        gsap.to(sideBarRef.current, {
            x: "110%",
            duration: 0.4,
            ease: "power3.inOut"
        })

        gsap.to(cartShaderRef.current,{
            opacity: 0,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: ()=>{cartShaderRef.current.style.visibility = "hidden"}
        })
    }


    // --------------- Event Handlers

    

  return (
    <>
        <div ref={cartShaderRef} onClick={closeCart} className={styles.cartShader}></div>
        <div onClick={openCart} className={`${styles.cartIcon} ${(isFilled) ? styles.filled : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="black" d="M25 12V9.05a7 7 0 1 0-14 0v7a1 1 0 0 0 2 0V14h8v-2h-8V9.05a5 5 0 1 1 10 0V16a1 1 0 1 0 2 0v-2h5v18H6V14h3v-2H4v20.09A1.91 1.91 0 0 0 5.91 34h24.18A1.91 1.91 0 0 0 32 32.09V12Z" className="clr-i-outline clr-i-outline-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
        </div>

        <div className={styles.sideBar} ref={sideBarRef}>
            <div className={styles.header}>
                <h3 className={styles.cartTitle}>Your Cart</h3>
                <div onClick={closeCart} className={styles.closeCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>
                </div>
            </div>

            <div className={styles.cartContent}>
                
                {lineItemElems}
                <div className={styles.payment}>
                <div className={styles.divider}></div>
                <h3 className={styles.subtotal}><span>Subtotal:</span><span>{subtotal}</span></h3>
                <a className={`${styles.checkoutLink} ${(isUpdating) ? styles.elemDisabled : ""}`} href={checkoutUrl}>Checkout</a>
            </div>
            </div>
            {(isUpdating) && <div className={styles.updating}></div>}
        </div>
    </>
  )
}
