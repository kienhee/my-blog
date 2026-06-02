"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Camera, Lock, Mail, MapPin, User } from "lucide-react";
import { fieldClassName, fieldClassNameMuted } from "@/lib/formStyles";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MOCK_PROFILE } from "@/lib/mock/dashboard";

type ProfileTab = "info" | "password";

export default function DashboardProfilePage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<ProfileTab>("info");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "password") setTab("password");
    if (t === "info") setTab("info");
  }, [searchParams]);

  const [username, setUsername] = useState(MOCK_PROFILE.username);
  const [address, setAddress] = useState(MOCK_PROFILE.address);
  const [bio, setBio] = useState(MOCK_PROFILE.bio);
  const [avatar, setAvatar] = useState(MOCK_PROFILE.avatar);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordError = useMemo(() => {
    if (!newPassword && !confirmPassword) return "";
    if (newPassword.length > 0 && newPassword.length < 8) return "New password must be at least 8 characters.";
    if (confirmPassword && newPassword !== confirmPassword) return "Confirm password does not match.";
    return "";
  }, [newPassword, confirmPassword]);

  const bioCount = bio.length;
  const canUpdatePassword =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    confirmPassword.trim().length >= 8 &&
    !passwordError;

  return (
    <DashboardShell
      title="Profile"
      description="Manage your account details and security settings."
      actions={
        tab === "info" ? (
          <button
            type="button"
            className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)] hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        ) : null
      }
    >
      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 sm:p-5">
        <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
          <button
            type="button"
            onClick={() => setTab("info")}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              tab === "info"
                ? "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Profile Information
          </button>
          <button
            type="button"
            onClick={() => setTab("password")}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              tab === "password"
                ? "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Password &amp; Security
          </button>
        </div>

        {tab === "info" ? (
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-5 mt-5">
            <div className="space-y-4 min-w-0">
              <label className="block space-y-2">
                <span className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)]">
                  <User size={14} />
                  Username
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={fieldClassName()}
                />
              </label>

              <label className="block space-y-2">
                <span className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)]">
                  <Mail size={14} />
                  Email (read-only)
                </span>
                <input
                  type="email"
                  value={MOCK_PROFILE.email}
                  readOnly
                  className={fieldClassNameMuted("text-[var(--text-subtle)]")}
                />
              </label>

              <label className="block space-y-2">
                <span className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)]">
                  <MapPin size={14} />
                  Address
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={fieldClassName()}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-[var(--text-subtle)]">Bio</span>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 160))}
                  className={fieldClassName("resize-none")}
                />
                <span className="block text-xs text-[var(--text-subtle)]">{bioCount}/160</span>
              </label>
            </div>

            <aside className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 h-fit">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-3">
                Avatar
              </p>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={avatar}
                  alt="Profile avatar"
                  className="w-24 h-24 rounded-full object-cover border border-[var(--border)]"
                />
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    <Camera size={12} />
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatar("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80")}
                    className="rounded-md px-3 py-1.5 text-xs border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="mt-5 max-w-xl space-y-4">
            <label className="block space-y-2">
              <span className="inline-flex items-center gap-2 text-sm text-[var(--text-subtle)]">
                <Lock size={14} />
                Current Password
              </span>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={fieldClassName()}
                placeholder="Enter current password"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-subtle)]">New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={fieldClassName()}
                placeholder="At least 8 characters"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-subtle)]">Confirm New Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={fieldClassName()}
                placeholder="Repeat new password"
              />
            </label>

            {passwordError ? (
              <p className="text-sm text-red-400">{passwordError}</p>
            ) : (
              <p className="text-xs text-[var(--text-subtle)]">
                Use at least 8 characters, and avoid common passwords.
              </p>
            )}

            <div className="pt-1">
              <button
                type="button"
                disabled={!canUpdatePassword}
                className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
