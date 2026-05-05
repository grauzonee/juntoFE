import { useEffect, useRef, useState } from "react"

type UseAsyncListOptions<T> = {
    enabled?: boolean
    fallbackErrorMessage: string
    initialData: T[]
    load: () => Promise<T[]>
}

type UseAsyncListResult<T> = {
    data: T[]
    loading: boolean
    error: string | null
}

export function useAsyncList<T>({
    enabled = true,
    fallbackErrorMessage,
    initialData,
    load,
}: UseAsyncListOptions<T>): UseAsyncListResult<T> {
    const [data, setData] = useState<T[]>(initialData)
    const [loading, setLoading] = useState(enabled)
    const [error, setError] = useState<string | null>(null)
    const requestIdRef = useRef(0)

    useEffect(() => {
        requestIdRef.current += 1
        const requestId = requestIdRef.current
        let active = true

        if (!enabled) {
            setLoading(false)
            setError(null)
            setData(initialData)
            return () => {
                active = false
            }
        }

        setLoading(true)
        setError(null)

        load()
            .then((response) => {
                if (active && requestIdRef.current === requestId) {
                    setData(response)
                }
            })
            .catch((nextError: unknown) => {
                if (active && requestIdRef.current === requestId) {
                    setError(nextError instanceof Error ? nextError.message : fallbackErrorMessage)
                    setData(initialData)
                }
            })
            .finally(() => {
                if (active && requestIdRef.current === requestId) {
                    setLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [enabled, fallbackErrorMessage, initialData, load])

    return { data, loading, error }
}
