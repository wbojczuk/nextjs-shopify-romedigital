"use client"
import { useRef, useState, useContext } from "react"
import styles from "./cartitem.module.css"
import Link from "next/link"
import { ShopContext } from "@/app/shopify/shopContext"
import formatCurrency from "@/app/shopify/formatCurrency"

interface cartItemProps extends lineItemType{
    closeCart: any,
    setIsUpdating: any,
    isUpdating: boolean
}
export default function CartItem(props: cartItemProps) {

    const {updateItemQuantity, removeLineItem} = useContext(ShopContext)

    const [theQty, setTheQty] = useState(props.quantity)

    const qtyElem: any = useRef()

    function linkHandler(){
        props.closeCart()
    }

    async function qtyHandler(){
        const newQty = parseInt(qtyElem.current.value)
        setTheQty(newQty)
        if(!props.isUpdating){
            props.setIsUpdating(true)
            if(newQty <= 0){
                await removeLineItem(props.id)
            }else{
                await updateItemQuantity(props.id, newQty)
            }
            props.setIsUpdating(false)
        }
    }
    
  return (
    <>
        {}
        <div className={styles.cartItem}>
        <Link className={styles.img} onClick={linkHandler} href={`/product/${props.variant.product.handle}`}>
            <img src={props.variant.image.src} alt={props.variant.image.altText} />
        </Link>

        <div className={styles.text}>
            <h4 className={styles.title}>{props.title}</h4>
            <h6 className={styles.variant}>{(props.variant.title != "Default Title") ? props.variant.title :""}
            </h6>

            <div className={styles.numberInput}>
                <button onClick={(evt)=>{
                //@ts-ignore
                evt.currentTarget.parentNode.querySelector('input[type=number]').stepDown();qtyHandler()}} className={`${styles.minus} ${(props.quantity == 0) ? styles.elemDisabled : ""}`}></button>
                    <input id={props.id} ref={qtyElem} onChange={qtyHandler} className={styles.quantity} min={0} name="quantity" value={props.quantity} type="number" />
                <button onClick={(evt)=>{
                //@ts-ignore
                evt.currentTarget.parentNode.querySelector('input[type=number]').stepUp(); qtyHandler()}}  className={styles.plus}></button>
            </div>
        </div>

        <div className={styles.price}>{formatCurrency((props.quantity * parseFloat(props.variant.price.amount)), props.variant.price.currencyCode)}</div>

    </div>
    </>
  )
}
