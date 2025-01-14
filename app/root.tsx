import '@mantine/core/styles.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Toaster } from 'sonner';

export const links: LinksFunction = () => [
  {
    rel: 'apple-touch-icon',
    href: '/apple-touch-icon.png',
    sizes: '180x180'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon-32x32.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon-16x16.png',
    sizes: '16x16'
  },
  { rel: 'manifest', href: '/site.webmanifest' }
];

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  primaryColor: 'indigo',
  primaryShade: 7,
  components: {
    InputLabel: {
      defaultProps: {
        mb: 2
      }
    },
    Fieldset: {
      defaultProps: {
        variant: 'unstyled'
      },
      styles: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--mantine-spacing-md)'
        },
        legend: {
          fontSize: 'var(--mantine-font-size-lg)',
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
        c: 'var(--mantine-color-text)'
      }
    },
    Title: {
      defaultProps: {
        c: 'var(--mantine-color-text)'
      }
    },
    Button: {
      defaultProps: {
        radius: 'md'
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md'
      }
    },
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    ColorInput: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    ScrollArea: {
      defaultProps: {
        scrollbarSize: 10
      }
    },
    NumberInput: {
      defaultProps: {
        size: 'md'
      }
    },
    FileInput: {
      defaultProps: {
        size: 'md'
      }
    },
    SegmentedControl: {
      defaultProps: {
        radius: 'md'
      }
    }
  },
  defaultRadius: 'md'
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <Toaster />
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
