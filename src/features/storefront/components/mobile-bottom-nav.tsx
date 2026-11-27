import { StoreIcon } from "./store-icon";

type MobileBottomNavProps = {
  wishlistCount: number;
  showWishlistOnly: boolean;
  cartCount: number;
  onSearch: () => void;
  onWishlist: () => void;
  onCart: () => void;
};

export function MobileBottomNav({
  wishlistCount,
  showWishlistOnly,
  cartCount,
  onSearch,
  onWishlist,
  onCart,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-[#292929] bg-[#080808]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <a href="#categories" className="store-bottom-nav-item">
        <StoreIcon name="grid" size={19} />
        <span>Shop</span>
      </a>
      <button type="button" onClick={onSearch} className="store-bottom-nav-item">
        <StoreIcon name="search" size={19} />
        <span>Search</span>
      </button>
      <button
        type="button"
        onClick={onWishlist}
        aria-label={`Saved items, ${wishlistCount}`}
        aria-pressed={showWishlistOnly}
        className="store-bottom-nav-item relative"
      >
        <StoreIcon name="heart" size={19} />
        <span>Saved</span>
        {wishlistCount ? <NavCount count={wishlistCount} /> : null}
      </button>
      <button
        type="button"
        onClick={onCart}
        aria-label={`Shopping bag, ${cartCount} items`}
        className="store-bottom-nav-item relative"
      >
        <StoreIcon name="bag" size={19} />
        <span>Bag</span>
        {cartCount ? <NavCount count={cartCount} /> : null}
      </button>
    </nav>
  );
}

function NavCount({ count }: { count: number }) {
  return (
    <span className="absolute right-[calc(50%-20px)] top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f5f5f5] px-1 text-[9px] font-bold text-[#080808]">
      {count > 9 ? "9+" : count}
    </span>
  );
}
