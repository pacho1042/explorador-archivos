const fs = require('fs/promises');
const os = require('os');
const path = require('path');

function formatearTamano(bytes) {
  if (bytes === 0) return '0 B';

  const unidades = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const tamano = bytes / Math.pow(1024, i);

  return `${tamano.toFixed(2)} ${unidades[i]}`;
}

async function listarDetallado() {
  try {
    const dirUsuario = os.homedir();
    const items = await fs.readdir(dirUsuario);

    console.log(`Contenido detallado de: ${dirUsuario}\n`);

    for (const item of items) {
      const rutaCompleta = path.join(dirUsuario, item);
      const stats = await fs.stat(rutaCompleta);

      // Formatear y mostrar información
      const tipo = stats.isDirectory() ? '[Carpeta]' : '[Archivo]';
      const tamano = stats.isDirectory() ? '-' : formatearTamano(stats.size);
      const fecha = stats.mtime.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(`${tipo.padEnd(12)} ${item.padEnd(30)} ${tamano.padEnd(12)} ${fecha}`);
    }

  } catch (error) {
    console.log('Error:', error.message);
  }
}

listarDetallado();