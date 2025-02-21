import { BusinessCardColors, BusinessCardTypes } from '@/enums/shared';

export const getColorTextName = (color: BusinessCardColors) => {
  return Object.keys(BusinessCardColors)[
    Object.values(BusinessCardColors).indexOf(color)
  ];
};

export type DefaultColorType = 'Black' | 'Bamboo' | 'Silver' | '24kGold';

export const getDefaultVariantColor = (type: BusinessCardTypes): string =>
  ({
    [BusinessCardTypes.Plastic]: 'Black',
    [BusinessCardTypes.Wood]: 'Bamboo',
    [BusinessCardTypes.Metal]: 'Silver',
    [BusinessCardTypes.TwentyFourKGold]: '24kGold',
  }[type] as DefaultColorType);

export const calculateDiscountedPrice = (
  originalPrice: number,
  discount: number
) => {
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;
  // Convert the final price to a string and find the index of the decimal point
  const finalPriceStr = finalPrice.toString();
  const decimalIndex = finalPriceStr.indexOf('.');

  if (decimalIndex !== -1) {
    return finalPriceStr.slice(0, decimalIndex + 3); // Two digits after the decimal point
  }
  return finalPriceStr;
};
