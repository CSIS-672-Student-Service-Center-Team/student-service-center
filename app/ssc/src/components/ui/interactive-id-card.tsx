'use client'

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
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
            className="relative w-full max-w-md mx-auto"
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
            <Card className="w-full overflow-hidden border-2 border-[#8B1A1A] drop-shadow-lg">
                <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-red-800 to-red-900 p-4 flex items-center">
                        <div className="relative w-24 h-24 mr-4">
                            <Image
                                src={photoUrl}
                                alt="Student Photo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg border-2 border-white shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-white text-xl font-bold mb-1">{name}</h2>
                            <Badge variant="secondary" className="mb-1 w-fit text-xs">
                                {idNumber}
                            </Badge>
                            <p className="text-red-100 text-xs">{email}</p>
                        </div>
                    </div>
                    <div className="bg-white p-3">
                        <p className="text-red-800 text-xs font-semibold mb-0.5">
                            Student Services Center
                        </p>
                        <p className="text-gray-600 text-[10px]">
                            Valid for the current academic year
                        </p>
                    </div>
                </CardContent>
            </Card>

            {isNfcActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg overflow-hidden"
                >
                    <div className="text-white text-center">
                        <Wifi className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                        <p className="text-xl font-bold">NFC Broadcasting</p>
                        <p className="text-sm">Hold near an NFC reader</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}