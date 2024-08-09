import { useEffect, useState } from "react"

const stopwatchFn = (time: number) => {
  const hour = Math.floor(time / 3600).toString().padStart(2, "0")
  const minute = Math.floor((time % 3600) / 60).toString().padStart(2, "0")
  const second = Math.floor(time % 60).toString().padStart(2, "0")

  return `${hour}:${minute}:${second}`
}


const Stopwatch = () => {
  const [time, setTime] = useState(0)
  const [stop, setStop] = useState(false)

  const resetHandler = () => {
    setTime(0)
    setStop(false)
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (stop) {
      intervalId = setInterval(() => {
        setTime((pre) => pre + 1)
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [stop])

  return (
    <div className="stopwatchPage">
      <h1>Stopwatch</h1>
      <section>
        <h1>{stopwatchFn(time)}</h1>
        <div>
          <button onClick={() => setStop((pre) => !pre)}>{stop ? "Stop" : "Start"}</button>
          <button onClick={resetHandler}>Restart</button>
        </div>
      </section>
    </div>
  )
}
export default Stopwatch