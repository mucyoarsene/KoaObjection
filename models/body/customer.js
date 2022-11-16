const customerInsert = (names, email) => {
    const customer = {
        names: names,
        email: email 
    }
    return customer;
};

module.exports = {customerInsert};