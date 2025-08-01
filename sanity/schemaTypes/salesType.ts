import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "datetime",
            validation: (Rule) =>
                Rule.required().custom((endDate, context) => {
                    const startDate = context.document?.startDate;
                    if (typeof startDate === "string" && typeof endDate === "string" && new Date(endDate) <= new Date(startDate)) {
                        return "End date must be after the start date.";
                    }
                    return true;
                }),
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "discountPercentage",
            title: "Discount Percentage",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(100),
        }),
        defineField({
            name: "applicableProducts",
            title: "Applicable Products",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "product" }],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title", // Corrected from "name"
            subtitle: "discountPercentage", // Corrected from "price"
            media: "applicableProducts[0].image", // Optional: Adjust based on your schema
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            return {
                title,
                subtitle: `${subtitle}% Discount`, // Adjusted subtitle formatting
                media,
            };
        },
    },
});