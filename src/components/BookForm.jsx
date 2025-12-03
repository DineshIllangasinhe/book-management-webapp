import React, { useEffect, useState } from "react";

function BookForm({ apiBase, token, onSaved, editingBook, onCancelEdit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || "",
        author: editingBook.author || "",
        description: editingBook.description || "",
      });
    } else {
      setForm({ title: "", author: "", description: "" });
    }
  }, [editingBook]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.author) {
      setError("Title and author are required");
      return;
    }

    try {
      const isEdit = !!editingBook;
      const url = isEdit
        ? `${apiBase}/api/books/${editingBook.id}`
        : `${apiBase}/api/books`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save book");
      }

      setForm({ title: "", author: "", description: "" });
      onSaved && onSaved();
      onCancelEdit && onCancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-4 md:p-6 space-y-3 md:space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="font-semibold text-sm md:text-base">
          {editingBook ? "Edit Book" : "Add New Book"}
        </h2>
        {editingBook && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-500 hover:text-slate-700 underline transition-colors"
          >
            Cancel edit
          </button>
        )}
      </div>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1.5">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="Enter author name"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-y"
          placeholder="Enter book description (optional)"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2.5 text-sm font-medium rounded bg-slate-900 text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          {editingBook ? "Update Book" : "Save Book"}
        </button>
      </div>
    </form>
  );
}

export default BookForm;