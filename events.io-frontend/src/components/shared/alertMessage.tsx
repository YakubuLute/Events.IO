"use client";

interface AlertMessageProps {
    message: string;
}

export default function AlertMessage({ message }: AlertMessageProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}