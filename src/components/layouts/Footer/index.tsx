import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Instagram, Twitter } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="w-full bg-primary-sea px-6 md:px-12 lg:px-16 py-6">
      <div className="md:flex md:gap-6 space-y-6 md:space-y-0 md:items-start text-secondary-sea">
        <div className="md:w-64 space-y-1">
          <h3 className="text-lg font-medium">Contact Us</h3>
          <p className="text-sm">08123456789 - Thomas</p>
          <p className="text-sm">08164829372 - Sekar</p>
        </div>
        <div className="md:w-64">
          <h3 className="text-lg mb-1 font-medium">Visit Us</h3>
          <p className="text-sm">Jl Pegangsaan Timur no 25, Jakarta Selatan</p>
        </div>
        <div className="md:my-0 md:mr-0 md:ml-auto md:w-72 space-y-1">
          <h3 className="text-lg font-medium">Get Sea Notification</h3>
          <p className="text-sm">Get latest our sea service, promo, etc</p>
          <div className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-secondary-sea text-primary-sea focus-visible:ring-0"
            />
            <Button className="bg-primary-sea text-secondary-sea border border-secondary-sea hover:bg-secondary-sea hover:text-primary-sea">
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end gap-2">
        <Instagram color="#FFFBF6" />
        <Twitter color="#FFFBF6" />
      </div>
    </div>
  );
}

export default Footer;
