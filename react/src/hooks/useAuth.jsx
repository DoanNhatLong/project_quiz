import { useEffect, useState } from 'react'
import { getMe, getUser } from '../service/authService'

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const cached = getUser()
            if (cached) {
                setUser(cached)
                setLoading(false)
                return
            }

            try {
                const data = await getMe()
                setUser(data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return { user, loading }
}