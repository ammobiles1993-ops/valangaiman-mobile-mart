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

- Read the shared database catalog through the root Query loader and CatalogProvider for every shop surface, including cart, so owner edits stay consistent.
- Product management writes use the authenticated browser client with owner-only database and storage policies; roles are granted only from verified provider identities.
- Product photos use a private storage bucket with public SELECT permission and expiring signed display URLs because public buckets are disabled by workspace policy.
