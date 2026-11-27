import Image from "next/image";
import { storeCategories, type StoreCategoryId } from "../data/catalog";
import { StoreIcon, type StoreIconName } from "./store-icon";

const categoryIcons: Record<StoreCategoryId, StoreIconName> = {
  tees: "shirt",
  hoodies: "shirt",
  cargo: "grid",
  accessories: "lock",
};

type CategorySectionProps = {
  selectedCategory: StoreCategoryId | null;
  onSelectCategory: (category: StoreCategoryId | null) => void;
};

export function CategorySection({
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  return (
    <section id="categories" aria-label="Shop by category" className="store-container py-5 sm:py-7">
      <div className="store-category-row">
        {storeCategories.map((category) => {
          const selected = selectedCategory === category.id;
          const hasReleasedProduct = category.id === "tees" || category.id === "hoodies";

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectCategory(selected ? null : category.id)}
              className={`store-category-card group ${selected ? "store-category-card-active" : ""}`}
            >
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                unoptimized
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
              <span className="relative z-10 flex min-w-0 items-center gap-2">
                <StoreIcon name={categoryIcons[category.id]} size={18} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
                  {category.name}
                </span>
                <StoreIcon name="arrow-right" size={15} className="ml-auto shrink-0" />
              </span>
              {!hasReleasedProduct ? (
                <span className="absolute right-2 top-2 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-white sm:right-3 sm:top-3">
                  Coming soon
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
