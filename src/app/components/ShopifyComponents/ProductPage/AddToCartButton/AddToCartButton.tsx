"use client"
import { useContext, useRef, useState } from "react"
import { ShopContext } from "@/app/shopify/shopContext"
import styles from "./addtocartbutton.module.css"


export default function AddToCartButton(variantID: string, qty: number) {
    const {addItemToCheckout} = useContext(ShopContext)
    const [addingState, setAddingState] = useState(false)
    const adding: any = useRef()
    adding.current = false;

    async function buttonHandler(evt: any){
        if(!adding.current){
            setAddingState(true)
            adding.current = true;
            await addItemToCheckout
            adding.current = false;
            setAddingState(false)
        }
    }

  return (
    <button className={`${styles.button} ${(addingState) ? styles.adding : ""}`} onClick={buttonHandler}>Add to cart</button>
  )
}
