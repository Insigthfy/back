import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITopic } from '../interfaces/topic.interface';

@Schema()
export class Topic implements ITopic {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  survey: string;

  @Prop({ required: true })
  created_at: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
