import {useClients} from "graz";
import {useState, useEffect, useCallback} from "react";
import CognitariumDetails from "./CognitariumDetails";

export default function Cognitarium({ address }: { address: string }) {
  const { data, isLoading } = useClients();
  const { cosmWasm } = data || {};
  const [result, setResult] = useState<readonly string[] | null>(null);
  const [filter, setFilter] = useState<string>(address);

  useEffect(() => {
    if (!cosmWasm) return;

    const fetchData = async () => {
      const cognitarium6 = await cosmWasm.getContracts(6);
      const cognitarium7 = await cosmWasm.getContracts(7);
      setResult([...cognitarium6, ...cognitarium7]);
    };
    fetchData();
  }, [cosmWasm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  if (isLoading) return <div>Loading Cognitarium...</div>;

  return (
    <div>
      <h1>Cognitarium</h1>
      <div>
        <label htmlFor="filter">Filter by sender address:</label>
        <input id="filter" type="text" value={filter} onChange={handleChange} />
      </div>

      <div>
        {result && result.map((address, idx) => (
          <CognitariumDetails key={idx} filter={filter} address={address} />
        ))}
        </div>
      </div>
  );
}
