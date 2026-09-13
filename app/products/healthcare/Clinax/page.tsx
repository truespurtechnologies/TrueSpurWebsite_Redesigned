import { permanentRedirect } from "next/navigation"

// The Clinax product experience now lives at the canonical public route
// `/clinax`. This legacy path is kept (rather than deleted) so old links and
// search engine indexes are redirected instead of 404ing.
export default function ClinaxLegacyRedirect() {
  permanentRedirect("/clinax")
}
