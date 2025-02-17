export enum BusinessCardKeys {
  Plastic = 'plastic',
  Wood = 'wood',
  Metal = 'metal',
  TwentyFourKGold = 'twentyFourKGold',
}

export enum BusinessCardTypes {
  Plastic = 'plastic',
  Wood = 'wood',
  Metal = 'metal',
  TwentyFourKGold = '24kgold',
}

export enum BusinessCardColors {
  Black = '#0F0F0F',
  White = '#FFFFFF',
  Purple = '#7622FF',
  // Brown = '#90762A', // gold
  // Gray = '#B1B0B2', // silver
  Yellow = '#FFFF00',
  Green = '#0BAA60',
  Blue = '#0C27BE',
  Red = '#FF1D1D', //'#EA2101', //'#E7361A',
  Orange = '#FFA500',
}

export enum BusinessCardOrderStatus {
  ORDER_RECEIVED = 'order_received',
  PROCESSING = 'processing',
  PRINTING = 'printing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

export enum PaymentMethod {
  CREDITS = 'card', //'creditCard',
  PAYPAL = 'paypal',
  MOMO = 'momo',
}

export enum MomoPaymentOperator {
  MTN_MOMO = 'mtn-gh',
  TELECEL_CASH = 'tigo-gh',
  AT_MONEY = 'vodafone-gh',
}
