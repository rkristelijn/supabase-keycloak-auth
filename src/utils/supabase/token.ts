// Function to safely decode Base64 strings
export function safeBase64Decode(encodedString: string | undefined): string {
  if (!encodedString) return ''
  
  // Replace non-url compatible chars with base64 standard chars
  encodedString = encodedString.replace(/-/g, '+').replace(/_/g, '/')
  // Pad string with '=' to make the length a multiple of 4
  while (encodedString.length % 4) {
    encodedString += '='
  }
  // Decode and return
  return Buffer.from(encodedString, 'base64').toString()
}

// Function to attempt to split the token
export function splitToken(token: string): string[] {
  if (token.includes('.')) {
    return token.split('.')
  } else {
    // Attempt to decode the token if it doesn't contain any dots
    const decodedToken = safeBase64Decode(token)
    if (decodedToken.includes('.')) {
      return decodedToken.split('.')
    }
  }
  // Return an empty array or throw an error if the token cannot be split
  return []
}
