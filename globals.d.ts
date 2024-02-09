interface faqType{
    question: string,
    answer: string
}

interface linkProps{
    href: string,
    target: string,
    className: string,
    style: any,
    isLocal: boolean
}

interface reviewType{
    title: string,
    desc: string,
    name: string,
    role: string
}

interface productType{
    description: string,
    handle: string,
    variants: variantType[],
    id: string,
    title: string,
    options: [],
    images: imageType[]
}

interface variantType{
            price: {
                amount: string,
                currencyCode: string
            },
            compareAtPrice: {
                amount: string,
                currencyCode: string
            } | undefined,
            title: string,
            id: string,
            available: boolean,
            image: imageType
        }
    

        interface imageType{
            altText: string,
            id: string,
            src: string
        }
