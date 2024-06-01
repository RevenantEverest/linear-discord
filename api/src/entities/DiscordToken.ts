import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('discord_tokens')
class DiscordToken extends BaseEntity {

    constructor(
        id: number,
        discordId: string,
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        super();
        this.id = id;
        this.discordId = discordId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    discordId: string;

    @Column({ type: "varchar", length: 30 })
    accessToken: string;

    @Column({ type: "varchar", length: 30 })
    refreshToken: string;

    @Column({ type: "int" })
    expiresIn: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};

export default DiscordToken;