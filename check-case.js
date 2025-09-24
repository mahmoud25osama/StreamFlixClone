import fs from 'fs'
import path from 'path'

function getFiles(dir) {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            results = results.concat(getFiles(filePath))
        } else {
            results.push(filePath)
        }
    })
    return results
}

const files = getFiles('./src') // مسار مجلد المشروع الرئيسي

files.forEach((file) => {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(file, 'utf8')
        const regex = /import\s+.*\s+from\s+['"](.*)['"]/g
        let match
        while ((match = regex.exec(content)) !== null) {
            const importPath = match[1]
            if (importPath.startsWith('.')) {
                const fullPathJsx = path.resolve(
                    path.dirname(file),
                    importPath + '.jsx'
                )
                const fullPathJs = path.resolve(
                    path.dirname(file),
                    importPath + '.js'
                )
                const fullPathIndexJsx = path.resolve(
                    path.dirname(file),
                    importPath,
                    'index.jsx'
                )
                const fullPathIndexJs = path.resolve(
                    path.dirname(file),
                    importPath,
                    'index.js'
                )

                const exists =
                    fs.existsSync(fullPathJsx) ||
                    fs.existsSync(fullPathJs) ||
                    fs.existsSync(fullPathIndexJsx) ||
                    fs.existsSync(fullPathIndexJs)

                if (!exists) {
                    console.log(
                        `❌ Import not found or wrong case: "${importPath}" in ${file}`
                    )
                }
            }
        }
    }
})
