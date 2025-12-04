
import * as Sentry from "@sentry/node";




Sentry.init({
  dsn: "https://685d58671c3dfec9189a0e090ac843bf@o4510189802684416.ingest.de.sentry.io/4510189809958992",
  // integrations : [
  //   Sentry.momgooseIntegration()
   
  // ]
    integrations: [Sentry.mongooseIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

export default Sentry;