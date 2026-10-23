export const filters = [
  "All",
  "AI & Automation",
  "Audit & Risk",
  "Data Engineering",
] as const;
export type Category = (typeof filters)[number];
export const projects: {
  title: string;
  name: string;
  context: string;
  category: Category;
  description: string;
  tags: string[];
  number: string;
  outcome: string;
  approach: string;
  contribution: string;
}[] = [
  {
    title: "An audit assistant that speaks your language.",
    name: "Agentic AI Audit Assistant",
    context:
      "Audit stakeholders needed a natural-language way to retrieve status, owners, and handlers from the IA3 tracker.",
    category: "AI & Automation",
    description:
      "An LLM-connected assistant for the IA3 status tracker. Ask about audit status, assigned owners, and current handlers in natural language.",
    tags: ["Agentic AI", "LLM", "IA3"],
    number: "01",
    outcome: "Natural-language audit intelligence",
    approach:
      "Connected natural-language queries to IA3 audit and contingency tracking information.",
    contribution:
      "Developed the assistant interaction to retrieve audit status, assigned owners, and current handlers.",
  },
  {
    title: "Less chasing. More progress.",
    name: "Dap\u2019er Workflow Automation",
    context:
      "Recurring workflow tracking and manual follow-ups created an opportunity for process automation.",
    category: "AI & Automation",
    description:
      "Dap’er automates workflow tracking and reporting, bringing follow-ups into one consistent process.",
    tags: ["Power Automate", "SharePoint"],
    number: "02",
    outcome: "40% less manual follow-up effort",
    approach:
      "Mapped recurring workflow tracking and follow-up steps into Power Automate and SharePoint.",
    contribution:
      "Built the automation and reporting workflow, reducing manual follow-up effort by 40%.",
  },
  {
    title: "A clearer view of assurance.",
    name: "Aligned Assurance Dashboard",
    context:
      "Assurance metrics needed a consolidated view for audit and compliance reporting.",
    category: "Audit & Risk",
    description:
      "Aligned Assurance dashboards consolidate assurance metrics for audit and compliance reporting.",
    tags: ["Power BI", "BigQuery", "SQL"],
    number: "03",
    outcome: "Connected assurance reporting",
    approach:
      "Combined SQL and BigQuery analytics with Power BI reporting for assurance metrics.",
    contribution:
      "Built the analytics and dashboards supporting audit and compliance reporting.",
  },
  {
    title: "Legacy analytics, re-engineered.",
    name: "Legacy Analytics Conversion",
    context:
      "Legacy Type B analytics needed conversion into standardized, business-ready Type A reporting.",
    category: "Data Engineering",
    description:
      "Converted Type B analytics to Type A, standardizing legacy outputs into business-ready reporting.",
    tags: ["ETL/ELT", "BigQuery", "Power BI"],
    number: "04",
    outcome: "Standardized analytics delivery",
    approach:
      "Reworked legacy Type B analytics into Type A outputs using SQL, BigQuery, Power BI, and Excel.",
    contribution:
      "Converted and standardized reporting outputs to make legacy analytics business-ready.",
  },
  {
    title: "Find the signal in campaign data.",
    name: "Campaign & Audience Intelligence",
    context:
      "Campaign performance and audience analysis depended on connecting SQL and Salesforce data.",
    category: "Data Engineering",
    description:
      "Campaign and audience reporting combines SQL and Salesforce data for performance tracking and segmentation.",
    tags: ["SQL", "Salesforce", "Power BI"],
    number: "05",
    outcome: "Campaign & audience intelligence",
    approach:
      "Combined SQL and Salesforce data into Power BI reporting for campaign and audience analysis.",
    contribution:
      "Delivered campaign performance and audience segmentation reporting at Commvault.",
  },
  {
    title: "Risk visibility across functions.",
    name: "Cross-functional Risk Analytics",
    context:
      "Risk reviews needed control-gap visibility across HR, Finance, Procurement, and Payroll.",
    category: "Audit & Risk",
    description:
      "Fraud-risk analytics surfaces control gaps across HR, Finance, Procurement, and Payroll to support risk reviews.",
    tags: ["Risk Analytics", "Python", "SQL"],
    number: "06",
    outcome: "Four functions. Connected insights.",
    approach:
      "Analyzed HR, Finance, Procurement, and Payroll data to surface potential control gaps.",
    contribution:
      "Built fraud-risk analytics that support risk reviews across four business functions.",
  },
];
export const experience = [
  {
    company: "Accenture",
    role: "BI Engineering Lead",
    date: "Jan 2024 — Present",
    detail:
      "Leading BI and analytics supporting 50–60 audits per fiscal year. Building fraud-risk analytics, executive dashboards, and AI-enabled audit tools.",
    points: [
      "40% reduction in recurring report preparation time through automation.",
      "Directly managing and mentoring two analysts in a five-member analytics team.",
      "Connecting audit, business, and engineering stakeholders around actionable insights.",
    ],
  },
  {
    company: "Commvault",
    role: "Database Segment Specialist",
    date: "May 2021 — Jan 2024",
    detail:
      "Delivered client data projects, SQL Server ETL pipelines, and interactive business intelligence.",
    points: [
      "Built validated data pipelines with reusable transformations.",
      "Developed campaign and audience dashboards using SQL, Power BI, and Salesforce.",
      "Standardized SOPs to address recurring data-quality gaps.",
    ],
  },
  {
    company: "Amazon",
    role: "Business Intelligence Analyst",
    date: "Apr 2017 — May 2021",
    detail:
      "Turned operational and commercial data into dashboards, reusable reporting, and pricing insights.",
    points: [
      "Led a team delivering mappings and transformations across SQL Server, Oracle, and spreadsheets.",
      "Led CAPA sessions to address recurring data and reporting issues.",
      "Earlier: Product/Pricing Analyst · Apr 2015 — Apr 2017.",
    ],
  },
];
