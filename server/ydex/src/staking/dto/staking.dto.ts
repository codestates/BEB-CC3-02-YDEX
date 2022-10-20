import { IsNumber, IsString } from "class-validator";

export class CreateKlayPoolDto {
  @IsString()
  pair_address: string;
  @IsString()
  pair_name: string;
  @IsString()
  token_address: string;
  @IsNumber()
  pid: number;
}

export class CreateKip7PoolDto {
  @IsString()
  pair_address: string;
  @IsString()
  pair_name: string;
  @IsString()
  tokenA_address: string;
  @IsString()
  tokenB_address: string;
  @IsNumber()
  pid: number;
}

export class CreateSinglePoolDto {
  @IsString()
  token_address: string;
  @IsString()
  token_name: string;
  @IsString()
  token_symbol: string;
}

export class StakingSingleDto {}

export class StakingKlayDto {}

export class StakingKip7Dto {}
