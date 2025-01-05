import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useSearchParams, useFetcher, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createTheme, ColorSchemeScript, MantineProvider, useMantineColorScheme, useComputedColorScheme, ActionIcon, Box, Container, Stack, Text, Anchor, Button, Flex, Title, Mark, Image, Modal, Divider, TextInput, CloseButton, ColorInput, Select, NumberInput, FileInput, Skeleton, Accordion, ScrollArea, LoadingOverlay } from "@mantine/core";
import toast$1, { Toaster, toast } from "react-hot-toast";
import { SunLight, HalfMoon, Github, Check, MediaImageFolder, Download, Text as Text$1, MediaImage, AlignBottomBox, Pentagon, UploadSquare, Restart } from "iconoir-react";
import { useState, useEffect, useRef } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { useDisclosure } from "@mantine/hooks";
import domToImage from "dom-to-image-more";
import fs from "file-saver";
import { Rnd } from "react-rnd";
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
  { rel: "manifest", href: "/site.webmanifest" }
];
const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  components: {
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
    FileInput: {
      defaultProps: {
        size: "md"
      }
    }
  },
  defaultRadius: "md",
  primaryColor: "teal"
});
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx(ColorSchemeScript, { defaultColorScheme: "dark" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(MantineProvider, { theme, children }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(Toaster, {})
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
function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
  return /* @__PURE__ */ jsxs(
    ActionIcon,
    {
      onClick: () => setColorScheme(computedColorScheme === "light" ? "dark" : "light"),
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
const GITHUB_URL = "https://github.com/kieran6roberts/CoverSnap";
function Footer() {
  return /* @__PURE__ */ jsx(Box, { component: "footer", w: "100%", py: "xl", children: /* @__PURE__ */ jsx(Container, { size: "xl", children: /* @__PURE__ */ jsx(Stack, { gap: "xs", justify: "center", align: "center", children: /* @__PURE__ */ jsxs(Text, { ta: "center", size: "sm", children: [
    "CoverSnap on",
    " ",
    /* @__PURE__ */ jsx(Anchor, { href: GITHUB_URL, underline: "always", target: "_blank", children: "GitHub" })
  ] }) }) }) });
}
function GitHubStarButton({
  size = "md",
  variant = "filled",
  visibleFrom,
  hiddenFrom,
  isFullWidth = false
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      component: Link,
      target: "_blank",
      to: GITHUB_URL,
      size,
      variant,
      color: "var(--mantine-primary-color-7)",
      ...isFullWidth ? { fullWidth: true } : {},
      ...visibleFrom ? { visibleFrom } : {},
      ...hiddenFrom ? { hiddenFrom } : {},
      children: /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(Github, { width: 20 }),
        " GitHub"
      ] })
    }
  );
}
const meta$1 = () => {
  return [
    { title: "CoverSnap" },
    {
      name: "description",
      content: "CoverSnap lets you easily generate good looking cover images for your blog posts."
    }
  ];
};
const heroImages = {
  light: "/hero-light.png",
  dark: "/hero-dark.png"
};
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { component: "header", w: "100%", py: "md", children: /* @__PURE__ */ jsx(Container, { size: "lg", children: /* @__PURE__ */ jsxs(Flex, { component: "nav", justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsx(Anchor, { size: "sm", fz: { base: "1.3rem", sm: "1.5rem" }, fw: 500, variant: "text", component: Link, to: "/", children: "CoverSnap" }),
      /* @__PURE__ */ jsx(ColorSchemeToggle, {})
    ] }) }) }),
    /* @__PURE__ */ jsx(Container, { component: "main", size: "xl", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: "xl", align: "center", mt: { base: 80, sm: 100 }, children: [
      /* @__PURE__ */ jsxs(Stack, { justify: "center", gap: "xs", children: [
        /* @__PURE__ */ jsxs(
          Title,
          {
            ta: "center",
            fz: { base: "2.4rem", sm: "4rem" },
            style: { lineHeight: "1", zIndex: 1 },
            fw: 700,
            "aria-label": "CoverSnap",
            maw: { base: 500, sm: 700 },
            mx: "auto",
            children: [
              "Publish articles",
              " ",
              /* @__PURE__ */ jsx(Mark, { fz: "0.95em", style: { zIndex: -1 }, children: "faster" }),
              " ",
              "without cover design mental block"
            ]
          }
        ),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", fz: { base: "md", sm: "lg" }, ta: "center", maw: 580, mx: "auto", mt: "md", children: "CoverSnap can help you create great looking cover images for your blog posts in seconds using simple editing tools. It's completely free to use! Give it a star on GitHub if you found it useful. Enjoy." }),
        /* @__PURE__ */ jsxs(Flex, { direction: { base: "column", sm: "row" }, justify: "center", align: "center", gap: "md", mt: "xl", children: [
          /* @__PURE__ */ jsx(Button, { hiddenFrom: "sm", component: Link, to: "/create", size: "lg", variant: "filled", children: "Build for free" }),
          /* @__PURE__ */ jsx(Button, { visibleFrom: "sm", component: Link, to: "/create", size: "lg", variant: "filled", children: "Build for free" }),
          /* @__PURE__ */ jsx(GitHubStarButton, { hiddenFrom: "sm", size: "md", variant: "light" }),
          /* @__PURE__ */ jsx(GitHubStarButton, { visibleFrom: "sm", size: "md", variant: "light" })
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
                alt: "CoverSnap create page screenshot",
                radius: "md",
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx(
              Image,
              {
                darkHidden: true,
                src: heroImages["light"],
                alt: "CoverSnap create page screenshot",
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
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function WelcomeModal() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedEditor");
    if (!hasVisited) {
      localStorage.setItem("hasVisitedEditor", "true");
      setIsWelcomeModalOpen(true);
    }
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: isWelcomeModalOpen && /* @__PURE__ */ jsx(
    Modal,
    {
      centered: true,
      opened: true,
      onClose: () => setIsWelcomeModalOpen(false),
      fz: "xl",
      title: /* @__PURE__ */ jsx(Text, { size: "xl", fw: 500, children: "Welcome to CoverSnap!" }),
      size: "md",
      children: /* @__PURE__ */ jsxs(Stack, { children: [
        /* @__PURE__ */ jsx(Text, { children: "Use the editing sidebar to adjust your content and design specifics. You can also drag and resize your text using the cover image preview. More features coming soon!" }),
        /* @__PURE__ */ jsxs(
          "video",
          {
            controls: true,
            width: "100%",
            autoPlay: true,
            loop: true,
            muted: true,
            style: { maxWidth: 400, margin: "0 auto", borderRadius: "12px" },
            children: [
              /* @__PURE__ */ jsx("source", { src: "resize-demo.mp4", type: "video/mp4" }),
              "Your browser does not support the video tag."
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "filled", fullWidth: true, "data-autofocus": true, onClick: () => setIsWelcomeModalOpen(false), children: "Start editing" })
      ] })
    }
  ) });
}
function MobileGithubButton() {
  return /* @__PURE__ */ jsx(ActionIcon, { "aria-label": "CoverSnap GitHub repo", hiddenFrom: "md", variant: "light", size: "lg", children: /* @__PURE__ */ jsx(Github, {}) });
}
const sidebar = "_sidebar_187kf_1";
const accordionControl = "_accordionControl_187kf_13";
const classes$1 = {
  sidebar,
  accordionControl
};
const updateCSSVariable = ({ name, value }) => {
  document.documentElement.style.setProperty(name, value);
};
const updateCSSVariables = (variables) => {
  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
};
const defaultState = {
  // Text
  primaryTitle: "10 Tips/Principles For Cleaner React Code.",
  primaryTitleColor: "rgba(255, 255, 255, 1)",
  primaryTitleFontSize: 28,
  primaryTitleFont: "sans-serif (default)",
  subTitle: "",
  subTitleColor: "rgba(255, 255, 255, 1)",
  subTitleFontSize: 20,
  subTitleFont: "sans-serif (default)",
  // Background
  backgroundColor: "rgba(51, 51, 51, 1)",
  backgroundImage: null
};
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
      // Text
      setPrimaryTitle: (title2) => set2({ primaryTitle: title2 }),
      setPrimaryTitleColor: (color) => {
        set2({ primaryTitleColor: color });
        updateCSSVariable({ name: "--cover-title-color", value: color });
      },
      setPrimaryTitleFontSize: (size) => {
        set2({ primaryTitleFontSize: size });
        updateCSSVariable({ name: "--cover-title-font-size", value: `${size}px` });
      },
      setPrimaryTitleFont: (font) => {
        set2({ primaryTitleFont: font });
        if (font) {
          updateCSSVariable({ name: "--cover-title-font", value: font });
        }
      },
      setSubTitle: (title2) => set2({ subTitle: title2 }),
      setSubTitleColor: (color) => {
        set2({ subTitleColor: color });
        updateCSSVariable({ name: "--cover-subtitle-color", value: color });
      },
      setSubTitleFontSize: (size) => {
        set2({ subTitleFontSize: size });
        updateCSSVariable({ name: "--cover-subtitle-font-size", value: `${size}px` });
      },
      setSubTitleFont: (font) => {
        set2({ subTitleFont: font });
        if (font) {
          updateCSSVariable({ name: "--cover-subtitle-font", value: font });
        }
      },
      // Background
      setBackgroundColor: (color) => {
        set2({ backgroundColor: color });
        updateCSSVariable({ name: "--cover-background-color", value: color });
      },
      setBackgroundImage: (url) => {
        set2({ backgroundImage: url });
      },
      // Reset
      resetEditor: () => {
        var _a;
        const state = useEditor.getState();
        if ((_a = state.backgroundImage) == null ? void 0 : _a.startsWith("blob:")) {
          URL.revokeObjectURL(state.backgroundImage);
        }
        toast.success("Cover reset.", {
          id: "reset-cover",
          icon: /* @__PURE__ */ jsx(Check, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" })
        });
        updateCSSVariables({
          "--cover-title-color": defaultState.primaryTitleColor,
          "--cover-subtitle-color": defaultState.subTitleColor,
          "--cover-title-font-size": `${defaultState.primaryTitleFontSize}px`,
          "--cover-subtitle-font-size": `${defaultState.subTitleFontSize}px`,
          "--cover-background-color": defaultState.backgroundColor,
          "--cover-color-overlay-opacity": "0%",
          "--cover-title-font": defaultState.primaryTitleFont,
          "--cover-subtitle-font": defaultState.subTitleFont
        });
        set2({ _hasHydrated: true, ...defaultState });
      }
    }),
    {
      name: "editor-storage",
      storage: createJSONStorage(() => indexDBStorage),
      // @ts-expect-error fix: todo
      partialize: (state) => ({
        primaryTitle: state.primaryTitle,
        primaryTitleColor: state.primaryTitleColor,
        primaryTitleFontSize: state.primaryTitleFontSize,
        subTitle: state.subTitle,
        subTitleColor: state.subTitleColor,
        subTitleFontSize: state.subTitleFontSize,
        backgroundColor: state.backgroundColor,
        primaryTitleFont: state.primaryTitleFont,
        subTitleFont: state.subTitleFont
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          toast.error("Failed to hydrate editor state. Please refresh the page.");
          return;
        }
        state.setHasHydrated(true);
      }
    }
  )
);
function EditorHydration({ children, skeleton }) {
  const hasHydrated = useEditor((state) => state._hasHydrated);
  useEffect(() => {
    if (hasHydrated) {
      const state = useEditor.getState();
      updateCSSVariables({
        "--cover-title-color": state.primaryTitleColor,
        "--cover-subtitle-color": state.subTitleColor,
        "--cover-title-font-size": `${state.primaryTitleFontSize}px`,
        "--cover-subtitle-font-size": `${state.subTitleFontSize}px`,
        "--cover-background-color": state.backgroundColor,
        "--cover-title-font": state.primaryTitleFont ?? "sans-serif",
        "--cover-subtitle-font": state.subTitleFont ?? "sans-serif"
      });
    }
  }, [hasHydrated]);
  if (!hasHydrated) {
    return skeleton ?? null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function DrawerTextSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get("reset");
  const {
    primaryTitle,
    primaryTitleColor,
    subTitle,
    subTitleColor,
    primaryTitleFontSize,
    setPrimaryTitle,
    setPrimaryTitleColor,
    setSubTitle,
    setPrimaryTitleFontSize,
    subTitleFontSize,
    setSubTitleFontSize,
    setSubTitleColor,
    primaryTitleFont,
    setPrimaryTitleFont,
    subTitleFont,
    setSubTitleFont
  } = useEditor();
  const hasPrimaryTitle = primaryTitle.length > 0;
  const hasSubTitle = subTitle.length > 0;
  return /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Divider, { label: "Primary title", labelPosition: "center" }),
    /* @__PURE__ */ jsx(
      TextInput,
      {
        value: primaryTitle,
        onChange: (e) => setPrimaryTitle(e.target.value),
        placeholder: "HTTP Security Headers and how to...",
        error: primaryTitle.length > 80 ? "Maximum 80 characters" : null,
        label: "Title",
        description: "Maximum 80 characters",
        rightSection: hasPrimaryTitle && /* @__PURE__ */ jsx(CloseButton, { size: "sm", variant: "subtle", onClick: () => setPrimaryTitle("") }),
        maxLength: 80
      }
    ),
    /* @__PURE__ */ jsx(
      ColorInput,
      {
        format: "rgba",
        description: "Accepts RGBA",
        value: primaryTitleColor,
        label: "Color",
        onChange: setPrimaryTitleColor
      },
      `title-color-${resetKey}`
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        "aria-label": "Title font",
        label: "Font",
        placeholder: "Pick value",
        data: [
          "sans-serif (default)",
          "serif (default)",
          "monospace (default)",
          "Arial",
          "Helvetica",
          "Verdana",
          "Tahoma",
          "Trebuchet MS",
          "Times New Roman",
          "Georgia",
          "Courier New",
          "system-ui"
        ],
        value: primaryTitleFont,
        onChange: (value) => setPrimaryTitleFont(value),
        allowDeselect: false,
        checkIconPosition: "right"
      }
    ),
    /* @__PURE__ */ jsx(
      NumberInput,
      {
        max: 80,
        min: 10,
        value: primaryTitleFontSize,
        onChange: (value) => setPrimaryTitleFontSize(value),
        label: "Font size (px)",
        size: "md",
        suffix: "px",
        allowDecimal: false
      },
      `title-size-${resetKey}`
    ),
    /* @__PURE__ */ jsx(Divider, { label: "Subtitle", mt: 40, labelPosition: "center" }),
    /* @__PURE__ */ jsx(
      TextInput,
      {
        value: subTitle,
        onChange: (e) => setSubTitle(e.target.value),
        placeholder: "Let's dive into the world of...",
        label: "Subtitle",
        description: "Maximum 80 characters",
        error: subTitle.length > 80 ? "Maximum 80 characters" : null,
        rightSection: hasSubTitle && /* @__PURE__ */ jsx(CloseButton, { size: "sm", variant: "subtle", onClick: () => setSubTitle("") }),
        maxLength: 80
      }
    ),
    /* @__PURE__ */ jsx(
      ColorInput,
      {
        format: "rgba",
        label: "Color",
        description: "Accepts RGBA",
        value: subTitleColor,
        onChange: setSubTitleColor
      },
      `subtitle-color-${resetKey}`
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        "aria-label": "Subtitle font",
        label: "Font",
        placeholder: "Pick value",
        data: [
          "sans-serif (default)",
          "serif (default)",
          "monospace (default)",
          "Arial",
          "Helvetica",
          "Verdana",
          "Tahoma",
          "Trebuchet MS",
          "Times New Roman",
          "Georgia",
          "Courier New",
          "system-ui"
        ],
        value: subTitleFont,
        onChange: (value) => setSubTitleFont(value),
        allowDeselect: false,
        checkIconPosition: "right"
      }
    ),
    /* @__PURE__ */ jsx(
      NumberInput,
      {
        value: subTitleFontSize,
        onChange: (value) => setSubTitleFontSize(value),
        suffix: "px",
        max: 50,
        min: 10,
        label: "Font size (px)",
        size: "md",
        allowDecimal: false
      },
      `subtitle-size-${resetKey}`
    )
  ] });
}
function DrawerBackgroundSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get("reset");
  const { backgroundImage, backgroundColor, setBackgroundColor, setBackgroundImage } = useEditor();
  const onBackgroundImageChange = (file) => {
    if (backgroundImage == null ? void 0 : backgroundImage.startsWith("blob:")) {
      URL.revokeObjectURL(backgroundImage);
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    } else {
      setBackgroundImage(null);
    }
  };
  return /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(
      ColorInput,
      {
        format: "rgba",
        label: "Background color",
        description: "Accepts RGBA",
        value: backgroundColor,
        onChange: setBackgroundColor
      },
      `bg-color-${resetKey}`
    ),
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
      /* @__PURE__ */ jsx(Button, { "aria-label": "Remove background image", onClick: () => setBackgroundImage(null), children: "Clear" })
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
      },
      `bg-image-${resetKey}`
    ),
    backgroundImage ? /* @__PURE__ */ jsx(
      NumberInput,
      {
        defaultValue: 0,
        suffix: "%",
        max: 100,
        min: 0,
        onChange: (value) => {
          updateCSSVariable({ name: "--cover-color-overlay-opacity", value: `${value}%` });
        },
        label: "Color overlay opacity",
        size: "md",
        allowDecimal: false,
        allowNegative: false
      },
      `color-overlay-opacity-${resetKey}`
    ) : null
  ] });
}
const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 840;
async function saveDomNodeAsImage(node) {
  if (!node) return { success: false, blob: null };
  try {
    const originalRect = node.getBoundingClientRect();
    const clone = node.cloneNode(true);
    document.body.appendChild(clone);
    const scaleFactorWidth = TARGET_WIDTH / originalRect.width;
    const scaleFactorHeight = TARGET_HEIGHT / originalRect.height;
    const SCALE_FACTOR = Math.min(scaleFactorWidth, scaleFactorHeight);
    Object.assign(clone.style, {
      position: "absolute",
      left: "-9999px",
      margin: "0",
      boxSizing: "border-box",
      transform: `scale(${SCALE_FACTOR})`,
      transformOrigin: "top left",
      borderRadius: "0px"
    });
    const titleRndWrapper = Array.from(clone.querySelectorAll('[class*="rndWrapper"]'));
    if (titleRndWrapper.length > 0) {
      titleRndWrapper.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.border = "none";
        }
      });
    }
    const blob = await domToImage.toBlob(clone, {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT
    });
    document.body.removeChild(clone);
    fs.saveAs(blob, "coverSnap-cover.png");
    return { success: true, blob };
  } catch (_error) {
    return { success: false, blob: null };
  }
}
const useImageDownload = ({ imageRef }) => {
  const [visible, { open, close }] = useDisclosure(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const downloadImage = async () => {
    open();
    if (imageRef.current) {
      const result = await saveDomNodeAsImage(imageRef.current);
      if (result.success) {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          close();
        }, 500);
      } else {
        toast.error("Failed to download image. If the issue persists, contact @Kieran6Dev on X.");
      }
    }
  };
  return {
    isLoading: visible,
    isSuccessModalOpen,
    closeSuccessModal: () => setIsSuccessModalOpen(false),
    downloadImage
  };
};
function DownloadSuccessModal({ close }) {
  useEffect(() => {
    toast$1.success("Image downloaded successfully.", {
      icon: /* @__PURE__ */ jsx(Check, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }),
      id: "download-success"
    });
  }, []);
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose: close, centered: true, title: "Thanks for using CoverSnap!", children: /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsxs(Text, { mb: "md", children: [
      "If you have any feedback, please share it with me on X",
      " ",
      /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", href: "https://x.com/Kieran6Dev", children: "@Kieran6Dev" }),
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
function EditorDrawer({ imageNodeRef }) {
  var _a;
  const fetcher = useFetcher();
  const { openItems } = useLoaderData();
  const currentOpenItems = fetcher.formData ? (_a = fetcher.formData.get("openItems")) == null ? void 0 : _a.toString().split(",") : openItems;
  const { resetEditor } = useEditor();
  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef
  });
  const editSections = [
    {
      title: "Text",
      content: () => /* @__PURE__ */ jsx(DrawerTextSection, {}),
      icon: /* @__PURE__ */ jsx(Text$1, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" })
    },
    {
      title: "Background",
      content: () => /* @__PURE__ */ jsx(DrawerBackgroundSection, {}),
      icon: /* @__PURE__ */ jsx(MediaImage, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" })
    },
    {
      title: "Templates",
      content: () => null,
      icon: /* @__PURE__ */ jsx(AlignBottomBox, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }),
      isDisabled: true
    },
    {
      title: "Elements",
      content: () => null,
      icon: /* @__PURE__ */ jsx(Pentagon, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }),
      isDisabled: true
    },
    {
      title: "Uploads",
      content: () => null,
      icon: /* @__PURE__ */ jsx(UploadSquare, { width: 24, height: 24, color: "var(--mantine-primary-color-8)" }),
      isDisabled: true
    }
  ];
  const handleAccordionChange = (values) => {
    fetcher.submit(
      { openItems: values, intent: "updateOpenItems" },
      {
        method: "post",
        action: "/create"
      }
    );
  };
  const items = editSections.map((item) => {
    return /* @__PURE__ */ jsx(
      EditorHydration,
      {
        skeleton: /* @__PURE__ */ jsxs(Flex, { h: 53, w: "100%", justify: "space-between", align: "center", p: "md", children: [
          /* @__PURE__ */ jsxs(Flex, { gap: "sm", align: "center", children: [
            /* @__PURE__ */ jsx(Skeleton, { circle: true, height: 24, width: 24, animate: true }),
            /* @__PURE__ */ jsx(Skeleton, { height: 16, width: 125, animate: true })
          ] }),
          /* @__PURE__ */ jsx(Skeleton, { height: 16, circle: true, width: 16, animate: true })
        ] }),
        children: /* @__PURE__ */ jsxs(Accordion.Item, { value: item.title, children: [
          /* @__PURE__ */ jsx(
            Accordion.Control,
            {
              "aria-label": `Toggle ${item.title.toLowerCase()} editing`,
              icon: item.icon,
              disabled: !!item.isDisabled,
              className: classes$1.accordionControl,
              children: /* @__PURE__ */ jsx(Text, { size: "md", fw: 500, children: item.title })
            }
          ),
          /* @__PURE__ */ jsx(Accordion.Panel, { px: "sm", children: /* @__PURE__ */ jsx(Box, { pb: 48, pt: 24, children: item.content() }) })
        ] }, item.title)
      },
      item.title
    );
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { component: "aside", className: classes$1.sidebar, pos: "relative", children: [
      /* @__PURE__ */ jsx(ScrollArea, { visibleFrom: "md", h: "calc(100vh - 69px)", children: /* @__PURE__ */ jsx(Accordion, { radius: "md", multiple: true, value: currentOpenItems, onChange: handleAccordionChange, variant: "default", children: items }) }),
      /* @__PURE__ */ jsx(
        Accordion,
        {
          hiddenFrom: "md",
          radius: "md",
          multiple: true,
          value: currentOpenItems,
          onChange: handleAccordionChange,
          variant: "default",
          pb: "md",
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
          bottom: 0,
          right: 0,
          left: 0,
          p: "md",
          style: { borderTop: "1px solid var(--mantine-color-default-border)", zIndex: 10 },
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                hiddenFrom: "md",
                onClick: resetEditor,
                variant: "light",
                size: "xs",
                color: "var(--mantine-primary-color-7)",
                children: "Reset all"
              }
            ),
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
const coverSection = "_coverSection_47ibl_12";
const coverWrapper = "_coverWrapper_47ibl_33";
const cover = "_cover_47ibl_12";
const coverSkeleton = "_coverSkeleton_47ibl_52";
const title = "_title_47ibl_60";
const subtitle = "_subtitle_47ibl_73";
const rndWrapper = "_rndWrapper_47ibl_86";
const classes = {
  coverSection,
  coverWrapper,
  cover,
  coverSkeleton,
  title,
  subtitle,
  rndWrapper
};
function CoverImage({ imageNodeRef }) {
  const { primaryTitle, subTitle, backgroundImage, resetEditor } = useEditor();
  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });
  const resetStyles = () => {
    resetEditor();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { className: classes.coverSection, children: /* @__PURE__ */ jsxs(Box, { className: classes.coverWrapper, children: [
      /* @__PURE__ */ jsx(Text, { ta: "center", size: "sm", fw: 500, children: "Download size is 1600 x 840" }),
      /* @__PURE__ */ jsx(EditorHydration, { skeleton: /* @__PURE__ */ jsx(Skeleton, { className: classes.coverSkeleton }), children: /* @__PURE__ */ jsxs(
        Box,
        {
          ref: imageNodeRef,
          className: classes.cover,
          variant: "filled",
          style: {
            ...backgroundImage && {
              backgroundImage: `linear-gradient(
                    color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent),
                    color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent)
                  ), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "transparent"
            }
          },
          children: [
            primaryTitle ? /* @__PURE__ */ jsx(
              Rnd,
              {
                default: {
                  x: 0,
                  y: 25,
                  width: "100%",
                  height: "auto"
                },
                bounds: "parent",
                enableResizing: {
                  top: true,
                  right: true,
                  bottom: true,
                  left: true
                },
                className: classes.rndWrapper,
                children: /* @__PURE__ */ jsx("span", { className: classes.title, children: primaryTitle ?? "" })
              }
            ) : null,
            subTitle ? /* @__PURE__ */ jsx(
              Rnd,
              {
                default: {
                  x: 0,
                  y: 0,
                  width: "auto",
                  height: "auto"
                },
                bounds: "parent",
                enableResizing: {
                  top: true,
                  right: true,
                  bottom: true,
                  left: true
                },
                className: classes.rndWrapper,
                children: /* @__PURE__ */ jsx("span", { className: classes.subtitle, children: subTitle ?? "" })
              }
            ) : null
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(Flex, { gap: "xs", justify: "center", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            visibleFrom: "md",
            onClick: resetStyles,
            size: "md",
            variant: "light",
            rightSection: /* @__PURE__ */ jsx(Restart, { width: 24, height: 24 }),
            color: "var(--mantine-primary-color-7)",
            children: "Reset applied styles"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            visibleFrom: "md",
            onClick: downloadImage,
            size: "md",
            rightSection: /* @__PURE__ */ jsx(Download, { width: 24, height: 24 }),
            children: [
              /* @__PURE__ */ jsx(LoadingOverlay, { visible: isLoading, zIndex: 1e3, overlayProps: { radius: "sm", blur: 2 } }),
              "Download image"
            ]
          }
        )
      ] })
    ] }) }),
    isSuccessModalOpen && /* @__PURE__ */ jsx(DownloadSuccessModal, { close: closeSuccessModal })
  ] });
}
function EditorArea() {
  const coverImageNodeRef = useRef(null);
  return /* @__PURE__ */ jsxs(Flex, { direction: { base: "column-reverse", md: "row" }, children: [
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(EditorDrawer, { imageNodeRef: coverImageNodeRef }) }),
    /* @__PURE__ */ jsx(CoverImage, { imageNodeRef: coverImageNodeRef })
  ] });
}
const editorOpenStateCookie = createCookie("editor-open-state", {
  maxAge: 604800
  // 1 week
});
async function loader({ request }) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await editorOpenStateCookie.parse(cookieHeader) || {};
  return { openItems: cookie.openItems };
}
async function action({ request }) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await editorOpenStateCookie.parse(cookieHeader) || {};
  cookie.openItems = cookie.openItems = formData.get("openItems");
  return new Response("", {
    headers: {
      "Set-Cookie": await editorOpenStateCookie.serialize(cookie)
    }
  });
}
const meta = () => {
  return [
    { title: "CoverSnap | Easily Create Blog Cover Images" },
    {
      name: "description",
      content: "Use the clean and easy-to-use editing tools to build your cover image. Download it when you are ready. Jump in!"
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
          /* @__PURE__ */ jsx(Anchor, { component: Link, to: "/", "aria-label": "CoverSnap logo", children: /* @__PURE__ */ jsx(Image, { src: "/favicon.ico", width: 36, height: 36, alt: "CoverSnap logo" }) }),
          /* @__PURE__ */ jsxs(Flex, { gap: "xs", children: [
            /* @__PURE__ */ jsx(ColorSchemeToggle, {}),
            /* @__PURE__ */ jsx(GitHubStarButton, { visibleFrom: "md", size: "sm", variant: "light" }),
            /* @__PURE__ */ jsx(MobileGithubButton, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(EditorArea, {}) })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Create,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DYh11VBT.js", "imports": ["/assets/components-BNKHmFWC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CequxXvG.js", "imports": ["/assets/components-BNKHmFWC.js", "/assets/index-kgYb_6Zu.js", "/assets/MantineThemeProvider-C5m826AU.js"], "css": ["/assets/root-6q_rHjqV.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DA1t25TT.js", "imports": ["/assets/components-BNKHmFWC.js", "/assets/GitHubStarButton-DwhZ-WC1.js", "/assets/MantineThemeProvider-C5m826AU.js"], "css": [] }, "routes/create": { "id": "routes/create", "parentId": "root", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BgTgz5_P.js", "imports": ["/assets/components-BNKHmFWC.js", "/assets/GitHubStarButton-DwhZ-WC1.js", "/assets/MantineThemeProvider-C5m826AU.js", "/assets/index-kgYb_6Zu.js"], "css": ["/assets/route-BfB2u-cs.css"] } }, "url": "/assets/manifest-e8f82e40.js", "version": "e8f82e40" };
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
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/create": {
    id: "routes/create",
    parentId: "root",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route2
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
