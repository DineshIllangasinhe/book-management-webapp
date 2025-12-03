import React, { useEffect, useState } from "react";

function UserDetails({ token, apiBase }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoints = [
          `${apiBase}/api/auth/me`
        ];

        let userData = null;
        for (const endpoint of endpoints) {
          try {
            const res = await fetch(endpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              const data = await res.json();
              userData = data.user || data;
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!userData) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            userData = {
              email: payload.email,
              name: payload.name || payload.username || "User",
              id: payload.id || payload.userId,
            };
          } catch (err) {
            throw new Error("Unable to fetch user details");
          }
        }

        setUser(userData);
      } catch (err) {
        setError(err.message || "Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token, apiBase]);

  if (loading) {
    return (
      <div className="bg-white rounded shadow p-6">
        <p className="text-center text-slate-500">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded shadow p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-lg">User Details</h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {user?.name || "User"}
              </h3>
              <p className="text-sm text-slate-500">{user?.email || "No email"}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
              Account Information
            </h4>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">Name</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  {user?.name || "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Email</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  {user?.email || "Not provided"}
                </dd>
              </div>
              {user?.id && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">User ID</dt>
                  <dd className="mt-1 text-sm text-slate-900">{user.id}</dd>
                </div>
              )}
              {user?.createdAt && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Member Since
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;

