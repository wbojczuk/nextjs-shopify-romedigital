import styles from "./productcard.module.css"
import Link from "next/link"

export default function ProductCard(props: {product: productType}) {

    const compareAtPrice = (props.product.variants[0].compareAtPrice != undefined) ? parseFloat(props.product.variants[0].compareAtPrice.amount).toLocaleString("en-US",
    {
        style: 'currency',
        currency: props.product.variants[0].compareAtPrice.currencyCode,
    }) : undefined

    const price = parseFloat(props.product.variants[0].price.amount).toLocaleString("en-US",
    {
        style: 'currency',
        currency: props.product.variants[0].price.currencyCode,
    })
  return (
    <Link href={`/product/${props.product.handle}`} className={`${styles.card}`}>
        <div className={styles.coverImgWrapper}>
            <img src={props.product.images[0].src} alt={props.product.images[0].altText} className={styles.coverImg} />
        </div>

        <h4 className={styles.title}>{props.product.title}</h4>

        <span className={styles.price}>{price} {(compareAtPrice != undefined) ? <span className={styles.oldPrice}>{compareAtPrice}</span> : <></>}</span>
    </Link>
  )
}
