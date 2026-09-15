# Research: Agentic QA metrics reconciliation

> The Agentic QA Lab scrollytelling mixed the original refund-plan scope with the expanded full-lifecycle quality gate.

## Source of truth

- Repository: `imalisani/qa-agents-demo`
- Inspected commit: `38f8efe1c84e58b5210b630c3409b4eddc11c264`
- Verified CI run: `34868472530`
- Generated evidence: `2026-09-14T16:26:33.228Z`
- Evidence contract: `evidence/qa-evidence.json`, produced by `scripts/generate-qa-evidence.mjs`

## Current verified metrics

| Scope | Result |
| --- | ---: |
| Total automated checks | 59 |
| Functional | 33 |
| API | 18 |
| UI | 13 |
| Accessibility | 2 |
| Data / PostgreSQL | 5 |
| Integration | 6 |
| Security | 7 |
| Unit | 8 |
| Branch coverage | 100% |
| Coverage gate | 90% |
| Performance | k6 smoke passed |
| Available agents | 13 |

The 33 functional checks are API + UI + accessibility. The other 26 counted checks are data, integration, security and unit. Performance is a separate dynamic gate and is not added to the test total.

## Why the old “6” was not entirely wrong

The original risk-based plan contains RF-T01 through RF-T12. Six were initially automatable and six remained blocked by unresolved Product rules. That is a test-design decision, not the current execution total.

The repository later expanded the executable evidence with accessibility, deterministic provider integration, security, PostgreSQL and unit layers. The portfolio still displayed the original six as if they represented the whole pipeline, which made it conflict with the Evidence Pack.

## Portfolio discrepancies found

| Location | Previous value | Correct interpretation |
| --- | --- | --- |
| Orchestrator inventory | 11 agents | 13 agent files currently exist |
| Automation Agent | 6 automatable cases | 6 initial scenarios; 59 current gate checks |
| Specialist implementation | 2 UI + 4 API | 13 UI + 18 API, plus five supporting quality layers |
| Execution | 6/6 Playwright tests | 59/59 checks across the complete quality pipeline |
| Final consolidation | 6 passed | 59 passed, 0 failed, 100% branch coverage |
| Hero verification date | Aug 27, 2026 | Derived from the evidence timestamp: Sep 14, 2026 |

## Implementation decision

The scrollytelling now imports the same versioned `public/qa-evidence.json` snapshot used by the Evidence Pack. Numeric execution metrics are derived from that file instead of being repeated as unrelated literals.

The initial six automatable and six blocked scenarios remain visible only as historical planning context. The execution stage is described as the CI/CD Quality Pipeline because the 59 checks include Playwright suites and Node unit tests; attributing the whole total to Playwright would be inaccurate.

## Notes

- Requirements (9 ambiguities), risks (10) and the original 12-scenario design remain valid within their documented planning scope.
- The headed portfolio showcase video is a separate illustrative E2E run and should not be described as the complete quality gate.
- Future evidence refreshes will update the scrollytelling numbers at build time when `public/qa-evidence.json` is updated.
