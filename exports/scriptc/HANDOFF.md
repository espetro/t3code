# scriptc export — apply on espetro/scriptc, PR to vercel-labs/scriptc

Transfer only. These are not T3 Code product changes.

Do **not** push to `vercel-labs/scriptc` from a bot without write access. Push branches to **`espetro/scriptc`**, then open PRs into `vercel-labs/scriptc`.

## Contents

| Issue | Branch | Commit | Files |
| --- | --- | --- | --- |
| https://github.com/vercel-labs/scriptc/issues/2912 | `cursor/branded-map-keys-4eae` | `4c5aff9171dba01e95f20e4fbbb9ed7f45a64120` | `b4/` |
| https://github.com/vercel-labs/scriptc/issues/2913 | `cursor/http-server-meta-4eae` | `5c01e3cb7651a084fc18e97b8f5b2902c3d4e5f6` | `b3/` |

Base at export: `2569b74055df505506323e51ca0eb730b903ae5f` (`origin/main` of vercel-labs/scriptc).

Each directory has:

- `cursor-*.bundle` — single commit on top of that base
- `0001-*.patch` — `git am` / format-patch of the same commit
- `comment-2912.md` / `comment-2913.md` — draft issue comments (do not post unless you intend to)

## Reconstruct (bundle, preferred)

Prerequisite: clone of scriptc whose `main` contains `2569b74055df505506323e51ca0eb730b903ae5f` (fetch upstream if needed).

```sh
# from a clone of espetro/scriptc (or a fresh clone of vercel-labs/scriptc with espetro remote)
git fetch origin
git merge-base --is-ancestor 2569b74055df505506323e51ca0eb730b903ae5f HEAD \
  || git fetch https://github.com/vercel-labs/scriptc.git 2569b74055df505506323e51ca0eb730b903ae5f

EXPORT=/path/to/t3code/exports/scriptc

git fetch "$EXPORT/b4/cursor-branded-map-keys-4eae.bundle" \
  cursor/branded-map-keys-4eae:cursor/branded-map-keys-4eae
git fetch "$EXPORT/b3/cursor-http-server-meta-4eae.bundle" \
  cursor/http-server-meta-4eae:cursor/http-server-meta-4eae

git rev-parse cursor/branded-map-keys-4eae   # expect 4c5aff9171dba01e95f20e4fbbb9ed7f45a64120
git rev-parse cursor/http-server-meta-4eae  # expect 5c01e3cb7651a084fc18e97b8f5b2902c3d4e5f6
```

If `git fetch` on the bundle fails because `main` has moved past the recorded base, use `git am` on current `main` (next section) instead of forcing the old SHA.

## Reconstruct (`git am`)

```sh
git checkout -B cursor/branded-map-keys-4eae origin/main
git am "$EXPORT/b4/0001-fix-compiler-treat-nested-brand-tables-as-primitive-.patch"

git checkout -B cursor/http-server-meta-4eae origin/main
git am "$EXPORT/b3/0001-fix-http-lower-Server-off-listeners-and-newListener.patch"
```

## Push to espetro/scriptc

```sh
git remote add espetro https://github.com/espetro/scriptc.git   # if missing
git push -u espetro cursor/branded-map-keys-4eae
git push -u espetro cursor/http-server-meta-4eae
```

## Open PRs into vercel-labs/scriptc

```sh
gh pr create --repo vercel-labs/scriptc \
  --head espetro:cursor/branded-map-keys-4eae \
  --base main \
  --title "fix(compiler): treat nested brand tables as primitive Map keys" \
  --body "Fixes #2912"

gh pr create --repo vercel-labs/scriptc \
  --head espetro:cursor/http-server-meta-4eae \
  --base main \
  --title "fix(http): lower Server off, listeners, and newListener" \
  --body "Fixes #2913"
```

Do not comment on the issues unless you want that; drafts are in `b4/comment-2912.md` and `b3/comment-2913.md`.
