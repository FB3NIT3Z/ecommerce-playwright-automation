# 📦 Guía: Subir Proyecto a GitHub

**Proyecto:** ecommerce-playwright-automation  
**Fecha:** Mayo 13, 2026  
**Autor:** Fredy Benitez

---

## 🎯 Objetivo

Subir el proyecto Playwright (con tests y documentación) a un repositorio público en GitHub para portfolio.

---

## ✅ Pre-requisitos

Antes de empezar, verifica que tienes:

- [x] Cuenta de GitHub activa
- [x] Git instalado y configurado localmente
- [x] Proyecto completo en: `/Users/fredy.benitez/proyectos-qa/ecommerce-playwright-automation`

**Verificar Git:**
```bash
git --version
# Debe mostrar: git version 2.x.x

git config --list | grep user
# Debe mostrar tu nombre y email
```

---

## 📋 Pasos Completos

### Paso 1: Verificar Archivos a Subir

**¿Qué vamos a subir?**

```bash
# Ir al proyecto
cd ~/proyectos-qa/ecommerce-playwright-automation

# Ver estructura
ls -la
```

**Deberías ver:**
```
.github/              ✅ Subir (GitHub Actions config)
node_modules/         ❌ NO subir (muy pesado)
pages/                ✅ Subir (vacío por ahora, para Fase 2)
playwright-report/    ❌ NO subir (se genera local)
project-log/          ✅ Subir (tu documentación)
test-results/         ❌ NO subir (resultados locales)
tests/                ✅ Subir (tus 23 tests)
utils/                ✅ Subir (vacío por ahora)
.gitignore            ✅ Verificar/crear
package.json          ✅ Subir
package-lock.json     ✅ Subir
playwright.config.ts  ✅ Subir
```

---

### Paso 2: Verificar/Crear .gitignore

El archivo `.gitignore` le dice a Git qué archivos NO subir.

**Verificar si existe:**
```bash
cat .gitignore
```

**Debería contener al menos:**
```
node_modules/
playwright-report/
test-results/
.DS_Store
.env
.env.local
```

**Si no existe o está incompleto, créalo/actualízalo:**
```bash
# Crear .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Test outputs
playwright-report/
test-results/

# Environment files
.env
.env.local

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*
EOF
```

**Verificar:**
```bash
cat .gitignore
# Debe mostrar el contenido correcto
```

---

### Paso 3: Inicializar Repositorio Git

**Inicializar Git en tu proyecto:**
```bash
git init
```

**Salida esperada:**
```
Initialized empty Git repository in /Users/fredy.benitez/proyectos-qa/ecommerce-playwright-automation/.git/
```

**Verificar rama principal:**
```bash
git branch
# Si no muestra nada, está bien (aún no hay commits)
```

---

### Paso 4: Agregar Archivos al Staging

**Ver qué archivos detecta Git:**
```bash
git status
```

**Deberías ver algo como:**
```
Untracked files:
  .github/
  .gitignore
  package.json
  pages/
  playwright.config.ts
  project-log/
  tests/
  utils/
```

**Nota:** `node_modules/`, `test-results/`, `playwright-report/` NO deben aparecer (gracias al .gitignore)

**Agregar todos los archivos:**
```bash
git add .
```

**Verificar qué se agregó:**
```bash
git status
```

**Ahora deberías ver:**
```
Changes to be committed:
  (todos tus archivos en verde)
```

---

### Paso 5: Crear Primer Commit

**Crear el commit con mensaje descriptivo:**

```bash
git commit -m "Initial commit: Phase 1 - Playwright automation framework

- 23 automated test cases (TC001-TC029)
- 100% pass rate across 3 browsers (Chrome, Firefox, Safari)
- Feature-based test organization (auth, cart, checkout, sorting, e2e)
- Comprehensive project documentation in project-log/
- Multi-browser configuration with Playwright
- GitHub Actions workflow for CI/CD (pending activation)

Test Coverage:
- Authentication: 5 tests
- Shopping Cart: 5 tests  
- Checkout Flow: 6 tests
- Product Sorting: 4 tests
- End-to-End: 3 tests

Documentation:
- Complete project-log structure (21 files)
- Phase 1 completion report
- Session logs framework
- Issue tracking system
- Metrics and learnings

Technical Stack:
- Playwright 1.60.0
- TypeScript 5.0+
- Node.js 22.19.0

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Verificar el commit:**
```bash
git log --oneline
# Debe mostrar tu commit
```

---

### Paso 6: Crear Repositorio en GitHub

**Ahora ve a tu navegador:**

1. **Ir a GitHub:**
   - Abre: https://github.com
   - Haz login

2. **Crear nuevo repositorio:**
   - Click en el `+` en la esquina superior derecha
   - Selecciona "New repository"

3. **Configurar el repositorio:**
   
   **Repository name:**
   ```
   ecommerce-playwright-automation
   ```
   
   **Description:**
   ```
   Professional test automation framework using Playwright and TypeScript. Portfolio project demonstrating modern QA practices with 23+ test cases, 100% pass rate, and multi-browser support.
   ```
   
   **Visibility:**
   - ✅ **Public** (para portfolio)
   
   **Initialize repository:**
   - ❌ **NO** marcar "Add a README file"
   - ❌ **NO** marcar "Add .gitignore"
   - ❌ **NO** seleccionar licencia aún
   
   (Ya tienes estos archivos localmente)

4. **Click en "Create repository"**

---

### Paso 7: Conectar Repositorio Local con GitHub

**GitHub te mostrará instrucciones. Busca la sección:**
> "...or push an existing repository from the command line"

**Debería verse así:**
```bash
git remote add origin https://github.com/TU_USERNAME/ecommerce-playwright-automation.git
git branch -M main
git push -u origin main
```

**En tu terminal, ejecuta:**

```bash
# Agregar el remote (cambia TU_USERNAME por tu usuario de GitHub)
git remote add origin https://github.com/TU_USERNAME/ecommerce-playwright-automation.git

