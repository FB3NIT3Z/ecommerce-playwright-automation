# Issue #001: Product Sorting Selector Timeout

**Date:** 2026-05-13  
**Reported By:** Fredy Benitez  
**Resolved By:** Fredy Benitez (with Claude Code assistance)  
**Severity:** 🟡 Medium  
**Status:** ✅ Resolved  
**Time to Resolve:** ~15 minutes

---

## 🐛 Problem Description

Tests for product sorting functionality (TC024, TC025, TC026) were timing out when attempting to select dropdown options. The tests would wait for the default timeout (10 seconds) and then fail with a timeout error, preventing the sorting tests from completing.

**Affected Tests:**
- TC024 - Ordenar productos por nombre Z-A
- TC025 - Ordenar productos por precio bajo-alto
- TC026 - Ordenar productos por precio alto-bajo

**Error Message:**
```
TimeoutError: page.selectOption: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-test="product_sort_container"]')
```

**Impact:**
- 3 out of 23 tests failing
- Blocked Phase 1 completion
- 100% pass rate compromised (initially 20/23 passing = 87%)

---

## 📋 Steps to Reproduce

1. Navigate to Sauce Demo homepage
2. Login with standard_user
3. Wait for inventory page to load
4. Attempt to select sorting dropdown using:
   ```typescript
   await page.selectOption('[data-test="product_sort_container"]', 'za');
   ```
5. Test times out after 10 seconds

**Expected Result:** Dropdown option selected, products re-sorted

**Actual Result:** Timeout error, test fails

---

## 🔍 Environment

- **Playwright Version:** 1.60.0
- **Node Version:** 22.19.0
- **Browser:** Chromium, Firefox, WebKit (all affected)
- **OS:** macOS 25.4.0
- **Test Site:** https://www.saucedemo.com

---

## 🔎 Investigation Process

### 1. Initial Analysis
- Read error message carefully: "waiting for locator"
- Indicated element not found or not ready

### 2. Screenshot Review
- Examined test failure screenshot
- Element WAS visible on page
- Located at top-right of inventory page

### 3. Selector Verification
- Checked if `[data-test="product_sort_container"]` was correct
- Element exists in DOM with that attribute

### 4. Playwright Documentation
- Reviewed selector strategies
- Found modern `.locator()` method recommended

### 5. Hypothesis
- Using deprecated/incorrect selector syntax
- Modern locator chain might work better

---

## 💡 Root Cause Analysis

**Primary Cause:**
Using legacy/incorrect selector method for dropdown elements.

**Why it happened:**
1. **Deprecated Syntax:** `page.selectOption(selector, value)` is less reliable than chaining
2. **Selector Specificity:** Data attribute alone wasn't sufficient
3. **Auto-waiting Issue:** Direct method didn't trigger proper waiting mechanism

**Technical Explanation:**

The code was using:
```typescript
await page.selectOption('[data-test="product_sort_container"]', 'za');
```

This approach:
- Doesn't leverage modern Playwright locator chain
- Less reliable element detection
- Potential timing issues with dynamic content

---

## ✅ Solution

Changed selector strategy to use modern Playwright locator chain with class selector.

### Code Changes

**Before (not working):**
```typescript
test('TC024 - Ordenar productos por nombre Z-A', async ({ page }) => {
  // This was timing out
  await page.selectOption('[data-test="product_sort_container"]', 'za');
  
  const firstProduct = await page.locator('.inventory_item_name').first().textContent();
  expect(firstProduct).toContain('Test.allTheThings()');
});
```

**After (working):**
```typescript
test('TC024 - Ordenar productos por nombre Z-A', async ({ page }) => {
  // Fixed: use locator chain with class selector
  await page.locator('select.product_sort_container').selectOption('za');
  
  const firstProduct = await page.locator('.inventory_item_name').first().textContent();
  expect(firstProduct).toContain('Test.allTheThings()');
});
```

**Key Change:**
```typescript
// Before
page.selectOption('[data-test="product_sort_container"]', 'za')

// After  
page.locator('select.product_sort_container').selectOption('za')
```

### Why This Works

1. **Modern Locator Chain:** Uses `.locator()` which is the recommended approach
2. **Element Type + Class:** `select.product_sort_container` is more specific
3. **Better Auto-waiting:** Locator chain triggers proper Playwright waiting mechanisms
4. **More Reliable:** Consistently works across all browsers

---

## 🧪 Verification

