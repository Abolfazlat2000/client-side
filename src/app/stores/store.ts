import { createContext, useContext } from "react";
import CounselingStore from "./counselingStore";

interface store{
    counselingStore : CounselingStore;
}

export const store:store = {
    counselingStore: new CounselingStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}