'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/app/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { salesType } from "./sanity/schemaTypes/salesType";
import { orderType } from "./sanity/schemaTypes/orderType";
import { productType } from "./sanity/schemaTypes/productType";
import { categoryType } from "./sanity/schemaTypes/categoryType";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/app',
  name: "default",
  title: "Ecommerce",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: [salesType, orderType, productType, categoryType],
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
