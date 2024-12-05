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

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

const formSchema = z.object({
  achievementId: z.coerce.number(),
});

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
    updateSettings(values);
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
