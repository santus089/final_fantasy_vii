import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const prerender = false;
export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get('code');
  console.log("URL completa:", url.href);
  console.log("Parámetros:", Object.fromEntries(url.searchParams.entries()));
  
  if (!authCode) {
    return new Response("No se proporcionó ningún código", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });

  return redirect("/");
};