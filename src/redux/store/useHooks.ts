/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"

export const debouncedFn = ({ value, delayTime }: { value: string | number, delayTime: number }) => {
  const [delayPrice, setDelayPrice] = useState<string | number>(value)

  useEffect(() => {

    const interval = setTimeout(() => {
      setDelayPrice(value)
    }, delayTime)

    return () => {
      clearTimeout(interval)
    }


  }, [value])


  return delayPrice
}