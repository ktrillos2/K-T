"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(() => import("@/components/ui/custom-cursor"), { ssr: false })
const FloatingButtons = dynamic(() => import("@/components/ui/floating-buttons"), { ssr: false })
const Wrapper = dynamic(() => import("@/components/layout/global-modal-wrapper"), { ssr: false })

export default function ClientSideUI() {
    return (
        <>
            <CustomCursor />
            <FloatingButtons />
            <Wrapper />
        </>
    )
}
