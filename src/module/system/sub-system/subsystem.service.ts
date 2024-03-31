import { User } from '@module/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { CreateSystemDto } from '../dto/create-system.dto';
import { System } from '../entities/system.entity';
import { SYSTEM_STATUS } from '../enum/system-status.enum';

@Injectable()
export class SubSystemService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {}

  async create(
    createSystemDto: CreateSystemDto,
    parent_system_id: string,
    user: any,
  ) {
    try {
      const system = this.systemRepository.create({
        ...createSystemDto,
        user: user,
        parent: {
          id: parent_system_id,
        },
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

  async findAll(
    parent_system_id: string,
    user: User,
    query: any,
  ): Promise<System[]> {
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
        isParent: false,
        parent: {
          id: parent_system_id,
        },
        user: {
          id: user.id,
        },
      };

      // making query work
      if (type === 'archived') {
        return await this.systemRepository.find({
          withDeleted: true,
          where: {
            isParent: false,
            parent: {
              id: parent_system_id,
            },
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
}
