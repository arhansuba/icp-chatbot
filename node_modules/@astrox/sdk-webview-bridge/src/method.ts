// @ts-nocheck
import { decodeResponse, encodeRequest, rpcBuilder } from './adapter';
import { injectBridgeIfNeed, nextId } from './bridge';

export class MethodBuilder<T> {
  private readonly bridge: string;
  private readonly method: string;

  constructor(bridge: string, method: string) {
    this.bridge = bridge;
    this.method = method;
  }

  async invoke(...params: any): Promise<T> {
    injectBridgeIfNeed();
    const request = rpcBuilder(this.method, ...params);
    request.id = nextId();
    const result = await window._astrox_bridge_.bridgeCall(this.bridge, encodeRequest(request));
    return decodeResponse<T>(result);
  }
}
