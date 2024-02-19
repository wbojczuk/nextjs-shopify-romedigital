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

    function removeAll(){
        qtyElem.current.value = 0;
        qtyHandler()
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
            <div className={styles.priceAndClose}>
            <div className={styles.price}>{formatCurrency(props.variant.price.amount, props.variant.price.currencyCode)}</div>
                <div className={styles.removeAll} onClick={removeAll}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8"></path><path fill="#aaa" d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"></path></svg>
                </div>
            </div>
        </div>

        

    </div>
    </>
  )
}
