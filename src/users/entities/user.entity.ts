import { Exclude } from "class-transformer";
import { Url } from "src/urls/entities/url.entity";
import { 
    BaseEntity, Column, CreateDateColumn, 
    Entity, JoinTable, ManyToMany, OneToMany, 
    PrimaryGeneratedColumn, UpdateDateColumn 
} from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User extends BaseEntity {
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

    @Column({
        type: 'date',
        nullable: true
    })
    lastLoginDate: Date;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;


    @Exclude({ toPlainOnly: true })
    @Column({
        type: 'varchar',
    })
    password: string;

    @OneToMany(() => Url, url => url.user, { eager: true })
    urls: Url[];

    @OneToMany(() => Role, role => role.user, { eager: false })
    roles: Role[];
}