import type { MetaFunction } from "@remix-run/node";
import { ColorSchemeToggle } from "~/components/ThemeToggle";
import { Title, Text, Anchor } from "@mantine/core";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "CoverSnap" },
    { name: "description", content: "CoverSnap lets you easily generate good looking cover images for your blog posts." },
  ];
};

export default function Index() {
  return (
      <>
      <header>
        <nav className="flex justify-between items-center p-4">
          <Link to="/" className="text-2xl font-bold">CoverSnap</Link>
          <ColorSchemeToggle />
        </nav>
      </header>
      <Title ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          CoverSnap
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
      CoverSnap lets you easily generate good looking cover images for your blog posts.
      </Text>
    </>
  );
}