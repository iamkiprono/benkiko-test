"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createCheckoutSession } from "@/app/actions/actions";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";

export default function CrossmintCheckout({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const searchParams = useSearchParams()

    const name = searchParams.get('name')

    return (
        <form className="w-full" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            console.log({ arams: await params })

            formData.append("slug", (await params).slug);
            const res = await createCheckoutSession(formData);

            if (res?.error) {
                console.error("Error creating checkout session:", res?.error);
                toast.error("Error creating checkout session: " + res?.error);
            } else {
                console.log("Checkout session created successfully:", res.data);
                toast.success("Checkout session created successfully!");
                redirect(`/store/checkout/success/${res.data.order.orderId}`);

            }
        }}>
            <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4 py-10 w-full">
                <div className="w-full max-w-3xl transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-6">
                    <Card className="rounded-2xl shadow-xl border-yellow-200">
                        {/* Header */}
                        <CardHeader className="rounded-t-2xl bg-gradient-to-r from-yellow-400 to-yellow-300">
                            <CardTitle className="text-2xl font-bold text-yellow-900">
                                Secure Checkout
                            </CardTitle>
                            <p className="text-sm text-yellow-800">
                                Pay securely with Crossmint on Arbitrum Sepolia
                            </p>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer & Shipping */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>

                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input name="email" placeholder="you@example.com" />
                                </div>

                                {/* <div className="space-y-2">
                                    <Label>Wallet Address</Label>
                                    <Input placeholder="0x..." />
                                </div> */}

                                <Separator />

                                <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>

                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input name="name" placeholder="John Smith" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Address Line</Label>
                                    <Input name="line1" placeholder="P.O Box 357 Molo" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input name="city" placeholder="Elburgon" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Postal Code</Label>
                                        <Input name="postalCode" placeholder="20106" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Input name="state" placeholder="Nakuru" />
                                    </div>
                                    <div className="space-y-2">
  <Label>Country</Label>
  <select
    name="country"
    defaultValue="KE"
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
  >
    <option value="">Select country</option>

    {/* Africa */}
    <option value="KE">Kenya</option>
    <option value="UG">Uganda</option>
    <option value="TZ">Tanzania</option>
    <option value="RW">Rwanda</option>
    <option value="NG">Nigeria</option>
    <option value="GH">Ghana</option>
    <option value="ZA">South Africa</option>

    {/* International */}
    <option value="US">United States</option>
    <option value="GB">United Kingdom</option>
    <option value="CA">Canada</option>
    <option value="DE">Germany</option>
    <option value="FR">France</option>
  </select>
</div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-yellow-100 rounded-xl p-5 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-yellow-900">Order Summary</h3>

                                    <div className="flex justify-between text-sm text-gray-800">
                                        <span>Item</span>
                                        <span>{name}</span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-800">
                                        <span>Network</span>
                                        <span>Arbitrum Sepolia</span>
                                    </div>

                                    <Separator />
{/* 
                                    <div className="flex justify-between text-lg font-bold text-yellow-900">
                                        <span>Total</span>
                                        <span>$—</span>
                                    </div> */}
                                </div>

                                <Button className="mt-6 h-12 rounded-xl bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-500 transition-colors">
                                    Pay with Crossmint
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
