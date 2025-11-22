import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Dashboard() {
  const { data, mutate } = useSWR('/api/links', fetcher);
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl, code: code || undefined })
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err?.error || 'Error');
      } else {
        setTargetUrl('');
        setCode('');
        await mutate();
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  async function deleteLink(codeToDelete: string) {
    if (!confirm('Delete this link?')) return;
    await fetch(`/api/links/${codeToDelete}`, { method: 'DELETE' });
    await mutate();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">TinyLink</h1>

        <form onSubmit={createLink} className="mb-6 space-y-3">
          <div>
            <label className="block">Target URL</label>
            <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="w-full p-2 border rounded" placeholder="https://example.com" />
          </div>
          <div>
            <label className="block">Custom code (optional, 6-8 alnum)</label>
            <input value={code} onChange={e => setCode(e.target.value)} className="w-full p-2 border rounded" placeholder="abc123" />
          </div>
          <div>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-2">Links</h2>
          {!data && <div>Loading...</div>}
          {data && data.length === 0 && <div>No links yet.</div>}
          {data && data.length > 0 && (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Target</th>
                  <th className="p-2">Clicks</th>
                  <th className="p-2">Last Clicked</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: any) => (
                  <tr key={row.code} className="border-t">
                    <td className="p-2"><a href={`/${row.code}`} target="_blank" rel="noreferrer" className="underline">{row.code}</a></td>
                    <td className="p-2 truncate max-w-xs">{row.targetUrl}</td>
                    <td className="p-2 text-center">{row.clicks}</td>
                    <td className="p-2 text-center">{row.lastClicked ?? '—'}</td>
                    <td className="p-2">
                      <button onClick={() => deleteLink(row.code)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
