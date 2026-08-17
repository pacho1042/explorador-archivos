const fs = require('fs/promises');
const os = require('os');
const path = require('path');

async function filtrarJavaScript() {
  try {
    const dirUsuario = os.homedir();
    const items = await fs.readdir(dirUsuario);
    const archivosJS = [];

    for (const item of items) {
      if (path.extname(item) === '.js') {
        // Procesar y agregar a archivosJS
        const rutaCompleta = path.join(dirUsuario, item);
        const stats = await fs.stat(rutaCompleta);

        archivosJS.push({
          nombre: item,
          tamano: stats.size
        });
      }
    }

    console.log(`Encontrados ${archivosJS.length} archivos JavaScript`);

    // Mostrar cada uno
    if (archivosJS.length === 0) {
      console.log('No se encontraron archivos .js en este directorio.');
    } else {
      console.log('');
      for (const archivo of archivosJS) {
        console.log(`- ${archivo.nombre} (${archivo.tamano} bytes)`);
      }
    }

  } catch (error) {
    console.log('Error:', error.message);
  }
}

filtrarJavaScript();