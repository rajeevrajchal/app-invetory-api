import { BaseService } from '@base/base.service';
import { User } from '@module/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorService extends BaseService<Vendor> {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {
    super(vendorRepository);
  }

  async findAll(user: User, query: any): Promise<Vendor[]> {
    try {
      const { type } = query;
      const find_query = {
        select: {
          user: {
            id: true,
            name: true,
          },
        },
        relations: ['user'],
      };
      const whereCondition = {
        user: {
          id: user.id,
        },
      };

      // making query work
      if (type === 'archived') {
        return await this.vendorRepository.find({
          withDeleted: true,
          where: {
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
      }

      return await this.vendorRepository.find({
        where: whereCondition,
        ...find_query,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
