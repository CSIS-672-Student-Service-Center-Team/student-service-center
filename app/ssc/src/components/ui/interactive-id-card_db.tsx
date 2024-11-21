'use client'

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Wifi } from 'lucide-react'
import { currentUserId } from "@/lib/currentUser"

interface UserData {
    id: number
    name: string
    id_number: string
    email: string
    photo_url: string
    address: string
    phone_number: string
}

export default function InteractiveIdCardDb() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isNfcActive, setIsNfcActive] = useState(false)
    const longPressTimer = useRef<NodeJS.Timeout | null>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data for ID:', currentUserId)
                const response = await fetch(`/api/users?userId=${currentUserId}`)
                console.log('Response status:', response.status)

                if (response.ok) {
                    const data = await response.json()
                    console.log('Received data:', data)
                    setUserData(data)
                } else {
                    const errorData = await response.json()
                    setError(errorData.message || 'Failed to fetch user data')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
                setError('Failed to fetch user data. Please check the console for details.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [])

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

    if (isLoading) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!userData) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="text-center">
                        No user data found
                    </div>
                </CardContent>
            </Card>
        )
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
                                src={userData.photo_url}
                                alt="Student Photo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg border-2 border-white shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-white text-xl font-bold mb-1">{userData.name}</h2>
                            <div className="bg-white text-red-800 px-2 py-0.5 rounded text-xs font-semibold mb-1 w-fit">
                                {userData.id_number}
                            </div>
                            <p className="text-red-100 text-xs">{userData.email}</p>
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

            <AnimatePresence>
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
            </AnimatePresence>
        </motion.div>
    )
}