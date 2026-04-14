import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 10000;

// Si falta ANON_KEY, usa SERVICE_ROLE_KEY automáticamente
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.send('<h1>DIRECTORIO ELITE: OPERATIVO CON PRECISIÓN LÁSER ✅</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor lanzado en puerto ${port}`);
});



