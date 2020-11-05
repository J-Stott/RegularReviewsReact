import {useState, useCallback} from "react";

export const useModal = () => {
    const [modalVisible, setShowVisible] = useState(false);
    const [deleteRoute, setDeleteRoute] = useState("");

    const showModal = useCallback(() => {
        setShowVisible(true);
    }, []);

    const hideModal = useCallback(() => {
        setShowVisible(false);
    }, []);

    const deleteRouteSetter = useCallback((route) => {
        setDeleteRoute(route)
        showModal();
    }, [showModal]);

    return [modalVisible, showModal, hideModal, deleteRoute, deleteRouteSetter];
}