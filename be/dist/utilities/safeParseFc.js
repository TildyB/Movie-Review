"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseFc = void 0;
const safeParseFc = (schema, data) => {
    const result = schema.safeParse(data);
    if (result.success === false) {
        console.log(result.error);
        return null;
    }
    return result.data;
};
exports.safeParseFc = safeParseFc;
