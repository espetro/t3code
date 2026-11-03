# cutils export — push `cursor/cutils-ffi-4eae` to sigilco/cutils

Transfer only. These are not T3 Code product changes.

## Contents

- Branch: `cursor/cutils-ffi-4eae`
- Commit: `d6f72c833f53acaa22c6fba6c64f803724735528`
- Base at export: `25d2a1d9c660f768db10da6efa6b1e4a94390883` (`sigilco/cutils` `origin/main`)
- `cursor-cutils-ffi-4eae.bundle`
- `0001-feat-ffi-add-cutils-ffi-format-7-span-ABI-and-Rust-struct-echo.patch`

Subject / PR title:

`feat(ffi): add @cutils/ffi format-7 span ABI and Rust struct echo`

## Reconstruct (bundle)

```sh
git clone https://github.com/sigilco/cutils.git
cd cutils
git fetch origin
# need ancestor 25d2a1d9c660f768db10da6efa6b1e4a94390883

EXPORT=/path/to/t3code/exports/cutils
git fetch "$EXPORT/cursor-cutils-ffi-4eae.bundle" cursor/cutils-ffi-4eae:cursor/cutils-ffi-4eae
git rev-parse cursor/cutils-ffi-4eae   # expect d6f72c833f53acaa22c6fba6c64f803724735528
```

## Reconstruct (`git am`)

```sh
git checkout -B cursor/cutils-ffi-4eae origin/main
git am "$EXPORT/0001-feat-ffi-add-cutils-ffi-format-7-span-ABI-and-Rust-struct-echo.patch"
```

## Push and PR

```sh
git push -u origin cursor/cutils-ffi-4eae

gh pr create --repo sigilco/cutils \
  --head cursor/cutils-ffi-4eae \
  --base main \
  --title "feat(ffi): add @cutils/ffi format-7 span ABI and Rust struct echo" \
  --body "$(git log -1 --format=%b d6f72c833f53acaa22c6fba6c64f803724735528)"
```
