import React, { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

function Books({ token, apiBase }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");

  const limit = 5;

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${apiBase}/api/books?search=${encodeURIComponent(
          search
        )}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load books");
      }

      const booksArray = Array.isArray(data) ? data : (data.books || data.data || []);
      setBooks(booksArray);
      setHasMore(booksArray.length === limit)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      const res = await fetch(`${apiBase}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete");
      }

      fetchBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (hasMore) setPage((p) => p + 1);
  };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={handleSearchChange}
          className="w-full md:flex-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <BookForm
        apiBase={apiBase}
        token={token}
        onSaved={fetchBooks}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-base md:text-lg">Books</h2>
          {loading && <p className="text-xs md:text-sm text-slate-500">Loading...</p>}
        </div>

        {error && (
          <div className="px-4 md:px-6 py-3 bg-red-50 border-b border-red-200">
            <p className="text-xs md:text-sm text-red-600">{error}</p>
          </div>
        )}

        {books.length === 0 && !loading ? (
          <div className="px-4 md:px-6 py-8 text-center">
            <p className="text-xs md:text-sm text-slate-500">No books found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {b.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{b.author}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-md">
                          {b.description || (
                            <span className="text-slate-400 italic">
                              No description
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingBook(b)}
                            className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="px-3 py-1 border border-red-500 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-200">
              {books.map((b) => (
                <div key={b.id} className="p-4 hover:bg-slate-50">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-600">by {b.author}</p>
                    </div>
                    {b.description && (
                      <div className="text-xs text-slate-600">
                        <span className="font-medium">Description: </span>
                        {b.description}
                      </div>
                    )}
                    {!b.description && (
                      <div className="text-xs text-slate-400 italic">
                        No description
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setEditingBook(b)}
                        className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded hover:bg-slate-100 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="flex-1 px-3 py-2 text-xs border border-red-500 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {books.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-xs md:text-sm text-slate-600 text-center md:text-left">
              Showing {books.length} book{books.length !== 1 ? "s" : ""} on page {page}
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 md:px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                Previous
              </button>
              <span className="px-2 md:px-3 text-slate-600">Page {page}</span>
              <button
                onClick={handleNext}
                disabled={!hasMore}
                className="px-3 md:px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;