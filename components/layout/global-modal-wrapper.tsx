"use client"

import { useModal } from "@/context/modal-context"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const WhatsAppModal = dynamic(() => import("@/components/modals/whatsapp-modal"))

export default function GlobalModalWrapper() {
    const { isModalOpen, closeModal } = useModal()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        if (isModalOpen) setHasMounted(true)
    }, [isModalOpen])

    if (!hasMounted) return null

    return <WhatsAppModal isOpen={isModalOpen} onClose={closeModal} />
}
