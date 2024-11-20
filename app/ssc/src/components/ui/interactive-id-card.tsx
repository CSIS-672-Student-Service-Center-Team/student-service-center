'use client'

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import IdCard from "./idCard"
import { Wifi } from 'lucide-react'

interface InteractiveIdCardProps {
  name: string
  idNumber: string
  email: string
  photoUrl: string
}

export default function InteractiveIdCard({ name, idNumber, email, photoUrl }: InteractiveIdCardProps) {
  const [isNfcActive, setIsNfcActive] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setIsNfcActive(true)
    }, 500) // 500ms for long press
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    setIsNfcActive(false)
  }

  return (
      <motion.div
          ref={cardRef}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={() => {
            if (longPressTimer.current) {
              clearTimeout(longPressTimer.current)
            }
            setIsNfcActive(false)
          }}
      >
        <IdCard name={name} idNumber={idNumber} email={email} photoUrl={photoUrl} />

        {isNfcActive && (
            <motion.div
                key="nfc-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="text-white text-center">
                <Wifi className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <p className="text-2xl font-bold">NFC Broadcasting</p>
                <p className="text-sm">Hold near an NFC reader</p>
              </div>
            </motion.div>
        )}
      </motion.div>
  )
}