// Function used to check data for errors
const isEmpty = (str) => {
    return (!str || str.length === 0 || !str.trim());
}
module.exports = {isEmpty}