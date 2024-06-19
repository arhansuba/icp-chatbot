import { BaseConnectResponse, TransferNFTWithIdentifier, TransferToken, Wallet } from '@astrox/sdk-core';
import { JsonnableDelegationChain } from '@dfinity/identity';
export interface WebViewConnectResponse extends BaseConnectResponse {
    cacheKey: string;
    chain?: JsonnableDelegationChain;
    wallet?: Wallet;
    confirm?: boolean;
}
export type DelegationMode = 'global' | 'domain';
export interface WebViewConnectRequest {
    delegationTargets?: Array<string>;
    noUnify?: boolean;
    host: string;
    customDomain?: string;
    delegationModes?: Array<DelegationMode>;
}
export interface BalanceResponseObject {
    amount: number;
    canisterId: string;
    decimals: number;
    image?: string;
    name: string;
    symbol: string;
}
export interface WebViewAuthResponse {
    authorized: boolean;
    payload?: WebViewConnectResponse;
}
export interface SupportedToken {
    decimals: number;
    fee: bigint;
    name: string;
    symbol: string;
    standard: string;
    canisterId: string;
}
export interface BaseBridgeErrorResponse {
    kind: string;
    text: string;
}
export declare enum TransactionMessageKind {
    success = "transaction-client-success",
    fail = "transaction-client-failure"
}
export declare enum TransactionType {
    token = "token",
    nft = "nft"
}
export interface TransactionResponseFailure {
    kind: TransactionMessageKind.fail | string;
    text: string;
}
export interface TokenTransferResponse {
    blockHeight?: bigint;
    amount?: string;
    transactionId?: string;
    originPayload: TransferToken;
}
export interface NFTTransferResponse {
    success: true;
    originPayload: TransferNFTWithIdentifier;
}
export interface TransactionResponseSuccess {
    kind: TransactionMessageKind.success | string;
    type: TransactionType | string;
    payload?: TokenTransferResponse | NFTTransferResponse;
}
export type TransactionResponse = TransactionResponseSuccess | TransactionResponseFailure;
export type NetworkState = 'bluetooth' | 'wifi' | 'ethernet' | 'mobile' | 'none' | 'vpn' | null;
export type Brightness = 'dark' | 'light';
export interface Screen {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export interface Device {
    model?: string;
    uuid?: string;
    osName?: string;
    osVersion?: string;
}
export interface InitInfo {
    devicePixelRatio: number;
    screen: Screen;
    brightness: Brightness;
    device: Device;
    networkState?: NetworkState;
}
//# sourceMappingURL=types.d.ts.map