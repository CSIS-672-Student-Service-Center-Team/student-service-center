'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { Label } from '@/components/ui/label'
import { CheckoutData } from '@/pages/checkout'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { currentUserId } from "@/lib/currentUser";

export default function BalanceView() {
    const router = useRouter()
    const from = "balance" //	For routing
    const animationDuration = 400
    const minimumAmount = 5
    const [balanceAnimationComplete, setBalanceAnimationComplete] = useState(false);
    const [yTranslation, setYTranslation] = useState(0)
    const [displayBalance, setDisplayBalance] = useState(0)
    const [isAddingFunds, setIsAddingFunds] = useState(false)
    const [addingFundsAnimation, setFundsAnimation] = useState(false)
    const [additionalFunds, setAdditionalFunds] = useState("0.00")
    const [inputLastKey, setInputLastKey] = useState("0")
    const [yDown, setYDown] = useState(true)
    const [toolTip, setToolTip] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`/api/users?userId=${currentUserId}`);
                if (response.ok) {
                    const data = await response.json();
                    animateBalance(0, data.balance);
                } else {
                    console.error('Failed to fetch balance');
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        inputRef.current?.focus()
    }, [isAddingFunds])


    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let current: string = additionalFunds.replace(/[^0-9]/g, "");
        let parsed: number = 0;
        if (e.target.value.length > additionalFunds.length) { // If we're adding to this
            current += inputLastKey.replace(/[^0-9]/g, "");
            parsed = parseFloat(current) / 100;
        } else {
            current = current.substring(0, current.length - 1);
            parsed = parseFloat(current) / 100 || 0;
        }
        if (parsed < 1000 && parsed >= 0) {
            setAdditionalFunds(parsed.toFixed(2));
        }
    }

    const showTooltip = () => {
        setToolTip(true)
        setTimeout(()=>{
            setToolTip(false)
        },1000)
    }

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setInputLastKey(e.key)
    }

    const animateBalance = (start: number, end: number) => {
        if (balanceAnimationComplete) {
            return;
        }
        const duration = 450
        const steps = 60
        const increment = (end - start) / steps
        let current = start

        const timer = setInterval(() => {
            current += increment
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                setDisplayBalance(end)
                clearInterval(timer)
            } else {
                setDisplayBalance(current)
            }
        }, duration / steps)
        setBalanceAnimationComplete(true)
    }

    const handleAddFunds = () => {
        setFundsAnimation(true)
        setYTranslation(167)
        setTimeout(() => {
            setIsAddingFunds(true)
            setYTranslation(0)
            setFundsAnimation(false)
        }, animationDuration)
        console.log("animate");
    }

    const handleBackToBalance = () => {
        setFundsAnimation(true)
        setIsAddingFunds(false)
        setAdditionalFunds("0.00")
    }

    const handleConfirmAddFunds = () => {
        let checkoutData: CheckoutData = {
            payment: {
                cardName: '',
                cardNumber: '',
                expDate: '',
                csv: ''
            }
        };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        router.push(`/checkout?price=${additionalFunds}&type=card-balance&from=${from}`);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header
                title={isAddingFunds ? "Add Funds" : "Student Card Balance"}
                onBackClick={isAddingFunds ? handleBackToBalance : () => router.back()}
            />

            <main className="flex-1 flex flex-col items-center px-4 pt-12 transition-all duration-500 ease-in-out gap-y-6">
                <span className='min-h-16'></span>
                <h2 className="text-4xl mb-8">Current Balance</h2>
                <div className="text-6xl font-bold mb-12">
                    ${displayBalance.toFixed(2)}
                </div>
                {isAddingFunds && (
                    <div className="flex flex-col items-center w-full max-w-xs mb-8 transition-all duration-500 ease-in-out">
                        <div className="flex items-center w-full">
                            <div className="w-1/5"></div>
                            <Label
                                htmlFor='userInputFunds'
                                className="text-4xl">
                                <span>+</span></Label>
                            <input
                                id="userInputFunds"
                                className="text-4xl w-1/2 text-center focus:outline-dotted focus:outline-zinc-300 focus:bg-zinc-50 focus:caret-slate-200"
                                ref={inputRef}
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder='0.00'
                                onChange={handleInputChanged}
                                onKeyDown={handleOnKeyDown}
                                value={additionalFunds}
                            ></input>
                            {toolTip && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        marginTop: '4px',
                                        padding: '8px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                        color: 'white',
                                        borderRadius: '4px',
                                        whiteSpace: 'nowrap',
                                        zIndex: 10,
                                    }}
                                >
                                    Amount must be at least {minimumAmount}
                                </div>
                            )}
                        </div>
                        <div className="w-full h-px bg-gray-300 mb-4"></div>
                        <div className='flex items-center space-x-2'>
                            <div className="text-4xl font-bold">
                                <span
                                    id="calcSpan"
                                    className='text-7xl'
                                >
                                    ${(displayBalance + parseFloat(additionalFunds || '0')).toFixed(2)}
                                </span>
                            </div>

                        </div>
                    </div>
                )}
                <div
                    className={`${addingFundsAnimation ? `transition-transform duration-${animationDuration} ease-in-out` : ''}`}
                    style={{
                        transform: `translateY(${yTranslation}px)`,
                    }}
                >
                    <Button
                        onClick={isAddingFunds ? handleConfirmAddFunds : handleAddFunds}
                        className="bg-[#841414] hover:bg-[#9a1818] text-white flex items-center justify-center w-60 h-20 text-2xl"
                    >
                        {isAddingFunds && (<CheckCircle />)}
                        <span>
                            {isAddingFunds ? 'Confirm' : 'Add Funds'}
                        </span></Button>
                </div>
            </main>

            <NavBar />

            {/* Bottom Spacing for Fixed Navigation */}
            <div className="h-[72px]" />
        </div>
    )
}