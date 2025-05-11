import { buildUrl } from './build-url';
import { HttpError } from './http-error';
import { HttpResponse } from './http-response';

interface FetchOptions {
	url: string;
	params?: Record<string, string>;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers?: HeadersInit;
	data?: FormData;
	json?: Record<string, unknown>;
	signal?: AbortSignal;
}

class HttpClient {
	private static globalHeaders: HeadersInit = {};

	private static async fetch<T = unknown>(
		options: FetchOptions
	): Promise<{ status: number; data: T }> {
		const url = this.buildUrl(options.url, options.params);
		const requestOptions = this.createRequestOptions(options);

		const response = await fetch(url, requestOptions);

		if (response.headers.get('Content-Type')?.includes('application/json')) {
			if (!response.ok) {
				const error = await response.json();
				throw new HttpError(response.status, error.name, error.message, error.details);
			}

			return new HttpResponse<T>(response.status, await response.json());
		}

		if (!response.ok) {
			throw new HttpError(response.status, 'Error', await response.text());
		}

		return new HttpResponse<T>(response.status, {} as T);
	}

	public static async get<T = unknown>(options: Omit<FetchOptions, 'method' | 'data' | 'json'>) {
		return this.fetch<T>({ ...options, method: 'GET' });
	}

	public static async post<T = unknown>(options: Omit<FetchOptions, 'method'>) {
		return this.fetch<T>({ ...options, method: 'POST' });
	}

	public static async put<T = unknown>(options: Omit<FetchOptions, 'method'>) {
		return this.fetch<T>({ ...options, method: 'PUT' });
	}

	public static async delete<T = unknown>(options: Omit<FetchOptions, 'method'>) {
		return this.fetch<T>({ ...options, method: 'DELETE' });
	}

	static addGlobalHeaders(headers: HeadersInit) {
		this.globalHeaders = {
			...this.globalHeaders,
			...headers
		};
	}

	private static buildUrl(baseUrl: string, params?: Record<string, string>) {
		const url = buildUrl(import.meta.env.VITE_API_URL, baseUrl);

		if (!params) {
			return url;
		}

		const urlParams = new URLSearchParams(params).toString();
		return `${url}?${urlParams}`;
	}

	private static createRequestOptions(options: FetchOptions) {
		const { method = 'GET', headers, data, json, signal } = options;

		const requestOptions: RequestInit = {
			method,
			headers: {
				...this.globalHeaders,
				...headers
			},
			signal
		};

		if (data) {
			requestOptions.body = data;
		} else if (json) {
			requestOptions.headers = {
				...requestOptions.headers,
				'Content-Type': 'application/json'
			};
			requestOptions.body = JSON.stringify(json);
		}

		return requestOptions;
	}
}

export { HttpClient };
