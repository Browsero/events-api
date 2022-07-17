import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}
  async list(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async show(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`);
    }
    return event;
  }

  async create(createEventDto: CreateEventDto): Promise<number> {
    const newEvent = await this.eventsRepository.create(createEventDto);
    await this.eventsRepository.save(newEvent);
    return newEvent.id;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventsRepository.preload({
      id,
      ...updateEventDto,
    });
    await this.eventsRepository.save(event);
    return event;
  }

  async remove(id: number): Promise<void> {
    const event = await this.show(id);
    await this.eventsRepository.remove(event);
  }
}
