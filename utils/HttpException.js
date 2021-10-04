class HttpException extends Error{
    constructor(status, message, source){
        this.status = status;
        this.message = message;
        this.source = source;
    }
}

module.exports = HttpException;