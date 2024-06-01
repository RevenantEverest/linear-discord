import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {

    constructor(
        id: string,
        email: string,
        discordId: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        super();
        this.id = id;
        this.email = email;
        this.discordId = discordId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    email: string;

    @Column({  type: "varchar", length: 20, unique: true })
    discordId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};

export default User;