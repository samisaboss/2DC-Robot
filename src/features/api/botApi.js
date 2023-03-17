import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const botApi = createApi({
    reducerPath: 'bot', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://64128901f9fe8122ae261cdb.mockapi.io/api'
    }), 
    tagTypes: ['Bots'],
    endpoints: (builder) => ({
        getBots: builder.query({
            query: () => '/bots', 
            providesTags: ['Bots']
        }),
        getBot: builder.query({
            query: (id) => `/bots/${id}`, 
            providesTags: ['Bots']
        }),
        addBot: builder.mutation({
            query: (bot) => ({
                url: '/bots', 
                method: 'POST', 
                body: bot
            }), 
            invalidatesTags: ['Bots']
        }),
        updateBot: builder.mutation({
            query: (bot) => ({
                url: `/bots/${bot.id}`, 
                method: 'PUT', 
                body: bot
            }), 
            invalidatesTags: ['Bots']
        }),
        deleteBot: builder.mutation({
            query: (id) => ({
                url: `/bots/${id}`, 
                method: 'DELETE', 
                body: id
            }), 
            invalidatesTags: ['Bots']
        }),
    })
});

export const {
    useGetBotsQuery, 
    useGetBotQuery,
    useAddBotMutation, 
    useUpdateBotMutation, 
    useDeleteBotMutation
} = botApi;