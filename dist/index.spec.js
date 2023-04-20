"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const index_1 = require("./index");
describe("Tests the public API", () => {
    it("detects tar with offset", () => {
        const buffer = fs.readFileSync(require.resolve("./testfiles/a.tar"));
        const bytes = Array.prototype.slice.call(buffer, 0);
        expect((0, index_1.filetypeinfo)(bytes)).toHaveLength(1);
        expect((0, index_1.filetypeinfo)(bytes)[0].typename).toBe("tar");
    });
    it("detects apng", () => {
        const buffer = fs.readFileSync(require.resolve("./testfiles/a.apng"));
        const bytes = Array.prototype.slice.call(buffer, 0);
        expect((0, index_1.filetypeinfo)(bytes)).toHaveLength(2);
        expect((0, index_1.filetypeinfo)(bytes)[1].typename).toBe("apng");
        expect((0, index_1.filetypeinfo)(bytes)[1].mime).toBe("image/apng");
        expect((0, index_1.filetypeinfo)(bytes)[0].typename).toBe("png");
        expect((0, index_1.filetypeinfo)(bytes)[0].mime).toBe("image/png");
    });
    it("detects mp4", () => {
        const buffer = fs.readFileSync(require.resolve("./testfiles/a.mp4"));
        const bytes = Array.prototype.slice.call(buffer, 0);
        expect((0, index_1.filetypeinfo)(bytes)).toHaveLength(1);
        expect((0, index_1.filetypeinfo)(bytes)[0].typename).toBe("mp4");
        expect((0, index_1.filetypeinfo)(bytes)[0].mime).toBe("video/mp4");
    });
    it("filetypeinfo", () => {
        const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypeinfo)(bytes)).toHaveLength(2);
        expect((0, index_1.filetypeinfo)(bytes)[0]).toHaveProperty("typename");
    });
    it("filetypename", () => {
        const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypename)(bytes)).toHaveLength(2);
        expect((0, index_1.filetypename)(bytes)).toEqual(["png", "apng"]);
    });
    it("filetypename failure", () => {
        const bytes = [0x89, 0x00, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypename)(bytes)).toHaveLength(0);
        expect((0, index_1.filetypename)(bytes)).toEqual([]);
    });
    it("filetypemime", () => {
        const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypemime)(bytes)).toHaveLength(2);
        expect((0, index_1.filetypemime)(bytes)).toEqual(["image/png", "image/apng"]);
    });
    it("filetypemime not found", () => {
        const bytes = [0x89, 0x50, 0x00, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypemime)(bytes)).toHaveLength(0);
        expect((0, index_1.filetypemime)(bytes)).toEqual([]);
    });
    it("filetypeextension", () => {
        const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypeextension)(bytes)).toHaveLength(2);
        expect((0, index_1.filetypeextension)(bytes)).toEqual(["png", "apng"]);
    });
    it("filetypextension not found", () => {
        const bytes = [0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
        expect((0, index_1.filetypeextension)(bytes)).toHaveLength(0);
        expect((0, index_1.filetypeextension)(bytes)).toEqual([]);
    });
});
