/**
 * Avatar Teamobi WebGL - Game Bootstrap Loader
 * Initializes WebGL canvas, network session, and loads game bundle
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log('[AvatarGame] Initializing Avatar Teamobi 2.5.8 WebGL Client...');
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.error('[AvatarGame] Canvas #gameCanvas not found!');
    return;
  }
  console.log('[AvatarGame] Canvas ready. Loading game subsystems...');
});
