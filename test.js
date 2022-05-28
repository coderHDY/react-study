function getProperty(data, property) {
    const propertyArr = property.split('/');
    return propertyArr.reduce((pre, item) => pre[item], data);

}

const data = {
    a: 1,
    b: {
        c: 2,
        d: 3,
    }
}
console.log(getProperty(data, 'b/c')); // 2
