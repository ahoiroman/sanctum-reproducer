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
                    csrf: {
                        url: 'http://backend.laravel-sanctum.test/sanctum/csrf-cookie'
                    },
                    login: {
                        url: 'http://backend.laravel-sanctum.test/login'
                    },
                    logout: {
                        url: 'http://backend.laravel-sanctum.test/logout'
                    },
                    user: {
                        url: 'http://backend.laravel-sanctum.test/api/auth/me'
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
