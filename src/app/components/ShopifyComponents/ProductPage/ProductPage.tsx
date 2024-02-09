"use client"
import styles from "./productpage.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { ShopContext } from "@/app/shopify/shopContext";
import Carousel from "react-multi-carousel";
import { breakpoints } from "./carouselBreakpoints";

export default function ProductPage({productHandle} : {productHandle: string}) {

  const selectRef: any = useRef()
  const isSelectOpen: any = useRef()

  const { getProductByHandle } = useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(true)
  const [currentVariant, setCurrentVariant] = useState(0)
  const [variants, setVariants]: [variants: variantType[], setVariants: any] = useState([]!)
  const [isVariants, setIsVariants] = useState(false)
  const [product, setProduct]: [data: productType, setData: any] = useState(null!)
  const [mainImg, setMainImg]: [data: {src: string, altText: string, id: string}, setData: any] = useState(null!)
  const [price, setPrice] = useState(<></>)

  const [imageData, setImageData]: [imageData: any, setImageData: any] = useState([]!)
  const imageElems = imageData.map((data: {src: string, altText: string, id: string}, i: number)=>{
    return(
      <img key={i} src={data.src} alt={data.altText} className={styles.imgThumbnail} onClick={()=>{
        setMainImg(data)
      }} />
    )
  })

  const variantElems = variants.map((variant, i)=>{
    return(
      <option disabled={(variant.available) ? false : true} key={i} value={i}>{variant.title}</option>
    )
  })



    function setThePrice(productData: productType, variant: number = 0){
      const compareAtPrice = (productData.variants[variant].compareAtPrice != undefined) ? parseFloat(productData.variants[variant].compareAtPrice!.amount).toLocaleString("en-US",
      {
          style: 'currency',
          currency: productData.variants[variant].compareAtPrice!.currencyCode,
      }) : undefined
  
      const price = parseFloat(productData.variants[variant].price.amount).toLocaleString("en-US",
      {
          style: 'currency',
          currency: productData.variants[variant].price.currencyCode,
      })

      setPrice( <span className={styles.price}>{price} {(compareAtPrice != undefined) ? <span className={styles.oldPrice}>{compareAtPrice}</span> : <></>}</span>)
    }

    

    useEffect(()=>{

      getProduct()
      async function getProduct(){
        const productData: productType = await getProductByHandle(productHandle)
        setProduct(productData)
        setImageData(productData.images)
        setMainImg(productData.variants[0].image)
        setVariants(productData.variants)
        setCurrentVariant(0)
        
        let isVariantsTemp = false
        productData.variants.forEach((variant, i)=>{
          if(variant.title != "Default Title"){
            isVariantsTemp = true
          }
        })

        setIsVariants(isVariantsTemp)

        setThePrice(productData)

        isSelectOpen.current = false

        console.log(productData)
      }
        
      
    }, []);

    useEffect(()=>{
      if(product != null){
        setIsLoading(false)
      }
    }, [product])

    useEffect(()=>{
      if(product != null){
        setThePrice(product, currentVariant)
        setMainImg(variants[currentVariant].image)
      }
      
    }, [currentVariant])


    // Event Handlers

    function selectOnClick(evt: any){

      if(isSelectOpen.current == false){
        evt.currentTarget.setAttribute("data-isopen", "true")
        isSelectOpen.current = true
      }else{
        evt.currentTarget.setAttribute("data-isopen", "false")
        isSelectOpen.current = false
      }
    }

    function selectOnBlur(evt: any){
      isSelectOpen.current = false
      evt.currentTarget.setAttribute("data-isopen", "false")
    }

    function selectOnChange(evt: any){
      setCurrentVariant(evt.currentTarget.value)
    }

  return (
    <>
    {(isLoading) && <div>Loading...</div>}

    {(!isLoading) && 
    <div className={styles.productPage}>
      <div className={styles.images}>
        <img src={mainImg.src} alt={mainImg.altText} className={styles.mainImg} />
        <div className={styles.imgCarousel}>
          <Carousel
            responsive={breakpoints}
            transitionDuration={100}
            renderArrowsWhenDisabled
          >
            {imageElems}
          </Carousel>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        {price}

        {(isVariants) && <><label htmlFor="size">Variants:</label>
        <div data-class="select">
            <select data-isopen="false" onChange={selectOnChange} onBlur={selectOnBlur} onClick={selectOnClick} ref={selectRef} name="size" id="size">
              {variantElems}
            </select>
        </div></>}

      <label htmlFor="quantity">Quantity.</label>
  <div className={styles.numberInput}>
    <button onClick={(evt)=>{
      //@ts-ignore
      evt.currentTarget.parentNode.querySelector('input[type=number]').stepDown()}} className={styles.minus}></button>
    <input className={styles.quantity} min={1} max={20} name="quantity" defaultValue={1} type="number" />
    <button onClick={(evt)=>{
      //@ts-ignore
      evt.currentTarget.parentNode.querySelector('input[type=number]').stepUp()}}  className={styles.plus}></button>
</div>

           
      </div>
    </div>
    }
    </>
  )
}
