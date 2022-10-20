import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StakingController } from './controller/staking/staking.controller';
import { Kip7PairSchema } from './model/Kip7Pair.model';
import { KlayPairSchema } from './model/KlayPair.model';
import { StakedTokenSchema } from './model/StakedToken.model';
import { TokenSchema } from './model/Token.model';
import { StakingService } from './service/staking/staking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Kip7Pair', schema: Kip7PairSchema },
      { name: 'KlayPair', schema: KlayPairSchema },
      { name: 'StakedToken', schema: StakedTokenSchema },
      { name: 'Token', schema: TokenSchema },
    ]),
  ],
  controllers: [StakingController],
  providers: [StakingService]
})
export class StakingModule {}
