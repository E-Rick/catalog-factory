import {useState, useEffect} from 'react'

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}