import useSWR from 'swr';
import { fetcher } from "./fetchers";

export default function useUser () {

    const { data, error } = useSWR("/auth/me", fetcher);

    return {
        user: data,
        isLoading: !error && !data,
        error
    }
}