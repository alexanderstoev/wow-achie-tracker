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
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useState } from "react";

const CAPTIONS = {
  "Achievement Selection": "Achievement Selection",
  "No achievement selected": "Expand to select a achievement",
};

const formSchema = z.object({
  achievementId: z.coerce.number(),
});

export const AchievementSelect = () => {
  const [formExpanded, setFormExpanded] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      achievementId: 0,
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
          {formExpanded && <span>Achievement Selection</span>}
          {!formExpanded && !!form.getValues().achievementId && (
            <span className="font-bold">Achievement Name</span>
          )}
          {!formExpanded && !form.getValues().achievementId && (
            <span className="">{CAPTIONS["No achievement selected"]} </span>
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
            <form>
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
              <Button type="button" onClick={() => handleApplyClick()}>
                Apply
              </Button>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};
