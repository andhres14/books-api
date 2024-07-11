import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { DBTable } from "../../constants/DBTable";

@Entity(DBTable.AUTHORS)
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[]

    toPayload(): Author {
        return {
          id: this.id,
          name: this.name,
          email: this.email
        } as Author;
    }
}