import { BaseService } from '@base/base.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Feature } from './entities/feature.entity';

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
      const feature = this.featureRepository.create(createFeatureDto);
      const new_feature = await this.featureRepository.save(feature);

      return {
        message: 'feature created',
        feature: new_feature,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
