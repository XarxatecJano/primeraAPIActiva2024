var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBaseURL } from './BaseURL.js';
function fillInUpdateUserForm(userData) {
    document.querySelector("#name-field").value = userData.name;
    document.querySelector("#surname-field").value = userData.first_surname;
    document.querySelector("#username-field").value = userData.userName;
    document.querySelector("#password-field").value = userData.password;
    document.querySelector("#email-field").value = userData.email;
}
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const pathname = window.location.pathname; //TO-DO: hacerlo con params y window.locator.search
    const id = parseInt(pathname.split('/').pop());
    if (!isNaN(id)) {
        const baseURL = yield getBaseURL();
        const userData = yield fetch(`${baseURL === null || baseURL === void 0 ? void 0 : baseURL.header}/api/v1/users/${id}`);
        const userDataJson = yield userData.json();
        fillInUpdateUserForm(userDataJson[0]);
        (_a = document.querySelector("#userForm")) === null || _a === void 0 ? void 0 : _a.setAttribute("action", `/api/v1/users/${id}`);
    }
}));
