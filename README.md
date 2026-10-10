# Binary Hacker

Juego web educativo para aprender binario con estética militar retro: te infiltras en una base, hackeas terminales y defiendes la sala de control de misiles cifrados.

## Ejecutar

No requiere instalación ni compilación:

```bash
python3 -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Cómo se juega

- **Flechas / WASD**: mover al operativo por la base (en el teléfono hay un D-pad).
- **Choca** con una terminal o pulsa **Espacio / Enter** para hackearla.
- Cada terminal resuelta abre la siguiente puerta; al asegurar la zona se abre la escotilla de salida.
- Zonas: Perímetro → Cuartel → Archivo cifrado → Sala de servidores → Sótano (bomba) → Control de misiles.
- En el control de misiles, cada misil trae su código cifrado en binario o hexadecimal. Selecciónalo con ←/→ o con un clic y escribe la respuesta para interceptarlo. Si fallas, el misil acelera; si toca la base pierdes un escudo.

## Contenido

- 17 terminales progresivas repartidas en cinco zonas de la base, más cinco oleadas de defensa antimisiles.
- Personajes recurrentes y explicaciones breves, con un concepto por nivel.
- Conversiones entre decimal, binario y hexadecimal.
- Sumas binarias y práctica de los flags Zero, Carry, Negative y Overflow.
- Prueba final que combina conversiones, aritmética y flags.
- Explicaciones, pistas, puntuación, rachas y progreso guardado.
- Diseño adaptable para computadora y teléfono.
- Sonidos generados localmente con Web Audio API.

Todo el hacking del juego es ficticio y está enfocado en aprendizaje.
