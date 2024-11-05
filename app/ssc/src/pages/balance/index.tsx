'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { Label } from '@/components/ui/label'
import { CheckoutData } from '@/pages/checkout'

import ActionButton from '@/components/ui/actionButton'

export default function BalanceView() {
	const router = useRouter()
	const from = "balance" //	For routing
	const animationDuration = 1000
	const [yTranslation, setYTranslation] = useState(0)
	const [displayBalance, setDisplayBalance] = useState(0)
	const [isAddingFunds, setIsAddingFunds] = useState(false)
	const [addingFundsAnimation, setFundsAnimation] = useState(false)
	const [additionalFunds, setAdditionalFunds] = useState("0.00")
	const [inputLastKey, setInputLastKey] = useState("0")
	const [yDown, setYDown] = useState(true)
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
			parsed = parseFloat(current) / 100;
		} else {
			current = current.substring(0, current.length - 1);
			parsed = parseFloat(current) / 100 || 0;
		}
		if (parsed < 1000 && parsed >= 0) {
			setAdditionalFunds(parsed.toFixed(2));
		}
	}

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setInputLastKey(e.key)
	}

	const animateBalance = (start: number, end: number) => {
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
	}

	const handleAddFunds = () => {
		setFundsAnimation(true)
		setYTranslation(40)
		setTimeout(() => {
			setIsAddingFunds(true)
			setYTranslation(0)
			setFundsAnimation(false)
		}, animationDuration)
		setTimeout(() => inputRef.current?.focus(), animationDuration)
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
		router.push(`/checkout?price=${additionalFunds}&type=card-balanc&from=${from}`);
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header
				title={isAddingFunds ? "Add Funds" : "Student Card Balance"}
				onBackClick={isAddingFunds ? handleBackToBalance : () => router.back()}
			/>

			<main className="flex-1 flex flex-col items-center px-4 pt-12 transition-all duration-500 ease-in-out">
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
					className={`${addingFundsAnimation ? `transition-transform duration-${animationDuration} ease-in-out ` : ''} ${yDown ? '': '-'}translate-y-${yTranslation}`}
					
				>
					<ActionButton
						onClick={isAddingFunds ? handleConfirmAddFunds : handleAddFunds}
						label={isAddingFunds ? 'Confirm' : 'Add Funds'}
					>
					</ActionButton>
				</div>
			</main>

			<NavBar />

			{/* Bottom Spacing for Fixed Navigation */}
			<div className="h-[72px]" />
		</div>
	)
}