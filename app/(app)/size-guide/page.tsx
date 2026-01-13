"use client";

import { Info, Ruler } from "lucide-react";
import { useState } from "react";
import { InfoPageLayout, InfoSection } from "@/components/info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const mensSizes = {
  tops: [
    { size: "XS", chest: "34-36", waist: "28-30", length: "26" },
    { size: "S", chest: "36-38", waist: "30-32", length: "27" },
    { size: "M", chest: "38-40", waist: "32-34", length: "28" },
    { size: "L", chest: "40-42", waist: "34-36", length: "29" },
    { size: "XL", chest: "42-44", waist: "36-38", length: "30" },
    { size: "XXL", chest: "44-46", waist: "38-40", length: "31" },
  ],
  bottoms: [
    { size: "28", waist: "28", hip: "36", inseam: "30" },
    { size: "30", waist: "30", hip: "38", inseam: "30" },
    { size: "32", waist: "32", hip: "40", inseam: "31" },
    { size: "34", waist: "34", hip: "42", inseam: "31" },
    { size: "36", waist: "36", hip: "44", inseam: "32" },
    { size: "38", waist: "38", hip: "46", inseam: "32" },
  ],
};

const womensSizes = {
  tops: [
    { size: "XS", bust: "32-33", waist: "24-25", hip: "34-35" },
    { size: "S", bust: "34-35", waist: "26-27", hip: "36-37" },
    { size: "M", bust: "36-37", waist: "28-29", hip: "38-39" },
    { size: "L", bust: "38-40", waist: "30-32", hip: "40-42" },
    { size: "XL", bust: "41-43", waist: "33-35", hip: "43-45" },
    { size: "XXL", bust: "44-46", waist: "36-38", hip: "46-48" },
  ],
  bottoms: [
    { size: "XS (0-2)", waist: "24-25", hip: "34-35", inseam: "29" },
    { size: "S (4-6)", waist: "26-27", hip: "36-37", inseam: "29" },
    { size: "M (8-10)", waist: "28-29", hip: "38-39", inseam: "30" },
    { size: "L (12-14)", waist: "30-32", hip: "40-42", inseam: "30" },
    { size: "XL (16-18)", waist: "33-35", hip: "43-45", inseam: "30" },
    { size: "XXL (20-22)", waist: "36-38", hip: "46-48", inseam: "31" },
  ],
};

const measurementTips = [
  {
    name: "Chest/Bust",
    description:
      "Measure around the fullest part of your chest, keeping the tape level and snug but not tight.",
  },
  {
    name: "Waist",
    description:
      "Measure around your natural waistline, the narrowest part of your waist, usually just above the belly button.",
  },
  {
    name: "Hip",
    description:
      "Measure around the fullest part of your hips, keeping the tape level.",
  },
  {
    name: "Inseam",
    description:
      "Measure from the crotch seam to the bottom of the leg on a pair of pants that fit you well.",
  },
];

interface SizeTableProps {
  data: Array<Record<string, string>>;
  columns: Array<{ key: string; label: string }>;
}

function SizeTable({ data, columns }: SizeTableProps) {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-sm"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.size}
              className={cn(
                "border-b transition-colors cursor-pointer",
                highlightedRow === row.size
                  ? "bg-primary/10"
                  : "hover:bg-muted/50",
              )}
              onClick={() =>
                setHighlightedRow(highlightedRow === row.size ? null : row.size)
              }
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-sm",
                    col.key === "size"
                      ? "font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {row[col.key]}
                  {col.key !== "size" && '"'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <InfoPageLayout
      title="Size Guide"
      subtitle="Find your perfect fit with our comprehensive sizing charts."
      breadcrumbs={[{ label: "Help", href: "/help" }]}
      maxWidth="4xl"
    >
      {/* How to Measure */}
      <InfoSection title="How to Measure" className="mb-12">
        <p className="text-muted-foreground mb-6">
          For the most accurate fit, we recommend taking measurements over
          undergarments. Use a soft measuring tape and keep it snug but not
          tight.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {measurementTips.map((tip) => (
            <div key={tip.name} className="flex gap-3 rounded-lg border p-4">
              <Ruler className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">{tip.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>

      {/* Size Charts */}
      <Tabs defaultValue="mens" className="space-y-8">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="mens">Men's Sizes</TabsTrigger>
          <TabsTrigger value="womens">Women's Sizes</TabsTrigger>
        </TabsList>

        {/* Men's Sizes */}
        <TabsContent value="mens" className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Men's Tops (Shirts, T-Shirts, Jackets)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              All measurements in inches
            </p>
            <SizeTable
              data={mensSizes.tops}
              columns={[
                { key: "size", label: "Size" },
                { key: "chest", label: "Chest" },
                { key: "waist", label: "Waist" },
                { key: "length", label: "Length" },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Men's Bottoms (Pants, Jeans, Shorts)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              All measurements in inches
            </p>
            <SizeTable
              data={mensSizes.bottoms}
              columns={[
                { key: "size", label: "Size" },
                { key: "waist", label: "Waist" },
                { key: "hip", label: "Hip" },
                { key: "inseam", label: "Inseam" },
              ]}
            />
          </div>
        </TabsContent>

        {/* Women's Sizes */}
        <TabsContent value="womens" className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Women's Tops (Shirts, Blouses, Jackets)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              All measurements in inches
            </p>
            <SizeTable
              data={womensSizes.tops}
              columns={[
                { key: "size", label: "Size" },
                { key: "bust", label: "Bust" },
                { key: "waist", label: "Waist" },
                { key: "hip", label: "Hip" },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Women's Bottoms (Pants, Jeans, Skirts)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              All measurements in inches
            </p>
            <SizeTable
              data={womensSizes.bottoms}
              columns={[
                { key: "size", label: "Size" },
                { key: "waist", label: "Waist" },
                { key: "hip", label: "Hip" },
                { key: "inseam", label: "Inseam" },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Fit Tips */}
      <div className="mt-12 rounded-lg border bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <Info className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Fit Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • If you're between sizes, we recommend sizing up for a relaxed
                fit or sizing down for a more fitted look.
              </li>
              <li>
                • Check individual product descriptions for specific fit notes
                (e.g., "runs small" or "relaxed fit").
              </li>
              <li>
                • Cotton garments may shrink slightly after the first wash –
                consider this when choosing your size.
              </li>
              <li>
                • Still unsure? Our customer support team is happy to help with
                sizing recommendations.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
