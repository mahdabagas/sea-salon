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

interface InputServiceProps {
  form: any;
  name: string;
  label: string;
}

const InputService: FC<InputServiceProps> = ({ form, name, label }) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSaveValue = () => {
    if (input === "") {
      return;
    }

    const newValue: any = [...values, input];

    setValues(newValue);

    form.setValue(name, newValue);

    setInput("");
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
                className="mb-2 w-full text-start"
                onClick={() => setHide((prev) => !prev)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {label}
              </Button>
              {isHide && (
                <div className="my-6 flex flex-row gap-4 w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleSaveValue}
                    className="bg-primary-sea hover:bg-primary-sea/75"
                  >
                    Save
                  </Button>
                </div>
              )}
              {values?.length !== 0 && (
                <div className="space-y-3 p-2 border border-primary-sea rounded-sm">
                  <p className="font-medium">Daftar Service</p>
                  <Separator />
                  {values.map((item: string, key: number) => (
                    <div
                      key={key}
                      className="flex items-center justify-between px-0"
                    >
                      <p>- {item}</p>
                      <X
                        className="block w-5 h-5 cursor-pointer"
                        onClick={() => handleDeleteValue(item)}
                      />
                    </div>
                  ))}
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
