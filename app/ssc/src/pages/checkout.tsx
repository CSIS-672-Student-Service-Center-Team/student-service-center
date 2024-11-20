"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ui/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { currentUserId } from "@/lib/currentUser";

export interface CheckoutData {
  shipping?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  billing?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  sameAsShipping?: boolean;
  payment: {
    cardName: string;
    cardNumber: string;
    expDate: string;
    csv: string;
  };
}

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState<number>(0);
  const [fromURL, setFromURL] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutData>({
    shipping: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    billing: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    sameAsShipping: false,
    payment: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      csv: "",
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parse URL parameters
        const priceParam = searchParams.get("price");
        const typeParam = searchParams.get("type");
        const fromParam = searchParams.get("from");

        if (priceParam) setPrice(parseFloat(priceParam));
        if (typeParam) setPaymentType(typeParam);
        if (fromParam) setFromURL(fromParam);

        // Fetch shipping and billing addresses
        const resShipping = await fetch(`/api/addresses?userId=${currentUserId}&type=shipping`);
        if (!resShipping.ok) throw new Error("Failed to fetch shipping data");
        const shippingData = await resShipping.json();

        const resBilling = await fetch(`/api/addresses?userId=${currentUserId}&type=billing`);
        if (!resBilling.ok) throw new Error("Failed to fetch billing data");
        const billingData = await resBilling.json();

        setFormData((prev) => ({
          ...prev,
          shipping: shippingData[0] || prev.shipping,
          billing: billingData[0] || prev.billing,
        }));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleInputChange = (
    section: "shipping" | "billing" | "payment",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAsShipping = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsShipping: checked,
      billing: checked ? prev.shipping : prev.billing,
    }));
  };

  const handleConfirmation = async () => {
  try {
    const response = await fetch(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUserId,
        amount: price, // Adjust balance by the price amount
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update balance: ${response.status} ${errorText}`);
    }

    // Redirect to confirmation page
    router.replace({
      pathname: `/confirmation`,
      query: {
        amount: price,
        confirmationNumber: "#######",
        fromURL: `${fromURL}`,
      },
    });
  } catch (error) {
    console.error("Error during confirmation:", error);
    alert("Failed to process your request. Please try again.");
  }
};


  const calculateProgress = () => {
    return (step / 4) * 100;
  };

  const formatCreditCard = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCreditCard(e.target.value);
    handleInputChange("payment", "cardNumber", formattedValue);
  };

  const renderShippingForm = () => {
    if (!formData.shipping) {
      setStep(step + 1);
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shipping-firstName">First Name</Label>
          <Input
            id="shipping-firstName"
            value={formData.shipping.firstName}
            onChange={(e) =>
              handleInputChange("shipping", "firstName", e.target.value)
            }
            placeholder="J. John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-lastName">Last Name</Label>
          <Input
            id="shipping-lastName"
            value={formData.shipping.lastName}
            onChange={(e) =>
              handleInputChange("shipping", "lastName", e.target.value)
            }
            placeholder="Smith"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-address1">Address</Label>
          <Input
            id="shipping-address1"
            value={formData.shipping.address1}
            onChange={(e) =>
              handleInputChange("shipping", "address1", e.target.value)
            }
            placeholder="Address Line One"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-address2">Optional Address Line Two</Label>
          <Input
            id="shipping-address2"
            value={formData.shipping.address2}
            onChange={(e) =>
              handleInputChange("shipping", "address2", e.target.value)
            }
            placeholder="Address Line Two"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shipping-city">City</Label>
            <Input
              id="shipping-city"
              value={formData.shipping.city}
              onChange={(e) =>
                handleInputChange("shipping", "city", e.target.value)
              }
              placeholder="City"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping-state">State</Label>
            <Input
              id="shipping-state"
              value={formData.shipping.state}
              onChange={(e) =>
                handleInputChange("shipping", "state", e.target.value)
              }
              placeholder="State"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping-zip">ZIP</Label>
            <Input
              id="shipping-zip"
              value={formData.shipping.zip}
              onChange={(e) =>
                handleInputChange("shipping", "zip", e.target.value)
              }
              placeholder="XXXXX"
              required
            />
          </div>
        </div>
      </div>
    );
  };

  const renderBillingForm = () => {
    if (!formData.billing) {
      setStep(step + 1);
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="same-as-shipping"
            checked={formData.sameAsShipping}
            onCheckedChange={(checked) =>
              handleSameAsShipping(checked as boolean)
            }
          />
          <Label htmlFor="same-as-shipping">
            My billing address is the same as my shipping
          </Label>
        </div>
        {!formData.sameAsShipping && (
          <>
            <div className="space-y-2">
              <Label htmlFor="billing-firstName">First Name</Label>
              <Input
                id="billing-firstName"
                value={formData.billing.firstName}
                onChange={(e) =>
                  handleInputChange("billing", "firstName", e.target.value)
                }
                placeholder="J. John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-lastName">Last Name</Label>
              <Input
                id="billing-lastName"
                value={formData.billing.lastName}
                onChange={(e) =>
                  handleInputChange("billing", "lastName", e.target.value)
                }
                placeholder="Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-address1">Address</Label>
              <Input
                id="billing-address1"
                value={formData.billing.address1}
                onChange={(e) =>
                  handleInputChange("billing", "address1", e.target.value)
                }
                placeholder="Address Line One"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-address2">
                Optional Address Line Two
              </Label>
              <Input
                id="billing-address2"
                value={formData.billing.address2}
                onChange={(e) =>
                  handleInputChange("billing", "address2", e.target.value)
                }
                placeholder="Address Line Two"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billing-city">City</Label>
                <Input
                  id="billing-city"
                  value={formData.billing.city}
                  onChange={(e) =>
                    handleInputChange("billing", "city", e.target.value)
                  }
                  placeholder="City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-state">State</Label>
                <Input
                  id="billing-state"
                  value={formData.billing.state}
                  onChange={(e) =>
                    handleInputChange("billing", "state", e.target.value)
                  }
                  placeholder="State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-zip">ZIP</Label>
                <Input
                  id="billing-zip"
                  value={formData.billing.zip}
                  onChange={(e) =>
                    handleInputChange("billing", "zip", e.target.value)
                  }
                  placeholder="XXXXX"
                  required
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderPaymentForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-name">Name on Card</Label>
        <Input
          id="card-name"
          value={formData.payment.cardName}
          onChange={(e) =>
            handleInputChange("payment", "cardName", e.target.value)
          }
          placeholder="J. John D. Smith"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          value={formData.payment.cardNumber}
          onChange={handleCreditCardChange}
          placeholder="1234 5678 9101 1121"
          required
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exp-date">Exp. Date</Label>
          <Input
            id="exp-date"
            value={formData.payment.expDate}
            onChange={(e) =>
              handleInputChange("payment", "expDate", e.target.value)
            }
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="csv">CSV</Label>
          <Input
            id="csv"
            value={formData.payment.csv}
            onChange={(e) =>
              handleInputChange("payment", "csv", e.target.value)
            }
            placeholder="XXX"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderReviewPage = () => (
    <div className="space-y-6">
      {formData.shipping && (
        <div className="space-y-2">
          <h3 className="font-semibold">Name</h3>
          <p className="bg-gray-100 p-2 rounded">
            {formData.shipping.firstName} {formData.shipping.lastName}
          </p>
        </div>
      )}

      {formData.shipping && (
        <div className="space-y-2">
          <h3 className="font-semibold">Shipping Address</h3>
          <p className="bg-gray-100 p-2 rounded">
            {formData.shipping.address1}
            {formData.shipping.address2 && <br />}
            {formData.shipping.address2}
            <br />
            {formData.shipping.city}, {formData.shipping.state}{" "}
            {formData.shipping.zip}
          </p>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-semibold">Payment Method</h3>
        <p className="bg-gray-100 p-2 rounded">
          **** **** **** {formData.payment.cardNumber.slice(-4)}
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Payment Type</h3>
        <p className="bg-gray-100 p-2 rounded capitalize">{paymentType}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Total</h3>
        <p className="bg-gray-100 p-2 rounded text-lg font-bold">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Checkout" isHomeScreen={false} />

      <main className="flex-1 p-4 space-y-6 pt-20 pb-24 overflow-y-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-[#841414]">
              Charge Amount
            </h2>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-black">
                ${price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 capitalize">
                {paymentType} Payment
              </span>
            </div>
          </CardContent>
        </Card>
        <ProgressBar progress={calculateProgress()} />

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
              setStep(step + 1);
            } else {
              handleConfirmation();
              console.log("Order submitted:", {
                ...formData,
                price,
                paymentType,
              });
            }
          }}
        >
          {step === 4 ? "Submit Order" : "Continue"}
        </Button>
      </main>

      <BottomNavBar />
    </div>
  );
}
