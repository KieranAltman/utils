import axios from "axios";
import type { AxiosRequestConfig, Axios } from "axios";

interface PinataAPIKey {
  apiKey: string;
  secretApiKey: string;
}

type PinataJWTKey = string;

export class PinataProvider {
  private axios: Axios;

  constructor(auth: PinataAPIKey | PinataJWTKey) {
    const headers =
      typeof auth === "string"
        ? { authorization: `Bearer ${auth}` }
        : { pinata_api_key: auth.apiKey, pinata_secret_api_key: auth.secretApiKey };

    this.axios = axios.create({
      baseURL: "https://api.pinata.cloud/pinning/",
      headers,
    });
  }

  async request(url: string, data = {}, option?: AxiosRequestConfig): Promise<string> {
    try {
      const {
        data: { IpfsHash },
      } = await this.axios.post(url, data, option);

      return IpfsHash;
    } catch (e: any) {
      console.log("Request error", e?.message ?? "Unknown");
      throw e;
    }
  }

  pinFileToIPFS(file: File) {
    const data = new FormData();
    data.append("file", file);
    return this.request("pinFileToIPFS", data);
  }

  pinJSONToIPFS(data: Object) {
    return this.request("pinJSONToIPFS", data);
  }

  pinFilesToIPFS(files: File[]) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    return this.request("pinFileToIPFS", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  }
}

let pinataProvider: PinataProvider;
export function getPinataProvider() {
  if (!pinataProvider)
    throw Error("Initialize provider with initPinataProvider() before using getPinataProvider()");

  return pinataProvider;
}
export function initPinataProvider(auth: PinataAPIKey | PinataJWTKey) {
  pinataProvider = new PinataProvider(auth);
  return pinataProvider;
}
