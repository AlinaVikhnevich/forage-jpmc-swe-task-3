import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    const priceABC = serverResponds[0].top_ask.price;
    const priceDEF = serverResponds[1].top_bid.price;
    const ratio = priceABC / priceDEF;
    const upperBound = 1.05;
    const lowerBound = 0.95;

    return [{
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverResponds[0].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    }];
  }
}

