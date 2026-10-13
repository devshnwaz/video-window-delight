# Light Glass Video Page

## Experience
- Make the home page a public video experience with no sign-in.
- Show your video from `https://files.catbox.moe/iidrlv.mp4` automatically when the page opens.
- Hide all video controls: no playback bar, player buttons, menus, or extra interface.
- Keep the full video visible in its original proportions, centered with generous space around it. The video will not fill the background.

## Visual design
- Use a light pearl-white background with subtle cool-colored accents.
- Surround the video with a restrained liquid-glass frame: translucent edges, soft reflections, and a gentle shadow.
- Add a smooth entrance and quiet CSS-driven background motion, without distracting from the video.
- Avoid unnecessary headings, cards, navigation, and promotional text.
- Adapt the video size and surrounding space for both desktop and mobile, without cropping or horizontal scrolling.

## Playback details
- Use muted autoplay and inline playback, since browsers generally block automatic playback with sound.
- Loop the video so the experience continues without visible controls.
- Respect reduced-motion preferences for decorative animation.
- Check the actual video download before implementation; if usable, store a hosted copy so playback does not depend on the original link remaining available.
- Show a minimal loading or failure state only when needed.

## Technical implementation and checks
- Replace the home-page placeholder and define the light glass styling in the shared CSS design system.
- Use the native video element with autoplay, muted, loop, and playsInline; omit controls.
- Add page-specific title and sharing metadata.
- Verify actual playback, hidden controls, uncropped video, and layout on desktop and mobile.

## Browser limitation
Muted autoplay is the most reliable approach, but device settings, data-saving modes, and browser restrictions can still prevent it. Automatic playback with sound cannot be guaranteed.