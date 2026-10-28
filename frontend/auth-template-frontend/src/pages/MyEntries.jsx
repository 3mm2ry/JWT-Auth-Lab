
import { useEffect, useState } from "react";
import { getAllMyEntries } from "../services/entryService";

function MyEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getAllMyEntries();
        setEntries(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          "Unable to load your entries."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  if (loading) {
    return <p>Loading your entries...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main>
      <h1>My Entries</h1>

      {entries.length === 0 ? (
        <p>No Entries made yet</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.entryBody}</p>
            <p>
              Visibility: {entry.isPublic ? "Public" : "Private"}
            </p>
          </div>
        ))
      )}
    </main>
  );
}

export default MyEntries;
