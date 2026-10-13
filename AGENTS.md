<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the single video experience at the index route and its visual system in shared CSS, so desktop and mobile use the same presentation.
- Import hosted media through generated asset pointers, so the application does not depend on the source file host.
- Keep autoplay fallback logic in the tested browser-safe playback helper and initialize after hydration even if media is already ready, so cached videos also start reliably.
