export declare class MethodBuilder<T> {
    private readonly bridge;
    private readonly method;
    constructor(bridge: string, method: string);
    invoke(...params: any): Promise<T>;
}
//# sourceMappingURL=method.d.ts.map