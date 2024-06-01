import type { 
    PermissionResolvable, 
    GuildResolvable, 
    UserResolvable, 
    TextChannel, 
    RoleResolvable
} from 'discord.js';

export type TextChannelReturn = Promise<[TextChannel | undefined, Error | undefined]>;

export interface CheckGuildMemberPermissionsOptions {
    guildId: GuildResolvable,
    discordId: UserResolvable,
    permission: PermissionResolvable
};

export interface GuildMemberOptions {
    guildId: GuildResolvable,
    discordId: UserResolvable
};

export interface HasRoleOptions {
    guildId: GuildResolvable,
    roles: RoleResolvable[],
    discordId: UserResolvable
};

/**
 * Shape of the Discord api token endpoint response
 */
export interface DiscordTokenResponse {
    token_type: string,
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string
};

/**
 * Shape of the Discord api get current user endpoint response
 */
export interface DiscordUser {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: string,
    accent_color: string | null,
    global_name: string,
    avatar_decoration_data: null | unknown,
    banner_color: string | null,
    clan: string | null,
    mfa_enabled: boolean,
    locale: string,
    premium_type: number,
    email: string,
    verified: boolean
};