"use client";
import { Button } from "antd";

export default function layout({ children }: { children: React.ReactNode }) {
  return <>
    <Button>123</Button>
    {children}</>;
}
