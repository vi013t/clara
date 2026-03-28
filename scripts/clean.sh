SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.." || exit 1

rm generated -rf

rm node_modules -rf
rm **/node_modules -rf

rm bun.lock 
rm **/bun.lock 
rm bun.lockb
rm **/bun.lockb

rm .turbo -rf
rm **/.turbo -rf

rm **/.svelte-kit -rf

rm **/target -rf

bun pm cache rm