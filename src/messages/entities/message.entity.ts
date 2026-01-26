import { Person } from 'src/person/entities/person.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  // Muitos recados podem ser enviados por uma única pessoa (emissor)
  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Person;

  // Muitos recados podem ser enviados para uma única pessoa (destinatário)
  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "para" que armazena o ID da pessoa que recebe o recado
  @JoinColumn({ name: 'para' })
  para: Person;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date; // createdAt

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
