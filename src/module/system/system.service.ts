import { User } from '@module/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System } from './entities/system.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {}

  async create(createSystemDto: CreateSystemDto, user: any) {
    try {
      const system = this.systemRepository.create({
        ...createSystemDto,
        isParent: true,
        user: user,
      });
      const new_system = await this.systemRepository.save(system);

      return {
        message: 'system created',
        system: new_system,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async addSubSystem(id, createSystemDto: CreateSystemDto) {
    const parent_system = await this.systemRepository.findOne({
      where: {
        id: id,
      },
    });
    const system = this.systemRepository.create({
      ...createSystemDto,
      isParent: false,
      parent: parent_system,
    });
    const new_system = await this.systemRepository.save(system);

    return {
      message: 'sub system added',
      system: new_system,
    };
  }

  findAll(user: User) {
    return this.systemRepository.find({
      where: {
        deletedAt: null,
        isParent: true,
        user: {
          id: user.id,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
        },
      },
      relations: {
        user: true,
        subSystems: true,
      },
    });
  }

  findOne(id: string) {
    return this.systemRepository.findOne({
      where: {
        id: id,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
      },
      relations: ['user', 'subSystems', 'features'],
    });
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
