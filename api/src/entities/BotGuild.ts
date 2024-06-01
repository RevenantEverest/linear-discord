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
        isRemoved: boolean,
        createdAt: Date,
        updatedAt: Date
    ) {
        super();
        this.id = id;
        this.guildId = guildId;
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    guildId: string;

    @Column({ type: "boolean", default: false })
    isRemoved: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};

export default BotGuild;