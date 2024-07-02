"use client";

import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema } from "@/lib/form.schem";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn, fetcher } from "@/lib/utils";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import { bookingType, branchStoreType } from "@/types";
import Loading from "@/components/atoms/Loading";
import dayjs from "dayjs";
import { TimePicker } from "@/components/atoms/TimePicker";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const defaultValue = {
  storeId: "",
  services: [],
};

interface BookingFormProps {}

const BookingForm: FC<BookingFormProps> = () => {
  const { data: session } = useSession();

  const { data: stores, isLoading } = useSWR<branchStoreType[]>(
    "/api/store",
    fetcher
  );

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: defaultValue,
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [store, setStore] = useState<branchStoreType>({
    id: "",
    closeTime: "",
    location: "",
    name: "",
    openTime: "",
    service: [""],
  });
  const [services, setServices] = useState<string[]>([]);
  const isStoreEmpty = store.id?.length === 0;

  const onSubmit = async (val: z.infer<typeof bookingFormSchema>) => {
    setLoading(true);
    try {
      const dateFormat = dayjs(val.date).format("DD MMM YYYY");
      const timeFormat = dayjs(val.time).format("HH:mm");
      const dateBooking = dayjs(`${dateFormat} ${timeFormat}`).toDate();

      const body: bookingType = {
        name: val.name,
        phone: val.phone,
        date: dateBooking,
        services: val.services,
        userId: session?.user?.id,
        storeId: val.storeId,
      };

      await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        setLoading(false);
        toast({
          title: "Success",
          description: "booking succes",
        });
        // reset Form
        form.setValue("name", "");
        form.setValue("phone", "");
        form.resetField("date");
        form.resetField("time");
        form.resetField("services", {
          defaultValue: [""],
        });
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Please try again",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex gap-2 justify-between">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-base text-primary-sea">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                    className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-base text-primary-sea">
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your number"
                    {...field}
                    className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="storeId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary-sea text-lg">
                Branch Store
              </FormLabel>
              <Select
                onValueChange={(e) => {
                  const selectedStore: branchStoreType = stores?.find(
                    (item) => item.id === e
                  ) || {
                    id: "",
                    closeTime: "",
                    location: "",
                    name: "",
                    openTime: "",
                    service: [""],
                  };
                  setStore(selectedStore);
                  setServices(selectedStore.service || []);
                  field.onChange(e);
                  form.resetField("services");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className="bg-secondary-sea border-primary-sea text-primary-sea ring-0 focus:ring-0 relative"
                    disabled={isLoading}
                  >
                    <SelectValue placeholder="Select a store" />
                    {/* Loading */}
                    {isLoading && (
                      <div className="absolute right-2 -top-8 ">
                        <Loading size={24} />
                      </div>
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-secondary-sea text-primary-sea">
                  {stores?.map((store: branchStoreType) => (
                    <SelectItem
                      key={store.id}
                      value={store.id || ""}
                      className="focus:text-primary-sea"
                    >
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!isStoreEmpty && (
                <FormDescription className="text-primary-sea">{`Note : Open from ${store.openTime} until ${store.closeTime}`}</FormDescription>
              )}
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-primary-sea text-lg">
            Time & Date Booking
          </FormLabel>
          <div className="flex justify-between gap-2">
            <FormItem className="flex flex-col">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TimePicker
                        date={field.value}
                        setDate={field.onChange}
                        label=""
                        variant="sea"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </FormItem>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full ">
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
                            dayjs(field.value).format("dddd, DD MMM YYYY")
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
                          date < dayjs().subtract(1, "day").toDate()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <FormLabel className="text-primary-sea text-lg">
                Services
              </FormLabel>
              <div className="flex flex-col items-start gap-4">
                {isStoreEmpty ? (
                  <p className="text-sm text-primary-sea/80">
                    Please select branch store first!
                  </p>
                ) : (
                  services.map((service: string, i: number) => {
                    const name = service.split("|").at(0);
                    const duration = service.split("|").pop();
                    return (
                      <FormField
                        key={service + i}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service + i}
                              className="flex space-y-0 gap-1 items-center"
                            >
                              <FormControl>
                                <Checkbox
                                  className="border-primary-sea data-[state=checked]:bg-primary-sea data-[state=checked]:text-secondary-sea"
                                  checked={field.value?.includes(service)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          service,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== service
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-primary-sea">
                                {name}{" "}
                                <span className="text-primary-sea/80">
                                  ({duration} Hour)
                                </span>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })
                )}
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="border-2 hover:bg-secondary-sea hover:text-primary-sea
           border-primary-sea bg-primary-sea text-secondary-sea w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? <Loading variant="secondary" /> : "Booking Now"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
