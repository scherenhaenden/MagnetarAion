#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Backend Coverage ---
echo "Calculating backend code coverage..."
pip install -r backend/requirements.txt > /dev/null 2>&1
BACKEND_COVERAGE_OUTPUT=$(python -m pytest backend/tests/ --cov=backend/app --cov-report=term-missing)
BACKEND_COVERAGE=$(echo "$BACKEND_COVERAGE_OUTPUT" | grep TOTAL | awk '{print $NF}' | sed 's/%//')
BACKEND_LINES=$(echo "$BACKEND_COVERAGE_OUTPUT" | grep TOTAL | awk '{print $2}')
BACKEND_LINES_COVERED=$(echo "$BACKEND_COVERAGE_OUTPUT" | grep TOTAL | awk '{print $3}')
BACKEND_LINES_UNCOVERED=$((BACKEND_LINES - BACKEND_LINES_COVERED))
echo "Backend coverage: $BACKEND_COVERAGE%"

# --- Frontend Coverage ---
echo "Calculating frontend code coverage..."
(cd frontend/magnetaraion-app && npm install > /dev/null 2>&1 && npm test -- --code-coverage)
FRONTEND_COVERAGE_INFO=$(cat frontend/magnetaraion-app/coverage/magnetaraion-app/lcov.info | grep 'LF:' | head -1)
FRONTEND_LINES_EXECUTED=$(echo $FRONTEND_COVERAGE_INFO | cut -d':' -f2 | cut -d',' -f1)
FRONTEND_LINES_TOTAL=$(echo $FRONTEND_COVERAGE_INFO | cut -d':' -f2 | cut -d',' -f2)
FRONTEND_COVERAGE=$(awk "BEGIN {printf \"%.0f\", ($FRONTEND_LINES_EXECUTED/$FRONTEND_LINES_TOTAL)*100}")
FRONTEND_LINES_UNCOVERED=$((FRONTEND_LINES_TOTAL - FRONTEND_LINES_EXECUTED))
echo "Frontend coverage: $FRONTEND_COVERAGE%"

# --- Overall Coverage ---
TOTAL_LINES=$((BACKEND_LINES + FRONTEND_LINES_TOTAL))
TOTAL_LINES_COVERED=$((BACKEND_LINES_COVERED + FRONTEND_LINES_EXECUTED))
TOTAL_LINES_UNCOVERED=$((BACKEND_LINES_UNCOVERED + FRONTEND_LINES_UNCOVERED))
TOTAL_COVERAGE=$(awk "BEGIN {printf \"%.0f\", ($TOTAL_LINES_COVERED/$TOTAL_LINES)*100}")
echo "Total coverage: $TOTAL_COVERAGE%"

# --- Update COVERAGE_REPORT.md ---
echo "Updating COVERAGE_REPORT.md..."

# Create the new content
NEW_CONTENT="# Code Coverage Report

## Summary

- **Total Coverage:** ${TOTAL_COVERAGE}%
- **Files:** TODO
- **Lines:** ${TOTAL_LINES}
- **Lines Covered:** ${TOTAL_LINES_COVERED}
- **Lines Uncovered:** ${TOTAL_LINES_UNCOVERED}

## Coverage Visualization

### Overall Coverage

\`\`\`
        /------------------------------------------------------\\
       /                                                        \\
      /                      TESTED CODE (${TOTAL_COVERAGE}%)                   \\
     /                                                            \\
    /                                                              \\
   /                                                                \\
  /------------------------------------------------------------------\\
 /               UNTESTED CODE ($((100 - TOTAL_COVERAGE))%)                                  \\
/____________________________________________________________________\\
\`\`\`

### Backend vs Frontend Coverage

\`\`\`
Backend:   [$(printf '#%.0s' $(seq 1 $(($BACKEND_COVERAGE/2))))$(printf ' %.0s' $(seq 1 $((50 - $BACKEND_COVERAGE/2))))] ${BACKEND_COVERAGE}%
Frontend:  [$(printf '#%.0s' $(seq 1 $(($FRONTEND_COVERAGE/2))))$(printf ' %.0s' $(seq 1 $((50 - $FRONTEND_COVERAGE/2))))] ${FRONTEND_COVERAGE}%
\`\`\`
"

# Write the new content to the file
echo "$NEW_CONTENT" > COVERAGE_REPORT.md

echo "COVERAGE_REPORT.md updated successfully."
