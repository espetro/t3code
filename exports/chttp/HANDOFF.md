# chttp export — push `cursor/chttp-scriptc-047-4eae` to sigilco/chttp

Transfer only. These are not T3 Code product changes.

## Contents

- Branch: `cursor/chttp-scriptc-047-4eae`
- Commit: `3bdd9188ec7a7ce6d09ab3085d4efb337b20b17b`
- Base at export: `c13fe24ebdb63c0a4ba16e8688ae10589d547a06` (`sigilco/chttp` `origin/main`)
- `cursor-chttp-scriptc-047-4eae.bundle`
- `0001-fix-router-type-adopted-body-reads-without-ReadableStreamReadResult.patch`

Subject / PR title:

`fix(router): type adopted-body reads without ReadableStreamReadResult`

## Reconstruct (bundle)

```sh
git clone https://github.com/sigilco/chttp.git
cd chttp
git fetch origin
# need ancestor c13fe24ebdb63c0a4ba16e8688ae10589d547a06

EXPORT=/path/to/t3code/exports/chttp
git fetch "$EXPORT/cursor-chttp-scriptc-047-4eae.bundle" \
  cursor/chttp-scriptc-047-4eae:cursor/chttp-scriptc-047-4eae
git rev-parse cursor/chttp-scriptc-047-4eae   # expect 3bdd9188ec7a7ce6d09ab3085d4efb337b20b17b
```

## Reconstruct (`git am`)

```sh
git checkout -B cursor/chttp-scriptc-047-4eae origin/main
git am "$EXPORT/0001-fix-router-type-adopted-body-reads-without-ReadableStreamReadResult.patch"
```

## Push and PR

```sh
git push -u origin cursor/chttp-scriptc-047-4eae

gh pr create --repo sigilco/chttp \
  --head cursor/chttp-scriptc-047-4eae \
  --base main \
  --title "fix(router): type adopted-body reads without ReadableStreamReadResult" \
  --body "$(git log -1 --format=%b 3bdd9188ec7a7ce6d09ab3085d4efb337b20b17b)"
```