# Renombrar rama a 'main' (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

**Ejemplo real (reemplaza fredy-benitez con tu username):**
```bash
git remote add origin https://github.com/fredy-benitez/ecommerce-playwright-automation.git
git branch -M main
git push -u origin main
```

**Salida esperada:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to 8 threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XX KiB | XX MiB/s, done.
Total XX (delta X), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (X/X), done.
To https://github.com/TU_USERNAME/ecommerce-playwright-automation.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### Paso 8: Verificar en GitHub

**En tu navegador:**

1. Refresca la página de GitHub
2. Deberías ver todos tus archivos
3. El README.md principal aún no existe (lo crearás en Fase 4)

**Verificar que se subió todo:**
- ✅ `.github/workflows/` existe
- ✅ `tests/` con 5 carpetas
- ✅ `project-log/` completo
- ✅ `package.json` visible
- ✅ `playwright.config.ts` visible
- ❌ `node_modules/` NO debe existir

---

## 🎉 ¡Listo! Tu código está en GitHub

**URL de tu repositorio:**
```
https://github.com/TU_USERNAME/ecommerce-playwright-automation
```

---

## 📝 Comandos de Referencia Rápida

### Ver Estado
```bash
git status          # Ver archivos modificados
git log --oneline   # Ver historial de commits
git remote -v       # Ver repositorio remoto
```

### Subir Cambios Futuros
```bash
git add .                           # Agregar cambios
git commit -m "Descripción"        # Crear commit
git push                           # Subir a GitHub
```

### Ver Diferencias
```bash
git diff                # Ver cambios no staged
git diff --staged       # Ver cambios staged
```

---

## 🔄 Workflow para Futuras Actualizaciones

**Cuando completes Fase 2, 3, o 4:**

```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .

# 3. Crear commit descriptivo
git commit -m "Phase 2: Implement Page Object Model

- Created 4 page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
- Refactored 23 existing tests to use POM
- Added 15 new tests using POM pattern
- Implemented data-driven testing
- Total: 40+ tests, 100% pass rate

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Subir a GitHub
git push
```

---

## ⚠️ Problemas Comunes y Soluciones

### Problema 1: "fatal: remote origin already exists"

**Causa:** Ya agregaste el remote antes

**Solución:**
```bash
# Ver remotes actuales
git remote -v

# Remover el remote existente
git remote remove origin

# Agregar de nuevo
git remote add origin https://github.com/TU_USERNAME/ecommerce-playwright-automation.git
```

---

### Problema 2: "Permission denied (publickey)"

**Causa:** Problemas de autenticación SSH

**Solución:** Usa HTTPS en vez de SSH:
```bash
# Si agregaste con SSH (git@github.com:...)
git remote remove origin

# Agregar con HTTPS
git remote add origin https://github.com/TU_USERNAME/ecommerce-playwright-automation.git
```

---

### Problema 3: "node_modules/ appears in GitHub"

**Causa:** .gitignore incorrecto o agregado después

**Solución:**
```bash
# Remover node_modules del tracking
git rm -r --cached node_modules/

# Verificar .gitignore tiene node_modules/
cat .gitignore

# Commit
git commit -m "Remove node_modules from tracking"
git push
```

---

### Problema 4: "Updates were rejected"

**Causa:** Hay cambios en GitHub que no tienes local

**Solución:**
```bash
# Traer cambios de GitHub
git pull origin main

# Luego subir tus cambios
git push
```

---

## 📊 Checklist de Verificación

Antes de dar por terminado, verifica:

- [ ] ✅ Repositorio creado en GitHub
- [ ] ✅ Código subido correctamente
- [ ] ✅ `node_modules/` NO aparece en GitHub
- [ ] ✅ `project-log/` completo está visible
- [ ] ✅ `tests/` con los 5 folders visibles
- [ ] ✅ `.github/workflows/` existe
- [ ] ✅ Puedes ver el código desde navegador
- [ ] ✅ URL del repo guardada

---

## 🔗 Links Útiles

- **Tu repositorio:** `https://github.com/TU_USERNAME/ecommerce-playwright-automation`
- **Git documentation:** https://git-scm.com/doc
- **GitHub guides:** https://guides.github.com

---

## 🎯 Próximos Pasos

1. ✅ Código subido a GitHub
2. ⬜ Agregar README.md profesional (Fase 4)
3. ⬜ Activar GitHub Actions
4. ⬜ Agregar badges al README
5. ⬜ Compartir en LinkedIn

---

## 💡 Tips Profesionales

### Commits de Calidad

**✅ Buenos mensajes de commit:**
```
"Phase 1: Complete authentication tests (5 tests)"
"Fix: Resolve sorting selector timeout issue"
"Docs: Add Phase 1 completion report"
"Refactor: Convert tests to Page Object Model"
```

**❌ Malos mensajes:**
```
"update"
"fix stuff"
"changes"
"."
```

### Estructura de Mensajes

```
Título corto (50 caracteres max)

Descripción opcional más detallada:
- Bullet point 1
- Bullet point 2
- Bullet point 3

Incluye siempre:
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Commits Frecuentes

- Commit después de cada feature completada
- Commit cuando todos los tests pasan
- No esperes a terminar todo el día

---

*Documento creado: Mayo 13, 2026*  
*Última actualización: Mayo 13, 2026*
