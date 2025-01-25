import '@mantine/core/styles.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from 'react-router';
import type { LinksFunction } from 'react-router';
import { Box, ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from '@mantine/core';
import { ToastProvider } from '~/shared/providers/ToastProvider';
import { DOMAIN } from '~/config/consts';
import { Navbar } from './shared/layouts/Navbar';

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
  primaryColor: 'grape',
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
        radius: 'xl'
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 'xl'
      }
    },
    Select: {
      defaultProps: {
        radius: 'xl',
        size: 'md'
      },
      styles: {
        dropdown: {
          borderRadius: '12px'
        },
        option: {
          borderRadius: '8px'
        }
      }
    },
    SelectItem: {
      defaultProps: {
        radius: 'xl'
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'xl',
        size: 'md'
      }
    },
    ColorInput: {
      defaultProps: {
        radius: 'xl',
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
        size: 'md',
        radius: 'xl'
      }
    },
    FileInput: {
      defaultProps: {
        size: 'md',
        radius: 'xl'
      }
    },
    Skeleton: {
      defaultProps: {
        radius: 'xl'
      }
    }
  }
});

export function Layout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content={'/og-image.png'} />
        <meta property="og:image:alt" content="CvrSnap - Create blog post cover images in seconds" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:site_name" content="CvrSnap" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@Kieran6Dev" />
        <meta name="twitter:site" content="@Kieran6dev" />
        <meta name="twitter:domain" content={DOMAIN} />

        <ColorSchemeScript defaultColorScheme="dark" />
        <Meta />
        <Links />
        {isProd ? (
          <script defer data-domain={DOMAIN} data-api="/api/event" src="/js/script.tagged-events.js"></script>
        ) : null}
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <ToastProvider />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function HydrateFallback() {
  return (
    <MantineProvider>
      <Navbar />
      <Box component="main" style={{ minHeight: 'calc(100vh - 69px)' }} />
    </MantineProvider>
  );
}
