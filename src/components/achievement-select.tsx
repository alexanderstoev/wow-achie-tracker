"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const MAX_RECENT_ACHIEVEMENTS = 5;

const formSchema = z.object({
  achievementId: z.coerce.number(),
});

const recommendedAchievements = [
  { id: 41201, caption: "You Xal Not Pass" },
  { id: 41133, caption: "Isle Remember You" },
  { id: 40438, caption: "Glory of the Delver" },
];

export type AchievementSelectProps = {
  settings: SettingsType;
  updateSettings: (settings: SettingsType) => void;
};

export const AchievementSelect = ({
  settings,
  updateSettings,
}: AchievementSelectProps) => {
  //
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    form.setValue("achievementId", settings.achievementId ?? 0);
  }, [form, settings]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const recentAchievements =
      settings.recentAchievements?.filter((achi) =>
        achi.id != values.achievementId ? true : false,
      ) ?? [];
    recentAchievements.unshift({
      id: values.achievementId,
      name: "",
    });
    if (recentAchievements.length > MAX_RECENT_ACHIEVEMENTS) {
      recentAchievements.pop();
    }

    updateSettings({
      achievementId: values.achievementId,
      achievement: undefined,
      recentAchievements: recentAchievements,
    });
    setDialogOpen(false);
  };

  const handleApplyClick = () => {
    void form.handleSubmit(onSubmit)();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {settings.achievement?.name && settings.achievement.name}
          {!settings.achievement?.name && "select achievement"}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-52">
        <DialogHeader>
          <DialogTitle className="flex cursor-pointer items-center justify-between font-normal">
            {!!settings.achievement?.name && (
              <span className="font-bold">{settings.achievement?.name}</span>
            )}
            {!settings.achievement?.name && (
              <span>{"Select achievement"} </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <FormField
              control={form.control}
              name="achievementId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Achievement ID" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              <Button type="button" onClick={() => handleApplyClick()}>
                Apply
              </Button>
            </DialogFooter>
            <div className="flex-col justify-start">
              <span className="text-lg text-green-500">
                Recommended achievements to track:
              </span>
              <div className="flex flex-wrap gap-2">
                {recommendedAchievements.map((achi) => (
                  <Button
                    key={achi.id}
                    variant="outline"
                    className="text-sm text-green-600"
                    onClick={() => {
                      form.setValue("achievementId", achi.id);
                      handleApplyClick();
                    }}
                  >
                    {achi.caption}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex-col justify-start">
              <span className="text-lg text-orange-500">
                Recently tracked achievements:
              </span>
              <div className="flex flex-wrap gap-2">
                {settings.recentAchievements?.map((achi) => (
                  <Button
                    key={achi.id}
                    variant="outline"
                    className="block max-w-48 truncate text-xs text-orange-600"
                    onClick={() => {
                      form.setValue("achievementId", achi.id);
                      handleApplyClick();
                    }}
                  >
                    {achi.name || achi.id}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
