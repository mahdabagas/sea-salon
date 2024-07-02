import { FC, useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface InputServiceProps {
  form: any;
  name: string;
  label: string;
}

const InputService: FC<InputServiceProps> = ({ form, name, label }) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const [input, setInput] = useState({
    service: "",
    duration: "",
  });

  const emptyInput = input.service.length === 0 || input.duration.length === 0;
  console.log(emptyInput);
  const handleSaveValue = () => {
    if (emptyInput) {
      return;
    }

    const inputResult = input.service + "|" + input.duration;

    const newValue: any = [...values, inputResult];

    setValues(newValue);

    form.setValue(name, newValue);

    setInput({
      service: "",
      duration: "",
    });
  };

  const handleDeleteValue = (item: string) => {
    const skills: any = values.filter((value: string) => item !== value);

    setValues(skills);
    form.setValue(name, skills);
  };

  useEffect(() => {
    const val = form.getValues(name);

    if (val && val.length > 0) {
      setValues(val);
    }
  }, [form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="w-[350px]">
              <Button
                type="button"
                variant="outline"
                className="mb-2 w-full text-start bg-secondary-sea hover:text-primary-sea border-primary-sea"
                onClick={() => setHide((prev) => !prev)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {label}
              </Button>
              {isHide && (
                <div className="my-2 flex flex-row gap-4 w-full items-end">
                  <div className="flex gap-2 w-full">
                    <div className="w-3/4">
                      <Label htmlFor="input_service">Service name</Label>
                      <Input
                        className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                        id="input_service"
                        value={input.service}
                        onChange={(e) =>
                          setInput((prev) => ({
                            ...prev,
                            service: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="w-1/4">
                      <Label htmlFor="input_duration">Duration</Label>
                      <Input
                        id="input_duration"
                        className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                        value={input.duration}
                        type="number"
                        onChange={(e) =>
                          setInput((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    disabled={emptyInput}
                    onClick={handleSaveValue}
                    className="bg-primary-sea hover:bg-primary-sea/75 items-end"
                  >
                    Save
                  </Button>
                </div>
              )}
              {values?.length !== 0 && (
                <div className="space-y-3 p-2 border border-primary-sea rounded-sm">
                  <p className="font-medium">Daftar Service</p>
                  <Separator />
                  {values.map((item: string, key: number) => {
                    const service = item.split("|").at(0);
                    const duration = item.split("|").pop();
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between px-0"
                      >
                        <p>{`${service} - ${duration} hour`}</p>
                        <X
                          className="block w-5 h-5 cursor-pointer"
                          onClick={() => handleDeleteValue(item)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputService;
