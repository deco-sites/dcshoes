import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import UpperNavbar from "deco-sites/staging/components/header/UpperNavbar.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: Image; alt: string };

  /**
   * @title Links
   * @description List of links in rigth
   */
  links: string[];

  /** @title Left text */
  leftMsg: string;
}

const mockLogo = {
  src:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDY0LjAyIiBoZWlnaHQ9IjExOTMuMyI+PHBhdGggZD0iTTM3MS44MzggNzAuMTQ2bC0yNzguNjU3LjQwNi0uMDMgNTc1LjIxOSAyMTcuODQzLS44NzUtLjIxOS0zNTYuMjE5IDU2LjUzMS0uMjVjMjYuNDUyLS4xMSA3OS41OTQgMy42MTYgMTM3LjgxMyAyMC43MTlsMjMuOTA2IDguMTg3Yy0xOC42OTEgMjMuODY3LTUxLjUwNiA3Ni41MjgtNzIuMTg3IDEzOS4zNzUtMTUuMzUzIDQ2LjY1NC0yMy4wMzUgOTguMDY0LTIyLjYyNSAxNDMuMjgyLjk2NyAxMDYuOTQgMzMuMTExIDE5NC43NzcgOTQuODQzIDI4MS40MDZsLTIxLjQ2OCA3LjAzMWMtMzUuMzA4IDExLjY3NS05MS4wMSAyMC4zMzctMTM4LjU5NCAyMC40MDZsLTU3LjkwNi4wOTRjLS4xMzItLjc2Ni0uMjc1LTk5LjA0OC0uNDA3LTEzOC42ODdsLTIxNy41LS4xNTcuMDMxIDM1OC4wNjMgMjkxLjQzOC0uNDA2YzIwLjc1LS4wMyA2NS4xNzMtMy42MDggMTE3LjYyNS0xMy4xMjUgMjguMDMyLTUuMDg2IDYzLjEyMy0xNC45NSA5NC45MzgtMjYuMDMyIDQzLjg1My0xNS4yNzUgODAuODItMzMuMzkgMTA0LjU5My00N2w1Ljg0NC0zLjI1YzQwLjkzOSAyNC4wMjQgODcuNzI3IDQ0LjA1OCAxMzMuNTk0IDU4LjI4MiA2OC45NDMgMjEuMzggMTQ3Ljk4NSAzMS4xMDMgMTg3LjAzMSAzMS4wOTNsMjkzLjcxOS0uMDYyLS4wNjMtMzU3LjQwNi0yMTcuNTYzLjI1LjA2MiAxMzkuNDA2LTYyLjc1LS4xNTZzLTIwLjAyMSAxLjAzLTYyLjQwNi01LjI4MWMtMjguMzgxLTQuMjI2LTU3LjQ2LTEwLjkwMi04NS40MzctMjAuNjg4bC03LjYyNS0yLjg0MyAzLjQzNy00LjI1YzE2LjMwMS0yMC43MjggNTUuNzk1LTgxLjI4MSA3NC45MzgtMTU1Ljc4MiAxMC4zMzMtNDAuMjEyIDE3Ljc2OC04Ni42ODEgMTYuNDY4LTEyMy40MzctMS41MzUtODYuNjk2LTI3LjY1My0xOTEuMjU4LTkzLjU2Mi0yNzguMzc1bC0xLjQ2OC0xLjU2M2M4Ljc2Ni00LjEyIDQyLjcwMy0xNC4wOTMgNjMtMTguMDYzIDE4LjIzMS0zLjU2NSA2MC43NjMtMTEuMjc5IDEwOC40NjktMTEuMDYybDQ2Ljc1LjIxOS4wOTQgMTAxLjUzIDIxNy43NS0uMDMuMTI1LTMxOS41LTI3MC40MzgtLjAzMmMtNzcuODY1LS4wMDktMTc1LjQzNiAxMy4wOC0yNjkuMjE5IDUzLTI0LjAyNiAxMC4yMjgtNTMuNzExIDI0LjQyNS03NS4wOTQgMzYuODEzLTE1Ljg0Ni04Ljk1OC01MS44MzItMjkuOTY3LTg5LjY4Ny00My41OTQtNTEuMjg1LTE4LjQ2LTEzOC41LTQ2LjA5Mi0yNDUuOTM4LTQ2LjY1NnptODQxLjA5MyAzNjYuMjE5bC0zMi4yNSA4MS04Mi42ODctMjUgNDMuNDA2IDc1LjM3NS03MS45MzggNDkuNTMgODYuMDYzIDEzLTYgODYuNzUgNjMuODQ0LTU4LjU2MiA2My40NjggNTkuMDYzLTUuOTA2LTg3LjIxOSA4NS45MzgtMTMuMjgxLTcxLjY4OC00OS4xMjUgNDMuMTI1LTc1LjY1Ni04My4yNSAyNS4yOC0zMi4xMjUtODEuMTU1em0tNTA1LjY4NyA1Ljg3NWMuNjgyLjcyOSAxNS43NDUgMTguNzk4IDMxIDQ5LjY4NyAxMS4xNDggMjIuNTczIDE2LjI1NyA0MS40NiAxOS40NjkgNTkuMDk0IDEuNTY2IDguNiAzLjEyMyAxNi4yNTcgNC4xMjUgMjcuNDY5Ljg3MiA5Ljc3MyAxLjMyNyAyMi43NTMuOTY4IDM1LTQuNTIgNTMuNDEtMjEuODI0IDk3LjE3My01NC45NjggMTQyLjEyNWwtNC00LjY4OGMtMTEuODQtMTcuMzU2LTI1LjUwNS00MC4wMDYtMzQuMzQ0LTYxLjY4Ny0xMC4xNTEtMjQuOS0xNC42Ny00OC4yMy0xNC45MzgtNTYtMy43MTUtMzMuOTY2LTMuOTY4LTY0Ljk2IDYuNTMyLTk4LjgxMyAxMy41ODMtNDMuNzk3IDMwLjEzMi03MS4xMDIgNDMuNDM3LTg3LjQzN2wyLjcxOS00Ljc1eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjU0LjMiLz48cGF0aCBkPSJNMTI0NS4wNjQgNTE3LjUxMmw4My4yMzctMjUuMjY1LTQzLjEyOCA3NS42NSA3MS42OSA0OS4xMi04NS45MzkgMTMuMjczIDUuOTE4IDg3LjIzNS02My40NzEtNTkuMDc1LTYzLjg0OSA1OC41OCA1Ljk4OS04Ni43NDctODYuMDU2LTEzLjAxIDcxLjk1LTQ5LjUzNy00My40LTc1LjM2MiA4Mi42NyAyNSAzMi4yNTItODEuMDIiLz48cGF0aCBkPSJNODkzLjgzNCA4ODMuNzc2YzI3Ljk3OCA5Ljc4NSA1Ny4wNyAxNi40NTIgODUuNDUxIDIwLjY3OCA0Mi4zODUgNi4zMSA2Mi4zOTcgNS4zIDYyLjM5NyA1LjNsNjIuNzU4LjEzMi0uMDgyLTEzOS4zOTIgMjE3LjU4Ny0uMjQzLjA2MiAzNTcuMzktMjkzLjcxOC4wNzdjLTM5LjA0Ni4wMS0xMTguMDk5LTkuNzI3LTE4Ny4wNDItMzEuMTA3LTQ1Ljg2Ny0xNC4yMjQtOTIuNjUzLTM0LjI2LTEzMy41OTItNTguMjg0bC01Ljg0NiAzLjI2NGMtMjMuNzczIDEzLjYxLTYwLjczIDMxLjczMi0xMDQuNTgyIDQ3LjAwNy0zMS44MTUgMTEuMDgyLTY2LjkyNCAyMC45MTYtOTQuOTU2IDI2LjAwMy01Mi40NTMgOS41MTctOTYuODYgMTMuMDk1LTExNy42MSAxMy4xMjVsLTI5MS40NC40MjUtLjAzNy0zNTguMDY2IDIxNy41MS4xNmMuMTMyIDM5LjY0LjI1MiAxMzcuOTE1LjM4MyAxMzguNjhsNTcuOTA1LS4wODRjNDcuNTg0LS4wNyAxMDMuMzA1LTguNzM4IDEzOC42MTItMjAuNDEzbDIxLjQ1LTcuMDI0Yy02MS43MzEtODYuNjI5LTkzLjg3My0xNzQuNDgzLTk0Ljg0MS0yODEuNDIzLS40MS00NS4yMTggNy4yODYtOTYuNjA5IDIyLjYzOC0xNDMuMjYyIDIwLjY4Mi02Mi44NDcgNTMuNDg4LTExNS41MTggNzIuMTgtMTM5LjM4NWwtMjMuOTEtOC4xODRjLTU4LjIyLTE3LjEwMy0xMTEuMzYyLTIwLjgxOC0xMzcuODE0LTIwLjcwOGwtNTYuNTE1LjIzNi4xOTggMzU2LjIxMi0yMTcuODMuODc0LjA0NC01NzUuMTk5IDI3OC42MzEtLjQyYzEwNy40MzcuNTY1IDE5NC42NSAyOC4xOCAyNDUuOTM2IDQ2LjY0MiAzNy44NTUgMTMuNjI2IDczLjg1NiAzNC42NTggODkuNzAzIDQzLjYxNiAyMS4zODItMTIuMzg4IDUxLjA3LTI2LjU5MyA3NS4wOTctMzYuODIgOTMuNzgyLTM5LjkyIDE5MS4zNTEtNTMuMDA2IDI2OS4yMTYtNTIuOTk3bDI3MC40MjcuMDMxLS4xMTYgMzE5LjQ4My0yMTcuNzQ1LjA0Ni0uMTA3LTEwMS41NC00Ni43NDQtLjIxM2MtNDcuNzA2LS4yMTYtOTAuMjQgNy41LTEwOC40NzEgMTEuMDY0LTIwLjI5OCAzLjk3LTU0LjIyIDEzLjk1My02Mi45ODUgMTguMDczbDEuNDQ0IDEuNTU5YzY1LjkxIDg3LjExNyA5Mi4wNTIgMTkxLjY3OCA5My41ODcgMjc4LjM3MyAxLjMgMzYuNzU2LTYuMTU5IDgzLjIzMy0xNi40OTEgMTIzLjQ0NS0xOS4xNDQgNzQuNS01OC42MzQgMTM1LjA1My03NC45MzUgMTU1Ljc4MWwtMy40MzMgNC4yMzd6TTcwNC41MTQgNDQ3Yy0xMy4zMDYgMTYuMzM1LTI5Ljg1NiA0My42MjEtNDMuNDQgODcuNDE4LTEwLjQ5OSAzMy44NTQtMTAuMjE5IDY0Ljg1LTYuNTA0IDk4LjgxNi4yNjkgNy43NzEgNC43NjQgMzEuMDk0IDE0LjkxNiA1NS45OTQgOC44MzkgMjEuNjgyIDIyLjUyMSA0NC4zNDYgMzQuMzYgNjEuNzAybDQgNC42OTRjMzMuMTQ1LTQ0Ljk1MSA1MC40My04OC43MzIgNTQuOTUxLTE0Mi4xNDMuMzU5LTEyLjI0Ny0uMDg1LTI1LjIwNi0uOTU4LTM0Ljk3OS0xLjAwMS0xMS4yMS0yLjU2Ny0xOC44ODItNC4xMzQtMjcuNDgzLTMuMjEyLTE3LjYzNC04LjI5OS0zNi41MTgtMTkuNDQ3LTU5LjA5MS0xNS4yNTQtMzAuODktMzAuMzM0LTQ4Ljk2LTMxLjAxNS00OS42OSIvPjwvc3ZnPg==",
  alt: "DCShoes",
};

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
  links,
  leftMsg,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };

  const mockLinks = ["Duvidas e SAC", "Nossas Lojas", "ENTRE / CADASTRE-SE"];
  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
        >
          <div class="bg-base-100 fixed w-full z-50">
            {/* <Alert alerts={alerts} /> */}
            <UpperNavbar
              links={mockLinks}
              leftMsg="Frete Grátis nas compras acima de R$ 199,90"
            />
            <Navbar items={navItems} searchbar={searchbar} logo={mockLogo} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
