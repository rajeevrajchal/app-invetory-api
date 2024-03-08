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

  async checkUserExistById(id: string): Promise<any> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }
}
