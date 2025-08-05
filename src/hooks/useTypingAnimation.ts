import { useState, useEffect } from 'react'

interface UseTypingAnimationProps {
  text: string
  speed?: number
  startDelay?: number
}

export const useTypingAnimation = ({ 
  text, 
  speed = 100, 
  startDelay = 0 
}: UseTypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!text) return

    const timeout = setTimeout(() => {
      setIsTyping(true)
      let index = 0
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, speed)

      return () => clearInterval(timer)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayText, isTyping }
}