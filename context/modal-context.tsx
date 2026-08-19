"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ModalContextType {
    isModalOpen: boolean
    openModal: (service?: string) => void
    closeModal: () => void
    preselectedService: string
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [preselectedService, setPreselectedService] = useState("")

    const openModal = (service?: string) => {
        if (service) setPreselectedService(service)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        // Optional: Reset service after delay to avoid flicker
        setTimeout(() => setPreselectedService(""), 300)
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, preselectedService }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider")
    }
    return context
}
