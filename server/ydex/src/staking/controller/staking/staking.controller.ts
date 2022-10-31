import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreatePairPoolDto,
  CreateSinglePoolDto,
} from 'src/staking/dto/staking.dto';
import { StakingService } from 'src/staking/service/staking/staking.service';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('pairpool')
  getKlayPool() {
    return this.stakingService.getPairPool();
  }

  @Post('pairpool')
  @UsePipes(ValidationPipe)
  createKlayPool(@Body() createPairPoolDto: CreatePairPoolDto) {
    return this.stakingService.createPairPool(createPairPoolDto);
  }

  @Get('singlepool')
  getSinglePool() {
    return this.stakingService.getSinlePool();
  }

  @Post('singlepool')
  @UsePipes(ValidationPipe)
  createSinglePool(@Body() createSinglePoolDto: CreateSinglePoolDto) {
    return this.stakingService.createSinglePool(createSinglePoolDto);
  }

  @Get('nft')
  getTotalNFTs(){
    return this.stakingService.getTotalNFTs();
  }

  @Get('nft:id')
  getMyNFT(@Param('id') id:string ){
    
  }

  @Post()
  singleStaking() {}

  @Post()
  klayStaking() {}

  @Post()
  kip7Staking() {}
}
