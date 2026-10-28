
import { useState } from "react";
import { useNavigate } from "react-router";
import { createNewEntry } from "../services/entryService";

function CreateEntry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createNewEntry(formData);
      navigate("/my-entries");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to create entry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Create Entry</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label htmlFor="entryBody">Entry Body:</label>
          <textarea
            id="entryBody"
            name="entryBody"
            value={formData.entryBody}
            onChange={handleChange}
            maxLength={350}
          />
        </div>

        <div>
          <label htmlFor="isPublic">
            Make this entry public?
          </label>
          <input
            id="isPublic"
            name="isPublic"
            type="checkbox"
            checked={formData.isPublic}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Entry"}
        </button>
      </form>
    </main>
  );
}

export default CreateEntry;
