'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"

// Use this to pass the Price to the page
// const handleCheckout = () => {
//     router.push(`/checkout?price=${price}`)
// }



interface CheckoutData {
    shipping: {
        firstName: string
        lastName: string
        address1: string
        address2: string
        city: string
        state: string
        zip: string
    }
    billing: {
        firstName: string
        lastName: string
        address1: string
        address2: string
        city: string
        state: string
        zip: string
    }
    sameAsShipping: boolean
    payment: {
        cardName: string
        cardNumber: string
        expDate: string
        csv: string
    }
}

interface CheckoutProps {
    price: number
}

export default function Component({ price }: CheckoutProps) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<CheckoutData>({
        shipping: {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: ''
        },
        billing: {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: ''
        },
        sameAsShipping: false,
        payment: {
            cardName: '',
            cardNumber: '',
            expDate: '',
            csv: ''
        }
    })

    const handleInputChange = (section: 'shipping' | 'billing' | 'payment', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleSameAsShipping = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            sameAsShipping: checked,
            billing: checked ? prev.shipping : prev.billing
        }))
    }

    const renderShippingForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="shipping-firstName">First Name</Label>
                <Input
                    id="shipping-firstName"
                    value={formData.shipping.firstName}
                    onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                    placeholder="J. John"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="shipping-lastName">Last Name</Label>
                <Input
                    id="shipping-lastName"
                    value={formData.shipping.lastName}
                    onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                    placeholder="Smith"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="shipping-address1">Address</Label>
                <Input
                    id="shipping-address1"
                    value={formData.shipping.address1}
                    onChange={(e) => handleInputChange('shipping', 'address1', e.target.value)}
                    placeholder="Address Line One"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="shipping-address2">Optional Address Line Two</Label>
                <Input
                    id="shipping-address2"
                    value={formData.shipping.address2}
                    onChange={(e) => handleInputChange('shipping', 'address2', e.target.value)}
                    placeholder="Address Line Two"
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="shipping-city">City</Label>
                    <Input
                        id="shipping-city"
                        value={formData.shipping.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        placeholder="City"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="shipping-state">State</Label>
                    <Input
                        id="shipping-state"
                        value={formData.shipping.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        placeholder="State"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="shipping-zip">ZIP</Label>
                    <Input
                        id="shipping-zip"
                        value={formData.shipping.zip}
                        onChange={(e) => handleInputChange('shipping', 'zip', e.target.value)}
                        placeholder="XXXXX"
                    />
                </div>
            </div>
        </div>
    )

    const renderBillingForm = () => (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                    id="same-as-shipping"
                    checked={formData.sameAsShipping}
                    onChange={(e) => handleSameAsShipping(e.target.checked)}
                    label="My billing address is the same as my shipping"
                />
                <Label htmlFor="same-as-shipping">My billing address is the same as my shipping</Label>
            </div>
            {!formData.sameAsShipping && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="billing-firstName">First Name</Label>
                        <Input
                            id="billing-firstName"
                            value={formData.billing.firstName}
                            onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                            placeholder="J. John"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="billing-lastName">Last Name</Label>
                        <Input
                            id="billing-lastName"
                            value={formData.billing.lastName}
                            onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                            placeholder="Smith"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="billing-address1">Address</Label>
                        <Input
                            id="billing-address1"
                            value={formData.billing.address1}
                            onChange={(e) => handleInputChange('billing', 'address1', e.target.value)}
                            placeholder="Address Line One"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="billing-address2">Optional Address Line Two</Label>
                        <Input
                            id="billing-address2"
                            value={formData.billing.address2}
                            onChange={(e) => handleInputChange('billing', 'address2', e.target.value)}
                            placeholder="Address Line Two"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="billing-city">City</Label>
                            <Input
                                id="billing-city"
                                value={formData.billing.city}
                                onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                                placeholder="City"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="billing-state">State</Label>
                            <Input
                                id="billing-state"
                                value={formData.billing.state}
                                onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                                placeholder="State"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="billing-zip">ZIP</Label>
                            <Input
                                id="billing-zip"
                                value={formData.billing.zip}
                                onChange={(e) => handleInputChange('billing', 'zip', e.target.value)}
                                placeholder="XXXXX"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )

    const renderPaymentForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input
                    id="card-name"
                    value={formData.payment.cardName}
                    onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                    placeholder="J. John D. Smith"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                    id="card-number"
                    value={formData.payment.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    placeholder="1234 5678 9101 1121"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="exp-date">Exp. Date</Label>
                    <Input
                        id="exp-date"
                        value={formData.payment.expDate}
                        onChange={(e) => handleInputChange('payment', 'expDate', e.target.value)}
                        placeholder="MM/YY"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="csv">CSV</Label>
                    <Input
                        id="csv"
                        value={formData.payment.csv}
                        onChange={(e) => handleInputChange('payment', 'csv', e.target.value)}
                        placeholder="XXX"
                    />
                </div>
            </div>
        </div>
    )

    const renderReviewPage = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold">Name</h3>
                <p className="bg-gray-100 p-2 rounded">
                    {formData.shipping.firstName} {formData.shipping.lastName}
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Shipping Address</h3>
                <p className="bg-gray-100 p-2 rounded">
                    {formData.shipping.address1}
                    {formData.shipping.address2 && <br />}
                    {formData.shipping.address2}
                    <br />
                    {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zip}
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Payment Method</h3>
                <p className="bg-gray-100 p-2 rounded">
                    **** **** **** {formData.payment.cardNumber.slice(-4)}
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Total</h3>
                <p className="bg-gray-100 p-2 rounded text-lg font-bold">
                    ${price.toFixed(2)}
                </p>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Checkout" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-semibold">Shipping</h2>
                        {renderShippingForm()}
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold">Billing</h2>
                        {renderBillingForm()}
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className="text-lg font-semibold">Credit Card Information</h2>
                        {renderPaymentForm()}
                    </>
                )}
                {step === 4 && (
                    <>
                        <h2 className="text-lg font-semibold">Review & Confirm</h2>
                        {renderReviewPage()}
                    </>
                )}

                <Button
                    className="w-full bg-[#98D8AA] hover:bg-[#98D8AA]/90 text-black"
                    onClick={() => {
                        if (step < 4) {
                            setStep(step + 1)
                        } else {
                            // Handle order submission
                            console.log('Order submitted:', { ...formData, price })
                        }
                    }}
                >
                    {step === 4 ? 'Submit Order' : 'Continue'}
                </Button>
            </main>

            <BottomNavBar />
        </div>
    )
}