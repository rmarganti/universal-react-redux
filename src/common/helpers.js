
export const combine = (obj, keyObj) => Object.assign({}, obj, keyObj);
export const isFunction = fn => fn && {}.toString.call(fn) === '[object Function]';


// access to path with format: 'to.this.path'
// return parent if child is not found
export const access = (obj, path) => {
    if (!path || typeof path !== 'string') return undefined;

    let result = obj;
    path.split('.').forEach((key) => {
        if (result[key]) result = result[key];
        else console.warn(`Cannot access "${path}" from `, obj);
    });

    return result;
};


// For sorting with a key
// Usage: sort itemArray by 'order'
//   itemArray.sort(compareWithKey('order'));
export const compareWithKey = key => (a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    // a must be equal to b
    return 0;
};
