"use client"

import { useModal } from "@/context/modal-context"
import WhatsAppModal from "@/components/modals/whatsapp-modal"

export default function GlobalModalWrapper() {
    const { isModalOpen, closeModal } = useModal()
    return <WhatsAppModal isOpen={isModalOpen} onClose={closeModal} />
}
