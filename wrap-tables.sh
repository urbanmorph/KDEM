#!/bin/bash
# Script to wrap all tables in tab files with scroll wrapper div

for file in src/tabs/*.js; do
    # Skip if file already has table-scroll-wrapper around all tables
    if grep -q "table-scroll-wrapper" "$file"; then
        echo "Checking $file..."
        # Count tables vs wrappers
        table_count=$(grep -c '<table' "$file")
        wrapper_count=$(grep -c 'table-scroll-wrapper' "$file")

        if [ "$table_count" -eq "$wrapper_count" ]; then
            echo "  ✓ All tables already wrapped in $file"
            continue
        fi
    fi

    echo "Processing $file..."

    # Use sed to wrap tables
    # This wraps any <table> that isn't already wrapped
    sed -i '' 's|^\([ ]*\)<table class="\([^"]*\)">$|\1<div class="table-scroll-wrapper">\n\1    <table class="\2">|' "$file"
    sed -i '' 's|^\([ ]*\)</table>$|\1</table>\n\1</div>|' "$file"

    echo "  ✓ Wrapped tables in $file"
done

echo "Done!"
