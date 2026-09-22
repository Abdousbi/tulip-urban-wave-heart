import { createFileRoute } from "@tanstack/react-router";
import { NovaApp } from "@/components/nova/NovaApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <NovaApp />;
}
