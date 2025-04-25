import "@testing-library/jest-dom";
import { Blob } from "buffer";
import "whatwg-fetch";

global.Blob = Blob;
global.fetch = fetch;