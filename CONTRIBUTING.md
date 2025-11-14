# Contributing to AFK Journey Hub

Thank you for your interest in contributing to AFK Journey Hub! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Content Guidelines](#content-guidelines)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 20.x LTS
- npm 10+
- Git
- Familiarity with Next.js, React, and TypeScript

### Local Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone git@github.com:YOUR_USERNAME/afk-journey-hub.git
   cd afk-journey-hub
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream git@github.com:plac9/afk-journey-hub.git
   ```

4. **Install dependencies**:
   ```bash
   nvm use 20  # or ensure Node 20 is active
   npm install
   ```

5. **Create environment file**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local configuration
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

7. **Verify setup**:
   - Visit http://localhost:3000
   - Run `npm run check` to ensure everything works

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **Bug Fixes** - Fix issues and improve stability
2. **New Features** - Add new functionality
3. **Content Additions** - Add hero guides, event info, news updates
4. **Data Updates** - Update YAML files with new data
5. **Documentation** - Improve docs, guides, and examples
6. **Tests** - Add or improve test coverage
7. **Performance** - Optimize code and improve performance
8. **UI/UX** - Enhance user interface and experience

### Finding Issues to Work On

- Check the [Issues](https://github.com/plac9/afk-journey-hub/issues) page
- Look for `good first issue` label for beginner-friendly tasks
- Look for `help wanted` label for issues seeking contributors
- Check the [Discussions](https://github.com/plac9/afk-journey-hub/discussions) for ideas

## Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

Branch naming conventions:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `content/description` - Content additions
- `refactor/description` - Code refactoring
- `perf/description` - Performance improvements

### Making Changes

1. **Make your changes** in your branch
2. **Follow the style guidelines** (see below)
3. **Test your changes**:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm run test:e2e
   ```
4. **Update documentation** if needed
5. **Commit your changes** (see commit guidelines below)

### Staying Up to Date

Regularly sync your fork with upstream:

```bash
git checkout main
git pull upstream main
git push origin main
```

Rebase your feature branch if needed:

```bash
git checkout feature/your-feature-name
git rebase main
```

## Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer functional components and hooks
- Use proper types (avoid `any` when possible)

### React

- Use Server Components by default (Next.js App Router)
- Use Client Components only when needed (`'use client'`)
- Keep components small and focused
- Use proper prop types with TypeScript interfaces
- Follow the established component structure

### CSS/Styling

- Use Tailwind CSS utilities
- Follow the existing color scheme (dark theme with rose accents)
- Ensure mobile-first responsive design
- Test on multiple screen sizes

### Files and Folders

- Place components in `src/components/`
- Place utilities in `src/lib/`
- Place API routes in `src/app/api/`
- Follow the established directory structure

## Commit Guidelines

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `content`: Content updates (heroes, events, news)
- `data`: Data file updates (YAML)

**Examples:**
```bash
git commit -m "feat(heroes): add Brutus hero guide"
git commit -m "fix(calculator): correct AFK timer calculation logic"
git commit -m "docs(readme): update installation instructions"
git commit -m "content(events): add Moonstrike Festival details"
git commit -m "data(tiers): update hero tier rankings for patch 1.4"
```

### Commit Best Practices

- Write clear, concise commit messages
- Keep commits focused on a single change
- Reference related issues (e.g., "Fixes #123")
- Don't commit large binary files
- Don't commit sensitive data (.env files, API keys, etc.)

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**:
   ```bash
   npm run check
   npm run build
   npm run test:e2e
   ```

2. **Update documentation** if you've made changes that affect usage

3. **Rebase on latest main** to avoid merge conflicts:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting a PR

1. Go to the [repository](https://github.com/plac9/afk-journey-hub) on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template completely
5. Link related issues
6. Add appropriate labels
7. Request review from maintainers

### PR Requirements

- [ ] All CI checks pass
- [ ] Code follows style guidelines
- [ ] Tests added/updated as needed
- [ ] Documentation updated if needed
- [ ] PR template filled out completely
- [ ] No merge conflicts

### Review Process

- Maintainers will review your PR within a few days
- Address any requested changes
- Be patient and respectful during review
- Once approved, a maintainer will merge your PR

## Content Guidelines

### Adding Hero Guides

Create a new file in `content/heroes/hero-slug.mdx`:

```mdx
---
name: "Hero Name"
faction: "Lightbearer"  # or Mauler, Wilder, Graveborn, Celestial, Hypogean
class: "Warrior"  # or Mage, Support, Ranger, Tank
role: "DPS"  # or Tank, Support, Healer
rarity: "Mythic+"
position: "Front"  # or Back, Middle
featured: false
tags: ["burst", "aoe", "crowd-control"]
---

## Overview

Brief overview of the hero...

## Skills

### Signature Item
Description...

### Exclusive Furniture
Description...

## Strategy

How to use this hero effectively...

## Team Compositions

Recommended teams...

## Counters

Heroes this one counters and is countered by...
```

### Adding Event Info

Create a new file in `content/events/event-slug.mdx` following the existing format.

### Updating Data Files

- `data/hero-tiers.yaml` - Hero tier rankings
- `data/event-rotations.yaml` - Event schedules
- `data/promo-codes.yaml` - Active promo codes

Always validate YAML syntax before committing:
```bash
npm run content:lint
```

## Reporting Issues

### Bug Reports

Use the [Bug Report template](https://github.com/plac9/afk-journey-hub/issues/new?template=bug_report.md) and include:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, version)

### Feature Requests

Use the [Feature Request template](https://github.com/plac9/afk-journey-hub/issues/new?template=feature_request.md) and include:

- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples

### Questions

For questions, use [Discussions](https://github.com/plac9/afk-journey-hub/discussions) instead of issues.

## Getting Help

- **Documentation**: Check the [docs/](docs/) directory
- **Discussions**: Ask in [GitHub Discussions](https://github.com/plac9/afk-journey-hub/discussions)
- **Issues**: Check existing issues for similar problems
- **Code Review**: Request feedback on draft PRs

## Recognition

Contributors are recognized in several ways:

- GitHub contributor graph
- Release notes mentions
- CHANGELOG.md credits
- Community shoutouts

## License

By contributing to AFK Journey Hub, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to AFK Journey Hub! Your efforts help make this a valuable resource for the AFK Journey community.
