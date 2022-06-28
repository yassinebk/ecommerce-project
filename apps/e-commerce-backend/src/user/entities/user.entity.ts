import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Role } from 'src/auth/types/Roles';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserBasicInfo } from './userBasicInfo.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  userId: number;

  @Field()
  @Column({ unique: true, nullable: false })
  @IsEmail('Please provide a valied email')
  email: string;

  @Field({ nullable: true })
  @Column()
  hashedPassword: string;

  @Field(() => UserBasicInfo, { nullable: true })
  @OneToOne(() => UserBasicInfo, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userInfos' })
  infos: UserBasicInfo;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user, { onDelete: 'CASCADE' })
  orders: Order[];

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ nullable: true })
  refreshToken: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  lastSeen: Date;

  @Field(() => Role)
  @Column({ default: 'customer' })
  role: Role;
}
