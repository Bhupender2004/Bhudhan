$files = Get-ChildItem -Path src -Recurse -Include "*.tsx", "*.jsx", "*.ts", "*.js" | Select-String -Pattern "import.*from.*'@/contexts/language-context'" | Select-Object -ExpandProperty Path -Unique

foreach ($file in $files) {
    Write-Host "Updating $file"
    (Get-Content $file) -replace "import \{ (.*) \} from '@/contexts/language-context';", "import { `$1 } from '@/lib/context/language-context';" | Set-Content $file
}

Write-Host "All files updated successfully!"
