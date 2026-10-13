import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startVideo } from "@/lib/video-playback";
import videoAsset from "@/assets/glass-video.mp4.asset.json";
import webmAsset from "@/assets/glass-video-sound.webm.asset.json";
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
  const [needsSound, setNeedsSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      setNeedsSound(false);
      setStatus("ready");
    } catch {
      video.muted = true;
      setNeedsSound(true);
    }
  };
  return (
    <main className="video-page" aria-label="Video experience">
      <div className="light-ribbons" aria-hidden="true" />
      <div className="video-glass">
        <div className="video-surface">
          <video
            ref={videoRef}
            className="ambient-video"
            aria-label="Featured video"
            poster={posterAsset.url}
            autoPlay
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(event) => event.preventDefault()}
            onPlaying={() => setStatus("ready")}
            onCanPlay={(event) => {
              const video = event.currentTarget;
              setStatus("ready");
              if (started.current) return;
              started.current = true;
              void startVideo(video).then((hasSound) => setNeedsSound(!hasSound)).catch(() => {
                setNeedsSound(true);
                setStatus("blocked");
              });
            }}
            onError={() => setStatus("error")}
          >
            <source src={videoAsset.url} type="video/mp4" />
            <source src={webmAsset.url} type="video/webm" />
          </video>
          {needsSound && <Button variant="glass" size="icon" className="sound-enable" aria-label="Enable sound" title="Enable sound" onClick={() => void enableSound()}><Volume2 /></Button>}
          {status === "loading" && <div className="video-status" role="status" aria-label="Loading video"><span className="loading-mark" aria-hidden="true" /></div>}
          {status === "error" && <div className="video-status" role="alert">The video couldn’t load. Please refresh.</div>}
          {status === "blocked" && <div className="video-status" role="status">Your browser has blocked automatic playback.</div>}
        </div>
      </div>
    </main>
  );
}
