export function isValidEmail(email) {
  if (!email) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhoneNumber(phone) {
  if (!phone) return false

  // Accepts numbers with optional leading +, 9–15 digits (E.164-like)
  const phoneRegex = /^\+?[0-9]{9,15}$/
  return phoneRegex.test(phone)
}

export function isEqualPassword(password1, password2) {
  if (!password1 || !password2) return false
  return password1 === password2
}

export function isValidPassword(password) {
  if (!password) return false

  // At least 8 chars, 1 letter, 1 number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}
