import mongoose from 'mongoose';

export const NftSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
      unique: true,
    },
    tokenURI: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Nft {
  address:string;
  tokenId: number;
  tokenURI: string;
}
