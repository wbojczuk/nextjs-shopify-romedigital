export default function formatCurrency(amt: number|string, currencyCode: string): string{
return parseFloat(`${amt}`).toLocaleString("en-US",
{
    style: 'currency',
    currency: currencyCode,
})
}