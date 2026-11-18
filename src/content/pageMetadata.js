// Route copy follows the integrated page content; no new performance or client claims.
export const siteUrl = "https://nyrix.co";
const media = name => `/media/enterprise/${name}.webp`;
const page = (title, description, image = media("cover-ribbon")) => ({
  title: `NYRIX | ${title}`, description, image: `${siteUrl}${image}`,
});

export const pageMetadata = {
  "/": page("Decision sciences. Applied.", "Enterprise AI and Decision Sciences built around business decisions. Explore Nyrix products, industry applications and applied work, then start a conversation."),
  "/what-we-do": page("How we work", "Move from a business question to a working system through decision framing, AI enablement, productisation and governance with Nyrix.", media("challenge-layers")),
  "/products": page("KINLU & KINLU Voice", "Explore KINLU for predictive intelligence and KINLU Voice for Urdu and English contact-centre intelligence, with links to their capabilities and applications.", media("kinlu-flow-landscape")),
  "/products/kinlu": page("KINLU — your data science team", "Your data science team, just a prompt away. KINLU understands business questions, builds and hosts models, and returns live predictions.", media("kinlu-flow-landscape")),
  "/products/kinlu-voice": page("KINLU Voice — Urdu & English contact-centre intelligence", "Private enterprise contact-centre intelligence in natural Urdu and English, with KINLU-powered churn, segmentation, lifetime value and next-best action.", media("voice-wave-landscape")),
  "/solutions": page("Enterprise intelligence solutions", "Explore Nyrix decision domains: inventory planning, audiences, group offices, contact centres, marketing opportunities, cargo and decision sciences.", media("solutions-strip")),
  "/industries": page("Intelligence for your industry", "Explore how Nyrix approaches enterprise decisions in banking, food and beverage, insurance, legal, media, travel and pharmaceutical operations.", media("industries-band")),
  "/industries/banking-finance": page("Banking & Finance", "Customer intelligence, Urdu and English contact-centre workflows and private AI decision support for banking and finance, with relevant Nyrix products.", media("deployment-vault")),
  "/industries/food-beverage": page("Food & Beverage", "Connect demand, inventory, audience and promotion signals across food and beverage operations. Explore Nyrix planning and customer intelligence applications.", media("food-demand")),
  "/industries/insurance": page("Insurance", "Explore customer segmentation, retention, lifetime-value forecasting and service intelligence for insurance decisions, with relevant Nyrix solutions.", media("positioning-glass")),
  "/industries/legal": page("Legal", "Explore document intelligence, knowledge workflows and accountable decision support for legal teams, with human judgement and governance built into the approach.", media("model-core")),
  "/industries/media-advertising": page("Media & Advertising", "Connect audience behaviour, campaign performance and commercial opportunity to support media and advertising planning, targeting and optimisation with Nyrix.", media("solutions-strip")),
  "/industries/travel-hospitality": page("Travel & Hospitality", "Explore customer support, tariff intelligence, demand signals and operational visibility for travel and hospitality, with relevant Nyrix decision domains.", media("case-aviation-glass")),
  "/industries/pharmaceutical": page("Pharmaceutical", "Explore planning intelligence, operational monitoring and governed applied AI for pharmaceutical workflows, with ownership and control around decisions.", media("rd-research-architecture")),
  "/case-studies": page("Enterprise case studies", "Read Nyrix applied work: Gerry’s dnata tariff intelligence, an anonymous bank voice proof of concept and Genix cleanroom environmental monitoring.", media("case-aviation-glass")),
  "/case-studies/gerrys-dnata": page("Gerry’s dnata — Customer Support & Tariff Intelligence", "Customer support and tariff intelligence for Gerry’s dnata: plain-language answers from fragmented tariff knowledge with escalation for uncertain cases.", media("case-aviation-glass")),
  "/case-studies/private-bank-voice-poc": page("Private voice intelligence — bank proof of concept", "A KINLU Voice proof of concept inside a leading local bank. Client name withheld. Private Urdu and English conversation intelligence with a predictive layer.", media("poc-voice-panels")),
  "/case-studies/cleanroom-ems": page("Genix — Cleanroom Environmental Monitoring", "Environmental monitoring for Genix pharmaceutical cleanrooms, connecting telemetry with an operational web interface.", "/media/work-cleanroom-v2.webp"),
  "/company": page("About Nyrix", "Meet Nyrix, a Decision Sciences and Applied AI company. Explore the team, advisors and research behind products and enterprise delivery.", media("positioning-glass")),
  "/company/team": page("Our team", "Meet the Nyrix team working across product vision, solution architecture, machine learning, accounts and finance.", "/media/nyrix-team-illustration.png"),
  "/company/advisors": page("Our advisors", "Meet Nyrix advisors Shamsul Islam and Shaikh Mashhood Rahman, bringing perspectives on corporate governance, strategic finance and enterprise technology.", "/media/nyrix-advisors-illustration.png"),
  "/company/research": page("Research & development", "Research depth for applied enterprise AI: applied research, model development and a connection between academic thinking and enterprise delivery.", media("rd-research-architecture")),
  "/careers": page("Careers in applied AI", "Introduce yourself to Nyrix and share your resume, portfolio and the applied AI work you would like to do. General expressions of interest welcome.", "/media/careers-structure-1536.webp"),
  "/resources": page("Insights", "Explore Nyrix insights: articles and publications on AI engineering, plus The Next Question conversations with researchers and practitioners.", "/media/nyrix-explore-main-illustration.png"),
  "/resources/articles": page("Articles & publications", "Read Huzaifa Faran’s articles and publications on AI infrastructure, product development and enterprise software, including the TechNova Infrastructure Series.", "/media/nyrix-publications-illustration.png"),
  "/resources/podcasts": page("The Next Question", "Explore The Next Question, hosted by Huzaifa Faran, with conversations about AI research, engineering, careers and the work behind technology.", "/media/nyrix-podcast-illustration.png"),
  "/agents": page("Agent library", "Browse the Nyrix agent library by category or search. Explore agent capabilities, inspect individual details and follow available demonstration links.", media("model-core")),
  "/contact": page("Start a conversation", "Bring us the decision that matters. Speak with Nyrix about the business problem, workflow or customer experience you want to improve.", media("close-horizon")),
  "/privacy-policy": page("Privacy policy", "Read the Nyrix privacy policy for information about website data, enquiry handling, cookies and the contact details for NYRIX AI PRIVATE LIMITED."),
};

export function getPageMetadata(pathname = "/") {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "").toLowerCase() || "/";
  const entry = pageMetadata[path];
  const url = `${siteUrl}${path}`;
  return entry
    ? { ...entry, url, canonical: url, robots: "index,follow" }
    : { ...page("Page not found", "This page could not be found. Explore Nyrix products, industries and decision sciences, or contact the team for help."), url, canonical: null, robots: "noindex,follow" };
}
