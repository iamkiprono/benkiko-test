export interface WalletTypes {
    symbol:    string;
    name:      string;
    decimals:  number;
    amount:    string;
    rawAmount: string;
    chains:    Chains;
}

export interface Chains {
    base:   Base;
    solana: Base;
}

export interface Base {
    contractAddress?: string;
    locator:          string;
    amount:           string;
    rawAmount:        string;
    mintHash?:        string;
}
