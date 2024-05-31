import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('linear_webhooks')
@Unique(['guildId', 'channelId'])
class LinearWebhook extends BaseEntity {

    constructor(
        id: number,
        label: string,
        guildId: string,
        channelId: string,
        signatureSecret: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        super();
        this.id = id;
        this.label = label;
        this.guildId = guildId;
        this.channelId = channelId;
        this.signatureSecret = signatureSecret;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 255 })
    label: string;

    @Column({ type: "varchar", length: 20 })
    guildId: string;

    @Column({ type: "varchar", length: 20 })
    channelId: string;

    @Column({ type: "varchar", length: 255 })
    signatureSecret: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};

export default LinearWebhook;