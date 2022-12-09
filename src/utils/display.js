module.exports = (status, message, result, data, error) => {
    return {
        status: status,
        message: message,
        affectedRows: result || 0,
        data: data || '',
        error: error || ''
    }
}