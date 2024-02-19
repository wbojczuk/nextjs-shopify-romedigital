"use client"
import { useContext, useRef, useState } from "react"
import { ShopContext } from "@/app/shopify/shopContext"
import styles from "./addtocartbutton.module.css"


export default function AddToCartButton(props:{variantID: string, qty: number, available: boolean, currentSize: string, currentColor: string}) {

  const buttonRef: any = useRef()
    const {addItemToCheckout, openCart} = useContext(ShopContext)
    const [addingState, setAddingState] = useState(false)
    const adding: any = useRef()
    adding.current = false;

    async function buttonHandler(evt: any){
      if(props.currentColor != "unselected"){
        if(props.currentSize != "unselected"){
          if(!adding.current){
            setAddingState(true)
            adding.current = true;
            await addItemToCheckout(props.variantID, props.qty)
            adding.current = false;
            setAddingState(false)
            openCart()
          }
        }else{
          alert("Select a size")
        }
      }else{
        alert("Select a color")
      }
    }

  return (
    <button ref={buttonRef} className={`${styles.button} ${(addingState) ? styles.adding : ""} ${(props.available) ? "" : styles.soldOut}`} onClick={(props.available) ? buttonHandler : ()=>{}}>{(props.available) ? (addingState) ? "Adding" : "Add to cart" : "Sold out"}</button>
  )
}
