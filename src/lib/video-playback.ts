export async function startVideo(video: HTMLVideoElement): Promise<boolean> {
  video.muted = false;
  video.volume = 1;
  try {
    await video.play();
    return true;
  } catch {
    video.muted = true;
    await video.play();
    return false;
  }
}