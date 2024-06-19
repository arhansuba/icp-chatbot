import { MethodBuilder } from '@astrox/sdk-webview-bridge';
import {
  BalanceResponseObject,
  InitInfo,
  SupportedToken,
  TransactionResponseSuccess,
  WebViewAuthResponse,
} from './types';

const bridgeHandler = 'bridgeCall';

export const init = new MethodBuilder<InitInfo>(bridgeHandler, 'init');
export const connect = new MethodBuilder<WebViewAuthResponse>(bridgeHandler, 'connect');
export const isConnected = new MethodBuilder<boolean>(bridgeHandler, 'isConnected');
export const disconnect = new MethodBuilder<void>(bridgeHandler, 'disconnect');
export const signMessage = new MethodBuilder<string>(bridgeHandler, 'signMessage');
export const requestTransfer = new MethodBuilder<TransactionResponseSuccess>(bridgeHandler, 'requestTransfer');
export const queryBalance = new MethodBuilder<BalanceResponseObject[]>(bridgeHandler, 'queryBalance');
export const appendAuth = new MethodBuilder<WebViewAuthResponse>(bridgeHandler, 'appendAuth');
export const supportedStandardList = new MethodBuilder<SupportedToken[]>(bridgeHandler, 'supportedStandardList');
