import { AchievementSelect } from "~/components/achievement-select";
import { CharacterSelect } from "~/components/character-select";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-stretch gap-6 p-12 ">
        <CharacterSelect />
        <AchievementSelect />
      </main>
    </HydrateClient>
  );
}
