import { describe, expect, it, vi } from "vitest";
import { startVideo } from "@/lib/video-playback";

describe("Video sound", () => {
  it("attempts autoplay with sound at full volume", async () => {
    const video = document.createElement("video");
    vi.spyOn(video, "play").mockResolvedValue();
    expect(await startVideo(video)).toBe(true);
    expect(video.muted).toBe(false);
    expect(video.volume).toBe(1);
  });
  it("keeps video autoplaying muted when the browser blocks sound", async () => {
    const video = document.createElement("video");
    const play = vi.spyOn(video, "play").mockRejectedValueOnce(new Error("NotAllowedError")).mockResolvedValueOnce();
    expect(await startVideo(video)).toBe(false);
    expect(video.muted).toBe(true);
    expect(play).toHaveBeenCalledTimes(2);
  });
});