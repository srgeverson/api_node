
function capitalized(string) {

    return string[0].toUpperCase() + string.substr(1).toLowerCase()
}

function isUUIDv4(uuid) {
    const uuidv4Pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    return uuidv4Pattern.test(uuid)
}

module.exports = {
    capitalized,
    isUUIDv4
}
