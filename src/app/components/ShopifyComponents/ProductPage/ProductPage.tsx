"use client"
import AddToCartButton from "./AddToCartButton/AddToCartButton";
import styles from "./productpage.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { ShopContext } from "@/app/shopify/shopContext";
import Carousel from "react-multi-carousel";
import { breakpoints } from "./carouselBreakpoints";
import gsap from "gsap";
import formatCurrency from "@/app/shopify/formatCurrency";
import Loading from "../Loading/Loading";
import Link from "next/link";


export default function ProductPage({productHandle} : {productHandle: string}) {

  const isSelectOpen: any = useRef()
  const qtyElem: any = useRef()
  const sizeElems: any = useRef() 
  const contentRef: any = useRef()
  const backLinkRef: any = useRef()
  const imagesRef: any = useRef()
  const colorElems: any = useRef() 
  const [optionTypes, setOptionTypes]: [optionTypes: string[], setOptionTypes: any] = useState([]!)

  const { getProductByHandle } = useContext(ShopContext);

  const [currentVariant, setCurrentVariant] = useState(0)
  const [currentColor, setCurrentColor] = useState("")
  const [currentSize, setCurrentSize] = useState("")


  const [qty, setQty] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  const [variants, setVariants]: [variants: variantType[], setVariants: any] = useState([]!)
  const [isVariants, setIsVariants] = useState(false)

  const [colorOptions, setColorOptions]: [colorOptions: optionValueType[], setColorOptions: any] = useState([]!)
  const [sizeOptions, setSizeOptions]: [sizeOptions: optionValueType[], setSizeOptions: any] = useState([]!)

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

  const colorOptionElems = colorOptions.map((option, i)=>{
    return(
      <div className={`${styles.colorOption} ${styles.optionElem}`} key={i}>
        <input onChange={(evt)=>{setCurrentColor(evt.currentTarget.value)}} value={option.value} className={`${styles.optionInput} ${styles.colorOptionInput}`} type="radio" name="color_option" id={`color_option${i}`} />
        <label className={styles.optionLabel} htmlFor={`color_option${i}`}>{option.value}</label>
      </div>
    )
  })

  const sizeOptionElems = sizeOptions.map((option, i)=>{
    return(
      <div className={`${styles.sizeOption} ${styles.optionElem}`} key={i}>
        <input onChange={(evt)=>{setCurrentSize(evt.currentTarget.value)}} className={`${styles.optionInput} ${styles.sizeOptionInput}`} value={option.value} type="radio" name="size_option" id={`size_option${i}`} />
        <label className={styles.optionLabel} htmlFor={`size_option${i}`}>{option.value}</label>
      </div>
    )
  })


    function setThePrice(productData: productType, variant: number = 0){

      const compareAtPrice = (productData.variants[variant].compareAtPrice != undefined) ? formatCurrency(productData.variants[variant].compareAtPrice!.amount, productData.variants[variant].compareAtPrice!.currencyCode) : undefined
  
      const price = formatCurrency(productData.variants[variant].price.amount, productData.variants[variant].price.currencyCode)

      setPrice( <span className={styles.price}>{price} {(compareAtPrice != undefined) ? <span className={styles.oldPrice}>{compareAtPrice}</span> : <></>}</span>)
    }

    // ------ Helper Functions

    function animateContentIn(){
      const tl = gsap.timeline({defaults:{ duration: 0.4, ease: "power3.inOut"}})

      tl.to(backLinkRef.current, {
        opacity: 1,
        x: 0
      })
      .to(imagesRef.current,{
        opacity: 1,
        y: 0
      }, "-=0.3")
      .to(contentRef.current, {
        opacity: 1,
        y: 0
      }, "-=0.3")
    }

    

    // Init
    useEffect(()=>{

      getProduct()
      async function getProduct(){
        const productData: productType = await getProductByHandle(productHandle)
        setProduct(productData)
        setImageData(productData.images)
        setMainImg(productData.variants[0].image)
        setVariants(productData.variants)
        let tempCurrentVariant = 0
        for(let i = productData.variants.length - 1; i >= 0 ; --i){
          if(productData.variants[i].available){
            tempCurrentVariant = i
          }
        }
        setCurrentVariant(tempCurrentVariant)
        
        let isVariantsTemp = false
        productData.variants.forEach((variant, i)=>{
          if(variant.title != "Default Title"){
            isVariantsTemp = true
          }
        })

        setIsVariants(isVariantsTemp)

        setThePrice(productData)

        if(!(productData.options[0].name == "Title")){
          // Check For Option Names
          productData.options.forEach((option)=>{
            setOptionTypes((oldVal: string[])=>[...oldVal, (option.name).toLowerCase()])
            if((option.name).toLowerCase() == "color"){
              setColorOptions(option.values)
              setCurrentColor("unselected")
            }else if((option.name).toLowerCase() == "size"){
              setSizeOptions(option.values)
              setCurrentSize("unselected")
            }
          })
        }

        isSelectOpen.current = false
        sizeElems.current = document.querySelectorAll(`.${styles.sizeOptionInput}`)

        colorElems.current = document.querySelectorAll(`.${styles.colorOptionInput}`)
      }
        
      
    }, []);


    //------------------ HOOKS ------------------


    useEffect(()=>{
      if(product != null){
        setIsLoading(false)
      }
    }, [product])

    useEffect(()=>{
      if(contentRef.current !== undefined){
        animateContentIn()
      }
    }, [contentRef.current])


    useEffect(()=>{
      if(product != null){
        setThePrice(product, currentVariant)
        setMainImg(variants[currentVariant].image)
      }
      
    }, [currentVariant])


    // Select Color Hook / Main Selector
    useEffect(()=>{
      // RUN AS BOTH color and size is there
      if(optionTypes.includes("color") && optionTypes.includes("size")){
      
      setCurrentSize("unselected")
      
      if(sizeOptions.length > 1){
        

        const compatibleSizes: string[] = []
        const colorAvailability: any = {}
        const sizeAndColorAvailibility: any = {}

        variants.forEach((variant, i)=>{
          variant.selectedOptions.forEach((option)=>{
            if((option.name).toLowerCase() == "color"){
              if(!product.variants[i].available){
                colorAvailability[option.value] = false
              }else{
                colorAvailability[option.value] = true
              }
            }
            if((option.name).toLowerCase() == "color" && option.value == currentColor){
             
              product.variants[i].selectedOptions.forEach((option)=>{
                if((option.name).toLowerCase() == "size"){
                  if(!product.variants[i].available){
                    sizeAndColorAvailibility[option.value] = false
                  }else{
                    sizeAndColorAvailibility[option.value] = true
                  }
                  compatibleSizes.push(option.value)
                }
              })
            }
          })
        })
        colorElems.current.forEach((elem: HTMLInputElement)=>{
          //@ts-ignore
          if(colorAvailability[elem.value]){
            //@ts-ignore
            elem.parentElement.classList.remove(styles.notAvailable)
          }else{
            //@ts-ignore
            elem.parentElement.classList.add(styles.notAvailable)
          }
        })

        sizeElems.current.forEach((elem: HTMLInputElement)=>{
          //@ts-ignore
          elem.checked = false
          //@ts-ignore
          if(compatibleSizes.includes(elem.value) && sizeAndColorAvailibility[elem.value]){
            //@ts-ignore
            elem.parentElement.classList.remove(styles.notAvailable)
          }else{
            //@ts-ignore
            elem.parentElement.classList.add(styles.notAvailable)
          }
        })
        
      }
      // IF ONLY COLORS AND NO SIZES
      }else if(optionTypes.includes("color") && !(optionTypes.includes("size"))){
        const colorAvailability: any = {}
        variants.forEach((variant, i)=>{
          variant.selectedOptions.forEach((option)=>{
            if((option.name).toLowerCase() == "color"){
              if(!product.variants[i].available){
                colorAvailability[option.value] = false
              }else{
                colorAvailability[option.value] = true
              }
            }
            if((option.name).toLowerCase() == "color" && option.value == currentColor){
              setCurrentVariant(i)
            }
          })
        })
        colorElems.current.forEach((elem: HTMLInputElement)=>{
          //@ts-ignore
          if(colorAvailability[elem.value]){
            //@ts-ignore
            elem.parentElement.classList.remove(styles.notAvailable)
          }else{
            //@ts-ignore
            elem.parentElement.classList.add(styles.notAvailable)
          }
        })
      }
    }, [currentColor, product])


    // Size / Last Selector Hook
    useEffect(()=>{
       // RUN AS BOTH color and size is there
       if(optionTypes.includes("color") && optionTypes.includes("size")){
      if(currentSize != "" && currentSize != "unselected"){

        variants.forEach((variant, i)=>{
          variant.selectedOptions.forEach((option)=>{
            if((option.name).toLowerCase() == "color" && option.value == currentColor){
              variants[i].selectedOptions.forEach((option)=>{
                if((option.name).toLowerCase() == "size" && option.value == currentSize){
                  setCurrentVariant(i)
                }
              })
            }
          })
        })

      }
      // IF ONLY COLORS AND NO SIZES
    }else if(!optionTypes.includes("color") && (optionTypes.includes("size"))){
    const sizeAvailability: any = {}
    variants.forEach((variant, i)=>{
      variant.selectedOptions.forEach((option)=>{
        if((option.name).toLowerCase() == "size"){
          if(!product.variants[i].available){
            sizeAvailability[option.value] = false
          }else{
            sizeAvailability[option.value] = true
          }
        }
        if((option.name).toLowerCase() == "size" && option.value == currentSize){
          setCurrentVariant(i)
        }
      })
    })
    sizeElems.current.forEach((elem: HTMLInputElement)=>{
      //@ts-ignore
      if(sizeAvailability[elem.value]){
        //@ts-ignore
        elem.parentElement.classList.remove(styles.notAvailable)
      }else{
        //@ts-ignore
        elem.parentElement.classList.add(styles.notAvailable)
      }
    })
  }
    }, [currentSize, product])




    // Event Handlers

    // ___DEPRECATED SELECT ELEMENT HANDLERS
    
    // function selectOnClick(evt: any){

    //   if(isSelectOpen.current == false){
    //     evt.currentTarget.setAttribute("data-isopen", "true")
    //     isSelectOpen.current = true
    //   }else{
    //     evt.currentTarget.setAttribute("data-isopen", "false")
    //     isSelectOpen.current = false
    //   }
    // }

    // function selectOnBlur(evt: any){
    //   isSelectOpen.current = false
    //   evt.currentTarget.setAttribute("data-isopen", "false")
    // }

    // function selectOnChange(evt: any){
    //   setCurrentVariant(evt.currentTarget.value)
    // }

    function qtyHandler(){
      const elem = qtyElem.current
      if(elem.value < 1){
        elem.value = 1
      }else{
        setQty(elem.value)
      }
    }

  return (
  <>
    <div className={styles.productPage}>
    <Link ref={backLinkRef} className={styles.backArrow} href="/products"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#aaa" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z"></path></svg> Back To Products</Link>
    {(isLoading) && <Loading />}
    {(!isLoading) &&
    <>
      <div className={styles.images} ref={imagesRef}>
        <img src={mainImg.src} alt={mainImg.altText} className={styles.mainImg} />
        <div className={styles.imgCarousel}>
          <Carousel
            responsive={breakpoints}
            transitionDuration={100}
            draggable={false}
            renderArrowsWhenDisabled
          >
            {imageElems}
          </Carousel>
        </div>
      </div>
      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        {price}

       {(colorOptions.length > 0) && <> <label htmlFor="colorr">Color:</label>
        <div className={styles.optionWrapper}>
          {colorOptionElems}
        </div>
        </>}

        {(sizeOptions.length > 0) && <> <label htmlFor="sizee">Size:</label>
        <div className={styles.optionWrapper}>
          {sizeOptionElems}
        </div>
        </>}
        

      <label htmlFor="quantity">Quantity.</label>
      <div className={styles.numberInput}>
        <button onClick={(evt)=>{
          //@ts-ignore
          evt.currentTarget.parentNode.querySelector('input[type=number]').stepDown();qtyHandler()}} className={`${styles.minus} ${(qty == 1) ? styles.elemDisabled : ""}`}></button>
            <input ref={qtyElem} onChange={qtyHandler} className={styles.quantity} min={1} name="quantity" defaultValue={1} type="number" />
        <button onClick={(evt)=>{
          //@ts-ignore
          evt.currentTarget.parentNode.querySelector('input[type=number]').stepUp(); qtyHandler()}}  className={styles.plus}></button>
      </div>

      <AddToCartButton variantID={variants[currentVariant].id} available={variants[currentVariant].available} currentSize={currentSize} currentColor={currentColor} qty={qty} />

           
      </div>
</>
}
    </div>
  </>

  
  )
}
