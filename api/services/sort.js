const sort = data => {
    let sorted = []

    data.sort((a, b) => {
        return b.criticality - a.criticality
    })

    const lowCrit = data.filter(object => object.criticality == 1)
    lowCrit.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    const medCrit = data.filter(object => object.criticality == 2)
    medCrit.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    const highCrit = data.filter(object => object.criticality == 3)
    highCrit.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    sorted = medCrit.concat(lowCrit)
    const final = highCrit.concat(sorted)

    return final
}

module.exports = {sort}