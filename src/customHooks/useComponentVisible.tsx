import { useEffect, useRef, useState } from "react"

const useComponentVisible = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      setIsVisible(!isVisible)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isVisible);

    return () => {
      document.removeEventListener("click", handleClickOutside, !isVisible);
    };
  }, [ref]); // Only re-attach listener on isVisible change

  return { ref, isVisible, setIsVisible }
}

export default useComponentVisible