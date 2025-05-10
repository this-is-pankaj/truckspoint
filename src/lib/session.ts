'use server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { JWTPayloadTP } from './types'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function udpateSession(cookie: string) {
  // const session = await encrypt({ session: cookie })
  const cookieStore = await cookies()
  cookieStore.set('session', cookie, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getPayloadFromCookie() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) return null
  const session = sessionCookie.value
  const decodedPayload = await  jwtDecode<JWTPayloadTP>(session)
  return decodedPayload
}