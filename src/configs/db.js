const {
    DB_USER = 'admin',
    DB_NAME = 'dbName',
    DB_PASSWORD = 'secretString',
    DB_HOST = 'localhost'
} = process.env;

export const DB_URI = `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_NAME}.${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

export const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };