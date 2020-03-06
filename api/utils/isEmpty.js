// Function used to check if data is empty
const isEmpty = (str) => {
    return (!str || str.length === 0 || !str.trim());
}
module.exports = {isEmpty}