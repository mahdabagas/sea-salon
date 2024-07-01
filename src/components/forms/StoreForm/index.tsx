"use client";

import { TimePicker } from "@/components/atoms/TimePicker";
import FieldInput from "@/components/organisms/FieldInput";
import InputService from "@/components/organisms/InputService";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { storeFormSchema } from "@/lib/form.schem";
import { branchStoreType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface StoreFormProps {}

const StoreForm: FC<StoreFormProps> = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      services: [],
    },
  });

  const onSubmit = async (val: z.infer<typeof storeFormSchema>) => {
    try {
      const body: branchStoreType = {
        name: val.name,
        location: val.location,
        openTime: dayjs(val.openTime).format("HH:mm"),
        closeTime: dayjs(val.closeTime).format("HH:mm"),
        service: val.services,
      };

      await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        router.push("/dashboard/branch-store");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <FieldInput title="Name" subtitle="Store Name">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="eg. Sea Salon"
                    {...field}
                    className="w-[360px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Location" subtitle="Store Address">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="eg. Jl. Mampang Prapatan, Jakarta Selatan"
                    {...field}
                    className="w-[360px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Time" subtitle="Opening & Closing Hour">
          <div className="flex justify-between items-center gap-2">
            <FormField
              control={form.control}
              name="openTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      setDate={field.onChange}
                      label="Open TIme"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="inline-block pt-4">-</span>
            <FormField
              control={form.control}
              name="closeTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      setDate={field.onChange}
                      label="Close Time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FieldInput>

        <FieldInput
          title="Service Duration"
          subtitle="Duration per service in hour"
        >
          <InputService form={form} label="Add Service" name="services" />
        </FieldInput>

        <div className="flex justify-end items-center">
          <Button
            size="lg"
            className="bg-primary-sea text-secondary-sea font-semibold  "
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;
