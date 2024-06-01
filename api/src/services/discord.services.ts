import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

import { URLS, ENV } from '@@constants/index.js';

export async function getToken(code: string, redirect: string): Promise<AxiosResponse> {

    const data = new URLSearchParams([
        ["grant_type", "authorization_code"],
        ["code", code],
        ["redirect_uri", redirect] 
    ]);

    return axios.post(`${URLS.DISCORD_API}/oauth2/token`, data.toString(), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: ENV.DISCORD.APP_ID, 
            password: ENV.DISCORD.CLIENT_SECRET
        }
    });
};

export async function refreshToken(refreshToken: string, redirect: string): Promise<AxiosResponse> {
    return axios({
        method: "POST",
        url: `${URLS.DISCORD_API}/oauth2/token`,
        params: {
            grant_type: "refresh_token",
            client_id: ENV.DISCORD.APP_ID,
            client_secret: ENV.DISCORD.CLIENT_SECRET,
            refresh_token: refreshToken,
            scope: "guilds identify guilds.join email messages.read",
            redirect_uri: redirect
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

export async function getUserInfo(token: string): Promise<AxiosResponse> {
    return axios({
        method: "GET",
        url: `${URLS.DISCORD_API}/users/@me`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export async function getUserGuilds(token: string): Promise<AxiosResponse> {
    return axios({
        method: "GET",
        url: `${URLS.DISCORD_API}/users/@me/guilds`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};