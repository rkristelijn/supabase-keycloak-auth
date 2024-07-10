import { useEffect, useState, useRef } from 'react'

export default function Cookies() {
  const [cookies, setCookies] = useState<string[]>([])
  const cookiesRef = useRef<string[]>([]) // Ref to store the previous cookies

  // Function to get current cookies as an array
  const getCookiesArray = () => {
    const cookies = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie !== '')
    console.log('Cookies', { cookies })
    return cookies
  }

  useEffect(() => {
    setCookies(getCookiesArray())

    console.log('Checking for cookie changes...')
    const currentCookies = getCookiesArray()
    // Check if the cookies have changed by comparing with the ref
    if (
      currentCookies.length !== cookiesRef.current.length ||
      !currentCookies.every((val, index) => val === cookiesRef.current[index])
    ) {
      setCookies(currentCookies) // Update cookies state if there's a change
      cookiesRef.current = currentCookies // Update the ref with the new cookies
    }
  }, []) // Removed cookies from dependency array to avoid re-triggering useEffect

  return (
    <>
      <h2>Cookies</h2>
      {cookies.length === 0 && <p>No cookies found</p>}
      {cookies.length > 0 && (
        <ul>
          {cookies.map((cookie, index) => (
            <li key={index}>{cookie}</li>
          ))}
        </ul>
      )}
    </>
  )
}
