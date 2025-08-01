import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product", // Corrected from "productType"
  title: "Product",
  type: "document",
  icon: TrolleyIcon, // ✅ corrected from `icons` to `icon`
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array", // ✅ corrected from `type: "block"`
      of: [{ type: "block" }],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'image',
      subtitle: 'price',
    },
    prepare(selection) {
      const { name, media, subtitle } = selection;
      return {
        title: name,
        subtitle: `$${subtitle}`, // optional formatting
        media,
      }
    },
  }
  
});
