import styles from "./productcard.module.css"
import Link from "next/link"
import formatCurrency from "@/app/shopify/formatCurrency"

export default function ProductCard(props: {product: productType}) {

    const compareAtPrice = (props.product.variants[0].compareAtPrice != undefined) ? formatCurrency(props.product.variants[0].compareAtPrice.amount, props.product.variants[0].compareAtPrice.currencyCode) : undefined

    const price = formatCurrency(props.product.variants[0].price.amount, props.product.variants[0].price.currencyCode)

  return (
    <Link href={`/product/${props.product.handle}`} className={`${styles.card}`}>
        <div className={styles.coverImgWrapper}>
            <img src={props.product.images[0].src} alt={props.product.images[0].altText} className={styles.coverImg} />
        </div>

        <h4 className={styles.title}>{props.product.title}</h4>

        <span className={styles.price}>{(props.product.availableForSale) ? <>{price} {(compareAtPrice != undefined) ? <span className={styles.oldPrice}>{compareAtPrice}</span> : <></>} </>: <span className={styles.soldOut}>Sold Out</span> }</span>
    </Link>
  )
}
