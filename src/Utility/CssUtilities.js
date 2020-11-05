export const addClasses = (classes, classNames) => {
    let classList = "";

    classNames.forEach((className) => {
        const cssClass = classes[className];
        if(cssClass !== undefined){
            classList += `${cssClass} `
        }
    });

    return classList;
}

export const classOnProp = (propName, classes, className) => {
    return propName ? classes[className] : "";
}