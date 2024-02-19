"use client"

import animData from "./loading.json"
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import styles from "./loading.module.css"
import { CSSProperties } from "react"

export default function Loading(props: {style?: CSSProperties}) {
  return (
    <div className={styles.loadingWrapper} style={(props.style) ? props.style : {}}>
        <div className={styles.loading}>
            <Lottie
            animationData={animData}
            play={true}
            loop={true}
            ></Lottie>
        </div>
    </div>
  )
}
