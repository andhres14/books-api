import { DBTable } from "../../constants/DBTable";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBooksTable1720660220981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: DBTable.BOOKS,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'authorId',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'price',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'category',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                }
            ]
        }), true)

        const foreignKey = new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["id"],
            referencedTableName: "authors",
            onDelete: "CASCADE"
        })

        await queryRunner.createForeignKey(DBTable.BOOKS, foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.BOOKS);
    }

}
