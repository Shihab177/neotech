import { Product } from "@/sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getBrand } from "@/sanity/queries";

interface Props {
  product: Product | null | undefined;
}

const ProductCharacteristics = async ({ product }: Props) => {
  const brand = await getBrand(product?.slug?.current as string);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm font-semibold">
          {product?.name}: Characteristics
        </AccordionTrigger>
        <AccordionContent className="space-y-3">
          {/* Brand Row */}
          <p className="flex items-center justify-between text-s">
            Brand:{" "}
            {brand && (
              <span className="font-semibold tracking-wide">
                {brand?.brandName}
              </span>
            )}
          </p>

          {/* Collection Row */}
          <p className="flex items-center justify-between text-sm">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>

          {/* Stock Row */}
          <p className="flex items-center justify-between text-sm">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
