import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createTheme, ColorSchemeScript, MantineProvider, useMantineColorScheme, useComputedColorScheme, ActionIcon, Box, Container, Stack, Text, Anchor, Button, Flex, Title, Mark, Image, Modal, Fieldset, TextInput, CloseButton, ColorInput, Select, NumberInput, FileInput, SimpleGrid, UnstyledButton, Paper, Center, Divider, Skeleton, Accordion, ScrollArea, LoadingOverlay, ThemeIcon } from "@mantine/core";
import { Toaster, toast } from "sonner";
import { SunLight, HalfMoon, Github, Check, MediaImageFolder, ArrowLeftTag, Download, AlignBottomBox, Text as Text$1, MediaImage, Restart, ArrowRightTag } from "iconoir-react";
import { useEffect, useState, useRef, lazy } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import classnames from "classnames";
import * as patterns from "hero-patterns";
import fs from "file-saver";
import * as htmlToImage from "html-to-image";
import { createCookie } from "@remix-run/cloudflare";
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
    {
      signal: controller.signal,
      onError(error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
        responseStatusCode = 500;
      }
    }
  );
  body.allReady.then(() => clearTimeout(timeoutId));
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const sonnerStyles = "/assets/styles-CnXtE4LB.css";
const ToastProvider = () => {
  return /* @__PURE__ */ jsx(Toaster, { closeButton: true, position: "top-center" });
};
const links = () => [
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
    sizes: "180x180"
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-32x32.png",
    sizes: "32x32"
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-16x16.png",
    sizes: "16x16"
  },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "stylesheet", href: sonnerStyles }
];
const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  primaryColor: "indigo",
  primaryShade: 7,
  components: {
    InputLabel: {
      defaultProps: {
        mb: 2
      }
    },
    Fieldset: {
      defaultProps: {
        variant: "unstyled"
      },
      styles: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "var(--mantine-spacing-md)"
        },
        legend: {
          fontSize: "var(--mantine-font-size-lg)",
          fontWeight: 500,
          opacity: 0.6
        }
      }
    },
    InputDescription: {
      defaultProps: {
        mb: 8
      }
    },
    Text: {
      defaultProps: {
        c: "var(--mantine-color-text)"
      }
    },
    Title: {
      defaultProps: {
        c: "var(--mantine-color-text)"
      }
    },
    Button: {
      defaultProps: {
        radius: "md"
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: "md"
      }
    },
    Select: {
      defaultProps: {
        radius: "md",
        size: "md"
      }
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        size: "md"
      }
    },
    ColorInput: {
      defaultProps: {
        radius: "md",
        size: "md"
      }
    },
    ScrollArea: {
      defaultProps: {
        scrollbarSize: 10
      }
    },
    NumberInput: {
      defaultProps: {
        size: "md"
      }
    },
    FileInput: {
      defaultProps: {
        size: "md"
      }
    },
    SegmentedControl: {
      defaultProps: {
        radius: "md"
      }
    }
  },
  defaultRadius: "md"
});
function Layout({ children }) {
  const isProd = process.env.NODE_ENV === "production";
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      isProd ? /* @__PURE__ */ jsx("script", { defer: true, "data-domain": "cvrsnap.com", "data-api": "/anl/event", src: "/anl/script.js" }) : null,
      /* @__PURE__ */ jsx(ColorSchemeScript, { defaultColorScheme: "dark" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(MantineProvider, { theme, children }),
      /* @__PURE__ */ jsx(ToastProvider, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = () => {
  const content = `
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>https://cvrsnap.com/</loc>
	<lastmod>2025-01-21T17:28:53+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://cvrsnap.com/create</loc>
	<lastmod>2025-01-21T17:28:53+01:00</lastmod>
	<priority>1.0</priority>
</url>
</urlset>
   `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8"
    }
  });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = () => {
  const robotText = `
     User-agent: Googlebot
     Disallow: /nogooglebot/
 
     User-agent: *
     Allow: /
 
     Sitemap: http://www.taco-it.com/sitemap.xml
     `;
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const GITHUB_URL = "https://github.com/kieran6roberts/CoverSnap";
const DOMAIN = "cvrsnap.com";
const SITE_NAME = "CvrSnap";
const CREATE_ROUTE = "/create";
const SITE_THEMES = {
  light: "light",
  dark: "dark"
};
function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(SITE_THEMES.light, { getInitialValueInEffect: true });
  return /* @__PURE__ */ jsxs(
    ActionIcon,
    {
      onClick: () => setColorScheme(computedColorScheme === SITE_THEMES.light ? SITE_THEMES.dark : SITE_THEMES.light),
      variant: "default",
      size: 36,
      "aria-label": "Toggle color scheme",
      children: [
        /* @__PURE__ */ jsx(Box, { darkHidden: true, children: /* @__PURE__ */ jsx(SunLight, { width: 16, height: 16, color: "var(--mantine-color-text)" }) }),
        /* @__PURE__ */ jsx(Box, { lightHidden: true, children: /* @__PURE__ */ jsx(HalfMoon, { width: 16, height: 16, color: "var(--mantine-color-text)" }) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsx(Box, { component: "footer", w: "100%", py: "xl", children: /* @__PURE__ */ jsx(Container, { size: "xl", children: /* @__PURE__ */ jsx(Stack, { gap: "xs", justify: "center", align: "center", children: /* @__PURE__ */ jsxs(Text, { ta: "center", size: "sm", children: [
    SITE_NAME,
    " on",
    " ",
    /* @__PURE__ */ jsx(Anchor, { href: GITHUB_URL, underline: "always", target: "_blank", children: "GitHub" })
  ] }) }) }) });
}
function GitHubStarButton({
  size = "md",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, { component: Link, target: "_blank", to: GITHUB_URL, size, ...props, children: /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "xs", children: [
    /* @__PURE__ */ jsx(Github, { width: 20 }),
    " GitHub"
  ] }) });
}
const editorLight = "/assets/editor-light-BHSUlEjz.webp";
const editorDark = "/assets/editor-dark-DsGe0b8_.webp";
const meta$1 = () => {
  const title = `${SITE_NAME} - Get your free blog post cover images.`;
  const description = `${SITE_NAME} empowers you to create great looking cover images for your blog posts in seconds, skipping the design hassle. It's completely free to download as many images as you like.`;
  const image = editorDark;
  const url = `https://${DOMAIN}`;
  const domain = DOMAIN;
  return [
    { title },
    {
      name: "description",
      content: description
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: image
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:site_name",
      content: domain
    },
    {
      property: "twitter:card",
      content: "summary_large_image"
    },
    {
      property: "twitter:creator",
      content: "@Kieran6Dev"
    },
    {
      property: "twitter:title",
      content: title
    },
    {
      property: "twitter:description",
      content: description
    },
    {
      property: "twitter:image",
      content: image
    },
    {
      property: "twitter:url",
      content: url
    },
    {
      property: "twitter:domain",
      content: domain
    }
  ];
};
const heroImages = {
  light: editorLight,
  dark: editorDark
};
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { component: "header", w: "100%", py: "md", children: /* @__PURE__ */ jsx(Container, { size: "lg", children: /* @__PURE__ */ jsxs(Flex, { component: "nav", justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsx(Anchor, { size: "sm", fz: { base: "1.3rem", sm: "1.5rem" }, fw: 500, variant: "text", component: Link, to: "/", children: SITE_NAME }),
      /* @__PURE__ */ jsx(ThemeToggle, {})
    ] }) }) }),
    /* @__PURE__ */ jsx(Container, { component: "main", size: "xl", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: "xl", align: "center", mt: { base: 80, sm: 100 }, children: [
      /* @__PURE__ */ jsxs(Stack, { justify: "center", gap: "xs", children: [
        /* @__PURE__ */ jsxs(
          Title,
          {
            ta: "center",
            fz: { base: "2.4rem", sm: "4.5rem" },
            style: { lineHeight: "1", zIndex: 1 },
            fw: 700,
            "aria-label": SITE_NAME,
            maw: { base: 500, sm: 700 },
            mx: "auto",
            children: [
              "Publish blog posts",
              " ",
              /* @__PURE__ */ jsx(Mark, { fz: "0.95em", style: { zIndex: -1 }, children: "faster" }),
              " ",
              "without cover image design hassle"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Text, { c: "dimmed", fz: { base: "md", sm: "lg" }, ta: "center", maw: 580, mx: "auto", mt: "md", children: [
          SITE_NAME,
          " empowers you to create great looking cover images for your blog posts in seconds using easy to use editing tools. No design skills required and it's completely free to download your image."
        ] }),
        /* @__PURE__ */ jsxs(Flex, { direction: { base: "column", sm: "row" }, justify: "center", align: "center", gap: "md", mt: "xl", children: [
          /* @__PURE__ */ jsx(Button, { hiddenFrom: "sm", component: Link, to: "/create", size: "lg", variant: "filled", children: "Build for free" }),
          /* @__PURE__ */ jsx(Button, { visibleFrom: "sm", component: Link, to: "/create", size: "lg", variant: "filled", children: "Build for free" }),
          /* @__PURE__ */ jsx(GitHubStarButton, { hiddenFrom: "sm", size: "md", variant: "outline" }),
          /* @__PURE__ */ jsx(GitHubStarButton, { visibleFrom: "sm", size: "md", variant: "outline" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Box,
        {
          style: {
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: "var(--mantine-radius-md)",
            boxShadow: "var(--mantine-shadow-sm)",
            maxWidth: "1200px",
            maxHeight: "700px",
            width: "100%",
            height: "100%"
          },
          mt: "xl",
          mb: { base: 50, sm: 100 },
          children: [
            /* @__PURE__ */ jsx(
              Image,
              {
                lightHidden: true,
                src: heroImages["dark"],
                alt: `${SITE_NAME} create page screenshot`,
                radius: "md",
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx(
              Image,
              {
                darkHidden: true,
                src: heroImages["light"],
                alt: `${SITE_NAME} create page screenshot`,
                radius: "md",
                loading: "eager"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const welcomeImage = "/assets/welcome-DB1tdOSb.webp";
function WelcomeModal() {
  const fetcher = useFetcher();
  const { hasVisited } = useLoaderData();
  const hasVisitedEditor = fetcher.formData ? fetcher.formData.get("hasVisited") === "true" : hasVisited;
  const handleClose = () => {
    fetcher.submit({ hasVisited: "true", intent: "updateHasVisited" }, { method: "post" });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: !hasVisitedEditor && /* @__PURE__ */ jsx(
    Modal,
    {
      centered: true,
      opened: !hasVisitedEditor,
      onClose: handleClose,
      fz: "xl",
      title: /* @__PURE__ */ jsx(Text, { size: "xl", fw: 500, children: "Hey 👋" }),
      size: "md",
      children: /* @__PURE__ */ jsxs(Stack, { children: [
        /* @__PURE__ */ jsx(Image, { src: welcomeImage, radius: "md", alt: `Welcome to ${SITE_NAME} cover`, width: 400, height: 200 }),
        /* @__PURE__ */ jsx(Text, { children: "Use the editing sidebar to adjust your content, layout, background and more. Several new templates are coming soon." }),
        /* @__PURE__ */ jsx(Text, { children: "When you are done, select your preferred download size and hit the download button. Enjoy!" }),
        /* @__PURE__ */ jsx(Button, { variant: "filled", fullWidth: true, "data-autofocus": true, onClick: handleClose, children: "Start editing" })
      ] })
    }
  ) });
}
function MobileGithubButton() {
  return /* @__PURE__ */ jsx(ActionIcon, { "aria-label": `${SITE_NAME} GitHub repo`, hiddenFrom: "md", variant: "outline", size: "lg", children: /* @__PURE__ */ jsx(Github, {}) });
}
const sidebar = "_sidebar_cxuen_1";
const accordionControl = "_accordionControl_cxuen_13";
const mobileFooter = "_mobileFooter_cxuen_36";
const classes$3 = {
  sidebar,
  accordionControl,
  mobileFooter
};
const updateCSSVariables = (variables) => {
  const root = document.documentElement;
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
const previewContainer = "_previewContainer_ajiey_12";
const previewBar = "_previewBar_ajiey_74";
const previewSection = "_previewSection_ajiey_109";
const classes$2 = {
  previewContainer,
  "previewContainer--centered": "_previewContainer--centered_ajiey_38",
  "previewContainer--centered-row": "_previewContainer--centered-row_ajiey_44",
  "previewContainer--end": "_previewContainer--end_ajiey_50",
  "previewContainer--top": "_previewContainer--top_ajiey_56",
  "previewContainer--left": "_previewContainer--left_ajiey_62",
  "previewContainer--right": "_previewContainer--right_ajiey_68",
  previewBar,
  "previewBar--wide": "_previewBar--wide_ajiey_79",
  "previewBar--narrow": "_previewBar--narrow_ajiey_84",
  "previewBar--thick": "_previewBar--thick_ajiey_90",
  "previewBar--bottom-right": "_previewBar--bottom-right_ajiey_95",
  "previewBar--bottom-left": "_previewBar--bottom-left_ajiey_101",
  previewSection,
  "previewSection--diagonal-left": "_previewSection--diagonal-left_ajiey_115",
  "previewSection--vertical-left": "_previewSection--vertical-left_ajiey_120",
  "previewSection--solid": "_previewSection--solid_ajiey_125",
  "previewSection--diagonal-left-reverse": "_previewSection--diagonal-left-reverse_ajiey_141",
  "previewSection--horizontal-top": "_previewSection--horizontal-top_ajiey_147"
};
const LAYOUT_TEMPLATES = [
  {
    id: "hero",
    name: "Hero",
    styles: {
      "--cover-flex-direction": "column",
      "--cover-align-items": "center",
      "--cover-primary-text-align": "center",
      "--cover-secondary-position": "relative",
      "--cover-secondary-text-align": "center",
      "--cover-secondary-bottom": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-left": "unset"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--centered"])
    },
    preview: ({ children }) => children
  },
  {
    id: "left-handed",
    name: "Left Handed",
    styles: {
      "--cover-flex-direction": "column",
      "--cover-align-items": "flex-start",
      "--cover-primary-text-align": "left",
      "--cover-secondary-position": "relative",
      "--cover-secondary-bottom": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-left": "unset",
      "--cover-secondary-text-align": "left"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--left"])
    },
    preview: ({ children }) => children
  },
  {
    id: "right-handed",
    name: "Right Handed",
    styles: {
      "--cover-flex-direction": "column",
      "--cover-align-items": "flex-end",
      "--cover-primary-text-align": "right",
      "--cover-secondary-position": "relative",
      "--cover-secondary-bottom": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-left": "unset",
      "--cover-secondary-text-align": "right"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--right"])
    },
    preview: ({ children }) => children
  },
  {
    id: "right-footed",
    name: "Right Footed",
    styles: {
      "--cover-flex-direction": "column",
      "--cover-align-items": "center",
      "--cover-primary-text-align": "center",
      "--cover-secondary-position": "absolute",
      "--cover-secondary-bottom": "1rem",
      "--cover-secondary-right": "1rem",
      "--cover-secondary-left": "unset",
      "--cover-secondary-text-align": "right"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--centered"]),
      primaryText: classnames(classes$2["previewBar--wide"]),
      secondaryText: classnames(classes$2["previewBar--bottom-right"])
    },
    preview: ({ children }) => children
  },
  {
    id: "left-footed",
    name: "Left Footed",
    styles: {
      "--cover-flex-direction": "column",
      "--cover-align-items": "center",
      "--cover-primary-text-align": "center",
      "--cover-secondary-position": "absolute",
      "--cover-secondary-bottom": "1rem",
      "--cover-secondary-left": "1rem",
      "--cover-secondary-right": "unset",
      "--cover-secondary-text-align": "left"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--centered"]),
      primaryText: classnames(classes$2["previewBar--wide"]),
      secondaryText: classnames(classes$2["previewBar--bottom-left"])
    },
    preview: ({ children }) => children
  },
  {
    id: "high-life",
    name: "The High Life",
    styles: {
      "--cover-align-items": "flex-start",
      "--cover-flex-direction": "row",
      "--cover-primary-text-align": "left",
      "--cover-secondary-position": "static",
      "--cover-secondary-top": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-text-align": "right"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--top"]),
      primaryText: classnames(classes$2["previewBar--thick"])
    },
    preview: ({ children }) => children
  },
  {
    id: "row-your-boat",
    name: "Row Your Boat",
    styles: {
      "--cover-align-items": "center",
      "--cover-flex-direction": "row",
      "--cover-primary-text-align": "left",
      "--cover-secondary-position": "static",
      "--cover-secondary-top": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-text-align": "right"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--centered-row"]),
      primaryText: classnames(classes$2["previewBar--thick"])
    },
    preview: ({ children }) => children
  },
  {
    id: "the-deep",
    name: "The Deep",
    styles: {
      "--cover-align-items": "flex-end",
      "--cover-flex-direction": "row",
      "--cover-primary-text-align": "left",
      "--cover-secondary-position": "static",
      "--cover-secondary-top": "unset",
      "--cover-secondary-right": "unset",
      "--cover-secondary-text-align": "right"
    },
    previewStyles: {
      cover: classnames(classes$2["previewContainer--end"]),
      primaryText: classnames(classes$2["previewBar--thick"])
    },
    preview: ({ children }) => children
  }
];
const BACKGROUND_TEMPLATES = [
  {
    id: "diagonal",
    name: "Diagonal Split",
    sections: [
      {
        clipPath: "var(--clip-path-diagonal-split-1)"
      },
      {
        clipPath: "var(--clip-path-diagonal-split-2)"
      }
    ],
    previewStyles: classes$2["previewSection--diagonal-left"],
    preview: ({ children }) => children
  },
  {
    id: "diagonal-reverse",
    name: "Diagonal Split (Reverse)",
    sections: [
      {
        clipPath: "var(--clip-path-diagonal-split-reverse-1)"
      },
      {
        clipPath: "var(--clip-path-diagonal-split-reverse-2)"
      }
    ],
    previewStyles: classes$2["previewSection--diagonal-left-reverse"],
    preview: ({ children }) => children
  },
  {
    id: "solid",
    name: "Solid",
    previewStyles: classes$2["previewSection--solid"],
    preview: ({ children }) => children
  },
  {
    id: "horizontal",
    name: "Horizontal Split",
    sections: [
      {
        clipPath: "var(--clip-path-horizontal-split-1)"
      },
      {
        clipPath: "var(--clip-path-horizontal-split-2)"
      }
    ],
    previewStyles: classes$2["previewSection--horizontal-top"],
    preview: ({ children }) => children
  },
  {
    id: "vertical",
    name: "Vertical Split",
    sections: [
      {
        clipPath: "var(--clip-path-vertical-split-1)"
      },
      {
        clipPath: "var(--clip-path-vertical-split-2)"
      }
    ],
    previewStyles: classes$2["previewSection--vertical-left"],
    preview: ({ children }) => children
  }
];
const PRIMARY_TEXT_LENGTH = 100;
const SECONDARY_TEXT_LENGTH = 80;
const PRIMARY_TEXT_FONT_SIZE_MIN = 10;
const PRIMARY_TEXT_FONT_SIZE_MAX = 60;
const SECONDARY_TEXT_FONT_SIZE_MIN = 10;
const SECONDARY_TEXT_FONT_SIZE_MAX = 40;
const fonts = [
  "Arial",
  "Helvetica",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Courier New"
];
const DEFAULT_PRIMARY_TEXT_CONTENT = "Tutorial: Implement a Scroll-Translated, Dynamic Sticky Navbar in React.";
const DEFAULT_SECONDARY_TEXT_CONTENT = "by Kieran Roberts";
const DEFAULT_PRIMARY_TEXT_COLOR = "rgba(255, 255, 255, 1)";
const DEFAULT_SECONDARY_TEXT_COLOR = "rgba(255, 255, 255, 1)";
const DEFAULT_PRIMARY_TEXT_FONT = fonts[0];
const DEFAULT_SECONDARY_TEXT_FONT = fonts[0];
const DEFAULT_PRIMARY_TEXT_FONT_SIZE = 38;
const DEFAULT_SECONDARY_TEXT_FONT_SIZE = 28;
const DEFAULT_PATTERN_COLOR = "#ffffff";
const DEFAULT_PATTERN_OPACITY = 0.1;
const DEFAULT_PATTERN = {
  url: patterns.architect(DEFAULT_PATTERN_COLOR, DEFAULT_PATTERN_OPACITY),
  name: "architect",
  color: DEFAULT_PATTERN_COLOR,
  opacity: DEFAULT_PATTERN_OPACITY
};
const DEFAULT_EDITOR_STATE = {
  template: {
    layoutId: LAYOUT_TEMPLATES[0].id,
    backgroundId: BACKGROUND_TEMPLATES[0].id
  },
  primaryText: {
    content: DEFAULT_PRIMARY_TEXT_CONTENT,
    color: DEFAULT_PRIMARY_TEXT_COLOR,
    fontSize: DEFAULT_PRIMARY_TEXT_FONT_SIZE,
    font: DEFAULT_PRIMARY_TEXT_FONT
  },
  secondaryText: {
    content: DEFAULT_SECONDARY_TEXT_CONTENT,
    color: DEFAULT_SECONDARY_TEXT_COLOR,
    fontSize: DEFAULT_SECONDARY_TEXT_FONT_SIZE,
    font: DEFAULT_SECONDARY_TEXT_FONT
  },
  background: {
    image: null,
    colors: {
      color1: "rgba(81, 133, 196, 1)",
      color2: "rgba(51, 51, 51, 1)"
    },
    pattern: DEFAULT_PATTERN
  },
  cover: {
    id: "hashnode",
    width: 1600,
    height: 840,
    aspectRatio: 1.9
  }
};
const IMAGE_DOWNLOAD_SIZES = {
  hashnode: {
    label: "(Hashnode)",
    value: "hashnode:1.9:1600x840",
    width: 1600,
    height: 840,
    aspectRatio: 1.9
  },
  devto: {
    label: "(Dev)",
    value: "dev:2.38:1000x420",
    width: 1e3,
    height: 420,
    aspectRatio: 2.38
  },
  mediumRegular: {
    label: "(Medium: standard)",
    value: "medium-regular:2:1500x750",
    width: 1500,
    height: 750,
    aspectRatio: 2
  },
  mediumLarge: {
    label: "(Medium: large)",
    value: "medium-large:2:2500x1250",
    width: 2500,
    height: 1250,
    aspectRatio: 2
  }
};
const PREVIEW_VARIABLE_NAMES = {
  primaryText: {
    color: "--cover-primary-text-color",
    fontSize: "--cover-primary-text-font-size",
    font: "--cover-primary-text-font",
    align: "--cover-primary-text-align"
  },
  secondaryText: {
    color: "--cover-secondary-text-color",
    fontSize: "--cover-secondary-text-font-size",
    font: "--cover-secondary-text-font",
    align: "--cover-secondary-text-align",
    bottom: "--cover-secondary-bottom",
    right: "--cover-secondary-right",
    left: "--cover-secondary-left",
    position: "--cover-secondary-position"
  },
  background: {
    color1: "--cover-background-color-1",
    color2: "--cover-background-color-2",
    opacity: "--cover-color-overlay-opacity"
  },
  cover: {
    aspectRatio: "--cover-aspect-ratio",
    display: "--cover-display",
    justifyContent: "--cover-justify-content",
    alignItems: "--cover-align-items",
    flexDirection: "--cover-flex-direction"
  }
};
const defaultState = DEFAULT_EDITOR_STATE;
const indexDBStorage = {
  getItem: async (name) => {
    return await get(name) ?? null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  }
};
const useEditor = create(
  persist(
    (set2) => ({
      _hasHydrated: false,
      ...defaultState,
      setHasHydrated: (state) => set2({ _hasHydrated: state }),
      updatePrimaryText: (updates) => {
        set2((state) => {
          return {
            primaryText: { ...state.primaryText, ...updates }
          };
        });
        const cssUpdates = {};
        if (updates.color) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.color] = updates.color;
        }
        if (updates.fontSize) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.fontSize] = `${updates.fontSize}px`;
        }
        if (updates.font) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.font] = updates.font;
        }
        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },
      updateSecondaryText: (updates) => {
        set2((state) => {
          return {
            secondaryText: { ...state.secondaryText, ...updates }
          };
        });
        const cssUpdates = {};
        if (updates.color) {
          cssUpdates["--cover-secondary-text-color"] = updates.color;
        }
        if (updates.fontSize) {
          cssUpdates["--cover-secondary-text-font-size"] = `${updates.fontSize}px`;
        }
        if (updates.font) {
          cssUpdates["--cover-secondary-text-font"] = updates.font;
        }
        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },
      updateBackground: (updates) => {
        set2((state) => {
          var _a, _b, _c, _d;
          const newState = {
            background: { ...state.background, ...updates }
          };
          if (updates.image) {
            newState.background.pattern = {
              name: null,
              url: null,
              color: state.background.pattern.color,
              opacity: state.background.pattern.opacity
            };
          }
          const cssUpdates = {};
          if ((_a = updates.colors) == null ? void 0 : _a.color1) {
            cssUpdates["--cover-background-color-1"] = (_b = updates.colors) == null ? void 0 : _b.color1;
          }
          if ((_c = updates.colors) == null ? void 0 : _c.color2) {
            cssUpdates["--cover-background-color-2"] = (_d = updates.colors) == null ? void 0 : _d.color2;
          }
          if (Object.keys(cssUpdates).length > 0) {
            updateCSSVariables(cssUpdates);
          }
          return newState;
        });
      },
      updateCover: (updates) => {
        set2((state) => {
          return {
            cover: { ...state.cover, ...updates }
          };
        });
        updateCSSVariables({ "--cover-aspect-ratio": `${updates.aspectRatio}` });
      },
      updateTemplate: (updates) => {
        const state = useEditor.getState();
        const newState = { ...state };
        if (updates.backgroundId) {
          newState.template.backgroundId = updates.backgroundId;
        }
        if (updates.layoutId) {
          const layoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === updates.layoutId);
          newState.template.layoutId = updates.layoutId;
          updateCSSVariables({
            ...(layoutTemplate == null ? void 0 : layoutTemplate.styles) || {}
          });
        }
        set2(newState);
      },
      resetEditor: async () => {
        var _a, _b, _c;
        const state = useEditor.getState();
        if ((_a = state.background.image) == null ? void 0 : _a.startsWith("blob:")) {
          URL.revokeObjectURL(state.background.image);
        }
        const defaultLayoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === DEFAULT_EDITOR_STATE.template.layoutId);
        updateCSSVariables({
          ...defaultLayoutTemplate == null ? void 0 : defaultLayoutTemplate.styles,
          /* Cover Wrapper */
          "--cover-display": "flex",
          "--cover-justify-content": "center",
          "--cover-align-items": "center",
          "--cover-flex-direction": "column",
          /* Cover Primary Text */
          "--cover-primary-text-color": DEFAULT_EDITOR_STATE.primaryText.color,
          "--cover-primary-text-font-size": `${DEFAULT_EDITOR_STATE.primaryText.fontSize}px`,
          "--cover-primary-text-font": DEFAULT_EDITOR_STATE.primaryText.font,
          "--cover-primary-text-align": "center",
          /* Cover Secondary Text */
          "--cover-secondary-text-color": DEFAULT_EDITOR_STATE.secondaryText.color,
          "--cover-secondary-text-font-size": `${DEFAULT_EDITOR_STATE.secondaryText.fontSize}px`,
          "--cover-secondary-text-font": DEFAULT_EDITOR_STATE.secondaryText.font,
          "--cover-secondary-text-align": "center",
          "--cover-secondary-bottom": "unset",
          "--cover-secondary-right": "unset",
          "--cover-secondary-left": "unset",
          "--cover-secondary-position": "relative",
          /* Cover Background */
          "--cover-color-overlay-opacity": "0%",
          "--cover-background-color-1": (_b = DEFAULT_EDITOR_STATE.background.colors) == null ? void 0 : _b.color1,
          "--cover-background-color-2": (_c = DEFAULT_EDITOR_STATE.background.colors) == null ? void 0 : _c.color2,
          /* Cover Aspect Ratio */
          "--cover-aspect-ratio": `${(DEFAULT_EDITOR_STATE.cover.width / DEFAULT_EDITOR_STATE.cover.height).toFixed(1)}`
        });
        await indexDBStorage.removeItem("editor-storage");
        set2(() => ({
          _hasHydrated: true,
          ...defaultState,
          template: {
            layoutId: LAYOUT_TEMPLATES[0].id,
            backgroundId: BACKGROUND_TEMPLATES[0].id
          }
        }));
        toast.success("Cover reset.", {
          id: "reset-cover",
          icon: /* @__PURE__ */ jsx(Check, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" })
        });
      }
    }),
    {
      name: "editor-storage",
      storage: createJSONStorage(() => indexDBStorage),
      // @ts-expect-error fix: todo
      partialize: (state) => ({
        template: state.template,
        primaryText: state.primaryText,
        secondaryText: state.secondaryText,
        background: {
          colors: state.background.colors,
          pattern: state.background.pattern
        },
        cover: state.cover
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          setTimeout(() => {
            toast.error("Failed to hydrate editor state. Please refresh the page.", {
              action: {
                label: "Refresh",
                onClick: () => window.location.reload()
              }
            });
          }, 0);
          return;
        } else if (state) {
          state.setHasHydrated(true);
        }
      }
    }
  )
);
function EditorHydration({ children, skeleton }) {
  const hasHydrated = useEditor((state) => state._hasHydrated);
  useEffect(() => {
    var _a, _b;
    if (hasHydrated) {
      const state = useEditor.getState();
      const layoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === state.template.layoutId);
      updateCSSVariables({
        /* Cover Primary Text */
        "--cover-primary-text-color": state.primaryText.color,
        "--cover-primary-text-font-size": `${state.primaryText.fontSize}px`,
        "--cover-primary-text-font": state.primaryText.font,
        /* Cover Secondary Text */
        "--cover-secondary-text-color": state.secondaryText.color,
        "--cover-secondary-text-font-size": `${state.secondaryText.fontSize}px`,
        "--cover-secondary-text-font": state.secondaryText.font,
        /* 
                  Cover Background (overlay)
        
                  Note: For now the image & bg opacity is not persisted.
                 */
        "--cover-background-color-1": ((_a = state.background.colors) == null ? void 0 : _a.color1) ?? "rgba(81, 133, 196, 1)",
        "--cover-background-color-2": ((_b = state.background.colors) == null ? void 0 : _b.color2) ?? "rgba(51, 51, 51, 1)",
        /*
        '--cover-align-items
        '--cover-primary-text-align
        '--cover-secondary-position
        '--cover-secondary-bottom
        '--cover-secondary-right
        '--cover-secondary-left
        '--cover-secondary-text-align
        */
        ...layoutTemplate == null ? void 0 : layoutTemplate.styles,
        /* Cover Aspect Ratio */
        "--cover-aspect-ratio": `${(state.cover.width / state.cover.height).toFixed(1)}`
      });
    }
  }, [hasHydrated]);
  if (!hasHydrated) {
    return skeleton ?? null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function TextSettings() {
  const {
    primaryText: {
      content: primaryText,
      color: primaryTextColor,
      font: primaryTextFont,
      fontSize: primaryTextFontSize
    },
    secondaryText: {
      content: secondaryText,
      color: secondaryTextColor,
      font: secondaryTextFont,
      fontSize: secondaryTextFontSize
    },
    updatePrimaryText,
    updateSecondaryText
  } = useEditor();
  const hasPrimaryText = primaryText.length > 0;
  const hasSecondaryText = secondaryText.length > 0;
  return /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxs(Fieldset, { legend: "Primary text", children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          value: primaryText,
          onChange: (e) => updatePrimaryText({ content: e.target.value }),
          placeholder: "HTTP Security Headers and how to...",
          error: primaryText.length > PRIMARY_TEXT_LENGTH ? `Maximum ${PRIMARY_TEXT_LENGTH} characters` : null,
          label: "Content",
          description: `Maximum ${PRIMARY_TEXT_LENGTH} characters`,
          rightSection: hasPrimaryText && /* @__PURE__ */ jsx(CloseButton, { size: "sm", variant: "subtle", onClick: () => updatePrimaryText({ content: "" }) }),
          maxLength: PRIMARY_TEXT_LENGTH
        }
      ),
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          format: "rgba",
          description: "Accepts RGBA",
          value: primaryTextColor,
          label: "Color",
          onChangeEnd: (value) => updatePrimaryText({ color: value })
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          "aria-label": "Content font",
          label: "Font",
          placeholder: "Pick value",
          data: fonts,
          value: primaryTextFont,
          onChange: (value) => updatePrimaryText({ font: value ?? void 0 }),
          allowDeselect: false,
          checkIconPosition: "right"
        }
      ),
      /* @__PURE__ */ jsx(
        NumberInput,
        {
          max: PRIMARY_TEXT_FONT_SIZE_MAX,
          min: PRIMARY_TEXT_FONT_SIZE_MIN,
          value: primaryTextFontSize,
          onChange: (value) => updatePrimaryText({ fontSize: value }),
          label: "Font size (px)",
          size: "md",
          suffix: "px",
          allowDecimal: false
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Fieldset, { legend: "Secondary text", mt: 24, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          value: secondaryText,
          onChange: (e) => updateSecondaryText({ content: e.target.value }),
          placeholder: "Let's dive into the world of...",
          label: "Content",
          description: `Maximum ${SECONDARY_TEXT_LENGTH} characters`,
          error: secondaryText.length > SECONDARY_TEXT_LENGTH ? `Maximum ${SECONDARY_TEXT_LENGTH} characters` : null,
          rightSection: hasSecondaryText && /* @__PURE__ */ jsx(CloseButton, { size: "sm", variant: "subtle", onClick: () => updateSecondaryText({ content: "" }) }),
          maxLength: SECONDARY_TEXT_LENGTH
        }
      ),
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          format: "rgba",
          label: "Color",
          description: "Accepts RGBA",
          value: secondaryTextColor,
          onChangeEnd: (value) => updateSecondaryText({ color: value })
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          "aria-label": "Content font",
          label: "Font",
          placeholder: "Pick value",
          data: fonts,
          value: secondaryTextFont,
          onChange: (value) => updateSecondaryText({ font: value ?? void 0 }),
          allowDeselect: false,
          checkIconPosition: "right"
        }
      ),
      /* @__PURE__ */ jsx(
        NumberInput,
        {
          value: secondaryTextFontSize,
          onChange: (value) => updateSecondaryText({ fontSize: value }),
          suffix: "px",
          max: SECONDARY_TEXT_FONT_SIZE_MAX,
          min: SECONDARY_TEXT_FONT_SIZE_MIN,
          label: "Font size (px)",
          size: "md",
          allowDecimal: false
        }
      )
    ] })
  ] });
}
const patternCard = "_patternCard_4w3kk_1";
const classes$1 = {
  patternCard,
  "patternCard-selected": "_patternCard-selected_4w3kk_19"
};
const decimalToPercentage = (decimal) => decimal * 100;
function BackgroundSettings() {
  const {
    template,
    background: { image: backgroundImage, colors: backgroundColors, pattern: backgroundPattern },
    updateBackground
  } = useEditor();
  const hasSplitTemplate = !!template.backgroundId;
  const onBackgroundImageChange = (file) => {
    if (backgroundImage == null ? void 0 : backgroundImage.startsWith("blob:")) {
      URL.revokeObjectURL(backgroundImage);
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateBackground({ image: imageUrl });
    } else {
      updateBackground({ image: null });
      updateCSSVariables({ "--cover-color-overlay-opacity": "0%" });
    }
  };
  const onPatternChange = (name) => {
    if (backgroundImage) {
      onBackgroundImageChange(null);
      updateCSSVariables({ "--cover-color-overlay-opacity": "0%" });
    }
    if (name === backgroundPattern.name) {
      updateBackground({
        pattern: {
          name: null,
          url: null,
          color: backgroundPattern.color,
          opacity: backgroundPattern.opacity
        }
      });
    } else {
      updateBackground({
        pattern: {
          name,
          url: patterns[name](backgroundPattern.color, backgroundPattern.opacity),
          color: backgroundPattern.color,
          opacity: backgroundPattern.opacity
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxs(Fieldset, { legend: "Colors", children: [
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          format: "rgba",
          label: "Background color 1",
          description: "Accepts RGBA",
          value: (backgroundColors == null ? void 0 : backgroundColors.color1) ?? "rgba(255, 255, 255, 1)",
          onChangeEnd: (value) => updateBackground({ colors: { ...backgroundColors, color1: value } })
        }
      ),
      hasSplitTemplate ? /* @__PURE__ */ jsx(
        ColorInput,
        {
          format: "rgba",
          label: "Background color 2",
          description: "Accepts RGBA",
          value: (backgroundColors == null ? void 0 : backgroundColors.color2) ?? "rgba(255, 255, 255, 1)",
          onChangeEnd: (value) => updateBackground({ colors: { ...backgroundColors, color2: value } })
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs(Fieldset, { legend: "Images", children: [
      backgroundImage ? /* @__PURE__ */ jsxs(Stack, { children: [
        /* @__PURE__ */ jsx(Text, { fw: 500, component: "span", children: "Upload background image" }),
        /* @__PURE__ */ jsx(
          Image,
          {
            src: backgroundImage,
            radius: "md",
            style: { border: "1px solid var(--mantine-color-default-border)" },
            alt: "Background image",
            width: 368,
            height: 200
          }
        ),
        /* @__PURE__ */ jsx(Button, { "aria-label": "Remove background image", onClick: () => onBackgroundImageChange(null), children: "Clear" })
      ] }) : /* @__PURE__ */ jsx(
        FileInput,
        {
          clearable: true,
          description: "Accepts PNG, JPEG, and WEBP",
          leftSection: /* @__PURE__ */ jsx(MediaImageFolder, { width: 16, height: 16 }),
          accept: "image/png,image/jpeg,image/webp",
          label: "Upload background image",
          placeholder: "Click to upload",
          maw: 368,
          onChange: onBackgroundImageChange
        }
      ),
      backgroundImage ? /* @__PURE__ */ jsx(
        NumberInput,
        {
          defaultValue: 0,
          max: 1,
          min: 0,
          step: 0.1,
          decimalScale: 1,
          onChange: (value) => {
            const percentage = value ? decimalToPercentage(Number(value)) : 0;
            updateCSSVariables({ "--cover-color-overlay-opacity": `${percentage}%` });
          },
          label: "Overlay opacity",
          allowNegative: false
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs(Fieldset, { legend: "Patterns", disabled: !!backgroundImage, children: [
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          disabled: !!backgroundImage,
          format: "hex",
          label: "Pattern color",
          description: "Accepts HEX",
          value: backgroundPattern.color,
          onChangeEnd: (color) => updateBackground({
            pattern: {
              ...backgroundPattern,
              url: backgroundPattern.name ? patterns[backgroundPattern.name](color, backgroundPattern.opacity) : null,
              color
            }
          })
        }
      ),
      /* @__PURE__ */ jsx(
        NumberInput,
        {
          disabled: !!backgroundImage,
          max: 1,
          min: 0,
          step: 0.1,
          value: backgroundPattern.opacity,
          onChange: (value) => updateBackground({
            pattern: {
              ...backgroundPattern,
              opacity: Number(value),
              url: backgroundPattern.name ? patterns[backgroundPattern.name](backgroundPattern.color, Number(value)) : null
            }
          }),
          label: "Pattern opacity",
          allowNegative: false
        }
      ),
      /* @__PURE__ */ jsx(SimpleGrid, { cols: { base: 1, xs: 3, md: 2 }, spacing: "sm", verticalSpacing: "xl", component: "section", children: Object.entries(patterns).map(([key, value]) => {
        const isSelected = backgroundPattern.name === key;
        return /* @__PURE__ */ jsxs(Stack, { gap: 4, component: "article", children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              component: "span",
              fw: 600,
              fz: { base: 18, sm: 14 },
              ta: "center",
              c: isSelected && !backgroundImage ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-dimmed)",
              style: {
                whiteSpace: "nowrap"
              },
              children: key
            }
          ),
          /* @__PURE__ */ jsx(
            UnstyledButton,
            {
              "aria-label": `Select ${key} background pattern`,
              onClick: () => onPatternChange(key),
              style: { cursor: !backgroundImage ? "pointer" : "not-allowed" },
              children: /* @__PURE__ */ jsx(
                Paper,
                {
                  radius: "md",
                  className: classes$1.patternCard,
                  style: {
                    backgroundImage: value(backgroundPattern.color, 1),
                    border: isSelected ? "1px solid var(--mantine-primary-color-light-color)" : "1px solid var(--mantine-color-default-border)"
                  },
                  children: isSelected && !backgroundImage && /* @__PURE__ */ jsx(Center, { className: classes$1["patternCard-selected"], children: /* @__PURE__ */ jsx(Center, { component: "span", w: 40, h: 40, bg: "white", style: { borderRadius: "100%" }, children: /* @__PURE__ */ jsx(Check, { width: 32, height: 32, color: "var(--mantine-color-blue-filled)" }) }) })
                }
              )
            }
          )
        ] }, key);
      }) })
    ] })
  ] });
}
const LayoutTemplatePreview = ({
  coverClasses,
  previewPrimaryBarClasses,
  previewSecondaryBarClasses,
  isSelected
}) => {
  return /* @__PURE__ */ jsxs(Paper, { radius: "md", className: classnames(classes$2.previewContainer, coverClasses), children: [
    /* @__PURE__ */ jsx("div", { className: classnames(classes$2.previewBar, classes$2["previewBar--wide"], previewPrimaryBarClasses) }),
    /* @__PURE__ */ jsx("div", { className: classnames(classes$2.previewBar, classes$2["previewBar--narrow"], previewSecondaryBarClasses) }),
    isSelected && /* @__PURE__ */ jsx(Center, { component: "span", pos: "absolute", inset: 0, bg: "rgba(0, 0, 0, 0.5)", children: /* @__PURE__ */ jsx(Center, { component: "span", w: 40, h: 40, bg: "white", style: { borderRadius: "100%" }, children: /* @__PURE__ */ jsx(Check, { width: 32, height: 32, color: "var(--mantine-color-blue-filled)" }) }) })
  ] });
};
const BackgroundTemplatePreview = ({ styles, isSelected }) => {
  return /* @__PURE__ */ jsxs(Paper, { radius: "md", className: classes$2.previewContainer, children: [
    /* @__PURE__ */ jsx("div", { className: classnames(classes$2.previewSection, styles) }),
    isSelected && /* @__PURE__ */ jsx(Center, { component: "span", pos: "absolute", inset: 0, bg: "rgba(0, 0, 0, 0.5)", children: /* @__PURE__ */ jsx(Center, { component: "span", w: 40, h: 40, bg: "white", style: { borderRadius: "100%" }, children: /* @__PURE__ */ jsx(Check, { width: 32, height: 32, color: "var(--mantine-color-blue-filled)" }) }) })
  ] });
};
function TemplateSettings() {
  const { template, updateTemplate } = useEditor();
  return /* @__PURE__ */ jsxs(Stack, { gap: 32, children: [
    /* @__PURE__ */ jsx(Fieldset, { legend: "Background split", children: /* @__PURE__ */ jsx(SimpleGrid, { cols: { base: 1, xs: 3, md: 2 }, spacing: "xs", verticalSpacing: "xl", component: "section", children: BACKGROUND_TEMPLATES.map((t) => {
      const isSelected = template.backgroundId === t.id;
      return /* @__PURE__ */ jsxs(Stack, { gap: 4, component: "article", children: [
        /* @__PURE__ */ jsx(
          Text,
          {
            component: "span",
            fw: 600,
            fz: { base: 18, sm: 14 },
            ta: "center",
            c: isSelected ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-dimmed)",
            children: t.name
          }
        ),
        /* @__PURE__ */ jsx(
          UnstyledButton,
          {
            pos: "relative",
            "aria-label": `Select ${t.name} template`,
            onClick: () => updateTemplate({ ...template, backgroundId: t.id }),
            children: t.preview({
              children: /* @__PURE__ */ jsx(BackgroundTemplatePreview, { styles: t.previewStyles ?? "", isSelected })
            })
          }
        )
      ] }, t.id);
    }) }) }),
    /* @__PURE__ */ jsx(Fieldset, { legend: "Text layout", children: /* @__PURE__ */ jsx(SimpleGrid, { cols: { base: 1, xs: 3, md: 2 }, spacing: "xs", verticalSpacing: "xl", component: "section", children: LAYOUT_TEMPLATES.map((t) => {
      var _a, _b;
      const isSelected = template.layoutId === t.id;
      return /* @__PURE__ */ jsxs(Stack, { gap: 4, component: "article", children: [
        /* @__PURE__ */ jsx(
          Text,
          {
            component: "span",
            fw: 600,
            fz: { base: 18, sm: 14 },
            ta: "center",
            c: isSelected ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-dimmed)",
            children: t.name
          }
        ),
        /* @__PURE__ */ jsx(
          UnstyledButton,
          {
            pos: "relative",
            "aria-label": `Select ${t.name} template`,
            onClick: () => updateTemplate({ ...template, layoutId: t.id }),
            children: t.preview({
              children: /* @__PURE__ */ jsx(
                LayoutTemplatePreview,
                {
                  coverClasses: t.previewStyles.cover,
                  previewPrimaryBarClasses: ((_a = t.previewStyles) == null ? void 0 : _a.primaryText) ?? "",
                  previewSecondaryBarClasses: ((_b = t.previewStyles) == null ? void 0 : _b.secondaryText) ?? "",
                  isSelected
                }
              )
            })
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
async function getBlobFromDomNode(node, cover) {
  const TARGET_WIDTH = cover.width;
  const TARGET_HEIGHT = cover.height;
  const blob = await htmlToImage.toBlob(node, {
    quality: 1,
    pixelRatio: 1,
    canvasWidth: TARGET_WIDTH,
    canvasHeight: TARGET_HEIGHT,
    style: {
      margin: "0",
      border: "0",
      borderRadius: "0",
      transform: "scale(1)",
      transformOrigin: "top left"
    }
  });
  return blob;
}
const RETRY_ATTEMPTS = 3;
const errorMessages = {
  [
    "CONVERSION_FAILED"
    /* CONVERSION_FAILED */
  ]: "Failed to convert image. Please try again. Contact support if the issue persists.",
  [
    "SAVE_FAILED"
    /* SAVE_FAILED */
  ]: "Failed to save image, please try again. Contact support if the issue persists.",
  [
    "NODE_NOT_FOUND"
    /* NODE_NOT_FOUND */
  ]: "Image element not found. Please refresh the page and try again.",
  [
    "UNEXPECTED_ERROR"
    /* UNEXPECTED_ERROR */
  ]: "An unexpected error occurred. Please try again. Contact support if the issue persists."
};
class ImageDownloadError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "ImageDownloadError";
  }
}
const useImageDownload = ({ imageRef, cover }) => {
  const [visible, { open, close: closeSpinner }] = useDisclosure(false);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const retryCountRef = useRef(0);
  const downloadImage = async () => {
    open();
    try {
      retryCountRef.current += 1;
      if (!(imageRef == null ? void 0 : imageRef.current)) {
        throw new ImageDownloadError(
          errorMessages[
            "NODE_NOT_FOUND"
            /* NODE_NOT_FOUND */
          ],
          "NODE_NOT_FOUND"
          /* NODE_NOT_FOUND */
        );
      }
      const blob = await getBlobFromDomNode(imageRef.current, cover);
      if (!blob) {
        throw new ImageDownloadError(
          errorMessages[
            "CONVERSION_FAILED"
            /* CONVERSION_FAILED */
          ],
          "CONVERSION_FAILED"
          /* CONVERSION_FAILED */
        );
      }
      try {
        fs.saveAs(blob, "cvrsnap-cover.png");
      } catch {
        throw new ImageDownloadError(
          errorMessages[
            "SAVE_FAILED"
            /* SAVE_FAILED */
          ],
          "SAVE_FAILED"
          /* SAVE_FAILED */
        );
      }
      retryCountRef.current = 0;
      setIsSuccessModalOpen(true);
    } catch (error) {
      const canRetry = retryCountRef.current < RETRY_ATTEMPTS;
      const _error = error instanceof ImageDownloadError ? error : new ImageDownloadError(
        errorMessages[
          "UNEXPECTED_ERROR"
          /* UNEXPECTED_ERROR */
        ],
        "UNEXPECTED_ERROR"
        /* UNEXPECTED_ERROR */
      );
      const errorLabel = canRetry ? "Retry" : "Contact Support";
      const errorAction = canRetry ? () => downloadImage() : () => window.open("https://x.com/Kieran6Dev", "_blank");
      toast.error(_error.message, {
        action: {
          label: errorLabel,
          onClick: errorAction
        },
        duration: 15e3
      });
      if (!canRetry) {
        setIsDownloadDisabled(true);
      }
    } finally {
      setTimeout(() => {
        closeSpinner();
      }, 500);
    }
  };
  return {
    isLoading: visible,
    isSuccessModalOpen,
    closeSuccessModal: () => setIsSuccessModalOpen(false),
    downloadImage,
    isDownloadDisabled
  };
};
function DownloadSuccessModal({ close }) {
  useEffect(() => {
    setTimeout(() => {
      toast.success("Image downloaded successfully.", {
        icon: /* @__PURE__ */ jsx(Check, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }),
        id: "download-success"
      });
    }, 0);
  }, []);
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose: close, centered: true, title: `Thanks for using ${SITE_NAME}!`, children: /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsxs(Text, { mb: "md", children: [
      "If you have any feedback, please share it with me on X",
      " ",
      /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", "data-autofocus": true, href: "https://x.com/Kieran6Dev", children: "@Kieran6Dev" }),
      ", or raise an issue on",
      " ",
      /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", href: GITHUB_URL, children: "GitHub." })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { justify: "center", align: "center", gap: "md", children: [
      /* @__PURE__ */ jsx(GitHubStarButton, { size: "sm", variant: "outline" }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "filled", onClick: close, children: "Keep building" })
    ] })
  ] }) });
}
const editSections = [
  {
    title: "Template",
    content: () => /* @__PURE__ */ jsx(TemplateSettings, {}),
    icon: /* @__PURE__ */ jsx(ThemeIcon, { size: "lg", radius: "md", variant: "light", color: "var(--mantine-primary-color-8)", children: /* @__PURE__ */ jsx(AlignBottomBox, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }) })
  },
  {
    title: "Text",
    content: () => /* @__PURE__ */ jsx(TextSettings, {}),
    icon: /* @__PURE__ */ jsx(ThemeIcon, { size: "lg", radius: "md", variant: "light", color: "var(--mantine-primary-color-8)", children: /* @__PURE__ */ jsx(Text$1, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }) })
  },
  {
    title: "Background",
    content: () => /* @__PURE__ */ jsx(BackgroundSettings, {}),
    icon: /* @__PURE__ */ jsx(ThemeIcon, { size: "lg", radius: "md", variant: "light", color: "var(--mantine-primary-color-8)", children: /* @__PURE__ */ jsx(MediaImage, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }) })
  }
];
function Drawer({ imageNodeRef }) {
  var _a;
  const fetcher = useFetcher();
  const { openItems } = useLoaderData();
  const currentOpenItems = fetcher.formData ? (_a = fetcher.formData.get("openItems")) == null ? void 0 : _a.toString().split(",") : openItems;
  const { resetEditor, cover } = useEditor();
  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });
  const onAccordionChange = (values) => {
    fetcher.submit(
      { openItems: values, intent: "updateOpenItems" },
      {
        method: "post",
        action: CREATE_ROUTE
      }
    );
  };
  const onHideSidebar = () => {
    fetcher.submit(
      { sidebarState: "closed", intent: "updateSidebarState" },
      {
        method: "post",
        action: CREATE_ROUTE
      }
    );
  };
  const items = editSections.map((item) => {
    return /* @__PURE__ */ jsx(
      EditorHydration,
      {
        skeleton: /* @__PURE__ */ jsxs(Flex, { h: 53, w: "100%", justify: "space-between", align: "center", p: "md", children: [
          /* @__PURE__ */ jsxs(Flex, { gap: "sm", align: "center", children: [
            /* @__PURE__ */ jsx(Skeleton, { radius: "md", height: 34, width: 34, animate: true }),
            /* @__PURE__ */ jsx(Skeleton, { radius: "md", height: 16, width: 125, animate: true })
          ] }),
          /* @__PURE__ */ jsx(Skeleton, { radius: "md", height: 16, circle: true, width: 16, animate: true })
        ] }),
        children: /* @__PURE__ */ jsxs(Accordion.Item, { value: item.title, children: [
          /* @__PURE__ */ jsx(
            Accordion.Control,
            {
              "aria-label": `Toggle ${item.title.toLowerCase()} editing`,
              icon: item.icon,
              className: classes$3.accordionControl,
              children: /* @__PURE__ */ jsx(Flex, { gap: "xs", align: "center", children: /* @__PURE__ */ jsx(Text, { size: "md", fw: 500, children: item.title }) })
            }
          ),
          /* @__PURE__ */ jsx(Accordion.Panel, { px: "sm", children: /* @__PURE__ */ jsx(Box, { pb: 48, pt: 24, children: item.content() }) })
        ] }, item.title)
      },
      item.title
    );
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { component: "aside", className: classes$3.sidebar, pos: "relative", children: [
      /* @__PURE__ */ jsxs(
        Flex,
        {
          justify: "space-between",
          align: "center",
          p: "md",
          style: { borderBottom: "1px solid var(--mantine-color-default-border)" },
          children: [
            /* @__PURE__ */ jsx(Title, { size: "sm", order: 2, children: "Cover settings" }),
            /* @__PURE__ */ jsx(
              ActionIcon,
              {
                visibleFrom: "md",
                onClick: onHideSidebar,
                variant: "default",
                size: 28,
                title: "Close sidebar",
                "aria-label": "Close sidebar",
                children: /* @__PURE__ */ jsx(ArrowLeftTag, { width: 18, height: 18 })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(ScrollArea, { visibleFrom: "md", h: "calc(100vh - 69px - 60px)", children: /* @__PURE__ */ jsx(
        Accordion,
        {
          transitionDuration: 0,
          radius: "md",
          multiple: true,
          value: currentOpenItems,
          onChange: onAccordionChange,
          variant: "default",
          children: items
        }
      ) }),
      /* @__PURE__ */ jsx(
        Accordion,
        {
          hiddenFrom: "md",
          radius: "md",
          multiple: true,
          value: currentOpenItems,
          onChange: onAccordionChange,
          variant: "default",
          pb: 80,
          children: items
        }
      ),
      /* @__PURE__ */ jsxs(
        Flex,
        {
          hiddenFrom: "md",
          justify: { base: "space-between", md: "flex-end" },
          bg: "var(--mantine-color-body)",
          pos: { base: "fixed", md: "sticky" },
          className: classes$3.mobileFooter,
          bottom: 0,
          right: 0,
          left: 0,
          p: "md",
          children: [
            /* @__PURE__ */ jsx(Button, { hiddenFrom: "md", onClick: resetEditor, variant: "outline", size: "xs", children: "Reset all" }),
            /* @__PURE__ */ jsxs(Button, { hiddenFrom: "md", onClick: downloadImage, size: "xs", rightSection: /* @__PURE__ */ jsx(Download, { width: 16, height: 16 }), children: [
              /* @__PURE__ */ jsx(LoadingOverlay, { visible: isLoading, zIndex: 1e3, overlayProps: { radius: "sm", blur: 2 } }),
              "Download image"
            ] })
          ]
        }
      )
    ] }),
    isSuccessModalOpen && /* @__PURE__ */ jsx(DownloadSuccessModal, { close: closeSuccessModal })
  ] });
}
const coverWrapper = "_coverWrapper_2n55a_33";
const coverSkeleton = "_coverSkeleton_2n55a_58";
const classes = {
  coverWrapper,
  coverSkeleton
};
function ImagePreview({ imageNodeRef }) {
  const {
    template: { backgroundId },
    primaryText,
    secondaryText,
    background: { image: backgroundImage, pattern: backgroundPattern },
    cover
  } = useEditor();
  const backgroundTemplate = BACKGROUND_TEMPLATES.find((t) => t.id === backgroundId);
  const { sections: backgroundSections } = backgroundTemplate ?? {};
  return /* @__PURE__ */ jsx(EditorHydration, { skeleton: /* @__PURE__ */ jsx(Skeleton, { radius: 12, className: classes.coverSkeleton, animate: true }), children: /* @__PURE__ */ jsxs(
    Box,
    {
      ref: imageNodeRef,
      style: {
        backgroundColor: "var(--cover-background-color-1)",
        display: "var(--cover-display)",
        justifyContent: "var(--cover-justify-content)",
        alignItems: "var(--cover-align-items)",
        position: "relative",
        flexDirection: "var(--cover-flex-direction)",
        gap: "1rem",
        overflow: "hidden",
        width: "min(calc(90vw - 360px), 900px)",
        padding: "1rem",
        minWidth: "320px",
        aspectRatio: cover.aspectRatio,
        borderRadius: "12px",
        letterSpacing: "normal",
        margin: "0 auto"
      },
      children: [
        backgroundSections == null ? void 0 : backgroundSections.map((section, index) => /* @__PURE__ */ jsx(
          Box,
          {
            style: {
              position: "absolute",
              inset: 0,
              zIndex: 1,
              backgroundColor: `var(--cover-background-color-${index + 1})`,
              clipPath: section.clipPath
            }
          },
          index
        )),
        /* @__PURE__ */ jsx(
          Box,
          {
            style: {
              position: "absolute",
              inset: 0,
              zIndex: 1,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              ...(backgroundPattern == null ? void 0 : backgroundPattern.url) ? {
                background: backgroundPattern.url
              } : backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "transparent"
              } : {}
            },
            children: backgroundImage && /* @__PURE__ */ jsx(
              Box,
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "var(--cover-background-color-1)",
                  opacity: "var(--cover-color-overlay-opacity)"
                }
              }
            )
          }
        ),
        primaryText.content && /* @__PURE__ */ jsx(
          "span",
          {
            id: "primaryText",
            className: "primaryText",
            style: {
              color: "var(--cover-primary-text-color)",
              fontSize: "var(--cover-primary-text-font-size)",
              fontFamily: "var(--cover-primary-text-font)",
              textAlign: "var(--cover-primary-text-align)",
              display: "block",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "normal",
              position: "relative",
              zIndex: 2
            },
            children: primaryText.content
          }
        ),
        secondaryText.content && /* @__PURE__ */ jsx(
          "span",
          {
            id: "secondaryText",
            className: "secondaryText",
            style: {
              color: "var(--cover-secondary-text-color)",
              fontSize: "var(--cover-secondary-text-font-size)",
              fontFamily: "var(--cover-secondary-text-font)",
              textAlign: "var(--cover-secondary-text-align)",
              display: "block",
              fontWeight: 500,
              margin: 0,
              position: "var(--cover-secondary-position, relative)",
              bottom: "var(--cover-secondary-bottom, unset)",
              right: "var(--cover-secondary-right, unset)",
              left: "var(--cover-secondary-left, unset)",
              letterSpacing: "normal",
              zIndex: 2
            },
            children: secondaryText.content
          }
        )
      ]
    }
  ) });
}
const DownloadButton = ({
  isLoading,
  downloadImage,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ...downloadImage ? { onClick: downloadImage } : {},
      size: "md",
      rightSection: /* @__PURE__ */ jsx(Download, { width: 24, height: 24 }),
      ...props,
      children: [
        /* @__PURE__ */ jsx(LoadingOverlay, { visible: isLoading, zIndex: 1e3, overlayProps: { radius: "sm", blur: 2 } }),
        "Download image"
      ]
    }
  );
};
function CoverImageControls({
  isLoading,
  resetStyles,
  downloadImage,
  isDownloadDisabled
}) {
  return /* @__PURE__ */ jsxs(Flex, { gap: "xs", justify: "center", wrap: "wrap", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        visibleFrom: "md",
        onClick: resetStyles,
        size: "md",
        rightSection: /* @__PURE__ */ jsx(Restart, { width: 24, height: 24 }),
        variant: "outline",
        children: "Reset applied styles"
      }
    ),
    /* @__PURE__ */ jsx(
      DownloadButton,
      {
        isLoading: !!isLoading,
        disabled: isDownloadDisabled,
        downloadImage,
        visibleFrom: "md"
      }
    )
  ] });
}
function CoverImageSize({
  defaultImageSize,
  onAspectRatioChange,
  _hasHydrated
}) {
  return /* @__PURE__ */ jsx(Skeleton, { visible: !_hasHydrated, maw: "max-content", children: /* @__PURE__ */ jsx(
    Select,
    {
      label: "Image download size",
      value: defaultImageSize,
      data: Object.values(IMAGE_DOWNLOAD_SIZES).map((size) => ({
        value: size.value,
        label: `${size.width}x${size.height} ${size.label} `
      })),
      onChange: (value) => onAspectRatioChange(value),
      clearable: false,
      allowDeselect: false,
      comboboxProps: { width: "max-content", position: "bottom" },
      checkIconPosition: "right"
    }
  ) });
}
const Confetti = lazy(() => import("./assets/Confetti-Dh1EWJA1.js"));
function CoverImage({ imageNodeRef }) {
  const { resetEditor, updateCover, cover, _hasHydrated } = useEditor();
  const fetcher = useFetcher();
  const { sidebarState } = useLoaderData();
  const currentSidebarState = fetcher.formData ? fetcher.formData.get("sidebarState") : sidebarState;
  const isSidebarOpen = currentSidebarState !== "closed";
  const defaultImageSize = `${cover.id}:${cover.aspectRatio}:${cover.width}x${cover.height}`;
  const { isLoading, isSuccessModalOpen, isDownloadDisabled, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });
  const resetStyles = () => {
    resetEditor();
  };
  const onSidebarChange = (value) => {
    fetcher.submit(
      { sidebarState: "true", intent: "updateSidebarState" },
      {
        method: "post",
        action: CREATE_ROUTE
      }
    );
  };
  const onAspectRatioChange = (value) => {
    if (!value) return;
    const id = value.split(":")[0];
    const aspectRatio = value.split(":")[1];
    const size = value.split(":")[2];
    const width = size.split("x")[0];
    const height = size.split("x")[1];
    updateCSSVariables({ "--cover-aspect-ratio": `${aspectRatio}` });
    updateCover({ id, width: Number(width), height: Number(height), aspectRatio: Number(aspectRatio) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { className: classes.coverWrapper, children: [
      !isSidebarOpen ? /* @__PURE__ */ jsx(
        ActionIcon,
        {
          visibleFrom: "md",
          pos: "absolute",
          top: 16,
          left: 20,
          onClick: () => onSidebarChange(),
          title: "Open sidebar",
          variant: "default",
          size: 28,
          "aria-label": "Open sidebar",
          children: /* @__PURE__ */ jsx(ArrowRightTag, { width: 18, height: 18 })
        }
      ) : null,
      /* @__PURE__ */ jsx(
        CoverImageSize,
        {
          defaultImageSize,
          onAspectRatioChange,
          _hasHydrated
        }
      ),
      /* @__PURE__ */ jsx(ImagePreview, { imageNodeRef }),
      /* @__PURE__ */ jsx(
        CoverImageControls,
        {
          ...isDownloadDisabled ? {
            isDownloadDisabled: true
          } : { isLoading, resetStyles, downloadImage, isDownloadDisabled: false }
        }
      )
    ] }),
    isSuccessModalOpen && /* @__PURE__ */ jsx(DownloadSuccessModal, { close: closeSuccessModal }),
    isSuccessModalOpen && /* @__PURE__ */ jsx(Confetti, {})
  ] });
}
function EditorArea() {
  const fetcher = useFetcher();
  const { sidebarState } = useLoaderData();
  const currentSidebarState = fetcher.formData ? fetcher.formData.get("sidebarState") !== "closed" : sidebarState;
  const isSidebarOpen = currentSidebarState !== "closed";
  const coverImageNodeRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 992px)");
  const showDrawer = isMobile || isSidebarOpen;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      direction: { base: "column-reverse", md: "row" },
      justify: "center",
      align: "center",
      h: { base: "auto", md: "100%" },
      children: [
        showDrawer ? /* @__PURE__ */ jsx(Drawer, { imageNodeRef: coverImageNodeRef }) : null,
        /* @__PURE__ */ jsx(CoverImage, { imageNodeRef: coverImageNodeRef })
      ]
    }
  ) });
}
const editorOpenStateCookie = createCookie("editor-open-state", {
  maxAge: 604800
  // 1 week
});
const editorSidebarStateCookie = createCookie("editor-sidebar-state", {
  maxAge: 604800
  // 1 week
});
const welcomeCookie = createCookie("welcome-status", {
  maxAge: 31536e3
  // 1 year in seconds
});
async function loader({ request }) {
  const cookieHeader = request.headers.get("Cookie");
  const editorCookie = await editorOpenStateCookie.parse(cookieHeader) || {};
  const _welcomeCookie = await welcomeCookie.parse(cookieHeader) || {};
  const editorSidebarCookie = await editorSidebarStateCookie.parse(cookieHeader) || {};
  const openItems = editorCookie.openItems ? editorCookie.openItems.split(",") : [];
  return {
    openItems,
    hasVisited: _welcomeCookie.hasVisited,
    sidebarState: editorSidebarCookie.sidebarState
  };
}
async function action({ request }) {
  var _a;
  const formData = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  if (formData.get("intent") === "updateOpenItems") {
    const editorCookie = await editorOpenStateCookie.parse(cookieHeader) || {};
    const newItems = ((_a = formData.get("openItems")) == null ? void 0 : _a.toString().split(",")) || [];
    const uniqueItems = [...new Set(newItems)].filter((item) => !!item);
    editorCookie.openItems = uniqueItems.join(",");
    return new Response("", {
      headers: {
        "Set-Cookie": await editorOpenStateCookie.serialize(editorCookie)
      }
    });
  }
  if (formData.get("intent") === "updateHasVisited") {
    const _welcomeCookie = await welcomeCookie.parse(cookieHeader) || {};
    _welcomeCookie.hasVisited = "true";
    return new Response("", {
      headers: {
        "Set-Cookie": await welcomeCookie.serialize(_welcomeCookie)
      }
    });
  }
  if (formData.get("intent") === "updateSidebarState") {
    const editorSidebarCookie = await editorSidebarStateCookie.parse(cookieHeader) || {};
    editorSidebarCookie.sidebarState = formData.get("sidebarState");
    return new Response("", {
      headers: {
        "Set-Cookie": await editorSidebarStateCookie.serialize(editorSidebarCookie)
      }
    });
  }
}
const meta = () => {
  const title = `${SITE_NAME} - Create`;
  const description = `Use ${SITE_NAME}'s easy-to-use editing tools and presets to download free cover images for your blog without the design headache.`;
  const image = "/editor-dark.webp";
  const url = `https://${DOMAIN}/create`;
  const domain = DOMAIN;
  return [
    { title },
    {
      name: "description",
      content: description
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: image
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:site_name",
      content: domain
    },
    {
      property: "twitter:card",
      content: "summary_large_image"
    },
    {
      property: "twitter:creator",
      content: "@Kieran6Dev"
    },
    {
      property: "twitter:title",
      content: title
    },
    {
      property: "twitter:description",
      content: description
    },
    {
      property: "twitter:image",
      content: image
    },
    {
      property: "twitter:url",
      content: url
    },
    {
      property: "twitter:domain",
      content: domain
    }
  ];
};
function Create() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(WelcomeModal, {}),
    /* @__PURE__ */ jsx(
      Box,
      {
        component: "header",
        w: "100%",
        py: "md",
        px: "lg",
        style: { borderBottom: "1px solid var(--mantine-color-default-border)" },
        children: /* @__PURE__ */ jsxs(Flex, { component: "nav", justify: "space-between", align: "center", children: [
          /* @__PURE__ */ jsx(Anchor, { component: Link, to: "/", "aria-label": `${SITE_NAME} logo`, children: /* @__PURE__ */ jsx(Image, { src: "/favicon.ico", width: 36, height: 36, alt: `${SITE_NAME} logo` }) }),
          /* @__PURE__ */ jsxs(Flex, { gap: "xs", children: [
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsx(GitHubStarButton, { visibleFrom: "md", size: "sm", variant: "light" }),
            /* @__PURE__ */ jsx(MobileGithubButton, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Box,
      {
        component: "main",
        style: {
          height: "calc(100vh - 69px)",
          display: "flex",
          flexDirection: "column"
        },
        children: /* @__PURE__ */ jsx(EditorArea, {})
      }
    )
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Create,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CXkucgRz.js", "imports": ["/assets/components-fHzBU2kK.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Ik1AVTDL.js", "imports": ["/assets/components-fHzBU2kK.js", "/assets/index-B8fQzo4f.js", "/assets/MantineThemeProvider-DUeGmxmj.js"], "css": ["/assets/root-6q_rHjqV.css"] }, "routes/[sitemap.xml]": { "id": "routes/[sitemap.xml]", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_sitemap.xml_-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/[robots.txt]": { "id": "routes/[robots.txt]", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_robots.txt_-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-B9lQj0Xd.js", "imports": ["/assets/components-fHzBU2kK.js", "/assets/GitHubStarButton-De_rH7gA.js", "/assets/MantineThemeProvider-DUeGmxmj.js"], "css": [] }, "routes/create": { "id": "routes/create", "parentId": "root", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-C_Vp8-B3.js", "imports": ["/assets/components-fHzBU2kK.js", "/assets/GitHubStarButton-De_rH7gA.js", "/assets/MantineThemeProvider-DUeGmxmj.js", "/assets/index-B8fQzo4f.js"], "css": ["/assets/route-BOoxyA9w.css"] } }, "url": "/assets/manifest-4e8bb775.js", "version": "4e8bb775" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/[sitemap.xml]": {
    id: "routes/[sitemap.xml]",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/[robots.txt]": {
    id: "routes/[robots.txt]",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/create": {
    id: "routes/create",
    parentId: "root",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
