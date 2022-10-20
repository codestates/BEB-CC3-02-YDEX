import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateKip7PoolDto,
  CreateKlayPoolDto,
  CreateSinglePoolDto,
} from 'src/staking/dto/staking.dto';
import { StakingService } from 'src/staking/service/staking/staking.service';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('klaypool')
  getKlayPool() {
    return this.stakingService.getKlayPool();
  }

  @Get('kip7pool')
  getKip7Pool() {
    return this.stakingService.getKip7Pool();
  }

  @Post('klaypool')
  @UsePipes(ValidationPipe)
  createKlayPool(@Body() createKlayPoolDto: CreateKlayPoolDto) {
    return this.stakingService.createKlayPool(createKlayPoolDto);
  }

  @Post('kip7pool')
  @UsePipes(ValidationPipe)
  createKip7Pool(@Body() createKip7PoolDto: CreateKip7PoolDto) {
    return this.stakingService.createKip7Pool(createKip7PoolDto);
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

  @Post()
  singleStaking() {}

  @Post()
  klayStaking() {}

  @Post()
  kip7Staking() {}
}
