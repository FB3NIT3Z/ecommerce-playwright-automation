# 🚀 My Journey from Manual QA to Automation with Playwright

> **A POC project documenting my transition into test automation**  
> Built with Claude Code assistance as a pair programmer

[![Playwright](https://img.shields.io/badge/Playwright-1.60.0-45ba4b?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-51%20passing-success)](./project-log/SUMMARY.md)
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
Overall Progress: ████████████░░░░░░░░ 60% (Phase 2 of 6)

✅ Phase 0: Environment Setup - COMPLETED
✅ Phase 1: Testing Fundamentals - COMPLETED  
✅ Phase 2: Page Object Model - COMPLETED
⬜ Phase 3: Advanced Testing - PLANNED
⬜ Phase 4: CI/CD & Documentation - PLANNED
⬜ Phase 5: Python & Accessibility - PLANNED
```

### 🏆 Achievements so far

| Metric | Value | Detail |
|---------|-------|---------|
| **Tests created** | 51 | 23 basic + 28 with POM pattern |
| **Success rate** | 100% | 51/51 tests passing |
| **Browsers** | 3 | Chrome, Firefox, Safari |
| **Execution time** | 33.9s | Full suite |
| **Page Objects** | 4 | LoginPage, InventoryPage, CartPage, CheckoutPage |
| **Issues resolved** | 2 | All documented with solutions |

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
├── tests/                      # Test suites
│   ├── 01-authentication/     # 5 authentication tests
│   ├── 02-shopping/           # 5 shopping cart tests
│   ├── 03-checkout/           # 6 checkout tests
│   ├── 04-sorting/            # 4 sorting tests
│   ├── 05-e2e/                # 3 end-to-end tests
│   └── pom/                   # ✅ 28 tests with Page Object Model
│       ├── login-pom.spec.ts
│       ├── shopping-pom.spec.ts
│       ├── checkout-pom.spec.ts
│       └── data-driven.spec.ts
│
├── pages/                      # ✅ Page Objects (Phase 2 COMPLETED)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── utils/                      # ✅ Test utilities
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
- 23 tests created
- 100% pass rate
- Issues resolved in ~15 min
- 6 planned phases

---

## 🎯 My Learning Objectives

### Already Achieved ✅
- [x] Configure Playwright environment from scratch
- [x] Write 51 functional tests (23 basic + 28 with POM)
- [x] Validate on 3 browsers
- [x] Implement Page Object Model pattern
- [x] Create data-driven parameterized tests
- [x] Solve real technical problems (2 issues resolved)
- [x] Document systematically
- [x] Build maintainable and scalable test architecture

### In Progress 🚧
- [ ] Expand test coverage with additional scenarios
- [ ] Prepare for Phase 3: Advanced testing

### Next Steps 🎯
- [ ] CI/CD with GitHub Actions
- [ ] Expand coverage with additional test scenarios
- [ ] Create demo video
- [ ] Publish on LinkedIn

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

**Last updated:** May 19, 2026  
**Current phase:** 2 of 6 (Page Object Model - COMPLETED)  
**Status:** ✅ Phase 2 completed | 🚀 Ready for Phase 3

---

<div align="center">

**💬 "From Manual QA to Automation Engineer - One test at a time"**

**Fredy Benitez**  
🔗 [LinkedIn](https://www.linkedin.com/in/fredy-benitez-4360a136/) | 📧 Fredy.benitez@gmail.com | 💼 [GitHub](https://github.com/FB3NIT3Z)

</div>

---

## 🤔 Why should you hire me?

This project demonstrates that:

1. **I learn fast**: From zero to 51 tests with POM in 2 weeks
2. **I'm self-taught**: Complete documentation without prior guidance
3. **I use modern tools**: Claude Code, Playwright, TypeScript
4. **I think like an engineer**: Structure, planning, metrics, design patterns
5. **I solve problems**: 2 issues resolved quickly with proper documentation
6. **I write maintainable code**: Implemented POM pattern for scalability
7. **I'm transparent**: My entire process is documented
8. **I plan ahead**: Python and accessibility testing in roadmap
9. **I care about inclusion**: Accessibility is a priority, not an afterthought

**Want to see more details?** 👉 [Check my complete project-log](./project-log/README.md)
