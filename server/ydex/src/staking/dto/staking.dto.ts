export interface CreateKlayPoolDto {
  pair_address: string;
  pair_name: string;
  token_address: string;
  pid: number;
}

export interface CreateKip7PoolDto {
  pair_address: string;
  pair_name: string;
  tokenA_address: string;
  tokenB_address: string;
  pid: number;
}

export interface CreateSinglePoolDto {
  token_address: string;
  token_name: string;
  token_symbol: string;
}

export interface StakingSingleDto {}

export interface StakingKlayDto {}

export interface StakingKip7Dto {}
