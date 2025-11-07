# Backlog — Sistema para Vendedor de Celulares (Markdown)

## Épica A — Catálogo & Stock (IMEI first)

### A1. Alta de equipo por IMEI (unicidad y trazabilidad)
- **Como** vendedor **quiero** dar de alta un equipo por IMEI **para** controlar unicidad y trazabilidad.  
- **Prioridad:** Must · **Estimación:** 3 pts  
- **Criterios (Gherkin):**
  ```gherkin
  Escenario: Alta con IMEI válido
    Dado que ingreso un IMEI válido de 15 dígitos
    Cuando lo guardo
    Entonces el sistema valida unicidad y crea el dispositivo en estado "En stock"

  Escenario: IMEI duplicado
    Dado un IMEI ya registrado
    Cuando intento guardarlo
    Entonces veo error "IMEI existente" y no se duplica el stock
  ```
- **Notas:** Validar Luhn del IMEI; normalizar variantes (Dual SIM).

### A2. Atributos del equipo (ficha técnica + fotos)
- **Como** vendedor **quiero** registrar marca, modelo, color, capacidad, condición (nuevo/usado), estado estético, accesorios, **para** publicar fichas claras.  
- **Prioridad:** Must · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Ficha completa
    Dado que cargo los atributos mínimos y 3 fotos (una portada)
    Cuando guardo el equipo
    Entonces la ficha queda lista para publicar
  ```

### A3. Gestión de precios (margen/competencia)
- **Como** vendedor **quiero** ajustar precios por reglas **para** mantener rentabilidad.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Regla de precio por marca
    Dado reglas de margen por marca/modelo
    Cuando recalculo precios
    Entonces se aplica redondeo psicológico y se registra el historial de cambios
  ```

### A4. Stock por ubicación (local/depósito)
- **Como** vendedor **quiero** gestionar stock por ubicación **para** disponibilidad real.  
- **Prioridad:** Should · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Movimiento de stock
    Dado un equipo en local
    Cuando lo traslado a depósito con motivo
    Entonces queda registrado usuario, motivo y timestamp
  ```

---

## Épica B — Compras & Canjes

### B5. Compras a proveedores (costos y márgenes)
- **Como** vendedor **quiero** registrar compras (factura, costo, lote) **para** calcular margen.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Alta de compra
    Dado una factura con ítems y costos
    Cuando confirmo la compra
    Entonces el stock se incrementa y se registran los costos unitarios e impuestos
  ```

### B6. Toma de equipos en canje (tasación guiada)
- **Como** vendedor **quiero** tasación guiada **para** cerrar ventas más rápido.  
- **Prioridad:** Must · **Estimación:** 8 pts  
- **Criterios:**
  ```gherkin
  Escenario: Checklist de canje
    Dado un equipo en canje
    Cuando completo checklist (pantalla, batería, iCloud/FRP, accesorios) y fotos
    Entonces se genera documento con firma digital del cliente
  ```
- **Notas:** Flag de riesgo si iCloud/FRP activo.

---

## Épica C — Ventas presenciales & online (omnicanal)

### C7. Carrito y emisión de comprobante
- **Como** vendedor **quiero** crear carrito con equipos/accesorios **para** emitir comprobante.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Venta con impuestos y descuento
    Dado un carrito con ítems
    Cuando aplico descuento y selecciono medio(s) de pago
    Entonces genero comprobante fiscal en PDF
  ```

### C8. Integración de canales (WhatsApp/IG/ML)
- **Como** vendedor **quiero** unificar consultas **para** convertir a ventas.  
- **Prioridad:** Should · **Estimación:** 8 pts  
- **Criterios:**
  ```gherkin
  Escenario: Chat a presupuesto
    Dado un hilo de chat
    Cuando creo un presupuesto desde el chat
    Entonces puedo transformarlo en venta sin duplicar al cliente
  ```
- **Notas:** Webhooks; deduplicación por teléfono.

### C9. Reservas con seña y vencimiento
- **Como** vendedor **quiero** reservas con seña y expiración **para** no perder stock.  
- **Prioridad:** Should · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Reserva expirada
    Dado una reserva con vencimiento
    Cuando llega la fecha/hora
    Entonces se libera stock y se notifica al cliente
  ```

