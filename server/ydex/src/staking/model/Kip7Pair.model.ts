import mongoose from "mongoose";


export const Kip7PairSchema = new mongoose.Schema({
    pair_address:{
        type:String,
        required : true,
    },
    pair_name:{
        type:String,
        required:true,
    },
    tokenA_address:{
        type:String,
        required:true,
    },
    tokenB_address:{
        type:String,
        required:true,
    },
    pid:{
        type:Number,
        required:true,
    }
})

export interface Kip7Pair{
    pair_address:string,
    pair_name:string,
    tokenA_address:string,
    tokenB_address:string,
    pid:number,
}