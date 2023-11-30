import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: 'varchar'
    })
    firstName: string;

    @Column({
        type: 'varchar'
    })
    lastName: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;
    
    @Exclude({ toPlainOnly: true })
    @Column({
        type: 'varchar',
    })
    password: string;
}