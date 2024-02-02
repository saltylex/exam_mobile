import {Event} from "../models/Event";
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import React, {createContext, useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';
import {createTable, getDatabaseConnection} from "../utils/ModelDatabase";

type ModelContextType = {
    modelList: { list: Event[], db };
};

export const ModelContext = createContext<ModelContextType>({
    modelList: {list: [], db: null},
});

export const ModelProvider: React.FC = ({children}) => {
    const [modelList, setModelList] = useState<{ list: Event[], db: SQLiteDatabase | null }>({
        list: [],
        db: null,
    });

    useEffect(() => {
        async function initialiseDatabase() {
            const database = await getDatabaseConnection();
            await createTable(database);
            setModelList(({list: [], db: database}));
        }

        initialiseDatabase().then();

    }, [])

    return (
        <ModelContext.Provider value={{modelList}}>
            {children}
        </ModelContext.Provider>
    );
}