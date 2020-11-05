import {useState, useCallback} from "react";

export const useSearch = () => {
    const [listVisible, setListVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const showList = useCallback(() => {
        setListVisible(true)
    }, []);

    const hideList = useCallback(() => {
        setListVisible(false)
    }, []);

    const searchHandler = useCallback((event, listItemCreateFunction) => {

        hideList();
        clearTimeout(timeoutId);
        const value = event.target.value;

        if (value !== "") {
            setTimeoutId(setTimeout(() => {
            //this is where we send our api call

            listItemCreateFunction(value);
            }, 500));
        } 
    }, [hideList, timeoutId]);

    return [listVisible, showList, hideList, searchHandler];
}