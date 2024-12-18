exports.get = function () {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && this.error) {
        this.body = this.error.stack;
    }
};
