import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/helpers/test-utils";
import { ExampleCard } from "./example-card";
import type { FeatureItem } from "../types/example.types";

describe("ExampleCard", () => {
  const sampleFeature: FeatureItem = {
    id: "sample-1",
    title: "Testing Title",
    description: "Testing Description for example card",
    category: "testing",
    status: "ready",
  };

  it("should render feature title, description, and category", () => {
    render(<ExampleCard feature={sampleFeature} />);

    expect(screen.getByText("Testing Title")).toBeInTheDocument();
    expect(
      screen.getByText("Testing Description for example card")
    ).toBeInTheDocument();
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.getByText("ready")).toBeInTheDocument();
  });
});
