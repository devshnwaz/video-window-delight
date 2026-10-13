import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import videoAsset from "@/assets/glass-video.mp4.asset.json";
import webmAsset from "@/assets/glass-video.webm.asset.json";
import posterAsset from "@/assets/glass-video-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Still — A glass video experience" },
      { name: "description", content: "A quiet, uninterrupted video experience in light and glass." },
      { property: "og:title", content: "Still — A glass video experience" },
      { property: "og:description", content: "A quiet, uninterrupted video experience in light and glass." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "blocked">("loading");
  return (
    <main className="video-page" aria-label="Video experience">
      <div className="light-ribbons" aria-hidden="true" />
      <div className="video-glass">
        <div className="video-surface">
          <video
            className="ambient-video"
            aria-label="Featured video"
            poster={posterAsset.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(event) => event.preventDefault()}
            onPlaying={() => setStatus("ready")}
            onCanPlay={(event) => {
              const video = event.currentTarget;
              video.muted = true;
              setStatus("ready");
              if (video.paused) {
                void video.play().catch(() => setStatus("blocked"));
              }
            }}
            onError={() => setStatus("error")}
          >
            <source src={videoAsset.url} type="video/mp4" />
            <source src={webmAsset.url} type="video/webm" />
          </video>
          {status === "loading" && <div className="video-status" role="status" aria-label="Loading video"><span className="loading-mark" aria-hidden="true" /></div>}
          {status === "error" && <div className="video-status" role="alert">The video couldn’t load. Please refresh.</div>}
          {status === "blocked" && <div className="video-status" role="status">Your browser has blocked automatic playback.</div>}
        </div>
      </div>
    </main>
  );
}
