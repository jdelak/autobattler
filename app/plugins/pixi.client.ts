import * as PIXI from 'pixi.js';

export default defineNuxtPlugin((nuxtApp) => {
  // Ajoute PixiJS à l'instance de Nuxt
  nuxtApp.provide('pixi', PIXI);
});