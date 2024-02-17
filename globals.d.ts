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
            product: {
                handle: string,
                id: string
            },
            title: string,
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

interface cartType{
    id: string,
    lineItems: lineItemType[],
    lineItemsSubtotalPrice: {
        amount: string,
        currencyCode: string,
    },
    paymentDue: {
        amount: string,
        currencyCode: string,
    },
    subtotalPrice: {
        amount: string,
        currencyCode: string,
    },
    webUrl: string
}

interface lineItemType{
    id: string,
    title: string,
    quantity: number,
    variant: variantType
}