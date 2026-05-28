# Contributing to E-Commerce Playwright Automation

Thank you for your interest in contributing to this project! 🎉

## 📖 About This Project

This is a **portfolio project** demonstrating test automation skills with Playwright and TypeScript. While it's primarily a personal learning journey, contributions that improve test coverage, code quality, or documentation are welcome.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- Basic understanding of TypeScript and Playwright

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ecommerce-playwright-automation.git
   cd ecommerce-playwright-automation
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

5. **Run tests to verify setup**
   ```bash
   npx playwright test
   ```
   You should see: `192 passed (100%)`

---

## 📝 Making Changes

### Branch Naming Convention

Create a descriptive branch for your changes:

```bash
git checkout -b feature/add-login-tests       # New feature
git checkout -b fix/checkout-timeout          # Bug fix
git checkout -b docs/update-readme            # Documentation
git checkout -b refactor/improve-page-objects # Refactoring
```

### Development Workflow

1. **Create your branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write tests first (TDD approach preferred)
   - Follow existing code patterns
   - Keep tests independent and isolated

3. **Run tests**
   ```bash
   # Run all tests
   npx playwright test
   
   # Run specific project
   npx playwright test --project=saucedemo-chromium
   
   # Run in UI mode (recommended for debugging)
   npx playwright test --ui
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new login validation tests"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

---

## ✅ Coding Standards

### Project Structure

Follow the multi-site architecture:

```
tests/
├── saucedemo/       # Sauce Demo test site
│   └── pom/         # Tests using Page Object Model
└── the-internet/    # The Internet test site

pages/
├── saucedemo/       # Sauce Demo Page Objects
└── theinternet/     # The Internet Page Objects
```

### TypeScript & Code Style

- ✅ Use **TypeScript** for all code
- ✅ Use **async/await** for Playwright methods
- ✅ Use **descriptive variable names** (avoid abbreviations)
- ✅ Add **type annotations** for function parameters and returns
- ✅ Write **comments in English** for complex logic

**Example:**

```typescript
// ✅ Good
async login(username: string, password: string): Promise<void> {
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}

// ❌ Avoid
async login(u, p) {
  await this.usr.fill(u);
  await this.pwd.fill(p);
  await this.btn.click();
}
```

### Page Object Model Pattern

- ✅ Use **Page Object Model** for all new tests
- ✅ One Page Object per page/component
- ✅ Store locators as class properties
- ✅ Create reusable methods for actions
- ✅ Add JSDoc comments explaining method purpose

**Example:**

```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  /**
   * Performs login with provided credentials
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Test Standards

- ✅ Use **descriptive test names** starting with test ID (TC###)
- ✅ Follow **AAA pattern** (Arrange, Act, Assert)
- ✅ Keep tests **independent** (no dependencies between tests)
- ✅ Use `beforeEach` for setup, `afterEach` for cleanup
- ✅ Add assertions that verify the expected behavior

**Example:**

```typescript
test('TC073 - Add product to cart successfully', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  
  // Act
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  
  // Assert
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
```

### Test Naming Convention

Format: `TC### - Description`

```typescript
// ✅ Good
test('TC073 - Add product to cart successfully', async ({ page }) => { ... });

// ❌ Avoid
test('add to cart', async ({ page }) => { ... });
```

---

## 🧪 Testing Requirements

### Before Submitting a PR

1. **All tests must pass**
   ```bash
   npx playwright test
   ```
   Required: `192/192 passed (100%)`

2. **Run tests on all browsers**
   - Chromium ✅
   - Firefox ✅
   - WebKit ✅

3. **No flaky tests**
   - Tests must pass consistently
   - If a test is flaky, investigate and fix before submitting

4. **Add tests for new features**
   - New functionality requires test coverage
   - Bug fixes should include a regression test

---

## 📚 Documentation Requirements

### Update Documentation When:

- ✅ Adding new Page Objects → Update project structure in README
- ✅ Adding new test suites → Update test coverage tables
- ✅ Changing configuration → Document in README or comments
- ✅ Resolving issues → Create issue report in `project-log/issues/`

### Issue Reporting Format

When documenting issues, use the template in `project-log/issues/`:

```markdown
# Issue #00X: [Issue Title]

**Status:** Resolved/Open
**Severity:** High/Medium/Low
**Date:** YYYY-MM-DD

## Summary
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Root Cause
Analysis of why it happened

## Solution
How it was fixed
```

---

## 🔄 Pull Request Process

### PR Requirements

1. **Clear title and description**
   ```
   Title: feat: Add checkout validation tests
   
   Description:
   - Added 3 new test cases for checkout validation
   - Updated CheckoutPage POM with new methods
   - All tests passing (195/195)
   ```

2. **Link related issues** (if applicable)
   ```markdown
   Fixes #123
   Relates to #456
   ```

3. **Update CHANGELOG** (if significant change)

4. **Include test results**
   ```
   ✅ 195 tests passing
   ✅ All browsers: Chromium, Firefox, WebKit
   ✅ Execution time: ~2 minutes
   ```

### PR Review Checklist

Before submitting, verify:

- [ ] All tests pass locally
- [ ] Code follows project standards
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commit messages are clear and descriptive

---

## 🐛 Reporting Bugs

### Bug Report Template

When reporting bugs, include:

1. **Description:** Clear description of the bug
2. **Steps to reproduce:** Exact steps to reproduce the issue
3. **Expected behavior:** What should happen
4. **Actual behavior:** What actually happens
5. **Environment:**
   - OS: macOS/Windows/Linux
   - Node version: `node --version`
   - Playwright version: `npx playwright --version`
6. **Screenshots/Videos:** If applicable

### Example Bug Report

```markdown
**Description:** Login test fails on Firefox

**Steps to reproduce:**
1. Run `npx playwright test --project=firefox`
2. Test TC001 fails with timeout

**Expected:** Login succeeds in < 5s
**Actual:** Timeout after 30s

**Environment:**
- OS: macOS 14.0
- Node: v22.19.0
- Playwright: 1.60.0
- Browser: Firefox 120.0
```

---

## 💡 Suggesting Enhancements

### Enhancement Proposal Template

When suggesting new features:

1. **Problem:** What problem does this solve?
2. **Proposed solution:** How would you implement it?
3. **Alternatives:** Other approaches considered?
4. **Additional context:** Screenshots, examples, references

---

## 📧 Questions or Need Help?

- **GitHub Issues:** For bugs and feature requests
- **Email:** Fredy.benitez@gmail.com
- **LinkedIn:** [Fredy Benitez](https://www.linkedin.com/in/fredy-benitez-4360a136/)

---

## 🎯 Contribution Ideas

Looking for ways to contribute? Here are some ideas:

### Test Coverage
- Add tests for edge cases
- Add visual regression tests
- Add API testing examples

### Documentation
- Improve README examples
- Add video tutorials
- Translate documentation

### Code Quality
- Refactor duplicate code
- Improve error messages
- Add more Page Object methods

### Infrastructure
- Improve CI/CD pipeline
- Add code coverage reporting
- Add performance benchmarks

---

## 📜 Code of Conduct

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Provide constructive feedback
- ✅ Focus on what is best for the project
- ✅ Show empathy towards other contributors

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## 🙏 Thank You!

Thank you for taking the time to contribute! Every contribution, no matter how small, helps make this project better.

**Happy Testing!** 🚀

---

*Last Updated: May 27, 2026*
