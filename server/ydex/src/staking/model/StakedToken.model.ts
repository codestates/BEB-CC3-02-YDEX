import mongoose from 'mongoose';

export const StakedTokenSchema = new mongoose.Schema({
  token_address: {
    type: String,
    required: true,
  },
  token_name: {
    type: String,
    required: true,
  },
  token_symbol: {
    type: String,
    required: true,
  },
});

export interface StakedToken {
  token_address: string;
  token_name: string;
  token_symbol: string;
}
