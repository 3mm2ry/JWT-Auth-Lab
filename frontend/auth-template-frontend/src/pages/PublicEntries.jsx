
import { useEffect, useState } from "react";
import { getAllPublicEntries } from "../services/entryService";

function PublicEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getAllPublicEntries();
        setEntries(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          "Unable to load public entries."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  if (loading) {
    return <p>Loading public entries...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main>
      <h1>Public Entries</h1>

      {entries.length === 0 ? (
        <p>No Entries made yet</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.entryBody}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default PublicEntries;
