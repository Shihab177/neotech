import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Title } from "../ui/text";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Price Range</Title>
      <RadioGroup
        value={selectedPrice || ""}
        onValueChange={(value) => setSelectedPrice(value)}
        className="mt-2 space-y-1"
      >
        {priceArray.map((item) => (
          <div
            key={item.value}
            onClick={() => setSelectedPrice(item.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={item.value}
              id={item.value}
              className="rounded-sm border border-gray-600"
            />
            <Label
              htmlFor={item.value}
              className={`${
                selectedPrice === item.value
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }`}
            >
              {item.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Reset Button (Optional but recommended) */}
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-sm font-medium mt-3 underline underline-offset-2 hover:text-shop_dark_green transition-colors"
        >
          Reset price
        </button>
      )}
    </div>
  );
};

export default PriceList;