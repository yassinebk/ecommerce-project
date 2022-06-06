import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindAllInput } from 'src/dto/findAll';
import { Repository } from 'typeorm';
import { Role } from '../auth/types/Roles';
import {
  AddUserBasicInfoInput,
  CreateUserInput,
  UpdateUserEmailInput,
  UpdateUserGeneral,
  UpdateUserPasswordInput,
  UpdateUserRefreshTokenInput,
} from './dto/index';
import { UserBasicInfo } from './entities';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserBasicInfo)
    private basicUserInfoRepository: Repository<UserBasicInfo>,

    private config: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(this.config.get<string>('SALT_ROUNDS')),
      );
      const user = this.userRepository.create({ email, hashedPassword });
      return this.userRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException('Server Failure');
    }
  }

  findAll(findAllInput: FindAllInput) {
    if (typeof findAllInput !== undefined) {
      const { field, order } = findAllInput;
      return this.userRepository.find({ order: { [field]: order } });
    } else return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async updateEmail(
    id: number,
    updateUserInput: UpdateUserEmailInput,
  ): Promise<User> {
    const toUpdateUser = await this.userRepository.findOneOrFail(id);
    toUpdateUser.email = updateUserInput.email;
    return this.userRepository.save(toUpdateUser);
  }

  async updatePassword(id: number, updateUserInput: UpdateUserPasswordInput) {
    const toUpdateUser = await this.userRepository.findOneOrFail(id);
    bcrypt.hash(
      updateUserInput.password,
      process.env.SALT_ROUNDS,
      (err, hashedPassword) => {
        if (err) throw new InternalServerErrorException('Server Failure');
        toUpdateUser.hashedPassword = hashedPassword;
        return this.userRepository.save(toUpdateUser);
      },
    );
  }

  async updateRefreshToken(updateRefreshToken: UpdateUserRefreshTokenInput) {
    const toUpdateUser = await this.userRepository.findOneOrFail(
      updateRefreshToken.id,
    );

    toUpdateUser.refreshToken = updateRefreshToken.refreshToken;
    return this.userRepository.save(toUpdateUser);
  }

  async updateUser(id: number, updateUserInput: UpdateUserGeneral) {
    const toUpdateUser = await this.userRepository.findOneOrFail(id);

    return this.userRepository.save({ toUpdateUser, ...updateUserInput });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(user);
  }

  async addBasicInfo(id: number, addBasicInfoInput: AddUserBasicInfoInput) {
    const user = await this.userRepository.findOneOrFail(id);

    const basicInfo = this.basicUserInfoRepository.create(addBasicInfoInput);
    user.infos = basicInfo;

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  async isAdmin(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    return user.role === Role.ADMIN;
  }

  async verifyUser(email: string) {
    const user = await this.userRepository.findOneOrFail({ where: { email } });
    user.isVerified = true;
    await this.userRepository.save(user);
    return true;
  }
}
