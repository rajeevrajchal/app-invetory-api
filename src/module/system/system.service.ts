import { User } from '@module/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
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

  async create(createSystemDto: CreateSystemDto) {
    const user = await this.userService.findOne({
      where: {
        id: createSystemDto.userId,
      },
    });
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

  findAll() {
    return this.systemRepository.find({
      where: {
        deletedAt: null,
        isParent: true,
      },
      relations: ['user', 'subSystems'],
    });
  }

  findOne(id: string) {
    return this.systemRepository.findOne({
      where: {
        id: id,
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
