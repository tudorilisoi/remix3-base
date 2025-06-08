import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import fs from "fs"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
// vite-plugin-replace-console-log.ts
import { type Plugin } from "vite"

const { HOST_APP_PATH } = process.env
function open(path: string, lineNumber: string | undefined) {
  const cmd = `code -g "${`${HOST_APP_PATH}/${path}`}${lineNumber ? `:${lineNumber}` : ""}"`
  fs.writeFileSync("/tmp/opencommand.sh", cmd)
}

console.log(`PWD is: ${process.env.HOST_APP_PATH}`)

export default defineConfig({
  plugins: [
    // devtoolsJson(),
    // reactRouterDevTools({ editor: { name: "Host code", open } }),
    reactRouterDevTools(),
    replaceConsoleLog(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      ".prisma/client/index-browser":
        "./node_modules/.prisma/client/index-browser.js",
    },
  },
})

function replaceConsoleLog(): Plugin {
  return {
    name: "vite-plugin-replace-console-log",
    enforce: "pre",
    apply: "serve", // or 'serve' to run during dev
    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return

      const updatedCode = code.replace(
        /console\.log\s*\(([^)]*)\)/g,
        (match, args) => {
          const trimmed = args.trim()

          // Split arguments, but safely (handle only simple comma separation)
          const splitArgs = trimmed.split(",").map((arg) => arg.trim())

          // If first arg is a string literal (single or double quote)
          if (/^(['"`]).*\1$/.test(splitArgs[0])) {
            const path = splitArgs[0]
            // const re = /\/app\/.+?:\d:\d/
            const re = /(\/app\/.+?):(\d):(\d)/
            /* const matches = path.match(re)
            if (!matches) {
              return match
            }
            const [g0, g1, g2, g3] = matches

            splitArgs[0] = `"vscode://file${HOST_APP_PATH}${g1}%3A${g2}%3A${g3}"` */

            splitArgs[0] = path.replace(
              re,
              (g0, g1, g2, g3) =>
                `vscode://file${HOST_APP_PATH}${g1}%3A${g2}%3A${g3}`,
            )
          } else {
            return match // don't modify if first argument isn't a string
          }

          return `console.log(${splitArgs.join(", ")})`
        },
      )

      return {
        code: updatedCode,
        map: null,
      }
    },
  }
}
