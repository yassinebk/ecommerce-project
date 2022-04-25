import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBasicInfo } from './entities/userBasicInfo.entity';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User, UserBasicInfo]), ConfigModule],
  exports: [UserService],
})
export class UserModule {}
