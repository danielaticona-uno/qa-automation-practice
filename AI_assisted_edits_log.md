# AI-Assisted Edits Log

## Project
QA Automation Practice Repository

## Description

This document summarizes how AI was used during the development of this project. Each entry includes the original prompt, the AI-generated suggestion, the final implementation, and the reason for the modification.

| # | Prompt | AI Output | Final Edit | Why I Changed It |
|---|--------|-----------|------------|------------------|
| 1 | Create a login test using Page Object Model. | Generated a basic login test. | Refactored to use reusable helpers and Driver Factory. | Improve maintainability and reduce duplicated code. |
| 2 | Create a Driver Factory for Appium. | Generated basic driver configuration. | Moved configuration to environment variables. | Avoid hardcoded values. |
| 3 | Create reusable test data. | Generated hardcoded test data. | Created `testData.ts`. | Separate data from test logic. |
| 4 | Create a checkout helper. | Generated checkout steps. | Reused helper methods and page objects. | Reduce duplicated code. |
| 5 | Improve the payment test. | Generated a basic payment flow. | Used reusable helpers and test data. | Cleaner and easier maintenance. |
| 6 | Add screenshot on failure. | Generated screenshot example. | Implemented `captureFailure()`. | Improve debugging. |
| 7 | Save page source on failure. | Generated `getPageSource()` example. | Saved XML automatically. | Analyze UI failures. |
| 8 | Reorganize the project structure. | Suggested folder organization. | Moved tests into organized folders. | Improve project structure. |
| 9 | Configure GitHub Actions. | Generated an initial workflow. | Fixed CI configuration and environment setup. | Ensure successful execution. |
| 10 | Improve error handling. | Generated basic `try/catch`. | Added cleanup and failure capture. | Make tests more robust. |
