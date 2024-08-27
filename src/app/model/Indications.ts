import { FormaPagoEnum } from "./FormaPagoEnum";

export class Indication {
    totalAmount: number;
    averageAmount: number;
    totalTip: number;
    rankingWayToPayDtos: FormaPagoEnum[];
  
    constructor(totalAmount: number, averageAmount: number, totalTip: number, rankingWayToPayDtos: FormaPagoEnum[]) {
      this.totalAmount = totalAmount;
      this.averageAmount = averageAmount;
      this.totalTip = totalTip;
      this.rankingWayToPayDtos = rankingWayToPayDtos;
    }
}