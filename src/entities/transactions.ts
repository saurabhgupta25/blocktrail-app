export class Transactions {
    hash: string;
    time: string;
    confirmations: number;
    block_height: number;
    block_hash: string;
    is_coinbase: string;
    estimated_value: number;
    total_input_value: number;
    total_output_value: number;
    total_fee: number;
    estimated_change: number;
    estimated_change_address: string;
    inputs: any[];
    outputs: any[];
}
