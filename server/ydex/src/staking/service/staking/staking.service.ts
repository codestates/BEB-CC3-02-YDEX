import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateKip7PoolDto,
  CreateKlayPoolDto,
  CreateSinglePoolDto,
} from 'src/staking/dto/staking.dto';
import { Kip7Pair } from 'src/staking/model/Kip7Pair.model';
import { KlayPair } from 'src/staking/model/KlayPair.model';
import { StakedToken } from 'src/staking/model/StakedToken.model';
import { Token } from 'src/staking/model/Token.model';

@Injectable()
export class StakingService {
  private logger = new Logger('StakingController');
  constructor(
    @InjectModel('Kip7Pair') private readonly kip7PairModel: Model<Kip7Pair>,
    @InjectModel('KlayPair') private readonly klayPairModel: Model<KlayPair>,
    @InjectModel('StakedToken')
    private readonly stakedTokenModel: Model<StakedToken>,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}

  async getKlayPool(): Promise<KlayPair[]> {
    try {
      const klayPoolList = await this.klayPairModel.find();

      if (!klayPoolList)
        throw new NotFoundException('Cannot find any klayPoolList');

      return klayPoolList;
    } catch (error) {
      throw new BadRequestException('Cannot execute request');
    }
  }

  async getKip7Pool(): Promise<Kip7Pair[]> {
    try {
      const kip7PoolList = await this.kip7PairModel.find();

      if (!kip7PoolList)
        throw new NotFoundException('Cannot find any klayPoolList');

      return kip7PoolList;
    } catch (error) {
      throw new BadRequestException('Cannot execute request');
    }
  }

  async getSinlePool(): Promise<StakedToken[]> {
    try {
      const singlePoolList = await this.stakedTokenModel.find();

      if (!singlePoolList)
        throw new NotFoundException('Cannot find any klayPoolList');

      return singlePoolList;
    } catch (error) {
      throw new BadRequestException('Cannot execute request');
    }
  }

  async createKlayPool(createKlayPoolDto: CreateKlayPoolDto): Promise<{}> {
    try {
      const newKlayPool = await this.klayPairModel.create(createKlayPoolDto);
      const savedKlayPool = await newKlayPool.save();
      return savedKlayPool;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Cannot execute request');
    }
  }

  async createKip7Pool(createKip7PoolDto: CreateKip7PoolDto): Promise<{}> {
    try {
      const newKip7Pool = await this.kip7PairModel.create(createKip7PoolDto);
      const savedKip7Pool = await newKip7Pool.save();
      return savedKip7Pool;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Cannot execute request');
    }
  }

  async createSinglePool(
    createSinglePoolDto: CreateSinglePoolDto,
  ): Promise<{}> {
    try {
      const newSinglePool = await this.stakedTokenModel.create(
        createSinglePoolDto,
      );
      const savedSinglePool = await newSinglePool.save();
      return savedSinglePool;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Cannot execute request');
    }
  }

  singleStaking() {}

  klayStaking() {}

  kip7Staking() {}
}
