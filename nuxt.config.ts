import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs-alt/auth',
        '@nuxtjs-alt/http',
        '@nuxtjs-alt/proxy',
        '@pinia/nuxt',
    ],
    publicRuntimeConfig: {
        appURL: '',
        baseURL: '',
    },
    privateRuntimeConfig: {},
    http: {
        credentials: 'include',
        baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
    auth: {
        globalMiddleware: true,
        redirect: {
            home: '/',
            logout: '/',
            login: '/',
            callback: '/',
        },
        strategies: {
            // @ts-ignore
            api: {
                provider: 'laravel/sanctum',
                cookie: {
                    server: true,
                    name: 'XSRF-TOKEN',
                },
                endpoints: {
                    headers: {
                        Accept: 'application/json',
                    },
                    csrf: {
                        url: `${process.env.NUXT_PUBLIC_APP_URL}/sanctum/csrf-cookie`
                    },
                    login: {
                        url: `${process.env.NUXT_PUBLIC_APP_URL}/login`
                    },
                    logout: {
                        url: `${process.env.NUXT_PUBLIC_APP_URL}/logout`
                    },
                    user: {
                        url: `${process.env.NUXT_PUBLIC_APP_URL}/api/auth/me`
                    }
                },
                user: {
                    property: {
                        client: false,
                        server: false
                    },
                    autoFetch: true
                }
            },
        }
    },
})
