import { createSlice } from "@reduxjs/toolkit";
import { findBot } from "../../functions/utils";

const initialState = {
    bots: JSON.parse( localStorage.getItem('bots') || '[]' ), 
    current: {
        id: '', 
        name: '', 
        purpose: '', 
        avatar: {
            url: 'https://api.dicebear.com/5.x/bottts-neutral/svg',
            svg: ''
        }
    }
}

export const botSlice = createSlice({
    name: 'bot', 
    initialState, 
    reducers: {
        add: (state, action) => {       
            if( findBot( state.bots, action.payload.id ) === undefined ){
                state.bots.push(action.payload);
                localStorage.setItem('bots', JSON.stringify(state.bots));
            }
        },
        remove: (state, action) => {       
            if( findBot( state.bots, action.payload ) ){
                state.bots = state.bots.filter(bot => bot.id !== action.payload);
                localStorage.setItem('bots', JSON.stringify(state.bots));
            }
        },
        edit: (state, action) => {           
            if( findBot( state.bots, action.payload.id ) ){    
                state.bots = state.bots.map(bot => {
                    if( bot.hasOwnProperty('id') && bot.id === action.payload.id ){
                        return action.payload.data;
                    }else{
                        return bot;
                    }
                });
                localStorage.setItem('bots', JSON.stringify(state.bots));
            }
        }
    }
});

export const { add, remove, edit } = botSlice.actions;
export default botSlice.reducer;