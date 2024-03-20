import BigNumber from "bignumber.js";

export function toFixed(value: number | string | BigNumber, digits = 0) {
  value = BigNumber(value);
  if (value.lt(1) && value.gt(0)) {
    return new BigNumber(value)
      .toFixed()
      .replace(new RegExp(`^(0.0*[1-9][0-9]{${digits - 1}}).*`), "$1")
      .replace(/0+$/, "");
  }
  return new BigNumber(value)
    .times(10 ** digits)
    .dp(0, BigNumber.ROUND_DOWN)
    .div(10 ** digits)
    .toFixed();
}

export function formatUnits(
  value: BigNumber | string | number | bigint,
  decimals = 18,
  digits = decimals,
  simple = false
) {
  if (!value) return "0";

  value = new BigNumber(value.toString());
  // is 0 ?
  if (value.eq(0)) {
    return "0";
  }

  const units = toFixed(value.div(10 ** decimals), digits);
  if (digits < decimals && Number(units) < 1 / 10 ** digits && simple) {
    return "<" + `0.${"1".padStart(digits, "0")}`;
  }
  return units;
}

/**
 * 1000000000000000000 -> 1
 * @param value
 * @param digits
 * @returns
 */
export function formatEther(value: string | bigint, digits = 18) {
  return formatUnits(value, 18, digits);
}

/**
 * 1000000u64 -> 1
 * @param value
 * @param digits
 * @returns
 */
export function formatAleo(value: string, digits = 6) {
  value = value.replace("u64", "");
  return formatUnits(value, 6, digits);
}
