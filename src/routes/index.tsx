import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/portfolio/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Pandey — Portfolio" },
      {
        name: "description",
        content:
          "Yash Pandey's portfolio hub — AI Video Creator, Software Developer and Cyber Security. Explore my work.",
      },
      { property: "og:title", content: "Yash Pandey — Portfolio" },
      {
        property: "og:description",
        content:
          "Portfolio hub — AI Video Creator, Software Developer and Cyber Security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
