import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { blockContentType } from './blockContaintType'
import { blogType } from './blogType'
import { brandType } from './brandType'
import { orderType } from './orderType'
import { productType } from './productType'
import { blogCategoryType } from './blogCategoryType'
import { addressType } from './adressType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType,authorType,blockContentType,blogType, brandType,orderType,productType,blogCategoryType,addressType],
}
