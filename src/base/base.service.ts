import messages from '@constants/message';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseDB } from './base-db.entity';
import { BaseResponse } from './response.type';

@Injectable()
export class BaseService<T extends BaseDB> {
  constructor(private readonly repository: Repository<T>) {}

  async remove(id: string): Promise<BaseResponse<T>> {
    try {
      const entity = await this.repository.findOne({
        where: { id: id as any },
      });
      if (!entity) {
        throw new NotFoundException('Entity not found');
      }

      entity.deletedAt = new Date();
      await this.repository.save(entity);
      return {
        message: messages.record_deleted,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async restore(id: string): Promise<BaseResponse<T>> {
    try {
      const entity = await this.repository.findOne({
        where: { id: id as any },
        withDeleted: true,
      });
      if (!entity) {
        throw new NotFoundException('Entity not found');
      }
      entity.deletedAt = null;
      await this.repository.save(entity);
      return {
        message: messages.record_restored,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllDeleted(): Promise<BaseResponse<T>> {
    try {
      const records = await this.repository.find({ withDeleted: true });
      return {
        data: records,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
