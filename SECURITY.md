# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| < 0.2   | :x:                |

## Reporting a Vulnerability

We take the security of AFK Journey Hub seriously. If you discover a security vulnerability, please help us protect our users by responsibly disclosing it.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities through one of the following methods:

1. **GitHub Security Advisories** (Preferred):
   - Go to https://github.com/plac9/afk-journey-hub/security/advisories
   - Click "New draft security advisory"
   - Fill out the form with details about the vulnerability

2. **Email**:
   - Send details to: [security contact needed - update with actual email]
   - Use the subject line: "[SECURITY] AFK Journey Hub Vulnerability Report"
   - Include as much information as possible (see details below)

### What to Include

When reporting a vulnerability, please include:

- **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
- **Location** of the affected source code (file path, line numbers, or URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof of concept** or exploit code (if available)
- **Impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up questions

### Example Report

```
Type: Cross-Site Scripting (XSS)
Location: src/app/heroes/[slug]/page.tsx:45
Severity: Medium

Steps to Reproduce:
1. Navigate to /heroes/test-hero
2. Submit the following in the search field: <script>alert('XSS')</script>
3. Observe script execution

Impact:
An attacker could inject malicious scripts that execute in users' browsers,
potentially stealing cookies or session tokens.

Suggested Fix:
Sanitize user input using DOMPurify before rendering in the hero search component.
```

## Response Process

### Timeline

- **Initial Response**: Within 48 hours of report
- **Assessment**: Within 1 week of report
- **Fix Development**: Depends on severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2-4 weeks
  - Low: Next release cycle
- **Disclosure**: After fix is deployed

### What to Expect

1. **Acknowledgment**: We'll confirm receipt of your report within 48 hours

2. **Assessment**: We'll investigate and assess the severity of the vulnerability

3. **Updates**: We'll keep you informed of our progress

4. **Fix**: We'll develop and test a fix

5. **Deployment**: We'll deploy the fix to production

6. **Disclosure**: After the fix is live, we may publish a security advisory

7. **Credit**: With your permission, we'll credit you in the advisory

## Severity Levels

We use the following severity levels:

### Critical
- Remote code execution
- SQL injection
- Authentication bypass
- Privilege escalation

### High
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Sensitive data exposure
- Broken access control

### Medium
- Information disclosure
- Missing security headers
- Insecure direct object references
- Unvalidated redirects

### Low
- Minor information leaks
- Best practice violations
- Security misconfigurations (non-exploitable)

## Security Best Practices

### For Contributors

When contributing to AFK Journey Hub, please follow these security practices:

1. **Never commit sensitive data**:
   - API keys
   - Passwords
   - Private keys
   - .env files with real credentials

2. **Validate all input**:
   - User input
   - URL parameters
   - API responses
   - File uploads

3. **Use parameterized queries**:
   - Avoid string concatenation for database queries
   - Use prepared statements

4. **Sanitize output**:
   - Escape HTML
   - Use proper encoding
   - Validate data before rendering

5. **Keep dependencies updated**:
   - Regularly run `npm audit`
   - Review Dependabot PRs
   - Update dependencies promptly

6. **Follow least privilege principle**:
   - Only request necessary permissions
   - Limit API access scopes
   - Use environment variables for secrets

7. **Enable security features**:
   - Use HTTPS
   - Set security headers
   - Enable CORS properly
   - Use Content Security Policy

### For Users

To use AFK Journey Hub securely:

1. **Keep your browser updated**
2. **Use HTTPS** (always access via https://)
3. **Don't share your .env.local** file
4. **Review environment variables** before deploying
5. **Use strong database passwords** for Supabase
6. **Enable 2FA** on your GitHub and Vercel accounts
7. **Review permissions** granted to third-party services

## Known Security Considerations

### Client-Side Rendering
- User-generated content is rendered client-side
- We use React's built-in XSS protection
- Always sanitize MDX content before rendering

### API Routes
- Rate limiting not currently implemented (planned)
- Authentication not required for public endpoints
- Telemetry logging includes user agents and IPs (anonymize recommended)

### Environment Variables
- Supabase service_role key has admin privileges
- Keep server-side env vars secure
- Never expose service_role key client-side

### Third-Party Services
- Supabase: Trusted database provider
- Vercel: Trusted hosting platform
- Plausible: Privacy-focused analytics (no PII collected)

## Security Updates

Security updates are announced through:

- [GitHub Security Advisories](https://github.com/plac9/afk-journey-hub/security/advisories)
- [GitHub Releases](https://github.com/plac9/afk-journey-hub/releases)
- Email notifications (if you've reported the vulnerability)

Subscribe to repository notifications to stay informed.

## Scope

### In Scope

- AFK Journey Hub web application
- API routes (`/api/*`)
- GitHub Actions workflows
- Docker images
- Deployment configurations
- Documentation

### Out of Scope

- Third-party services (Supabase, Vercel, GitHub, Cloudflare)
- AFK Journey game itself
- User's local development environments
- Social engineering attacks
- Distributed Denial of Service (DDoS)
- Physical security

## Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations and service disruptions
- Only interact with accounts they own or with explicit permission
- Do not exploit vulnerabilities beyond the minimum necessary to demonstrate the issue
- Report vulnerabilities promptly
- Keep vulnerability details confidential until fixed

We will not pursue legal action against researchers who follow these guidelines.

## Recognition

We appreciate security researchers who help us keep AFK Journey Hub secure. With your permission, we will:

- Credit you in security advisories
- List you in our SECURITY_HALL_OF_FAME.md (if created)
- Thank you publicly on social media
- Provide a reference/testimonial (if requested)

## Questions

If you have questions about this security policy, please:

- Open a discussion: https://github.com/plac9/afk-journey-hub/discussions
- Email: [contact email needed]

---

**Last Updated**: 2025-11-14
**Version**: 1.0
