export default {
    redis: {
        host: process.env.REDIS_HOST!,
        password: 'redispw',// process.env.REDIS_PASSWORD!,
        port: 55000, //Number(process.env.REDIS_PORT!),
    },
};
