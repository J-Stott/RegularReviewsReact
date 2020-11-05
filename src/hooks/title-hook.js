import {useEffect} from "react"

export const useTitle = (pageTitle) => {

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle])
}