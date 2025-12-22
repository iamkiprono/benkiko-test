export interface Order {
    orderId:   string;
    phase:     string;
    locale:    string;
    lineItems: LineItem[];
    quote:     OrderIDB2959Ca565E4466ABd261Bd05Cb4F837PhasePaymentLocaleEnUSLineItemsChainPolygonAmoyQuantity1CallDataQuantity1ADDITIONALPROPERTIESYourOtherMintFunctionArgumentsMetadataNameHeadlessCheckoutDemoDescriptionNFTDescriptionImageURLHTTPSCDNIoImagePNGQuoteStatusValidChargesUnitAmount00001CurrencyEthSalesTaxAmount034CurrencyUsdcShippingAmount0CurrencyUsdcTotalPriceAmount00001CurrencyEthDeliveryStatusAwaitingPaymentRecipientLocatorEmailEmailAddressChainEmailTestyCrossmintCOMWalletAddress0X1234AbcdQuoteStatusValidQuotedAt20240607T165544653ZExpiresAt20240607T175544653ZTotalPriceAmount00001375741CurrencyEthPaymentStatusAwaitingPaymentMethodBaseSepoliaCurrencyEthPreparationChainBaseSepoliaPayerAddress0X1234AbcdSerializedTransaction0X02F90Quote;
    payment:   Payment;
}

export interface LineItem {
    chain:    string;
    quantity: number;
    callData: CallData;
    metadata: Metadata;
    quote:    LineItemQuote;
    delivery: Delivery;
}

export interface CallData {
    quantity:              number;
    ADDITIONAL_PROPERTIES: string;
}

export interface Delivery {
    status:    string;
    recipient: Recipient;
}

export interface Recipient {
    locator:       string;
    email:         string;
    walletAddress: string;
}

export interface Metadata {
    name:        string;
    description: string;
    imageUrl:    string;
}

export interface LineItemQuote {
    status:     string;
    charges:    Charges;
    totalPrice: TotalPrice;
}

export interface Charges {
    unit:     TotalPrice;
    salesTax: TotalPrice;
    shipping: TotalPrice;
}

export interface TotalPrice {
    amount:   string;
    currency: string;
}

export interface Payment {
    status:      string;
    method:      string;
    currency:    string;
    preparation: Preparation;
}

export interface Preparation {
    chain:                 string;
    payerAddress:          string;
    serializedTransaction: string;
}

export interface OrderIDB2959Ca565E4466ABd261Bd05Cb4F837PhasePaymentLocaleEnUSLineItemsChainPolygonAmoyQuantity1CallDataQuantity1ADDITIONALPROPERTIESYourOtherMintFunctionArgumentsMetadataNameHeadlessCheckoutDemoDescriptionNFTDescriptionImageURLHTTPSCDNIoImagePNGQuoteStatusValidChargesUnitAmount00001CurrencyEthSalesTaxAmount034CurrencyUsdcShippingAmount0CurrencyUsdcTotalPriceAmount00001CurrencyEthDeliveryStatusAwaitingPaymentRecipientLocatorEmailEmailAddressChainEmailTestyCrossmintCOMWalletAddress0X1234AbcdQuoteStatusValidQuotedAt20240607T165544653ZExpiresAt20240607T175544653ZTotalPriceAmount00001375741CurrencyEthPaymentStatusAwaitingPaymentMethodBaseSepoliaCurrencyEthPreparationChainBaseSepoliaPayerAddress0X1234AbcdSerializedTransaction0X02F90Quote {
    status:     string;
    quotedAt:   Date;
    expiresAt:  Date;
    totalPrice: TotalPrice;
}
