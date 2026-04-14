import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 10000;

// Configuración con las 4 Variables de Élite
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const dbPassword = process.env.DB_PASSWORD; // Tu 3ra variable
const otherSecret = process.env.OTHER_SECRET; // Tu 4ta variable

// Validación de seguridad para que no se caiga
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Faltan llaves maestras en Environment.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.send('<h1>DIRECTORIO ELITE: SISTEMA INTEGRADO ✅</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Motor encendido en puerto ${port} con 4 variables de control.`);
});
