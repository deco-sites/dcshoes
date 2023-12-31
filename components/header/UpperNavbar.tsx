import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import { PLATFORM } from "$store/platform.ts";
import { navbarHeight } from "./constants.ts";

function UpperNavbar({ links, leftMsg }: {
  links: string[];
  leftMsg: string;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        <div class="flex gap-1">
          <SearchButton />
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center w-full px-[30px] h-10">
        <div class="flex-none w-1/3">
          <p class="text-xs text-black">{leftMsg}</p>
        </div>
        <div class="flex-none w-2/3 flex items-center justify-end gap-2">
          {links?.map((item) => (
            <a
              alt={item}
              title={item}
              class="text-[#181812] text-xs uppercase cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default UpperNavbar;
