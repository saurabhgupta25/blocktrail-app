import {Transactions} from './transactions';

export class AddressDetails {
    address: string;
    hash160: string;
    balance: number;
    received: number;
    sent: number;
    transactions: number;
    utxos: string;
    unconfirmed_received: number;
    unconfirmed_sent: number;
    unconfirmed_transactions: number;
    unconfirmed_utxos: number;
    total_transactions_in: number;
    total_transactions_out: number;
    category: string;
    tag: string;
    first_seen: string;
    last_seen: string;
    transactionsList: Transactions[];

    constructor() {
        this.transactionsList = [];
    }
}
