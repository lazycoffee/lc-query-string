interface QueryObject {
    [key: string]: string | Array<string>;
}
declare const lib: {
    parse(str?: string): {
        [key: string]: string | string[];
    };
    stringVal(v: any): string;
    stringify(queryObj?: QueryObject): string;
};
