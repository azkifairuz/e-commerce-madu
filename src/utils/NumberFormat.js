import numeral from "numeral";

export function numberFormat(harga) {
  const formattedAmount = numeral(harga).format("0,0");
  return formattedAmount;
}