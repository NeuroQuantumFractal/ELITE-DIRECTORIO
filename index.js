import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const LOCATION = "27.4864,-109.9408";

const TYPES = ["restaurant", "bar", "spa", "gym", "lodging"];

async function fetchPlaces(type, pageToken = "") {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LOCATION}&radius=6000&type=${type}&key=${API_KEY}`;
  if (pageToken) url += `&pagetoken=${pageToken}`;

  const res = await fetch(url);
  return res.json();
}

function calculateLuxuryScore(p) {
  let score = 0;
  score += (p.rating || 0) * 10;
  score += Math.min(p.user_ratings_total || 0, 300) * 0.08;
  score += (p.price_level || 0) * 8;
  if (p.photos) score += 10;
  return Math.min(Math.round(score), 100);
}

async function main() {
  let all = [];

  for (const type of TYPES) {
    const data = await fetchPlaces(type);
    all.push(...data.results);
  }

  const elite = all
    .filter(p => p.rating >= 4.4 && p.user_ratings_total >= 40)
    .map(p => ({
      id: p.place_id,
      name: p.name,
      rating: p.rating,
      reviews: p.user_ratings_total,
      price_level: p.price_level || 0,
      lat: p.geometry.location.lat,
      lng: p.geometry.location.lng,
      image: p.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photos[0].photo_reference}&key=${API_KEY}`
        : null,
      luxury_score: calculateLuxuryScore(p),
      status: p.business_status
    }))
    .slice(0, 100);

  const { error } = await supabase
    .from("businesses")
    .upsert(elite, { onConflict: "id" });

  if (error) console.error(error);
  else console.log("🔥 Datos cargados");
}

main();
