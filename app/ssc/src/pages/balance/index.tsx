'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/router"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { Label } from '@/components/ui/label'
import { SelectValue } from '@radix-ui/react-select'
import { format } from 'util'

export default function BalanceView() {
	const router = useRouter()
	const [displayBalance, setDisplayBalance] = useState(0)
	const [isAddingFunds, setIsAddingFunds] = useState(false)
	const [additionalFunds, setAdditionalFunds] = useState("0.00")
	const [inputLastKey, setInputLastKey] = useState("0")
	const [inputIsFocused, setInputIsFocused] = useState(false)
	const targetBalance = 123.99
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		animateBalance(0, targetBalance)
	}, [])


	const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		let current: string = additionalFunds.replace(/[^0-9]/g, "");
		let parsed: number = 0;
		if (e.target.value.length > additionalFunds.length) { // If we're adding to this
			current += inputLastKey.replace(/[^0-9]/g, "");
			parsed = parseFloat(current)/100;
		} else {
			current = current.substring(0, current.length-1);
			parsed = parseFloat(current)/100 || 0;
		}
		setAdditionalFunds(parsed.toFixed(2));
	}

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setInputLastKey(e.key)
	}

	const animateBalance = (start: number, end: number) => {
		const duration = 1000
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
	}

	const handleAddFunds = () => {
		setIsAddingFunds(true)
		setTimeout(() => inputRef.current?.focus(), 500)
	}

	const handleBackToBalance = () => {
		setIsAddingFunds(false)
		setAdditionalFunds("0.00")
	}

	const handleConfirmAddFunds = () => {
		const newBalance = displayBalance + parseFloat(additionalFunds || '0')
		animateBalance(displayBalance, newBalance)
		setIsAddingFunds(false)
		setAdditionalFunds("0.00")
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header
				title={isAddingFunds ? "Add Funds" : "Student Card Balance"}
				onBackClick={isAddingFunds ? handleBackToBalance : () => router.back()}
			/>

			<main className="flex-1 flex flex-col items-center px-4 pt-12 transition-all duration-500 ease-in-out">
				<h2 className="text-2xl mb-8">Current Balance</h2>
				<div className="text-6xl font-bold mb-12">
					${displayBalance.toFixed(2)}
				</div>

				{isAddingFunds && (
					<div className="flex flex-col items-center w-full max-w-xs mb-8 transition-all duration-500 ease-in-out">
						<div className="text-4xl mb-4">+${parseFloat(additionalFunds).toFixed(2)}</div>
						<div className="w-full h-px bg-gray-300 mb-4"></div>
						<div className="text-4xl font-bold">
							${(displayBalance + parseFloat(additionalFunds || '0')).toFixed(2)}
						</div>
						<div className="flex items-center space-x-2">
							<Label htmlFor="userInputFunds" className='font-medium'>
								Additional Funds:
							</Label>
							<Input
								id="userInputFunds"
								ref={inputRef}
								type="number"
								step="0.01"
								min="0.01"
								onChange={handleInputChanged}
								onKeyDown={handleOnKeyDown}
								value={additionalFunds}
								className="text-center text-2xl mb-4"
								placeholder="0.00"
							/>
						</div>
					</div>
				)}
				<Button
					variant="outline"
					className={`w-full max-w-xs rounded-full border-2 transition-all duration-500 ease-in-out ${isAddingFunds ? 'mt-8' : ''}`}
					onClick={isAddingFunds ? handleConfirmAddFunds : handleAddFunds}
				>
					{isAddingFunds ? 'Confirm' : 'Add Funds'}
				</Button>
			</main>

			<NavBar />

			{/* Bottom Spacing for Fixed Navigation */}
			<div className="h-[72px]" />
		</div>
	)
}