import {setupWorker} from "msw/browser";
import { addReivew, reivewById, reviewForMain } from "./reivew";

const handlers = [reivewById,addReivew,reviewForMain];

export const worker = setupWorker(...handlers);