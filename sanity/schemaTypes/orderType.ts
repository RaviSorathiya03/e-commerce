import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: "order", 
    title: "Order",
    type: "document",
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "Stripe Checkout Session ID",
            type: "string",
        }),
        defineField({
            name: "stripeCustomerId",
            title: "Stripe Customer ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "ClerkUserId",
            title: "Store User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe Payment Intent ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
                defineArrayMember({
                   type: "object",
                   fields: [
                    defineField({
                        name: "product",
                        title: "Product Bought",
                        type: "reference",
                        to: [{ type: "product" }],
                    }),
                    defineField({
                        name: "quantity",
                        title: "Quantity Purchased",
                        type: "number",
                        validation: (Rule) => Rule.required().min(1),
                    }),
                   ],
                   preview: {
                    select: {
                        product: "product.name",
                        quantity: "quantity",
                    },
                    prepare(selection) {
                        const { product, quantity } = selection;
                        return {
                            title: product,
                            subtitle: `Quantity: ${quantity}`,
                        };
                    },
                   }
                })
            ]
        }),
        defineField({
            name: "orderStatus",
            title: "Order Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Processing", value: "processing" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                ],
                layout: "dropdown",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "totalAmount",
            title: "Total Amount",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "shippingAddress",
            title: "Shipping Address",
            type: "object",
            fields: [
                defineField({
                    name: "street",
                    title: "Street",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "city",
                    title: "City",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "state",
                    title: "State",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "postalCode",
                    title: "Postal Code",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "country",
                    title: "Country",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),
    ],
});