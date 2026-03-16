# Security Policy

## Supported Versions

AeroPlus Deco is a single-file web application. Only the latest released version is actively maintained and supported.

| Version              | Supported |
| -------------------- | --------- |
| v2026-03-14 (latest) | ✅         |
| All earlier versions | ❌         |

We recommend always using the latest version available at [aeroplus-deco.com](https://www.aeroplus-deco.com) or from the [GitHub repository](https://github.com/sjjan/aeroplus-deco).

## Scope

AeroPlus Deco runs entirely in the browser with no backend, no user accounts, and no data transmission to any server. All dive plan data is stored locally in the browser (localStorage) or exported as JSON files by the user. As a result, the attack surface is limited, but the following are considered in scope:

- Vulnerabilities in the decompression algorithm that could produce unsafe dive plans
- Cross-site scripting (XSS) issues in user-provided input rendering
- Issues with the JSON import/export that could lead to malicious code execution
- Any other browser-based vulnerability that could affect user safety or data integrity

## Reporting a Vulnerability

If you discover a security or safety-critical issue, please **do not open a public GitHub issue**. Instead, report it privately via one of the following:

- **GitHub**: Use [GitHub's private vulnerability reporting](https://github.com/sjjan/aeroplus-deco/security/advisories/new)
- **Email**: ops@aeroplusaviation.com

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- The version of AeroPlus Deco affected
- Any suggested fix, if applicable

## Response

- You can expect an initial acknowledgement within **5 business days**
- We aim to assess and respond with a fix or mitigation within **14 days** for confirmed vulnerabilities
- If the issue is confirmed, a patched version will be released and the reporter credited (unless they prefer to remain anonymous)
- If the issue is declined, we will explain our reasoning

## Important Note on Dive Safety

AeroPlus Deco is a planning tool. Always verify dive plans with a certified dive professional and a secondary decompression software. No software should be used as the sole basis for decompression decisions. If you identify an issue with the decompression algorithm that could lead to unsafe plans, please report it immediately — this is treated as the highest priority.
