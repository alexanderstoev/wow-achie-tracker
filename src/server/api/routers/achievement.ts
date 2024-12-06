import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let token = "";
const getToken = async () => {
  if (token != "") return token;
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " +
      Buffer.from(
        env.NEXT_PUBLIC_BLIZZ_API_CLIENTID +
          ":" +
          env.NEXT_PUBLIC_BLIZZ_API_SECRET,
      ).toString("base64"),
  );

  const formData = new FormData();
  formData.append("grant_type", "client_credentials");

  const response = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: headers,
    body: formData,
  });

  const data = (await response.json()) as unknown as { access_token: string };
  token = data.access_token;
  return token;
};

export const achievementRouter = createTRPCRouter({
  getAchievement: publicProcedure
    .input(z.coerce.number())
    .query(async ({ input }) => {
      if (input === 0) return [];
      const url =
        "https://eu.api.blizzard.com/data/wow/achievement/" +
        input +
        "?locale=en_US";

      const response = await makeRequest<Achievement>(url, "static");
      return response;
    }),
  getCharacterAchievements: publicProcedure
    .input(
      z.object({
        realm: z.string(),
        character: z.string(),
        region: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const url = `https://${input.region}.api.blizzard.com/profile/wow/character/${input.realm}/${input.character}/achievements`;
      const response = await makeRequest(url.toLowerCase(), "profile");
      return response as CharacterAchievements;
    }),
});

const makeRequest = async <T>(
  url: string,
  namespace: "static" | "profile",
): Promise<T> => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${await getToken()}`);
  headers.set("Battlenet-Namespace", `${namespace}-eu`);

  const response = await fetch(url, {
    headers,
  });

  return (await response.json()) as Promise<T>;
};
