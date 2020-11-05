export const conditionalRender = (component, condition) => {
    return condition && component;
}

export const pickRender = (componentTrue, componentFalse, condition) => {
    if(condition){
        return componentTrue;
    }

    return componentFalse;
}

export const getUniqueArray = (arr1, arr2) => {
    const newArray = arr2.reduce((acc, arr2element) => {
        if(arr1.findIndex((arr1Element) => {
            return arr1Element._id === arr2element._id;
        }) === -1){
            acc.push(arr2element);
        }

        return acc;
    }, [...arr1]);

    return newArray;
}