import { BaseService } from '@base/base.service';
import messages from '@constants/message';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Feature } from './entities/feature.entity';
import { FEATURE_STATUS } from './enum/feature.enum';

@Injectable()
export class FeatureService extends BaseService<Feature> {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {
    super(featureRepository);
  }

  async findSystemFeature(system_id: string) {
    try {
      const features = this.featureRepository.find({
        where: {
          system: {
            id: system_id,
          },
        },
      });
      return features;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      console.log('the feature are', {
        createFeatureDto,
        val: {
          ...createFeatureDto,
          status: FEATURE_STATUS.DRAFT,
          system: {
            id: createFeatureDto.system_id,
          },
        },
      });
      const feature = this.featureRepository.create({
        ...createFeatureDto,
        status: FEATURE_STATUS.DRAFT,
        system: {
          id: createFeatureDto.system_id,
        },
      });
      const new_feature = await this.featureRepository.save(feature);

      return {
        message: 'feature created',
        feature: new_feature,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: string) {
    try {
      return this.featureRepository.findOne({
        where: {
          id: id,
        },
        relations: ['system'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async enable_feature(id: string) {
    try {
      const feature = await this.findOne(id);
      if (!feature) {
        throw new HttpException(messages.not_found, HttpStatus.NOT_FOUND);
      }

      const updatedFeature = await this.featureRepository.update(id, {
        is_active: !feature.is_active,
      });

      return updatedFeature;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
