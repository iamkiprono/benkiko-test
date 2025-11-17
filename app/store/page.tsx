"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Only button yellow
const yellowButton = "bg-[var(--color-accent)] text-black";

export default function NftStore() {
  const [items, setItems] = useState<{
    id: number;
    image: string;
    name: string;
    price: string;
}[]|[]>([]);

  useEffect(() => {
    const nftNames = [
      "Bored Ape Yacht Club",
      "CryptoPunk #3100",
      "Azuki Spirit",
      "Doodle #777",
      "CloneX Avatar",
      "Moonbirds Feather",
      "World of Women Icon",
      "Mutant Ape Serum",
      "Pudgy Penguin",
      "Cool Cat #1729",
      "DeGod Alpha",
      "Milady Maker"
    ];

    const generated = nftNames.map((name, i) => ({
      id: i,
      image: `https://picsum.photos/400?random=${i + 1}`,
      name: name,
      price: (Math.random() * 2 + 0.2).toFixed(2),
    }));

    setItems(generated);
  }, []);

  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {items.map((item) => (
          <Card key={item.id} className="rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />
              <p className="text-sm text-gray-600 mb-3">Price: {item.price} ETH</p>
              <Button className={`${yellowButton} hover:bg-yellow-600 w-full rounded-xl py-2 font-medium`}>Buy NFT</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}