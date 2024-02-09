// import './globals.css'
import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import Script from 'next/script';
import "react-multi-carousel/lib/styles.css";
import "./globals.css"

// BUTTON STYLES - .main-button


const primaryFont = Roboto({ subsets: ['latin'], weight: ["100", "300", "400", "500", "900"], display: "swap", variable: "--primary-font" })
const secondaryFont = Oswald({ subsets: ['latin'], weight: ["300", "500", "700"], display: "swap", variable: "--secondary-font" })

export const metadata: Metadata = {
  title: 'Template Site Title',
  description: 'Template Site Desc'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} ${secondaryFont.variable}`}>

      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>


        {children}

        </body>
    </html>
  )
}