### Test Results After Fix

**Before Fix:**
```
Running 4 tests using 4 workers

  1 passed (3.0s)
  3 failed (40.0s - all timeouts)
```

**After Fix:**
```
Running 4 tests using 4 workers

  4 passed (3.0s)
```

### Browsers Tested
- ✅ Chromium: All 4 tests passing
- ✅ Firefox: All 4 tests passing  
- ✅ WebKit: All 4 tests passing

### Execution Time
- Before: ~40 seconds (with timeouts)
- After: ~3 seconds
- Improvement: **92% faster**

---

## 🎓 Lessons Learned

### Technical Lessons

1. **Use Modern Playwright APIs**
   - `.locator()` chain is the recommended approach
   - More reliable than legacy methods
   - Better auto-waiting behavior

2. **Selector Strategy Matters**
   - Combining element type with class: `select.classname`
   - More specific = more reliable
   - Class selectors can be more stable than data attributes

3. **Trust Playwright's Auto-waiting**
   - Modern APIs handle waiting automatically
   - Don't need explicit waits if using correct methods

### Process Lessons

4. **Screenshots Are Invaluable**
   - Playwright's screenshot on failure saved debugging time
   - Visual confirmation element exists helps narrow down issue

5. **Documentation First**
   - Checking Playwright docs quickly revealed modern approach
   - Official docs > trial and error

6. **Systematic Debugging Works**
   - Read error → Check screenshot → Review docs → Test solution
   - Methodical approach resolved in 15 minutes

### Prevention Strategies

7. **Use Locator Chain Consistently**
   - Always use `page.locator()` for element selection
   - Avoid direct methods like `page.selectOption()`

8. **Follow Playwright Best Practices**
   - Stay updated with recommended patterns
   - Modern APIs are more reliable

9. **Test Early and Often**
   - Caught the issue immediately during development
   - Easier to fix when context is fresh

---

## 🔗 References

- [Playwright Locators Documentation](https://playwright.dev/docs/locators)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [SelectOption API](https://playwright.dev/docs/api/class-page#page-select-option)
- [Phase 1 Report](../phases/01-fundamentals-COMPLETED.md#issue-001-product-sorting-selector-timeout)
- [Session Log 2026-05-13](../sessions/2026-05-13-session-1.md#issue-1-product-sorting-selector-timeout)

---

## 📝 Additional Notes

### Alternative Solutions Considered

**Option 1: Increase Timeout** ❌
```typescript
await page.selectOption('[data-test="..."]', 'za', { timeout: 30000 });
```
- Would mask the underlying problem
- Not a real solution

**Option 2: Add Explicit Wait** ❌
```typescript
await page.waitForSelector('[data-test="..."]');
await page.selectOption('[data-test="..."]', 'za');
```
- Unnecessary with proper locator usage
- More code to maintain

**Option 3: Use Locator Chain** ✅ **CHOSEN**
```typescript
await page.locator('select.product_sort_container').selectOption('za');
```
- Modern approach
- Cleaner code
- More reliable

### Impact on Other Tests

- No other tests affected by this change
- Pattern applied consistently to all sorting tests
- No regressions observed

### Related Code

All 4 sorting tests use the same pattern now:
- `tests/04-sorting/product-sorting.spec.ts` lines 22, 30, 38

---

## 📊 Time Breakdown

| Activity | Time |
|----------|------|
| Test failure noticed | 0 min |
| Initial debugging (error reading) | 2 min |
| Screenshot analysis | 2 min |
| Documentation review | 5 min |
| Solution implementation | 3 min |
| Testing and verification | 3 min |
| **Total** | **15 min** |

**Efficiency:** High - systematic approach led to quick resolution

---

## ✅ Resolution Checklist

- [x] Root cause identified
- [x] Solution implemented
- [x] All affected tests passing
- [x] Tested on all 3 browsers
- [x] No regressions introduced
- [x] Code committed
- [x] Issue documented
- [x] Lessons captured

---

## 🔄 Status History

| Date | Status | Notes |
|------|--------|-------|
| 2026-05-13 13:00 | 🔴 Open | Issue discovered during test creation |
| 2026-05-13 13:15 | ✅ Resolved | Fixed with locator chain approach |

---

*Issue logged: May 13, 2026 at ~1:00 PM*  
*Resolved: May 13, 2026 at ~1:15 PM*  
*Total Resolution Time: 15 minutes*
