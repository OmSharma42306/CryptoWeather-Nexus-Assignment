import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    favorites: [] as string[],
    livePrices: {} as Record<string,number>,
}


const cryptoSlice = createSlice({
    name:'crypto',
    initialState,
    reducers:{
        addFavoriteCrypto(state,action:PayloadAction<string>){
            state.favorites.push(action.payload);
        },
        updateLivePrice(state,action:PayloadAction<{id:string; price:number}>){
            state.livePrices[action.payload.id] = action.payload.price;
        },
    },
})


export const {addFavoriteCrypto,updateLivePrice} = cryptoSlice.actions;
export default cryptoSlice.reducer;