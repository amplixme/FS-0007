const isProduction = process.env.NODE_ENV === "production";

const localhostRegex = /^http:\/\/localhost:\d+$/;

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (isProduction) {
            if (origin === process.env.CORS_ORIGIN) {
                return callback(null, true);
            }
            return callback(new Error("No permitido por CORS"));
        }

        if (localhostRegex.test(origin)) {
            return callback(null, true);
        }

        return callback(new Error("No permitido por CORS"));
    },
};

export default corsOptions;