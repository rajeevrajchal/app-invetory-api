import { User } from '@module/user/entities/user.entity';
import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class UserCheckerService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkUserExist(email: string): Promise<any> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }

  async checkUserExistByAuthProvider(auth_provider_id: string): Promise<any> {
    return this.userRepository.findOneBy({
      auth_provider_id: auth_provider_id,
    });
  }

  async checkUserExistById(id: string): Promise<any> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async updateUserForOAuth(
    id: string,
    payload: {
      auth_provider: string;
      auth_provider_id: string;
    },
  ): Promise<any> {
    return this.userRepository.update(id, payload);
  }
}
