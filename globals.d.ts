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
    options: optionType[],
    id: string,
    title: string,
    options: [],
    images: imageType[]
}

interface selectedOptionType {
    name: string,
    value: string
}

interface optionType{
    id: string,
    name: string,
    values: optionValueType[]
}

interface optionValueType {value: string}

interface variantType{
            price: {
                amount: string,
                currencyCode: string
            },
            selectedOptions: selectedOptionType[],
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
