import mongoose from "mongoose";


export const KlayPairSchema = new mongoose.Schema({
    pair_address:{
        type:String,
        required : true,
    },
    pair_name:{
        type:String,
        required:true,
    },
    token_address:{
        type:String,
        required:true,
    },
    pid:{
        type:Number,
        required:true,
    }
})

export interface KlayPair{
    pair_address:string,
    pair_name:string,
    token_address:string,
    pid:number,
}