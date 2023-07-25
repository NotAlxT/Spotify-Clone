'use client'

import { useEffect, useState } from "react"

import Modal from "@/components/Modal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return (
        <div>
            <Modal title="Test Modal" description="Test Description" isOpen onChange={()=>{}} > 
            Test Children
            </Modal>
        </div>
    )
}

export default ModalProvider