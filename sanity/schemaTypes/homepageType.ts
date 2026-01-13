import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      description:
        "Add slides for the homepage hero section. The first slide will be the primary display.",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Hero Slide",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Main headline for the slide",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              rows: 2,
              description: "Supporting text below the title",
            }),
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "ctaText",
              title: "Button Text",
              type: "string",
              initialValue: "Shop Now",
            }),
            defineField({
              name: "ctaLink",
              title: "Button Link",
              type: "string",
              initialValue: "/products",
              description:
                "URL path for the button (e.g., /products, /products?category=sale)",
            }),
            defineField({
              name: "textPosition",
              title: "Text Position",
              type: "string",
              options: {
                list: [
                  { title: "Center", value: "center" },
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "center",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("At least one hero slide is required"),
    }),
    defineField({
      name: "featuredCategoriesTitle",
      title: "Featured Categories Title",
      type: "string",
      initialValue: "Shop by Category",
    }),
    defineField({
      name: "featuredCategoriesSubtitle",
      title: "Featured Categories Subtitle",
      type: "string",
      initialValue: "Explore Collections",
    }),
    defineField({
      name: "newArrivalsTitle",
      title: "New Arrivals Section Title",
      type: "string",
      initialValue: "New Arrivals",
    }),
    defineField({
      name: "newArrivalsSubtitle",
      title: "New Arrivals Section Subtitle",
      type: "string",
      initialValue: "The latest additions to our collection",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage Settings",
        subtitle: "Manage hero slides and section titles",
      };
    },
  },
});
