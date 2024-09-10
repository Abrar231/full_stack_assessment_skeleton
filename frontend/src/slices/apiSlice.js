import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASEURL}),
    reducerPath: 'api',
    tagTypes: ['Homes'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/user/find-all',
            transformResponse: res => res.users
        }),
        getHomesForUser: builder.query({
            query: userId => `/home/find-by-user?user_id=${userId}`,
            transformResponse: res => res.homes,
            providesTags: ['Homes']
        }),
        getCheckedUsersForHome: builder.query({
            query: homeId => `/user/find-by-home?home_id=${homeId}`,
            transformResponse: res => res.users,
            providesTags: ['Homes']
        }),
        updateUsersForHome: builder.mutation({
            query: body => ({
                url: '/home/update-users',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Homes']
        })
    })
});

export const { useGetUsersQuery, useGetHomesForUserQuery , useGetCheckedUsersForHomeQuery, useUpdateUsersForHomeMutation } = apiSlice;