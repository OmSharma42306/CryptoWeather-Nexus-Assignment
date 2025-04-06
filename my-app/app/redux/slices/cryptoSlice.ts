import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";


const initialState = {
    favorites: [] as string[],
    livePrices: {},
}


const cryptoSlice = createSlice({
    name:'crypto',
    initialState,
    reducers:{
        addFavoriteCrypto(state,action:PayloadAction<string>){
            state.favorites.push(action.payload);
        },
        updateLivePrice(state,action:PayloadAction<{id:string; price:number}>){
            // @ts-ignore
            state.livePrices[action.payload.id] = action.payload.price;
        },
    },
})

export const {addFavoriteCrypto,updateLivePrice} = createSlice.actions;
export default cryptoSlice.reducer;