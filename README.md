# 🚀 My Journey from Manual QA to Automation with Playwright

> **A POC project documenting my transition into test automation**  
> Built with Claude Code assistance as a pair programmer

[![Playwright Tests](https://github.com/FB3NIT3Z/ecommerce-playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/FB3NIT3Z/ecommerce-playwright-automation/actions)
[![Playwright](https://img.shields.io/badge/Playwright-1.60.0-45ba4b?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-64%20passing-success)](./project-log/SUMMARY.md)
[![Sites](https://img.shields.io/badge/Sites-2-orange)](./playwright.config.ts)
[![Browser Coverage](https://img.shields.io/badge/Browsers-3-blue)](./playwright.config.ts)

---

## 👋 About This Project

I'm **Fredy Benitez**, currently a Manual QA with a strong interest in evolving towards test automation. This project is my **Proof of Concept (POC)** demonstrating how, with determination and the right tools, a Manual QA can build a professional automation framework.

### 🎯 Why this project?

- 🔄 **Professional transition**: From manual testing to automation
- 🤖 **Claude as mentor**: I used Claude Code as a development assistant
- 📚 **Documented learning**: Every step, decision, and mistake is recorded
- 💼 **Active portfolio**: Demonstrate practical skills to recruiters
- 🌱 **Continuous growth**: Expanding to Python and accessibility testing

### ⚠️ Important context

**This is NOT a project where I already knew Playwright.** This is a project where:
- ✅ I'm learning Playwright from scratch
- ✅ Claude Code assists me in configuration and development
- ✅ I document the entire learning process
- ✅ I solve real problems in real-time
- ✅ I progress phase by phase with clear objectives

---

## 📊 Current Project Status

```
Overall Progress: ████████████████░░░░ 80% (Phase 3 Complete)

✅ Phase 0: Environment Setup - COMPLETED
✅ Phase 1: Testing Fundamentals - COMPLETED  
✅ Phase 2: Page Object Model - COMPLETED
✅ Phase 3: Advanced Testing (Multi-Site) - COMPLETED
⬜ Phase 4: CI/CD & Documentation - PLANNED
⬜ Phase 5: Python & Accessibility - PLANNED
```

### 🏆 Achievements so far

| Metric | Value | Detail |
|---------|-------|---------|
| **Tests created** | 64 | 51 Sauce Demo + 13 The Internet |
| **Test sites** | 2 | Multi-site framework |
| **Success rate** | 100% | 192/192 cross-browser executions |
| **Browsers** | 3 | Chromium, Firefox, WebKit |
| **Execution time** | ~1.7min | Full suite (192 tests) |
| **Page Objects** | 9 | 4 Sauce Demo + 5 The Internet |
| **Issues resolved** | 3 | Professional bug reports & risk-based decisions |

---

## 🛠️ Tech Stack

### Main Tools
- **Playwright 1.60.0** - Automation framework
- **TypeScript 5.0+** - Statically typed language
- **Node.js 22.19.0** - JavaScript runtime
- **Git & GitHub** - Version control

### Future Additions
- **Python + Playwright** - Expanding to Python ecosystem
- **Accessibility Testing** - WCAG compliance validation

### My Development Assistant
- **Claude Code** - AI helping me with configuration, code, debugging, and best practices

---

## 📁 Project Structure

```
ecommerce-playwright-automation/
│
├── tests/                      # Test suites (Multi-site)
│   ├── saucedemo/             # Sauce Demo tests (51 tests)
│   │   ├── 01-authentication/ # 5 authentication tests
│   │   ├── 02-shopping/       # 5 shopping cart tests
│   │   ├── 03-checkout/       # 6 checkout tests
│   │   ├── 04-sorting/        # 4 sorting tests
│   │   ├── 05-e2e/            # 3 end-to-end tests
│   │   └── pom/               # 28 tests with POM pattern
│   │
│   └── the-internet/          # The Internet tests (13 tests) ✨ NEW
│       ├── 01-form-auth.spec.ts
│       ├── 02-add-remove-elements.spec.ts
│       ├── 03-checkboxes.spec.ts
│       ├── 04-dropdown.spec.ts
│       └── 05-dynamic-loading.spec.ts
│
├── pages/                      # Page Objects (Multi-site)
│   ├── saucedemo/             # Sauce Demo Page Objects
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   │
│   └── theinternet/           # The Internet Page Objects ✨ NEW
│       ├── LoginPage.ts
│       ├── AddRemoveElementsPage.ts
│       ├── CheckboxesPage.ts
│       ├── DropdownPage.ts
│       └── DynamicLoadingPage.ts
│
├── utils/                      # Test utilities
│   └── testData.ts            # Data-driven test data
├── project-log/                # 📚 MY LEARNING JOURNAL
│   ├── README.md              # Index of all documentation
│   ├── SUMMARY.md             # Executive summary
│   ├── phases/                # Detailed phase reports
│   ├── sessions/              # Daily work logs
│   ├── issues/                # Problems found and solutions
│   ├── learnings/             # "Today I learned..." technical
│   ├── decisions/             # Architectural decisions
│   └── metrics/               # Progress metrics
│
├── playwright.config.ts        # Multi-browser configuration
├── package.json
└── README.md                   # This file
```

---

## 🎓 My Learning Process

### Phase 0: Setup (Completed ✅)

**What I learned:**
- Installation and configuration of Playwright
- Multi-browser configuration
- Professional project structure
- First steps with TypeScript

**Challenges:**
- ✅ Understanding `playwright.config.ts` configuration
- ✅ Differences between browsers

### Phase 1: Fundamentals (Completed ✅)

**What I learned:**
- Writing basic tests with Playwright
- Locators and selectors
- Assertions and validations
- Playwright auto-waiting
- Debugging with screenshots

**Challenges resolved:**
- ❌→✅ **Issue #001**: Timeouts in sorting selectors → Resolved using correct locator chaining

**Tests created:**
```
✅ 5 Login/Logout tests
✅ 5 Shopping Cart tests
✅ 6 Complete Checkout tests
✅ 4 Product Sorting tests
✅ 3 End-to-End tests
```

### Phase 2: Page Object Model (Completed ✅)

**What I learned:**
- Page Object Model design pattern implementation
- Creating reusable Page Objects with TypeScript classes
- Refactoring existing tests to use POM
- Data-driven testing with parameterized tests
- Code maintainability and scalability best practices

**Challenges resolved:**
- ❌→✅ **Issue #002**: Sorting dropdown selector timeout → Fixed incorrect selector from `[data-test]` to CSS class

**Page Objects created:**
```
✅ LoginPage.ts - Authentication actions
✅ InventoryPage.ts - Product browsing and cart
✅ CartPage.ts - Shopping cart management
✅ CheckoutPage.ts - Checkout flow
```

**Tests created:**
```
✅ 5 Login tests with POM
✅ 5 Shopping tests with POM
✅ 6 Checkout tests with POM
✅ 12 Data-driven parameterized tests
```

**Key improvements:**
- 28 new tests using POM pattern (51 total)
- Centralized test data in `utils/testData.ts`
- Improved maintainability: changes in UI only require updating Page Objects
- Better code reusability across test suites

---

### Phase 3: Advanced Testing (Complete ✅)

**What I learned:**
- Multi-site test framework architecture
- Strategic cross-browser testing
- Professional bug reporting and analysis
- Risk-based decision making in QA
- When to accept known issues vs. fix immediately

**Challenges resolved:**
- ❌→✅ **Issue #003**: Firefox network instability with Sauce Demo → Documented and implemented strategic browser matrix

**Second test site added:**
```
✅ The Internet (https://the-internet.herokuapp.com/)
  - Stable Heroku-hosted test practice site
  - 5 Page Objects created with detailed documentation
  - 13 comprehensive tests (TC060-TC072)
```

**Page Objects created:**
```
✅ LoginPage.ts - Form authentication with flash messages
✅ AddRemoveElementsPage.ts - Dynamic DOM manipulation
✅ CheckboxesPage.ts - Checkbox state management
✅ DropdownPage.ts - Dropdown selection patterns
✅ DynamicLoadingPage.ts - Async content loading
```

**Tests created:**
```
✅ 3 Form authentication tests (TC060-TC062)
✅ 3 Dynamic element tests (TC063-TC065)
✅ 3 Checkbox interaction tests (TC066-TC068)
✅ 2 Dropdown selection tests (TC069-TC070)
✅ 2 Async content loading tests (TC071-TC072)
```

**Project reorganization:**
- Restructured all code by site (`pages/{site}/`, `tests/{site}/`)
- Enhanced all Sauce Demo code with comprehensive English documentation
- Updated 51 existing tests with new import paths
- Implemented scalable multi-site architecture

**Cross-browser validation:**
- 192/192 tests passing across all browsers (100%)
- Chromium: 64/64 tests (Sauce Demo + The Internet)
- Firefox: 64/64 tests (Sauce Demo + The Internet)
- WebKit: 64/64 tests (Sauce Demo + The Internet)

**Key improvements:**
- Multi-site framework successfully implemented
- Professional bug reporting and risk-based decision making
- Strategic cross-browser testing approach
- 100% pass rate on stable configurations (141 executions)

---

## 🚀 How to Run This Project

### Prerequisites
```bash
Node.js 18+ installed
npm or pnpm
```

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/FB3NIT3Z/ecommerce-playwright-automation.git
cd ecommerce-playwright-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

### Run Tests
```bash
# Run all tests (3 browsers)
npx playwright test

# Run in UI mode (interactive)
npx playwright test --ui

# Run only on Chrome
npx playwright test --project=chromium

# View HTML report
npx playwright show-report
```

---

## 💡 What Makes This Project Special?

### 1. 📖 Complete Learning Documentation

It's not just code, it's **a complete journal** of my process:
- Every work session documented
- Problems and how I solved them
- Technical decisions with justification
- Progress metrics

👉 **[Explore my learning journal](./project-log/README.md)**

### 2. 🤝 AI Collaboration

This project demonstrates how to use **Claude Code as a pair programmer**:
- Helped me set up the environment
- Guides me on best practices
- Helps me debug
- But **I make the decisions** and understand every line

### 3. 🎯 Professional Approach

Although I'm learning, I apply professional standards:
- Independent and maintainable tests
- Organization by features
- 100% tests passing
- Complete technical documentation

### 4. 📊 Measurable Progress

Everything is quantified:
- 64 tests created across 2 sites
- 100% pass rate (141/141 stable executions)
- 3 issues resolved with professional documentation
- 6 planned phases (3 completed)

---

## 🎯 My Learning Objectives

### Already Achieved ✅
- [x] Configure Playwright environment from scratch
- [x] Write 64 functional tests (51 Sauce Demo + 13 The Internet)
- [x] Validate on 3 browsers (strategic cross-browser matrix)
- [x] Implement Page Object Model pattern
- [x] Create data-driven parameterized tests
- [x] Solve real technical problems (3 issues resolved)
- [x] Document systematically
- [x] Build maintainable and scalable test architecture
- [x] Implement multi-site testing framework
- [x] Professional bug reporting and risk-based decisions

### In Progress 🚧
- [ ] Prepare for Phase 4: CI/CD & Documentation
- [ ] Create demo video and portfolio assets

### Next Steps 🎯
- [ ] Enhance CI/CD with GitHub Actions (multi-site matrix)
- [ ] Create demo video (7-10 minutes)
- [ ] Publish portfolio assets on LinkedIn
- [ ] Update CV with project highlights

### Future Expansion 🚀
- [ ] **Python Implementation**: Rebuild framework using Python + Playwright
- [ ] **Accessibility Testing**: Implement WCAG 2.1 compliance tests
- [ ] **Performance Testing**: Add Lighthouse integration
- [ ] **Visual Regression**: Screenshot comparison testing
- [ ] **API Testing**: Add backend API test coverage

---

## 🌟 Skills Demonstrated

### Technical
- ✅ Test automation with Playwright
- ✅ TypeScript programming
- ✅ Page Object Model pattern
- ✅ Data-driven testing
- ✅ Multi-browser testing
- ✅ Debugging and troubleshooting
- ✅ Git & version control
- ✅ Test suite organization
- ✅ Code refactoring and maintainability

### In Development
- 🚧 Advanced testing scenarios
- 🚧 Python programming
- 🚧 Accessibility standards (WCAG)
- 🚧 CI/CD pipelines

### Soft Skills
- ✅ Self-taught and proactive
- ✅ Clear documentation
- ✅ Problem-solving
- ✅ Planning and execution
- ✅ Growth mindset
- ✅ Effective use of AI tools

---

## 🔮 Future Vision

This POC is evolving into a **comprehensive testing portfolio** that will demonstrate:

### Multi-Language Proficiency
- **TypeScript/JavaScript**: Current implementation
- **Python**: Planned parallel implementation
  - Same test scenarios in Python + Playwright
  - Demonstrates language versatility
  - Expands job market opportunities

### Specialized Testing Areas
- **Functional Testing**: ✅ Currently implemented
- **Accessibility Testing**: 🔜 WCAG 2.1 AA compliance
  - Automated ARIA validation
  - Keyboard navigation testing
  - Screen reader compatibility
  - Color contrast checks
- **Performance Testing**: 🔜 Planned
- **API Testing**: 🔜 Planned

### Why These Additions Matter
- **Python**: Many companies use Python for automation (Selenium, Pytest, Robot Framework)
- **Accessibility**: Critical for modern web applications, demonstrates awareness of inclusive design
- **Diverse skill set**: Shows ability to work across different technologies and testing domains

---

## 📚 Resources and References

### What I used to learn
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) (Future reference)
- Claude Code as development assistant

### Test site
- [Sauce Demo](https://www.saucedemo.com/) - Practice e-commerce site

---

## 📝 License

This project is open source for educational and portfolio purposes.

---

## ⭐ Like this project?

If you find my documented learning approach interesting, give the repository a ⭐!

---

**Last updated:** May 27, 2026  
**Current phase:** 3 of 6 (Advanced Testing - COMPLETED)  
**Status:** ✅ Phase 3 completed | 🚀 Ready for Phase 4 (CI/CD)

---

<div align="center">

**💬 "From Manual QA to Automation Engineer - One test at a time"**

**Fredy Benitez**  
🔗 [LinkedIn](https://www.linkedin.com/in/fredy-benitez-4360a136/) | 📧 Fredy.benitez@gmail.com | 💼 [GitHub](https://github.com/FB3NIT3Z)

</div>

---

## 🤔 Why should you hire me?

This project demonstrates that:

1. **I learn fast**: From zero to 64 tests with multi-site framework in 3 weeks
2. **I'm self-taught**: Complete documentation without prior guidance
3. **I use modern tools**: Claude Code, Playwright, TypeScript
4. **I think like an engineer**: Structure, planning, metrics, design patterns
5. **I solve problems**: 3 issues resolved with professional bug reports
6. **I write maintainable code**: Implemented POM pattern and multi-site architecture
7. **I make pragmatic decisions**: Risk-based QA approach with documented rationale
8. **I'm transparent**: My entire process is documented
9. **I plan ahead**: Python and accessibility testing in roadmap
10. **I care about inclusion**: Accessibility is a priority, not an afterthought

**Want to see more details?** 👉 [Check my complete project-log](./project-log/README.md)

```
✅ 3 Form authentication tests
✅ 3 Dynamic element manipulation tests
✅ 3 Checkbox interaction tests
✅ 2 Dropdown selection tests
✅ 2 Async content loading tests
```

**Project reorganization:**
- Restructured all code by site (`pages/{site}/`, `tests/{site}/`)
- Enhanced all Sauce Demo code with comprehensive English documentation
- Updated 51 existing tests with new import paths
- Implemented scalable multi-site architecture

**Cross-browser validation:**
- 192/192 tests passing across all browsers (100%)
- Chromium: 64/64 tests (Sauce Demo + The Internet)
- Firefox: 64/64 tests (Sauce Demo + The Internet)
- WebKit: 64/64 tests (Sauce Demo + The Internet)

