import { BaseService } from '@base/base.service';
import messages from '@constants/message';
import { User } from '@module/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System } from './entities/system.entity';
import { SYSTEM_STATUS } from './enum/system-status.enum';

@Injectable()
export class SystemService extends BaseService<System> {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {
    super(systemRepository);
  }

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

  async findAll(user: User, query: any): Promise<System[]> {
    try {
      const { type } = query;
      const find_query = {
        select: {
          user: {
            id: true,
            name: true,
          },
        },
        relations: ['user', 'subSystems'],
      };
      const whereCondition = {
        isParent: true,
        user: {
          id: user.id,
        },
      };

      // making query work
      if (type === 'archived') {
        return await this.systemRepository.find({
          withDeleted: true,
          where: {
            isParent: true,
            deletedAt: Not(IsNull()),
            user: {
              id: user.id,
            },
          },
          ...find_query,
        });
      } else if (type === 'on_hold') {
        whereCondition['deletedAt'] = IsNull();
        whereCondition['status'] = type;
      } else {
        whereCondition['deletedAt'] = IsNull();
        whereCondition['status'] = In([
          SYSTEM_STATUS.DRAFT,
          SYSTEM_STATUS.ACTIVE,
        ]);
      }

      return await this.systemRepository.find({
        where: whereCondition,
        ...find_query,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateSystemDto: UpdateSystemDto) {
    try {
      const system = await this.findOne(id);
      if (!system) {
        throw new HttpException('system not found', HttpStatus.NOT_FOUND);
      }
      this.systemRepository.merge(system, updateSystemDto);
      const updated_system = await this.systemRepository.save(system);
      return {
        messages: messages.system_updated,
        system: updated_system,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
