import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLocalStorageUserData } from '../utils/localStorageUserData';
import { RefreshResponse } from '../types/common.types';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	credentials: 'include',
});

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

interface LoginUserInput {
	name: string;
	email: string;
	password: string;
}

interface LoginUserResponse {
	id: string;
	name: string;
	email: string;
}

interface LogoutResponse {
	message: string;
}

interface ProtectedEndpointResponse {
	message: string;
}

interface UnprotectedEndpointResponse {
	message: string;
}

interface UserData {
	id: string;
	name: string;
	email: string;
}

interface CreateUserResponse {
	data: UserData;
}

interface CreateCommentInput {
	text: string;
	pageId: string;
	parentId: number | null;
}

export interface CommentType {
	id: number;
	content: string;
	parentId: number | null;
	pageId: string;
	createdAt: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
}

export interface CommentChainResponse {
	chain: CommentType[]; // All ancestors + the selected comment itself
	replies: CommentType[]; // Direct replies of the selected comment
}

export interface CommentWithReplies {
	comment: CommentType; // your existing comment shape
	replies: CommentType[]; // an array of direct replies
}

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// If the error is a 403 with a specific message, attempt to refresh tokens
	if (
		result.error &&
		result.error.status === 403 &&
		result.error.data?.error ===
			'Forbidden: Access token expired, please refresh token'
	) {
		// Attempt to refresh tokens
		const refreshResult = await baseQuery(
			{ url: 'users/refresh', method: 'POST' },
			api,
			extraOptions,
		);

		// If refresh was successful, reset userData in local storage and retry the original query
		if (refreshResult.data) {
			setLocalStorageUserData(refreshResult.data);
			result = await baseQuery(args, api, extraOptions);
		} else {
			// Handle failed refresh here (e.g., redirect to login)
		}
	}

	return result;
};

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Comments'],

	endpoints: (builder) => ({
		signup: builder.mutation<CreateUserResponse, CreateUserInput>({
			query: (data) => {
				return {
					url: '/users/create',
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['User'],
		}),

		login: builder.mutation<LoginUserResponse, LoginUserInput>({
			query: (data) => {
				return {
					url: '/users/login',
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['User'],
		}),

		logout: builder.mutation<LogoutResponse, void>({
			query: () => {
				return {
					url: '/users/logout',
					method: 'POST',
				};
			},
			invalidatesTags: ['User'],
		}),

		ProtectedEndpoint: builder.query<ProtectedEndpointResponse, void>({
			query: () => {
				return {
					url: '/endpoints/protected',
					method: 'GET',
				};
			},
			providesTags: ['User'],
		}),

		UnprotectedEndpoint: builder.query<UnprotectedEndpointResponse, void>({
			query: () => {
				return {
					url: '/endpoints/unprotected',
					method: 'GET',
				};
			},
		}),

		refreshToken: builder.mutation<RefreshResponse, void>({
			query: () => {
				return {
					url: '/users/refresh',
					method: 'POST',
				};
			},
		}),

		submitComment: builder.mutation<void, CreateCommentInput>({
			query: ({ text, pageId, parentId }) => {
				console.log('parentId: ', parentId);
				return {
					url: '/comments/create',
					method: 'POST',
					body: { content: text, pageId, parentId },
				};
			},
			invalidatesTags: ['Comments'],
		}),

		getTopLevelComments: builder.query<CommentType[], string>({
			query: (pageId) => ({
				url: `/comments?pageId=${pageId}`,
				method: 'GET',
			}),
			providesTags: ['Comments'],
		}),

		getCommentWithReplies: builder.query<CommentWithReplies, number>({
			query: (commentId) => ({
				url: `/comments/${commentId}`,
				method: 'GET',
			}),
			providesTags: ['Comments'],
		}),

		getCommentChain: builder.query<CommentChainResponse, number>({
			query: (commentId) => ({
				url: `/comments/${commentId}/chain`,
				method: 'GET',
			}),
			providesTags: ['Comments'],
		}),
	}),
});

export const {
	// Users
	useSignupMutation,
	useLoginMutation,
	useLogoutMutation,

	// Endpoints
	useUnprotectedEndpointQuery,
	useProtectedEndpointQuery,
	useRefreshTokenMutation,

	// Comments
	useSubmitCommentMutation,
	useGetTopLevelCommentsQuery,
	useGetCommentChainQuery,
} = mainApi;
