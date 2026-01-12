import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Order } from "./types";
import Link from "next/link";

export default async function CrossmintSuccessPage({ params }: { params: { slug: string } }) {
const param = await params;
const slug = param.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CROSSMINT_STAGING_API}/api/2022-06-09/orders/${slug}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_SERVER_CROSSMINT_API_KEY ?? "",
      },
      cache: "no-store",
    }
  );

  const order: Order = await res.json();
  const item = order.lineItems?.[0];

  const isUnavailable =
    order.quote?.status === "all-line-items-unavailable" ||
    item?.quote?.status === "item-unavailable";

  return (
    <div className="min-h-screen w-full bg-yellow-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <Card className="rounded-2xl shadow-xl border-yellow-200">
          {/* Header */}
          <CardHeader
            className={`flex flex-col items-center text-center gap-3 rounded-t-2xl ${
              isUnavailable
                ? "bg-gradient-to-r from-yellow-300 to-yellow-200"
                : "bg-gradient-to-r from-yellow-400 to-yellow-300"
            }`}
          >
            {isUnavailable ? (
              <AlertTriangle className="h-14 w-14 text-yellow-900" />
            ) : (
              <CheckCircle2 className="h-14 w-14 text-yellow-900" />
            )}

            <CardTitle className="text-2xl font-bold text-yellow-900">
              {isUnavailable ? "Item Unavailable" : "Checkout Created"}
            </CardTitle>

            <p className="text-sm text-yellow-800">
              {isUnavailable
                ? "This item is currently sold out. No payment was taken."
                : "Your Crossmint order was created and is awaiting payment."}
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Order Details */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Order Details</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono">{order.orderId}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phase</span>
                <span>{order.phase}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span>{order.payment?.method}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currency</span>
                <span>{order.payment?.currency?.toUpperCase()}</span>
              </div>
            </section>

            <Separator />

            {/* Item */}
            {item && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Item</h3>

                <div className="flex items-center gap-4">
                  {item.metadata?.imageUrl && (
                    <img
                      src={item.metadata.imageUrl}
                      alt="Item preview"
                      className="h-16 w-16 rounded-lg border object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.metadata?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.metadata?.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Chain</span>
                  <span>{item.chain}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>{item.quantity}</span>
                </div>

                {item.quote?.status === "item-unavailable" && (
                  <div className="rounded-md bg-yellow-100 border border-yellow-300 p-3 text-sm text-yellow-900">
                    {/* @ts-expect-error unknown type */}
                    Sold out: {item.quote.unavailabilityReason?.message}
                  </div>
                )}
              </section>
            )}

            <Separator />

            {/* Delivery */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Delivery</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient Email</span>
                <span>{item?.delivery?.recipient?.email}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wallet</span>
                <span className="font-mono">
                  {item?.delivery?.recipient?.walletAddress}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-yellow-700 font-medium">
                  {order.payment?.status}
                </span>
              </div>
            </section>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {!isUnavailable && (
                <Button className="w-full sm:flex-1 bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-500">
                  Continue Payment
                </Button>
              )}
<Link href={"/store"}>
              <Button variant="outline" className="w-full sm:flex-1">
                Back to Store
              </Button>
</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
