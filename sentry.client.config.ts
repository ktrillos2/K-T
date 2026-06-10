// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://12fabd06a40e3bdccb92bc966081e55a@o4510797166870528.ingest.us.sentry.io/4510797167591424",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1, // Reduced from 1.0 to avoid performance impact

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
        Sentry.replayIntegration({
            // Additional Replay configuration goes here,
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
