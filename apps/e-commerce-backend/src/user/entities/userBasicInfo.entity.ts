import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsPhoneNumber, IsUrl, MaxLength } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class UserBasicInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  userBasicInfoId: number;

  @Field()
  @Column()
  @IsAlpha()
  @MaxLength(30)
  firstName: string;

  @Field()
  @Column()
  @IsAlpha()
  @MaxLength(30)
  lastName: string;

  @Field()
  @Column()
  @IsAlpha()
  @MaxLength(40)
  address: string;

  @Field()
  @Column()
  @IsAlpha()
  branch: string;

  @Field()
  @Column()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsUrl()
  socialLinkProfile: string;

  @Field(() => User, { nullable: false })
  @OneToOne(() => User, (user) => user.infos)
  user: User;
}
