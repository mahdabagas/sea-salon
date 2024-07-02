"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GoCheckCircle } from "react-icons/go";
import { FiAlertCircle } from "react-icons/fi";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`${
              title === "Error"
                ? "text-red-600 border-red-600"
                : "text-primary-sea border-primary-sea"
            } bg-secondary-sea `}
          >
            <div
              className="grid justify-center items-center"
              style={{ gridTemplateColumns: "3rem 1fr" }}
            >
              <div className="w-full">
                {title === "Error" ? (
                  <FiAlertCircle size={32} />
                ) : (
                  <GoCheckCircle size={32} />
                )}
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
