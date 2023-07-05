import numeral from "numeral";

export const  numberFormat = (harga) => {
  const formattedAmount = numeral(harga).format("0,0");
  return formattedAmount;
}