import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function usePosts() {
  const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher);
  return {
    posts: data?.posts ?? [],
    isLoading,
    error,
    mutate, // use this to refresh after adding a post
  };
}
