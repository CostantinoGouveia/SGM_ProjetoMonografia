"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";


export default function UseQueryProvider({children}: {children: ReactNode}) {
    const [client] = React.useState(new QueryClient());

    return <QueryClientProvider client={client}> {children} </QueryClientProvider>
}