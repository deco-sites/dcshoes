import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { PLATFORM } from "$store/platform.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import Logo from "./../Logo.tsx";

const mockItems = [
  {
    label: "MASCULINO",
    href: "#",
    children: [{
      label: "VESTUÁRIO",
      href: "#",
      children: [
        {
          label: "Camiseta",
          href: "#",
        },
        { label: "Regata", href: "#" },
        { label: "Moletom", href: "#" },
        { label: "Jaqueta", href: "#" },
        { label: "Calça E Jeans", href: "#" },
        { label: "Bermuda", href: "#" },
        { label: "Plus Size", href: "#" },
        { label: "Camisa e Polo", href: "#" },
      ],
    }, {
      label: "ACESSÓRIOS",
      href: "#",
      children: [
        { label: "Boné", href: "#" },
        { label: "Chapéu", href: "#" },
        { label: "Meias E Cuecas", href: "#" },
        { label: "Mochila", href: "#" },
        { label: "Carteira E Cinto", href: "#" },
        { label: "Pochete", href: "#" },
      ],
    }, {
      label: "COLEÇÕES",
      href: "#",
      children: [
        { label: "Bronze 56K", href: "#" },
        { label: "Skateboarding", href: "#" },
        { label: "Star Wars", href: "#" },
        { label: "Venture", href: "#" },
        { label: "DEADPOOL", href: "#" },
        { label: "Kevin Bilyeu", href: "#" },
        { label: "Cafe", href: "#" },
        { label: "Truth Supertour Jersey", href: "#" },
        { label: "Mandalorian", href: "#" },
      ],
    }],
  },
  {
    label: "FEMININO",
    href: "#",
    children: [{
      label: "VESTUÁRIO",
      href: "#",
      children: [{
        label: "Moletom",
        href: "#",
      }, {
        label: "Shorts",
        href: "#",
      }, {
        label: "Tops e Camisetas",
        href: "#",
      }],
    }],
  },
  {
    label: "JUVENIL",
    href: "#",
    children: [{
      label: "VESTUÁRIO",
      href: "#",
    }],
  },
  {
    label: "CALÇADOS",
    href: "#",
    children: [{
      label: "SNEAKERS",
      href: "#",
    }, {
      label: "VER TODOS",
      href: "#",
    }],
  },
  {
    label: "OUTLET",
    href: "#",
  },
];

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              class="w-16 h-9"
              src={logo.src}
              alt={logo.alt}
              width={65}
              height={35}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full px-[30px]">
        <div class="flex-none w-44">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4  w-[140px] h-[35px]"
            >
              <Image
                class="w-[45px] h-[35px]"
                src={logo.src}
                alt={logo.alt}
                width={65}
                height={35}
              />
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center">
          {mockItems.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={0.4} />
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={24}
              strokeWidth={2}
              fill="none"
            />
          </a>
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
