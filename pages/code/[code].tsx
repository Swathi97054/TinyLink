import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CodeStats() {
  const router = useRouter();
  const code = router.query.code as string;
  const { data, error } = useSWR(code ? `/api/links/${code}` : null, fetcher);

  if (error) return <div className="p-4">Error loading</div>;
  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stats: {data.code}</h1>
      <div className="mb-2"><strong>Target:</strong> <a href={data.targetUrl} target="_blank" rel="noreferrer" className="underline">{data.targetUrl}</a></div>
      <div className="mb-2"><strong>Clicks:</strong> {data.clicks}</div>
      <div className="mb-2"><strong>Last clicked:</strong> {data.lastClicked ?? 'Never'}</div>
    </div>
  );
}
