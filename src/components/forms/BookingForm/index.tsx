"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema } from "@/lib/form.schem";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { DUMMYSERVICE } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingFormProps {}

const BookingForm: FC<BookingFormProps> = () => {
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      services: [],
    },
  });

  const onSubmit = (val: z.infer<typeof bookingFormSchema>) => {
    console.log(val);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-primary-sea text-lg">
                Date Booking
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-secondary-sea border-primary-sea text-primary-sea hover:bg-none hover:text-primary-sea"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date booking</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: any) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary-sea text-lg">
                Branch Store
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-secondary-sea border-primary-sea text-primary-sea ring-0 focus:ring-0">
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-secondary-sea text-primary-sea">
                  <SelectItem
                    value="m@example.com"
                    className="focus:bg-secondary-sea"
                  >
                    m@example.com
                  </SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <FormLabel className="text-primary-sea text-lg">
                Services
              </FormLabel>
              <div className="flex flex-wrap items-center gap-4">
                {DUMMYSERVICE.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex space-y-0 gap-1 items-center"
                        >
                          <FormControl>
                            <Checkbox
                              className="border-primary-sea data-[state=checked]:bg-primary-sea data-[state=checked]:text-secondary-sea"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-primary-sea">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="border-2 hover:bg-secondary-sea hover:text-primary-sea
           border-primary-sea bg-primary-sea text-secondary-sea w-full"
          size="lg"
        >
          Booking Now
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