### C10. Envíos y tracking
- **Como** vendedor **quiero** calcular envío (método, costo, tracking) **para** completar la venta online.  
- **Prioridad:** Should · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Generar guía
    Dado una venta online
    Cuando selecciono operador logístico
    Entonces se genera etiqueta y se muestra tracking al cliente
  ```

---

## Épica D — Financiamiento & Pagos

### D11. Simulador de cuotas/promos
- **Como** vendedor **quiero** simular cuotas **para** cerrar en mostrador.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Simulación
    Dado una lista de promociones y tasas
    Cuando selecciono banco/financiación
    Entonces se muestra total financiado y CFT, exportable a WhatsApp
  ```

### D12. Split de pago (múltiples medios)
- **Como** vendedor **quiero** dividir pago (efectivo + tarjeta + billetera) **para** flexibilizar cobro.  
- **Prioridad:** Should · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Pago combinado
    Dado un total a cobrar
    Cuando asigno montos a distintos medios
    Entonces el total queda conciliado en la misma venta
  ```

---

## Épica E — Postventa, Garantía & Taller

### E13. Certificado de garantía
- **Como** vendedor **quiero** adjuntar certificado con condiciones **para** evitar reclamos.  
- **Prioridad:** Must · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Garantía por IMEI
    Dado una venta con IMEI
    Cuando cierro la venta
    Entonces se emite PDF con IMEI, fecha, plazo, firma/QR verificable
  ```

### E14. Órdenes de reparación (taller)
- **Como** técnico **quiero** gestionar OTs (diagnóstico, repuestos) **para** administrar el taller.  
- **Prioridad:** Should · **Estimación:** 8 pts  
- **Criterios:**
  ```gherkin
  Escenario: Flujo de OT
    Dado una OT creada
    Cuando cambia de estado (Recepcionado → En reparación → Listo → Entregado)
    Entonces se registran tiempos y fotos antes/después
  ```

### E15. Validación iCloud/FRP antes de entrega
- **Como** vendedor **quiero** validar iCloud/FRP **para** reducir devoluciones.  
- **Prioridad:** Must · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Bloqueo por iCloud/FRP
    Dado un equipo vendido
    Cuando intento marcar como entregado
    Entonces se bloquea si la verificación iCloud/FRP no es exitosa
  ```

---

## Épica F — CRM & Marketing

### F16. Ficha de cliente unificada
- **Como** vendedor **quiero** ficha con contacto, preferencias e historial **para** ofertas dirigidas.  
- **Prioridad:** Should · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Unificación
    Dado un teléfono y email
    Cuando guardo el cliente
    Entonces el sistema deduplica y registra consentimiento de marketing
  ```

### F17. Campañas y segmentos (trade-up)
- **Como** vendedor **quiero** campañas por modelo/interés **para** ofrecer trade-up.  
- **Prioridad:** Could · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Segmento exportable
    Dado un filtro por modelo y última compra
    Cuando genero el segmento
    Entonces puedo exportar CSV o enviar mensajes templated por WhatsApp
  ```

---

## Épica G — Facturación & Fiscal (AR)

### G18. Facturación AFIP (A/B/C) y NC
- **Como** vendedor **quiero** emitir factura y notas de crédito **para** cumplir AFIP.  
- **Prioridad:** Must · **Estimación:** 8 pts  
- **Criterios:**
  ```gherkin
  Escenario: Emisión con CAE
    Dado una venta finalizada
    Cuando solicito CAE
    Entonces se emite comprobante con QR y reintentos si AFIP no responde
  ```

### G19. Cierre de caja (arqueo)
- **Como** administrativo **quiero** cierre de caja diario **para** control.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Arqueo
    Dado movimientos del día
    Cuando realizo el cierre
    Entonces se genera reporte PDF y se bloquean modificaciones del día
  ```

---

## Épica H — Analytics & Costos

