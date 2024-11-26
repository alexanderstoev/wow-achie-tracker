import { AchievementSelect } from "~/components/achievement-select";
import { CharacterSelect } from "~/components/character-select";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="">
        <CharacterSelect />
        <AchievementSelect />
      </main>
    </HydrateClient>
  );
}
