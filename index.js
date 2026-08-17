const fs = require('fs/promises');
const os = require('os');
const path = require('path');

async function listarDirectorio() {
  try {
    const directorio = os.homedir(); // Puedes cambiarlo por cualquier ruta
    
    const archivos = await fs.readdir(directorio);
    
    console.log(`Contenido de: ${directorio}\n`);
    
    for (const archivo of archivos) {
      const rutaCompleta = path.join(directorio, archivo);
      const stats = await fs.stat(rutaCompleta);
      
      const tipo = stats.isDirectory() ? '[Carpeta]' : '[Archivo]';
      console.log(`${tipo} ${archivo}`);
    }
    
  } catch (error) {
    console.log('Error:', error.message);
  }
}

listarDirectorio();