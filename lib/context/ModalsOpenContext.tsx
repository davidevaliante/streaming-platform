import React, { useState, createContext, useEffect, SetStateAction } from 'react'
import { FunctionComponent } from 'react'

interface ModalsOpenContextinterface {
    modalsOpen: string[]
    setModalsOpen: (modalsOpen: string[]) => void
    removeModal: (targetString: string) => void
}

// Create Context Object
export const ModalsContext = createContext<ModalsOpenContextinterface>({
    modalsOpen: [],
    setModalsOpen: () => {},
    removeModal: () => {},
})

// Create a provider for components to consume and subscribe to changes
export const ModalsOpenContextProvider: FunctionComponent = (props: any) => {
    const [modalsOpen, setModalsOpen] = useState<string[]>([])

    const removeModals = (targetString: string) => {
        const copy = [...modalsOpen]
        setModalsOpen(copy.filter((it) => it !== targetString))
    }

    return (
        <ModalsContext.Provider
            value={{
                modalsOpen,
                setModalsOpen,
                removeModal: removeModals,
            }}>
            {props.children}
        </ModalsContext.Provider>
    )
}
