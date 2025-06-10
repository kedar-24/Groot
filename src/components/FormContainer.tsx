import React from "react";
import Card from "./Card";

type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FormContainer({
  children,
  className = "",
}: FormContainerProps) {
  return (
    <Card className={`max-w-xl w-full p-8 items-center ${className}`}>
      {children}
    </Card>
  );
}