### H20. Dashboard de negocio
- **Como** owner **quiero** ver ventas por canal, margen y rotación **para** decidir compras.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: KPIs con filtros
    Dado filtros por fecha, canal y marca
    Cuando los aplico
    Entonces veo KPIs y puedo exportar CSV/PDF
  ```

### H21. Alertas operativas
- **Como** owner **quiero** alertas (stock crítico, precios fuera de margen) **para** corregir a tiempo.  
- **Prioridad:** Should · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Umbral de stock
    Dado un umbral configurable
    Cuando el stock cae por debajo
    Entonces recibo alerta por email/WhatsApp
  ```

---

## Épica I — Seguridad, Auditoría & Cumplimiento

### I22. Roles y permisos (ACL)
- **Como** admin **quiero** roles (vendedor, técnico, admin) **para** proteger datos.  
- **Prioridad:** Must · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Acceso denegado
    Dado un usuario sin permiso
    Cuando intenta cambiar un precio
    Entonces el sistema deniega la acción y registra el intento
  ```

### I23. Bitácora de cambios (append-only)
- **Como** admin **quiero** bitácora de IMEI y precios **para** auditoría.  
- **Prioridad:** Must · **Estimación:** 3 pts  
- **Criterios:**
  ```gherkin
  Escenario: Registro inmutable
    Dado un evento de cambio
    Cuando se persiste
    Entonces queda con usuario, timestamp y firma; exportable
  ```

---

## Épica J — Integraciones

### J24. Publicación a catálogos (ML/FB Shop)
- **Como** vendedor **quiero** conector a catálogos **para** publicar sin doble carga.  
- **Prioridad:** Should · **Estimación:** 8 pts  
- **Criterios:**
  ```gherkin
  Escenario: Sync de ficha
    Dado una ficha actualizada
    Cuando sincronizo
    Entonces se actualiza precio/stock/pausa en los canales
  ```

### J25. Conciliación de pagos (POS/Mercado Pago)
- **Como** administrativo **quiero** conciliar cobros **para** cierre mensual.  
- **Prioridad:** Should · **Estimación:** 5 pts  
- **Criterios:**
  ```gherkin
  Escenario: Cruce automático
    Dado extractos importados
    Cuando ejecuto conciliación
    Entonces se matchean movimientos y marco diferencias para revisión
  ```

---

## Campos clave por entidad (mínimos)
- **Dispositivo:** IMEI (único), marca, modelo, color, capacidad, condición, estado estético, accesorios, costo, precio, fotos[], ubicación, notas, fecha ingreso.  
- **Venta:** nro, fecha, cliente, ítems[{IMEI, precio, garantía}], mediosPago[], impuestos, total, comprobante.  
- **Cliente:** nombre, documento, teléfono (único), email, direcciones[], consentimiento marketing.  
- **Proveedor:** nombre, CUIT, contacto, condiciones.  
- **Orden Reparación:** número, cliente, equipo (IMEI), diagnóstico, presupuesto, repuestos[], estados[], fotos.

## Reglas de negocio críticas
- IMEI único y obligatorio para alta, venta y garantía.  
- No se puede **entregar** un equipo con iCloud/FRP activo.  
- Reserva expira automáticamente (cron) y libera stock.  
- Cambios de precio guardan historial (usuario, motivo).  
- Cierre de caja bloquea modificaciones del día.

## Requisitos no funcionales (NFR)
- **Disponibilidad:** 99.5% mensual (tienda/PDV).  
- **Rendimiento:** búsqueda por IMEI < 200 ms P95 con 50k dispositivos.  
- **Seguridad:** TLS; contraseñas con Argon2; 2FA para admin.  
- **Trazabilidad:** eventos append-only para IMEI, precios y stock.  
- **Backups:** diarios; retención 30 días; restauración probada.  
- **Observabilidad:** logs estructurados + métricas (APM) + alertas.

## Definición de Hecho (DoD) por historia
- API + UI + validaciones + tests (unitarios y e2e básicos).  
- Permisos y auditoría cubiertos.  
- Documentación de uso + colección Postman/Insomnia.  
- Migraciones DB + datos semilla (roles, estados).  
- Feature flag si afecta ventas/stock.

---

### ¿Siguiente paso?
¿Lo traduzco a **CSV para Jira/Linear** con **IDs y Sprints 1–3** alineado a tu stack (SvelteKit + Nest + Postgres + Docker)?
