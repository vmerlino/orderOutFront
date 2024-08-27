import { Account } from "../Account";
import { Indication } from "../Indications";

export class BillIndicationDTO{
    bills: Account[];
    indicators: Indication;
}