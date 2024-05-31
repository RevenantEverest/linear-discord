import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('bog_guilds')
class BotGuild extends BaseEntity {

    constructor(
        id: number,
        guildId: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        super();
        this.id = id;
        this.guildId = guildId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 20 })
    guildId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};

export default BotGuild;