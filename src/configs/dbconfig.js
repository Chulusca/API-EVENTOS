import 'dotenv/config'

const config = {
    host: process.env.DB_REMOTE_HOST ?? '',
    database: process.env.DB_DATABASE ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    port: process.env.DB_PORT ?? 5432,
    ssl:{
        rejectUnauthorized: false
    }
}

export default config;
