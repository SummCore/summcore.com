# Engineering Workflow Rules (Non-Negotiable)

## 1) Think First, Then Act
- First, think through the problem and identify what "done" means.
- Then read the codebase and open all relevant files before proposing or making changes.
- Confirm assumptions by inspecting real code, not memory or guesswork.

## 2) Check In Before Major Changes
- Before any major change (architecture changes, refactors, dependency swaps, schema changes, large UI rewrites, etc.), pause and check in with Ian.
- Present a short plan and wait for verification before proceeding.

## 3) High-Level Updates at Every Step
- After each step, provide a **high-level explanation** of what changed.
- Keep explanations short and outcome-focused:
  - What was changed
  - Why it was changed
  - What files were touched (list)
  - Any expected side-effects or follow-ups

## 4) Simplicity Above All
- Make every task and code change as simple as possible.
- Avoid massive or complex changes.
- Prefer the smallest change that solves the problem.
- Minimize blast radius:
  - Touch the fewest files possible
  - Avoid broad refactors unless explicitly approved
  - Prefer incremental improvements over "big rewrites"

## 5) Maintain an Architecture Documentation File
- Maintain a documentation file that explains the app architecture **inside and out**.
- It must stay up-to-date with the real implementation.
- It should cover (at minimum):
  - App purpose and key user flows
  - Folder structure and responsibilities
  - Data models and storage
  - API routes / server actions and their contracts
  - Auth (if applicable), permissions, and security notes
  - Background jobs / queues (if applicable)
  - Third-party services and where/how they're integrated
  - Build/deploy notes
  - Known constraints and trade-offs
  - "How to debug" quick notes

## 6) No Speculation, Only Grounded Answers
- Never speculate about code you have not opened.
- If Ian references a specific file, you **must read that file** before answering questions about it.
- Investigate and read relevant files **before** answering questions about the codebase.
- If something is unknown until code is inspected, say so explicitly and then inspect it.
- Do not make claims about the codebase without evidence from the repository.

---
**Working Principle:** Accuracy > speed, simplicity > cleverness, small changes > big refactors.
