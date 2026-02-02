"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface MetabaseDashboardProps {
  token?: string;
  "with-title"?: string;
  "with-downloads"?: string;
}

declare global {
  interface Window {
    metabaseConfig?: {
      theme?: { preset?: string };
      isGuest?: boolean;
      instanceUrl?: string;
    };
  }
}

function MetabaseDashboard(props: MetabaseDashboardProps) {
  return (
    // @ts-expect-error - metabase-dashboard is a custom web component
    <metabase-dashboard {...props} />
  );
}

export default function SummaryPage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/metabase/token");
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to load dashboard");
        }
        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    window.metabaseConfig = {
      theme: { preset: "dark" },
      isGuest: true,
      instanceUrl: "https://metabase-749592412586.africa-south1.run.app",
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity</p>
      </div>

      <Script
        src="https://metabase-749592412586.africa-south1.run.app/app/embed.js"
        strategy="afterInteractive"
      />

      {loading && (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          Loading dashboard...
        </div>
      )}

      {error && (
        <div className="rounded-md border border-destructive p-8 text-center text-destructive">
          {error}
        </div>
      )}

      {token && (
        <div className="min-h-150 w-full">
          <MetabaseDashboard
            token={token}
            with-title="true"
            with-downloads="true"
          />
        </div>
      )}
    </div>
  );
}
