export const getDigitsOnly = (value: string) => {
  return value.replace(/\D/g, "");
};

export const getValueFormattedInBrazilianCurrency = (value: string) => {
  const onlyDigits = getDigitsOnly(value);
  return (
    onlyDigits &&
    new Intl.NumberFormat("pt-br", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseInt(onlyDigits) / 100)
  );
};

export const getValueFormattedThousands = (value: string) => {
  const onlyDigits = getDigitsOnly(value);
  return (
    onlyDigits && new Intl.NumberFormat("pt-br").format(parseInt(onlyDigits))
  );
};

export const getInputValueWidth = (value: string): string => {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  if (context) {
    context.font = "16px times new roman";
    let width = context.measureText(value).width + 14;
    return Math.ceil(width).toString();
  }
  return "0";
};

export const getPointsLabel = (value: string): string => {
  return value === "1" ? "pt" : "pts";
};
