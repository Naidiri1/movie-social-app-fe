import { useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";

export default function ShareTop10Toggle() {
  const [enabled, setEnabled] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [token, setToken] = useState<string | null>(null);
useEffect(() => {
    setMounted(true);
    const storedToken = typeof window !== 'undefined' 
      ? sessionStorage.getItem("access_token") 
      : null;
    setToken(storedToken);
  }, []);  
  
  
  useEffect(() => { 
    if(!mounted) return
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me/share`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ enabled: true }),
          }
        );

        if (res.ok) {
          const json = await res.json();
          setEnabled(!!json.enabled);
          setSlug(json.slug ?? null);
        }
      } catch {}
    })();
  }, []);

  const toggle = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me/share`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ enabled: !enabled }),
        }
      );
      if (res.ok) {
        const json = await res.json();
        setEnabled(json.enabled);
        setSlug(json.slug ?? null);
      }
    } finally {
      setSaving(false);
    }
  };

  const shareUrl = slug ? `${window.location.origin}/share/${slug}` : "";

  const copy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col gap-3 ml-3 bg-zinc-900 text-white p-4 rounded-lg w-full sm:w-auto">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {saving ? "Saving..." : enabled ? "Sharing: ON" : "Sharing: OFF"}
        </span>
        <Switch
          color="red"
          checked={enabled}
          onChange={toggle}
          disabled={saving}
          ripple={true}
          crossOrigin={undefined}
        />
      </div>

      {enabled && slug && (
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={shareUrl}
            className="bg-zinc-800 rounded px-2 py-1 text-xs w-[260px] text-black"
          />
          <button
            onClick={copy}
            className="px-3 py-1 text-xs text-black rounded bg-white hover:bg-zinc-600 transition-colors duration-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
