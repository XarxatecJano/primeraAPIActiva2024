var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let baseURL = null;
export function getBaseURL() {
    return __awaiter(this, void 0, void 0, function* () {
        if (baseURL)
            return baseURL;
        try {
            const response = yield fetch('/baseURL');
            baseURL = yield response.json();
            console.log('Config cargada:', baseURL);
        }
        catch (error) {
            console.error('Error fetching baseURL:', error);
            throw error;
        }
        return baseURL;
    });
}
