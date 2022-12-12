import { createContext, useContext, useEffect, useState } from "react";

type Props = {
    children: JSX.Element,
};

type ModalContextValue = {
    isModal: boolean,
    setOpenModal: (data: boolean) => void
}

const initialState: ModalContextValue = {
    isModal: false,
    setOpenModal: () => { }
}

export const ModalContext = createContext<ModalContextValue>(initialState)

export const useModalContext = () => {
    return useContext(ModalContext);
}

function modalContextProvider({ children }: Props) {
    const [modal, setModal] = useState<boolean>(false);

    const setOpenModal = (data: boolean) => {
        if (data) setModal(true)
    };
    const isModal = modal
    console.log(isModal);
    return (
        <ModalContext.Provider value={{
            isModal,
            setOpenModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}

export default modalContextProvider;