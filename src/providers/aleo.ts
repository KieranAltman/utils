import { HttpProvider } from "./base";

const DefaultAleoUrl = "https://api.explorer.aleo.org/v1/testnet3";

export class AleoProvider extends HttpProvider {
  constructor(url: string) {
    super(url);
  }

  getHeight() {
    return this.get<number>("/latest/height");
  }

  getMapping(program: string, mapKey: string, valueKey: string) {
    return this.get<string>(`/program/${program}/mapping/${mapKey}/${valueKey}`);
  }
}

let aleoProvider: AleoProvider;
export function getAleoProvider() {
  if (!aleoProvider)
    throw Error("Initialize provider with initAleoProvider() before using getAleoProvider()");

  return aleoProvider;
}
export function initAleoProvider(url?: string) {
  aleoProvider = new AleoProvider(url ?? DefaultAleoUrl);
  return aleoProvider;
}

const DefaultAnsUrl = "https://testnet-api.aleonames.id";
export class AnsResolver extends HttpProvider {
  constructor(url?: string) {
    super(url ?? DefaultAnsUrl);
  }

  /**
   * Convert ANS name to address
   * @param name ans name
   */
  getAddress(name: string) {
    return this.get(`/address/${name}`);
  }

  /**
   * Query the primary name of an address
   * @param address aleo address
   */
  getName(address: string) {
    return this.get<{ address: string; name: string }>(`/primary_name/${address}`);
  }
}
