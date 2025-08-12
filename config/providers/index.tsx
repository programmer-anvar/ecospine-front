'use client'
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemePorovider } from "../theme"
import { useEffect, useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getQueryClient } from "@/utils/get-query-client"

export const Providers = (props: {children: React.ReactNode}) => {
    const [mounted, setMounted] = useState(false)
    const queryClient = getQueryClient()
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null;


    return (
        <ThemePorovider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {props.children}
            </QueryClientProvider>
        </ThemePorovider>
    )
}