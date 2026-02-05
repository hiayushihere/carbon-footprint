import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/";
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    try {
      setSaving(true);
      const res = await api.put("/users/me", form);
      setUser(res.data);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-shell">
        {/* Left panel */}
        <aside className="profile-sidebar">
          <div className="avatar">👤</div>
          <h3>{user.name}</h3>
          <p className="email">{user.email}</p>

          <div className="meta">
            <span>Member since</span>
            <strong>
              {new Date(user.createdAt).toLocaleDateString()}
            </strong>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </aside>

        {/* Right panel */}
        <main className="profile-content">
          <h2>Account Settings</h2>
          <p className="subtitle">
            Update your personal information and manage your account.
          </p>

          <div className="form-grid">
            <div className="field">
              <label>Full Name</label>
              {editing ? (
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              ) : (
                <div className="value">{user.name}</div>
              )}
            </div>

            <div className="field">
              <label>Email Address</label>
              {editing ? (
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              ) : (
                <div className="value">{user.email}</div>
              )}
            </div>
          </div>

          <div className="actions">
            {editing ? (
              <>
                <button
                  className="btn-primary"
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
