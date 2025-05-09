import 'server-only'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(cookie: string) {
  // const session = await encrypt({ session: cookie })
  const cookieStore = await cookies()
  cookieStore.set('session', cookie, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}