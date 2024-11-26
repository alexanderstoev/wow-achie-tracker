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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useState } from "react";

const CAPTIONS = {
  "Character Selection": "Character Selection",
  "No character selected": "Expand to select a character",
  from: "from",
  at: "at",
};

const formSchema = z.object({
  characterName: z.string().min(2, {
    message: "Character name is required and must be at least 2 characters",
  }),
  realmName: z.string().min(2, {
    message: "Realm name is required and must be at least 2 characters",
  }),
  region: z.enum(["US", "EU", "KR", "TW", "CN"]),
});

export const CharacterSelect = () => {
  const [formExpanded, setFormExpanded] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      characterName: "",
      realmName: "",
      region: "EU",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("onSubmit", values);
    setFormExpanded(false);
  };

  const handleApplyClick = () => {
    void form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <CardTitle
          className="flex cursor-pointer items-center justify-between font-normal"
          onClick={() => setFormExpanded(!formExpanded)}
        >
          {formExpanded && <span>Character Selection</span>}
          {!formExpanded && form.getValues().characterName && (
            <span>
              <span className="font-bold">
                {form.getValues().characterName}
              </span>{" "}
              <span>{CAPTIONS.from}</span>{" "}
              <span className="font-bold">{form.getValues().realmName}</span>{" "}
              <span>{CAPTIONS.at}</span>{" "}
              <span className="font-bold">{form.getValues().region}</span>{" "}
            </span>
          )}
          {!formExpanded && !form.getValues().characterName && (
            <span className="">{CAPTIONS["No character selected"]} </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFormExpanded(!formExpanded)}
          >
            {formExpanded && <ChevronUpCircle />}
            {!formExpanded && <ChevronDownCircle />}
          </Button>
        </CardTitle>
      </CardHeader>
      {formExpanded && (
        <CardContent>
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
              <div className="flex w-full items-end justify-between">
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
                      <FormDescription>
                        Valid regions EU, US, KR, TW, CN.
                      </FormDescription>
                    </FormItem>
                  )}
                ></FormField>
                <Button type="button" onClick={() => handleApplyClick()}>
                  Apply
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};
