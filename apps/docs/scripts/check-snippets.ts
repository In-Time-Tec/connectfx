import { Glob } from "bun"
import { dirname, join, relative } from "node:path"

const snippetsRoot = join(import.meta.dir, "..", "src", "snippets")
const failures: Array<string> = []
let checked = 0

for await (const expectedPath of new Glob("**/*.expected.txt").scan({ cwd: snippetsRoot, absolute: true })) {
  const snippetPath = expectedPath.replace(/\.expected\.txt$/, ".ts")
  const label = relative(snippetsRoot, snippetPath)
  if (!(await Bun.file(snippetPath).exists())) {
    failures.push(`${label}: expected-output file has no sibling snippet`)
    continue
  }
  const expected = (await Bun.file(expectedPath).text()).trimEnd()
  const run = Bun.spawnSync(["bun", snippetPath], { cwd: dirname(snippetPath), stdout: "pipe", stderr: "pipe" })
  checked += 1
  if (run.exitCode !== 0) failures.push(`${label}: exited ${run.exitCode}\n${run.stderr.toString().trimEnd()}`)
  else if (run.stdout.toString().trimEnd() !== expected) failures.push(`${label}: stdout drifted`)
}

if (failures.length > 0) {
  console.error(failures.join("\n\n"))
  process.exit(1)
}
console.log(`check-snippets: ${checked} runnable snippets verified`)
