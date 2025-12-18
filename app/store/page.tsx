"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Only button yellow
const yellowButton = "bg-[var(--color-accent)] text-black";

const options = {
  method: 'GET',
  headers: {
    'X-API-KEY': process.env.NEXT_SERVER_CROSSMINT_API_KEY
  }
};

async function getCollections() {
  try {
    const res = await fetch(
      'https://staging.crossmint.com/api/2022-06-09/collections/',
      options
    );

    const data = await res.json();
    return data;   // <-- return success
  } catch (error) {
    return { error: error.message };   // <-- return error
  }
}


export default async function NftStore() {



  const gener = await getCollections()

  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {gener.results.map((item) => (
          <Card key={item.id} className="rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">{item.metadata.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.metadata.imageUrl}
                alt={item.metadata.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />
              <p className="text-sm text-gray-600 mb-3">Price: {item.payments.price} {item.payments.currency}</p>
              <Button className={`${yellowButton} hover:bg-yellow-600 w-full rounded-xl py-2 font-medium`}>Buy NFT</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}