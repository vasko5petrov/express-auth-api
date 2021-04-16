class HttpException extends Error {
    constructor(status, message) {
        super({ status, message });

        this.status = status;
        this.message = message;
    }
}

export default HttpException;