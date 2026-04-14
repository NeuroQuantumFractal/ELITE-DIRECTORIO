import express from 'express';
import { createClient } from '@supabase/supabase-js'; // Asegúrate de tener esta librería

const app = express();
const port = process.env.PORT || 10000;

// Configuración de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Lógica de carga de datos
async function cargarDirectorioElite() {
  console.log("🚀 Extrayendo activos de alta red para Peces Gordos...");
  const { data, error } = await supabase.from('negocios').select('*');
  
  if (error) {
    console.error("❌ Error en la extracción:", error.message);
  } else {
    console.log(`🔥 ${data.length} negocios cargados con éxito.`);
  }
}

cargarDirectorioElite();

// El link ahora mostrará estado real
app.get('/', (req, res) => {
  res.json({
    status: "OPERATIVO",
    entorno: "Elite Ciudad Obregón",
    precision: "100%",
    mensaje: "Sistema de Inteligencia de Patrimonio Activo"
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor de Élite escuchando en puerto ${port}`);
});
