// analytics.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Analytics extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    deviceType: string;

    @Column({ type: 'varchar' })
    osType: string;

    @Column({ nullable: true, type: 'varchar' })
    country: string;

    @Column({ nullable: true, type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    shortenedUrl: string;

    // For additional metrics.
    @Column({ type: 'varchar' })
    ipAddress: string;

}
