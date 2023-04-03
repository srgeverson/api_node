
/** 
 * Compare two objects and return true or false 
*/
export const isEquivalent = (objectOne, objectTwo) => {
    let propertiesObjectOne = Object.getOwnPropertyNames(objectOne);
    let propertiesObjectTwo = Object.getOwnPropertyNames(objectTwo);

    if (propertiesObjectOne.length != propertiesObjectTwo.length)
        return false;

    for (let i = 0; i < propertiesObjectOne.length; i++) {
        let propName = propertiesObjectOne[i];

        if (objectOne[propName] !== objectTwo[propName])
            return false;
    }

    return true;
}

/** 
 * Convert value to Boolean
*/
export const toBoolean = (value) => /^\s*(true|1|on)\s*$/i.test(value);