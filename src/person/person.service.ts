import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  private throwExceptionPersonNotFound(): never {
    throw new NotFoundException('Person not found!');
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const person = {
        email: createPersonDto?.email,
        passwordHash: createPersonDto?.password,
        nome: createPersonDto?.nome,
      };

      const newPerson = this.personRepository.create(person);
      return await this.personRepository.save(newPerson);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
      throw error;
    }
  }

  findAll() {
    return this.personRepository.find({
      order: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });

    if (!person) return this.throwExceptionPersonNotFound();

    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      passwordHash: updatePersonDto?.password,
      nome: updatePersonDto?.nome,
    };

    const person = await this.personRepository.preload({
      id,
      ...personData,
    });

    if (!person) return this.throwExceptionPersonNotFound();

    return await this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({ id });

    if (!person) return this.throwExceptionPersonNotFound();

    return this.personRepository.remove(person);
  }
}
