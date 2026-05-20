#!/bin/bash

echo "🎭 Ejecutando tests en modo visual..."
echo ""
echo "Opciones disponibles:"
echo "1. Modo headed (navegador visible)"
echo "2. Modo headed slow (más lento para ver mejor)"
echo "3. Modo UI interactivo"
echo ""

npx playwright test --headed
