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
