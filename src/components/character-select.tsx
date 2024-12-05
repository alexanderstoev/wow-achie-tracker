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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
  characterName: z.string().min(2, {
    message: "Character name is required and must be at least 2 characters",
  }),
  realmName: z.string().min(2, {
    message: "Realm name is required and must be at least 2 characters",
  }),
  region: z.enum(["US", "EU", "KR", "TW", "CN"]),
});

export type CharacterSelectProps = {
  settings: SettingsType;
  updateSettings: (settings: SettingsType) => void;
};

export const CharacterSelect = ({
  settings,
  updateSettings,
}: CharacterSelectProps) => {
  //
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      characterName: settings.characterName,
      realmName: settings.realmName,
      region: settings.region,
    },
  });

  useEffect(() => {
    form.setValue("characterName", settings.characterName ?? "");
    form.setValue("realmName", settings.realmName ?? "");
    form.setValue("region", settings.region ?? "EU");
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
          {!!settings.characterName &&
            !!settings.realmName &&
            !!settings.region &&
            `${settings.characterName} from ${settings.realmName} at ${settings.region}`}
          {!settings.achievement?.name && "select character"}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-52">
        <DialogHeader>
          <DialogTitle className="flex cursor-pointer items-center justify-between font-normal">
            Character info
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="characterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character name</FormLabel>
                  <FormControl>
                    <Input placeholder="Character name" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="realmName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Realm name</FormLabel>
                  <FormControl>
                    <Input placeholder="Realm name" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="KR">KR</SelectItem>
                      <SelectItem value="TW">TW</SelectItem>
                      <SelectItem value="CN">CN</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
