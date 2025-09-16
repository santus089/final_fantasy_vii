// src/scripts/dropdowns.ts
const initDropdowns = () => {
  const dropdowns = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-dropdown]'));

  // Cerrar al click fuera o al seleccionar un item
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Si se clickea un item del menú, cierra SU dropdown y deja navegar
    const item = target.closest<HTMLElement>('details[data-dropdown] [role="menuitem"]');
    if (item) {
      item.closest('details[data-dropdown]')?.removeAttribute('open');
      return;
    }

    // Click fuera => cerrar los abiertos
    dropdowns.forEach((d) => {
      if (d.open && !d.contains(target)) d.removeAttribute('open');
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') dropdowns.forEach((d) => d.removeAttribute('open'));
  });

  // (Opcional) solo uno abierto a la vez
  // dropdowns.forEach((d) => {
  //   d.addEventListener('toggle', () => {
  //     if (d.open) dropdowns.forEach((o) => o !== d && o.removeAttribute('open'));
  //   });
  // });
};

// Ejecutar en carga inicial
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDropdowns);
} else {
  initDropdowns();
}

// Soporte básico si usas View Transitions de Astro
document.addEventListener('astro:after-swap', initDropdowns as EventListener);

// Toggle del menú móvil
const burger = document.querySelector('[data-menu-toggle]');
const menu = document.getElementById('nav-menu');

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  menu?.classList.toggle('hidden');
});
