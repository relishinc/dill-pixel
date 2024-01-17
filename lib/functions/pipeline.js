export const env = process.env.NODE_ENV;
export function isProduction() {
    return env === 'production';
}
export function isDev() {
    return env === 'development';
}
//# sourceMappingURL=pipeline.js.map