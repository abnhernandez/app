import { spawn } from 'node:child_process'

process.env.BROWSERSLIST_IGNORE_OLD_DATA = 'true'
process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA = 'true'

const isWindows = process.platform === 'win32'
const nextBin = isWindows ? 'next.cmd' : 'next'

const child = spawn(nextBin, ['build'], {
  stdio: 'inherit',
  env: process.env,
  shell: isWindows,
})

child.on('exit', (code) => {
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
