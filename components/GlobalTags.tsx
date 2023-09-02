import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      <link
        rel="preload"
        type="text/css"
        href={asset("/static/fonts/Helvetica-Neue-LT-Std-Roman.woff2")}
      />
      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <style>
        {`
            @font-face {
              font-family: '';
              src: url(${
          asset("/static/fonts/Helvetica-Neue-LT-Std-Roman.woff2")
        })
              format('woff2'),
              font-weight: bold,
              font-style: normal;
            }
          `}
      </style>
      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
