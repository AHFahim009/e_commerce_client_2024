/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"

const Coupon = () => {
  const [prefix, setPrefix] = useState("")
  const [maxLength, setMaxLength] = useState(8)
  const [characters, setCharacter] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [copied, setCopied] = useState(false)

  const allLetters = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const allNumbers = "0123456789"
  const allSymbols = "!@#$%^&*?"

  const copyTest = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon)
    setCopied(true)
  }

  const handleSubmit = (e: any) => {

    e.preventDefault()
    // input value is required
    if (!characters && !numbers && !symbols) {
      return alert("select one at least")
    }

    let couponString = prefix || ""
    const loopLength = maxLength - couponString.length

    for (let index = 0; index < loopLength; index++) {
      let fullString = "";
      if (characters) fullString += allLetters
      if (numbers) fullString += allNumbers
      if (symbols) fullString += allSymbols
      const randomNumber = Math.floor(Math.random() * fullString.length);

      couponString += fullString[randomNumber]
    }
    setCoupon(couponString)
  }


  return (
    <div className="adminCouponPage">
      <h1>Coupon</h1>
      <section>
        <form onSubmit={handleSubmit} >

          <input type="text"
            placeholder="Text to include"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <input type="number"
            placeholder="Coupon Length"
            maxLength={maxLength}
            minLength={8}
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
          />

          <fieldset>
            <legend>include</legend>
            <input type="checkbox" checked={numbers}
              onChange={() => setNumbers(pre => !pre)}
            />
            <span>number</span>
            <input type="checkbox"
              checked={characters}
              onChange={() => setCharacter(pre => !pre)}
            />
            <span>characters</span>
            <input type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(pre => !pre)}
            />
            <span>symbols</span>
          </fieldset>
          <button type="submit">Generate</button>
        </form>
        {
          coupon &&
          <code>{coupon} <button onClick={() => copyTest(coupon)}>{copied ? "copied" : "copy"}</button> </code>
        }
      </section>
    </div >
  )
}
export default Coupon