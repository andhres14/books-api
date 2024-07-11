import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { DBTable } from "../../constants/DBTable";

@Entity(DBTable.BOOKS)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => Author, (author) => author.books, { eager: true })
  author: Author;

  @Column()
  authorId: number;

  @Column()
  price: number;

  @Column()
  category: string;

  toPayload(): Partial<Book> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      author: this.author.toPayload(),
      price: this.price / 100,
      category: this.category
    };
  }
}