import { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

// ─── Dataset ────────────────────────────────────────────────────────────────
const DS = {"scenario":{"company":"Nexova Technologies","category":"IT Hardware — Laptops, Monitors & Peripherals","rfx_id":"RFQ-2026-IT-0047","budget_ceiling":4200000},"vendors":[{"id":"V1","name":"Crestline Systems Pvt. Ltd.","hq":"Bengaluru, India","years_in_business":14,"profile":"Mid-size IT hardware distributor, strong in South India, ISO 9001 certified. Known for reliable delivery but not the cheapest."},{"id":"V2","name":"Orbitex Technologies Ltd.","hq":"Mumbai, India","years_in_business":9,"profile":"Aggressive pricing, pan-India reach. Has had delivery delays in past quarters. Missing several compliance certifications."},{"id":"V3","name":"Pinnacle InfoSolutions","hq":"Delhi, India","years_in_business":21,"profile":"Oldest vendor in the mix. Premium pricing, excellent certifications, slow but dependable. Strong after-sales."},{"id":"V4","name":"SwiftEdge Procurement Co.","hq":"Pune, India","years_in_business":5,"profile":"Newest entrant. Suspiciously low prices across the board, claims fast delivery — but thin track record. Red flag vendor."},{"id":"V5","name":"Meridian Tech Supplies","hq":"Hyderabad, India","years_in_business":11,"profile":"Solid mid-market option. Good certifications, average pricing, some line items not quoted."}],"line_items":[{"id":"LI-01","category":"Laptop","description":"Business Laptop 14\" — Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro","quantity":120,"unit":"nos","bids":{"V1":{"unit_price":68500,"lead_time_days":18,"warranty_years":3},"V2":{"unit_price":61200,"lead_time_days":35,"warranty_years":2},"V3":{"unit_price":72000,"lead_time_days":21,"warranty_years":3},"V4":{"unit_price":55000,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":67000,"lead_time_days":22,"warranty_years":2}}},{"id":"LI-02","category":"Laptop","description":"Performance Laptop 15\" — Core i7, 32GB RAM, 1TB SSD","quantity":45,"unit":"nos","bids":{"V1":{"unit_price":112000,"lead_time_days":21,"warranty_years":3},"V2":{"unit_price":99500,"lead_time_days":40,"warranty_years":2},"V3":{"unit_price":118000,"lead_time_days":25,"warranty_years":3},"V4":{"unit_price":88000,"lead_time_days":12,"warranty_years":3},"V5":{"unit_price":108000,"lead_time_days":24,"warranty_years":3}}},{"id":"LI-03","category":"Laptop","description":"Ultrabook 13\" — Core i5, 16GB RAM, 256GB SSD","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":78000,"lead_time_days":18,"warranty_years":2},"V2":{"unit_price":69000,"lead_time_days":38,"warranty_years":1},"V3":{"unit_price":82000,"lead_time_days":20,"warranty_years":3},"V4":{"unit_price":61000,"lead_time_days":10,"warranty_years":3},"V5":null}},{"id":"LI-04","category":"Laptop","description":"Developer Workstation 16\" — Core i9, 64GB RAM, 2TB SSD, Linux","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":195000,"lead_time_days":30,"warranty_years":3},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3},"V4":{"unit_price":162000,"lead_time_days":14,"warranty_years":3},"V5":{"unit_price":188000,"lead_time_days":32,"warranty_years":2}}},{"id":"LI-05","category":"Monitor","description":"24\" FHD Monitor — IPS, 75Hz, HDMI+DP","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":14500,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":12800,"lead_time_days":28,"warranty_years":2},"V3":{"unit_price":15200,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":11200,"lead_time_days":8,"warranty_years":3},"V5":{"unit_price":13900,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-06","category":"Monitor","description":"27\" QHD Monitor — IPS, 144Hz, USB-C 65W","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":28500,"lead_time_days":18,"warranty_years":3},"V2":{"unit_price":25200,"lead_time_days":35,"warranty_years":2},"V3":{"unit_price":31000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":21500,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":27000,"lead_time_days":20,"warranty_years":2}}},{"id":"LI-07","category":"Monitor","description":"32\" 4K Monitor — VA, 60Hz, HDMI 2.1","quantity":25,"unit":"nos","bids":{"V1":{"unit_price":42000,"lead_time_days":22,"warranty_years":3},"V2":null,"V3":{"unit_price":46500,"lead_time_days":28,"warranty_years":3},"V4":{"unit_price":34000,"lead_time_days":12,"warranty_years":3},"V5":{"unit_price":40500,"lead_time_days":25,"warranty_years":2}}},{"id":"LI-08","category":"Monitor","description":"Dual Monitor Stand — Adjustable, steel base","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":3800,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":3100,"lead_time_days":20,"warranty_years":1},"V3":{"unit_price":4200,"lead_time_days":12,"warranty_years":2},"V4":{"unit_price":2600,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":3600,"lead_time_days":14,"warranty_years":1}}},{"id":"LI-09","category":"Peripheral","description":"Wireless Keyboard + Mouse Combo","quantity":250,"unit":"sets","bids":{"V1":{"unit_price":2200,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":1800,"lead_time_days":18,"warranty_years":1},"V3":{"unit_price":2500,"lead_time_days":12,"warranty_years":2},"V4":{"unit_price":1500,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":2100,"lead_time_days":11,"warranty_years":1}}},{"id":"LI-10","category":"Peripheral","description":"USB-C Docking Station — 12-in-1, 4K, 100W PD","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":15,"warranty_years":2},"V2":{"unit_price":7200,"lead_time_days":30,"warranty_years":1,"notes":"Grey market risk"},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":2},"V4":{"unit_price":6000,"lead_time_days":9,"warranty_years":2},"V5":{"unit_price":8000,"lead_time_days":17,"warranty_years":2}}},{"id":"LI-11","category":"Peripheral","description":"Noise-Cancelling Headset — USB + 3.5mm","quantity":180,"unit":"nos","bids":{"V1":{"unit_price":4500,"lead_time_days":12,"warranty_years":1},"V2":{"unit_price":3800,"lead_time_days":22,"warranty_years":1},"V3":{"unit_price":5100,"lead_time_days":15,"warranty_years":2},"V4":{"unit_price":3000,"lead_time_days":8,"warranty_years":2},"V5":null}},{"id":"LI-12","category":"Peripheral","description":"Webcam — 1080p, autofocus","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":3200,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":2700,"lead_time_days":20,"warranty_years":1},"V3":{"unit_price":3500,"lead_time_days":14,"warranty_years":1},"V4":{"unit_price":2100,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":3000,"lead_time_days":12,"warranty_years":1}}},{"id":"LI-13","category":"Peripheral","description":"Laptop Bag — 15.6\", water-resistant","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":1800,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":1400,"lead_time_days":15,"warranty_years":1},"V3":null,"V4":{"unit_price":1100,"lead_time_days":5,"warranty_years":1},"V5":{"unit_price":1700,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-14","category":"Peripheral","description":"USB-A Hub — 7-port, USB 3.0","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":1500,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":1200,"lead_time_days":18,"warranty_years":1},"V3":{"unit_price":1700,"lead_time_days":10,"warranty_years":2},"V4":{"unit_price":950,"lead_time_days":6,"warranty_years":2},"V5":{"unit_price":1400,"lead_time_days":10,"warranty_years":1}}},{"id":"LI-15","category":"Peripheral","description":"Portable SSD — 1TB, USB 3.2 Gen2","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":7800,"lead_time_days":12,"warranty_years":3},"V2":{"unit_price":6500,"lead_time_days":25,"warranty_years":2},"V3":{"unit_price":8200,"lead_time_days":16,"warranty_years":3},"V4":{"unit_price":5200,"lead_time_days":9,"warranty_years":3},"V5":{"unit_price":7500,"lead_time_days":14,"warranty_years":2}}},{"id":"LI-16","category":"Networking","description":"Business WiFi Router — WiFi 6","quantity":30,"unit":"nos","bids":{"V1":{"unit_price":12000,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":10200,"lead_time_days":30,"warranty_years":2},"V3":{"unit_price":13500,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":8500,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":11500,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-17","category":"Networking","description":"Network Switch — 24-port Gigabit","quantity":15,"unit":"nos","bids":{"V1":{"unit_price":18500,"lead_time_days":18,"warranty_years":3},"V2":null,"V3":{"unit_price":21000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":14500,"lead_time_days":11,"warranty_years":3},"V5":{"unit_price":17800,"lead_time_days":20,"warranty_years":2}}},{"id":"LI-18","category":"Networking","description":"Cat6 Ethernet Cable — 305m box","quantity":20,"unit":"boxes","bids":{"V1":{"unit_price":4200,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":3500,"lead_time_days":15,"warranty_years":1},"V3":{"unit_price":4800,"lead_time_days":10,"warranty_years":1},"V4":{"unit_price":2900,"lead_time_days":6,"warranty_years":1},"V5":{"unit_price":4000,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-19","category":"Power","description":"UPS — 1KVA, online double conversion","quantity":40,"unit":"nos","bids":{"V1":{"unit_price":15500,"lead_time_days":20,"warranty_years":2},"V2":{"unit_price":13000,"lead_time_days":38,"warranty_years":1},"V3":{"unit_price":17000,"lead_time_days":25,"warranty_years":3},"V4":{"unit_price":10500,"lead_time_days":12,"warranty_years":2},"V5":{"unit_price":14500,"lead_time_days":22,"warranty_years":2}}},{"id":"LI-20","category":"Power","description":"Surge Protector Strip — 6-outlet","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":850,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":680,"lead_time_days":14,"warranty_years":1},"V3":{"unit_price":950,"lead_time_days":8,"warranty_years":2},"V4":{"unit_price":520,"lead_time_days":5,"warranty_years":2},"V5":{"unit_price":800,"lead_time_days":8,"warranty_years":1}}},{"id":"LI-21","category":"Printing","description":"Laser Printer — B&W, A4, duplex","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":22000,"lead_time_days":15,"warranty_years":2},"V2":{"unit_price":19000,"lead_time_days":30,"warranty_years":1},"V3":{"unit_price":24500,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":15500,"lead_time_days":9,"warranty_years":2},"V5":{"unit_price":21000,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-22","category":"Printing","description":"Color MFP — A4, scan/copy/fax","quantity":10,"unit":"nos","bids":{"V1":{"unit_price":38000,"lead_time_days":18,"warranty_years":2},"V2":{"unit_price":32000,"lead_time_days":35,"warranty_years":1},"V3":{"unit_price":42000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":26000,"lead_time_days":11,"warranty_years":2},"V5":null}},{"id":"LI-23","category":"Printing","description":"Toner Cartridge — High yield black x10","quantity":50,"unit":"packs","bids":{"V1":{"unit_price":5500,"lead_time_days":8,"warranty_years":1,"notes":"OEM brand"},"V2":{"unit_price":4200,"lead_time_days":15,"warranty_years":1},"V3":{"unit_price":6000,"lead_time_days":10,"warranty_years":1,"notes":"OEM brand"},"V4":{"unit_price":3200,"lead_time_days":6,"warranty_years":1,"notes":"Unbranded — origin not disclosed"},"V5":{"unit_price":5000,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-24","category":"Storage","description":"NAS Device — 4-bay, diskless","quantity":8,"unit":"nos","bids":{"V1":{"unit_price":45000,"lead_time_days":25,"warranty_years":3},"V2":null,"V3":{"unit_price":52000,"lead_time_days":30,"warranty_years":3},"V4":{"unit_price":36000,"lead_time_days":14,"warranty_years":3},"V5":{"unit_price":43000,"lead_time_days":28,"warranty_years":2}}},{"id":"LI-25","category":"Storage","description":"HDD — 4TB, 7200 RPM, for NAS","quantity":32,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":7200,"lead_time_days":28,"warranty_years":2},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":5800,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":8000,"lead_time_days":15,"warranty_years":2}}},{"id":"LI-26","category":"Collaboration","description":"Video Conferencing Bar — 4K + speaker","quantity":12,"unit":"nos","bids":{"V1":{"unit_price":52000,"lead_time_days":22,"warranty_years":2},"V2":{"unit_price":45000,"lead_time_days":40,"warranty_years":1},"V3":{"unit_price":58000,"lead_time_days":28,"warranty_years":3},"V4":{"unit_price":38000,"lead_time_days":12,"warranty_years":2},"V5":{"unit_price":50000,"lead_time_days":25,"warranty_years":2}}},{"id":"LI-27","category":"Collaboration","description":"Interactive Display — 75\", 4K touch","quantity":6,"unit":"nos","bids":{"V1":{"unit_price":185000,"lead_time_days":30,"warranty_years":3},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3},"V4":{"unit_price":148000,"lead_time_days":15,"warranty_years":3},"V5":{"unit_price":175000,"lead_time_days":32,"warranty_years":2}}},{"id":"LI-28","category":"Security","description":"Hardware Security Key — FIDO2, USB-A + NFC","quantity":300,"unit":"nos","bids":{"V1":{"unit_price":3500,"lead_time_days":12,"warranty_years":2},"V2":{"unit_price":2900,"lead_time_days":22,"warranty_years":1},"V3":{"unit_price":4000,"lead_time_days":15,"warranty_years":2},"V4":{"unit_price":2200,"lead_time_days":8,"warranty_years":2,"notes":"Brand not disclosed"},"V5":{"unit_price":3300,"lead_time_days":13,"warranty_years":1}}},{"id":"LI-29","category":"Security","description":"Laptop Lock — Kensington-compatible","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":800,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":650,"lead_time_days":14,"warranty_years":1},"V3":{"unit_price":900,"lead_time_days":9,"warranty_years":1},"V4":{"unit_price":480,"lead_time_days":5,"warranty_years":1},"V5":{"unit_price":750,"lead_time_days":8,"warranty_years":1}}},{"id":"LI-30","category":"Accessories","description":"Laptop Cooling Pad — 15.6\", dual fan","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":1200,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":950,"lead_time_days":16,"warranty_years":1},"V3":null,"V4":{"unit_price":720,"lead_time_days":6,"warranty_years":1},"V5":{"unit_price":1100,"lead_time_days":9,"warranty_years":1}}}],"questionnaire":{"questions":[{"id":"Q1","text":"Payment terms?"},{"id":"Q2","text":"Volume discounts?"},{"id":"Q3","text":"DOA return/replacement policy?"},{"id":"Q4","text":"Authorized reseller?"},{"id":"Q5","text":"Certifications held?"},{"id":"Q6","text":"After-sales support model?"},{"id":"Q7","text":"Enterprise references (last 2 years)?"},{"id":"Q8","text":"Policy on import/customs delays?"},{"id":"Q9","text":"Pan-India delivery?"},{"id":"Q10","text":"Financial stability?"}],"responses":{"V1":{"Q1":"Net 45 days. 1.5% discount within 10 days.","Q2":"3% above 25L, 5% above 50L.","Q3":"DOA within 72hr, no questions asked.","Q4":"Yes, fully authorized.","Q5":"ISO 9001:2015, MSME, GeM registered.","Q6":"Dedicated AM. L1 4hr, L2 on-site 48hr. SLA penalty clause.","Q7":"Infosys BPO (2025), Wipro (2024), Mphasis (2025).","Q8":"Local buffer stock maintained.","Q9":"Yes, all 28 states + 8 UTs.","Q10":"Turnover 42Cr FY2025. CRISIL BBB+."},"V2":{"Q1":"Net 30 days.","Q2":"Not formalized.","Q3":"7 working days. Customer pays return shipping.","Q4":"Most brands. Some via distributors.","Q5":"No ISO. GST only.","Q6":"Email only. 24-48hr. No formal SLA.","Q7":"Mid-size companies. References not available.","Q8":"Import delays passed to customer. No buffer stock.","Q9":"Most cities. Tier-2/3 surcharge.","Q10":"Turnover 18Cr approx. No credit rating."},"V3":{"Q1":"Net 60 days.","Q2":"2% above 30L, 4% above 75L.","Q3":"DOA 48hr, reverse pickup at our cost.","Q4":"Yes, all 14 brands. Gold partner with 3 OEMs.","Q5":"ISO 9001:2015, ISO 14001:2015, SA8000, NSIC.","Q6":"Named AM + backup. 2hr SLA. On-site 24hr metro.","Q7":"TCS (2025), L&T (2024), HDFC Life (2025).","Q8":"90-day rolling buffer for all A-category items.","Q9":"Own logistics 6 metros. 3PL rest.","Q10":"Turnover 95Cr FY2025. ICRA A-."},"V4":{"Q1":"Net 15 days preferred.","Q2":"Flat 7% on all orders above 10L.","Q3":"DOA 24hr, no paperwork.","Q4":"Multiple channels. Select brands only.","Q5":"ISO 9001:2015 (pending renewal), MSME, Startup India.","Q6":"WhatsApp + email. 1hr response. On-site 12hr pan-India.","Q7":"50+ enterprise clients. Reference list after NDA only.","Q8":"Guarantee delivery regardless of import status.","Q9":"Yes, pan-India.","Q10":"Turnover 8Cr FY2025. No credit rating."},"V5":{"Q1":"Net 45 days. 2% discount within 15 days.","Q2":"3% above 20L, 4.5% above 40L.","Q3":"DOA 5 working days. Reverse pickup arranged.","Q4":"Primary brands authorized. Two via sub-distributors.","Q5":"ISO 9001:2015, GeM, MSME.","Q6":"Dedicated AM. 8hr SLA. Same-day on-site Hyd/BLR.","Q7":"Cognizant (2024), Minda Industries (2025).","Q8":"Partial buffer. High-import items may vary 5-7 days.","Q9":"Yes. Surcharge Tier-3 + North-East.","Q10":"Turnover 31Cr FY2025. No formal rating."}}},"attached_documents":[{"vendor_id":"V1","doc_type":"ISO Certificate","summary":"ISO 9001:2015 by Bureau Veritas. Valid March 2028."},{"vendor_id":"V3","doc_type":"ISO Certificate","summary":"ISO 9001:2015 + ISO 14001:2015 by DNV. Valid August 2028."},{"vendor_id":"V4","doc_type":"Company Registration","summary":"Startup India DPIIT. Incorporated April 2020. Capital 50L."},{"vendor_id":"V5","doc_type":"ISO Certificate","summary":"ISO 9001:2015 by TUV SUD. Expires November 2026."}],"red_flags":[{"vendor_id":"V4","flag":"Pricing 18-25% below market — implausible for 8Cr turnover company"},{"vendor_id":"V4","flag":"ISO 9001 pending renewal — not confirmed active"},{"vendor_id":"V4","flag":"References only after NDA — evasive"},{"vendor_id":"V4","flag":"Authorization for select brands only"},{"vendor_id":"V4","flag":"Toner cartridges unbranded, origin undisclosed — counterfeit risk"},{"vendor_id":"V4","flag":"Hardware security key brand not disclosed — critical for FIDO2"},{"vendor_id":"V2","flag":"5 line items not quoted (LI-04, LI-07, LI-17, LI-24, LI-27)"},{"vendor_id":"V2","flag":"No ISO certification — only vendor with zero quality certs"},{"vendor_id":"V2","flag":"No client references provided"},{"vendor_id":"V2","flag":"USB-C docking station grey market risk"},{"vendor_id":"V3","flag":"Net 60-day payment terms — longest in pool"},{"vendor_id":"V5","flag":"ISO certificate expires November 2026 — within contract period"},{"vendor_id":"V5","flag":"4 line items not quoted (LI-03, LI-11, LI-22, LI-30)"}]};

// ─── Pre-compute ─────────────────────────────────────────────────────────────
const V = DS.vendors;
const IT = DS.line_items;
const CATS = [...new Set(IT.map(i => i.category))];
const FLAG_COUNTS = {};
V.forEach(v => { FLAG_COUNTS[v.id] = DS.red_flags.filter(r => r.vendor_id === v.id).length; });
const TOTALS = {};
V.forEach(v => { TOTALS[v.id] = 0; IT.forEach(item => { const b = item.bids[v.id]; if (b) TOTALS[v.id] += b.unit_price * item.quantity; }); });
const LEAD_AVGS = {};
V.forEach(v => { const t = IT.map(i => i.bids[v.id]?.lead_time_days).filter(Boolean); LEAD_AVGS[v.id] = t.reduce((a, b) => a + b, 0) / t.length; });
const CC = ["#378add", "#1d9e75", "#ba7517", "#a22d2d", "#6349b7"];

// ─── System prompt (built once at module level) ───────────────────────────────
const SYSTEM_PROMPT = (() => {
  const facts = V.map(v => {
    const m = IT.filter(i => !i.bids[v.id]).length;
    return `${v.id}(${v.name}): total=${Math.round(TOTALS[v.id]/100000)}L missing=${m}/30 avg_lead=${LEAD_AVGS[v.id].toFixed(1)}d`;
  }).join('\n');
  return `You are a procurement analyst AI. Analyze RFQ-2026-IT-0047 for Nexova Technologies (IT Hardware, budget 42L).

VENDORS:
${V.map(v => `${v.id}: ${v.name} (${v.hq}, ${v.years_in_business}yrs) — ${v.profile}`).join('\n')}

BIDS format: vendor_id:price|lead_days|warranty_yr (NOT_QUOTED=no bid):
${IT.map(item => {
    const b = V.map(v => { const bid = item.bids[v.id]; return bid ? `${v.id}:${bid.unit_price}|${bid.lead_time_days}d|${bid.warranty_years}yr${bid.notes ? '|' + bid.notes : ''}` : `${v.id}:NOT_QUOTED`; }).join(' ');
    return `${item.id}[${item.category}] ${item.description} qty:${item.quantity}${item.unit} >> ${b}`;
  }).join('\n')}

QUESTIONNAIRE:
${DS.questionnaire.questions.map(q => {
    const a = V.map(v => `${v.id}:"${DS.questionnaire.responses[v.id]?.[q.id] || 'No response'}"`).join(' ');
    return `${q.id}(${q.text}): ${a}`;
  }).join('\n')}

DOCUMENTS:
${DS.attached_documents.map(d => `${d.vendor_id}|${d.doc_type}:${d.summary}`).join('\n')}

RED FLAGS:
${DS.red_flags.map(r => `${r.vendor_id}: ${r.flag}`).join('\n')}

PRE-COMPUTED TOTALS:
${facts}

INSTRUCTIONS: Answer ONLY from data above. Never invent numbers.

OUTPUT FORMAT: You MUST respond with ONLY a JSON object. No markdown. No backticks. No explanation text. The response must start with { and end with }.

Schema:
{"answer_type":"text|table|chart|mixed","summary":"2-3 sentence insight","data":null,"flags":[],"confidence":"high|medium|low"}

For table: "data":{"columns":["Col1"],"rows":[["cell"]]}
For chart: "data":{"chart_type":"bar|pie","title":"","series":[{"name":"","data":[{"label":"","value":0}]}]}
For mixed: include data field with table or chart structure.

Rules: Lead with insight. Always flag V4 risks. Use Indian number format. confidence: high=direct data, medium=inference, low=judgment.`;
})();

// ─── JSON extractor ───────────────────────────────────────────────────────────
function extractJSON(text) {
  if (!text) return null;
  try { return JSON.parse(text.trim()); } catch {}
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) { try { return JSON.parse(fenced[1].trim()); } catch {} }
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s !== -1 && e > s) { try { return JSON.parse(text.slice(s, e + 1)); } catch {} }
  // If all parsing fails, wrap raw text as a valid response object
  return { answer_type: 'text', summary: text.replace(/[{}"\[\]]/g, '').substring(0, 500), data: null, flags: [], confidence: 'low' };
}

// ─── CSV download ─────────────────────────────────────────────────────────────
function downloadCSV() {
  const h = ["ID", "Description", "Category", "Qty", "Unit", ...V.map(v => v.name + " Price"), ...V.map(v => v.name + " Lead"), ...V.map(v => v.name + " Warranty")];
  const r = IT.map(i => [i.id, `"${i.description}"`, i.category, i.quantity, i.unit, ...V.map(v => i.bids[v.id]?.unit_price ?? 'N/A'), ...V.map(v => i.bids[v.id]?.lead_time_days ?? 'N/A'), ...V.map(v => i.bids[v.id]?.warranty_years ?? 'N/A')]);
  const csv = [h, ...r].map(x => x.join(",")).join("\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "aerchain_bids.csv"; a.click();
}

function downloadDocPDF(doc, vendor) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = 210, margin = 20, contentW = pageW - margin * 2;
  let y = 20;

  pdf.setFillColor(15, 15, 15);
  pdf.rect(0, 0, 210, 18, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('AERCHAIN PROCUREMENT PLATFORM', margin, 12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('RFQ-2026-IT-0047 — Nexova Technologies', 210 - margin, 12, { align: 'right' });

  y = 32;

  pdf.setFillColor(230, 241, 251);
  pdf.roundedRect(margin, y - 5, contentW, 14, 2, 2, 'F');
  pdf.setTextColor(24, 95, 165);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(doc.doc_type.toUpperCase(), margin + 4, y + 4);
  y += 18;

  pdf.setTextColor(17, 17, 17);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(vendor.name, margin, y);
  y += 7;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text(`${vendor.hq} · ${vendor.years_in_business} years in business`, margin, y);
  y += 12;

  pdf.setDrawColor(232, 231, 228);
  pdf.line(margin, y, pageW - margin, y);
  y += 10;

  const content = generateDocContent(doc, vendor);

  content.forEach(section => {
    if (y > 260) { pdf.addPage(); y = 20; }

    if (section.type === 'heading') {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(17, 17, 17);
      pdf.text(section.text, margin, y);
      y += 6;
      pdf.setDrawColor(55, 138, 221);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + 40, y);
      y += 6;
    } else if (section.type === 'field') {
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(100, 100, 100);
      pdf.text(section.label, margin, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(17, 17, 17);
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(section.value, contentW - 40);
      pdf.text(lines, margin + 40, y);
      y += Math.max(6, lines.length * 5);
    } else if (section.type === 'text') {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(40, 40, 40);
      const lines = pdf.splitTextToSize(section.text, contentW);
      pdf.text(lines, margin, y);
      y += lines.length * 5 + 4;
    } else if (section.type === 'spacer') {
      y += section.h || 6;
    }
  });

  pdf.setFillColor(245, 245, 243);
  pdf.rect(0, 282, 210, 15, 'F');
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.setFont('helvetica', 'normal');
  pdf.text('This document was submitted as part of RFQ-2026-IT-0047. Aerchain Procurement Platform.', margin, 291);
  pdf.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 210 - margin, 291, { align: 'right' });

  pdf.save(`${vendor.id}_${doc.doc_type.replace(/\s+/g, '_')}.pdf`);
}

function generateDocContent(doc, vendor) {
  if (doc.doc_type === 'ISO Certificate') {
    const isV5 = vendor.id === 'V5';
    const isV3 = vendor.id === 'V3';
    const certBody = vendor.id === 'V1' ? 'Bureau Veritas Certification India Pvt. Ltd.' : vendor.id === 'V3' ? 'DNV Business Assurance India Pvt. Ltd.' : 'TUV SUD South Asia Pvt. Ltd.';
    const certNum = vendor.id === 'V1' ? 'BV-ISO-2023-IN-4471' : vendor.id === 'V3' ? 'DNV-2023-BLR-0892' : 'TUV-SUD-2023-HYD-1134';
    const validUntil = vendor.id === 'V1' ? 'March 2028' : vendor.id === 'V3' ? 'August 2028' : 'November 2026';
    const standards = isV3 ? 'ISO 9001:2015, ISO 14001:2015' : 'ISO 9001:2015';
    return [
      { type: 'heading', text: 'CERTIFICATE OF CONFORMITY' },
      { type: 'text', text: `This is to certify that the Quality Management System of:` },
      { type: 'spacer', h: 4 },
      { type: 'field', label: 'Organisation:', value: vendor.name },
      { type: 'field', label: 'Address:', value: `${vendor.hq}` },
      { type: 'field', label: 'Certificate No:', value: certNum },
      { type: 'field', label: 'Standard(s):', value: standards },
      { type: 'field', label: 'Valid Until:', value: validUntil },
      { type: 'field', label: 'Issued By:', value: certBody },
      { type: 'field', label: 'Scope:', value: 'Procurement, warehousing, and distribution of IT hardware and peripherals across India.' },
      { type: 'spacer', h: 8 },
      { type: 'heading', text: 'CERTIFICATION DETAILS' },
      { type: 'text', text: `The above organisation has been assessed and found to conform to the requirements of ${standards}. This certificate is valid subject to continued surveillance audits.` },
      { type: 'spacer', h: 6 },
      isV5 ? { type: 'text', text: '⚠ NOTE: Certificate renewal is currently in progress. The organisation has been notified of the expiry date in November 2026 and renewal audit is scheduled for Q3 2026.' } : { type: 'text', text: 'This certificate was issued following a full third-party audit with zero major non-conformances identified.' },
    ];
  }

  if (doc.doc_type === 'Client Reference Letter') {
    return [
      { type: 'heading', text: 'CLIENT REFERENCE LETTER' },
      { type: 'field', label: 'Issuing Company:', value: 'Infosys BPO Limited' },
      { type: 'field', label: 'Date:', value: 'January 15, 2026' },
      { type: 'field', label: 'Reference For:', value: vendor.name },
      { type: 'spacer', h: 6 },
      { type: 'text', text: 'To Whom It May Concern,' },
      { type: 'spacer', h: 4 },
      { type: 'text', text: `This letter serves as a formal reference for ${vendor.name}, who has been a registered IT hardware vendor for Infosys BPO Limited since 2022.` },
      { type: 'spacer', h: 4 },
      { type: 'text', text: 'In FY2025-26, we engaged Crestline Systems for the procurement of 850 business laptops and 400 peripheral sets across our Bengaluru, Pune, and Chennai delivery locations. The vendor demonstrated consistent on-time delivery (98.2% SLA compliance), zero DOA incidents reported across the entire order, and responsive after-sales support with an average ticket resolution time of 6 hours.' },
      { type: 'spacer', h: 4 },
      { type: 'text', text: 'We rate Crestline Systems as EXCELLENT across all evaluation parameters: Product Quality, Delivery Reliability, After-Sales Support, and Commercial Terms.' },
      { type: 'spacer', h: 4 },
      { type: 'text', text: 'We have no hesitation in recommending them for large-scale enterprise IT hardware procurement.' },
      { type: 'spacer', h: 8 },
      { type: 'field', label: 'Signed By:', value: 'Rajesh Menon, VP Infrastructure & Procurement' },
      { type: 'field', label: 'Contact:', value: 'r.menon@infosys.com | +91-80-4116-7890' },
    ];
  }

  if (doc.doc_type === 'OEM Authorization Letter') {
    return [
      { type: 'heading', text: 'AUTHORIZED RESELLER CERTIFICATE' },
      { type: 'field', label: 'Issuing OEM:', value: 'Global Computing Technologies Pvt. Ltd. (GCT)' },
      { type: 'field', label: 'Partner Level:', value: 'GOLD PARTNER' },
      { type: 'field', label: 'Valid Period:', value: 'April 2026 – March 2027 (FY2026-27)' },
      { type: 'field', label: 'Authorized Reseller:', value: vendor.name },
      { type: 'spacer', h: 6 },
      { type: 'heading', text: 'AUTHORIZATION SCOPE' },
      { type: 'text', text: `This certifies that ${vendor.name} is an authorized Gold Partner for the sale, distribution, and after-sales support of GCT products across India.` },
      { type: 'spacer', h: 4 },
      { type: 'text', text: 'Authorized product categories include: Business Laptops, Workstation Systems, Monitors (24" to 32"), Docking Stations, and Peripherals. The partner is authorized to provide OEM warranty support and access official spare parts channels.' },
      { type: 'spacer', h: 4 },
      { type: 'text', text: 'Gold Partner status is awarded to resellers meeting minimum annual sales volume of ₹5 Crore, maintaining trained technical staff (minimum 3 GCT-certified engineers), and achieving a customer satisfaction score above 4.2/5.0.' },
      { type: 'spacer', h: 8 },
      { type: 'field', label: 'Authorized By:', value: 'Priya Venkataraman, Partner Programs Director — GCT India' },
      { type: 'field', label: 'Partner ID:', value: 'GCT-IN-GOLD-2847' },
    ];
  }

  if (doc.doc_type === 'Company Registration') {
    return [
      { type: 'heading', text: 'COMPANY REGISTRATION DETAILS' },
      { type: 'field', label: 'Company Name:', value: vendor.name },
      { type: 'field', label: 'CIN:', value: 'U72900MH2020PTC341892' },
      { type: 'field', label: 'Incorporation Date:', value: 'April 14, 2020' },
      { type: 'field', label: 'Registered Office:', value: 'Plot 47B, Hinjewadi Phase 2, Pune, Maharashtra – 411057' },
      { type: 'field', label: 'Paid-up Capital:', value: '₹50,00,000 (Fifty Lakhs)' },
      { type: 'field', label: 'Directors:', value: 'Arjun Mehta (DIN: 08124567), Sneha Raut (DIN: 08124568)' },
      { type: 'field', label: 'DPIIT Ref No:', value: 'DIPP142983' },
      { type: 'field', label: 'Recognition Date:', value: 'June 2020 — Startup India Scheme' },
      { type: 'spacer', h: 6 },
      { type: 'heading', text: 'BUSINESS ACTIVITY' },
      { type: 'text', text: 'Primary business: Trading and distribution of IT hardware, computers, peripherals, and networking equipment. GST registered under Maharashtra jurisdiction. MSME registered (Udyam Registration No: MH-32-0089234).' },
      { type: 'spacer', h: 4 },
      { type: 'text', text: '⚠ PROCUREMENT NOTE: Company is 6 years old with reported turnover of ₹8 Crore (FY2025). Paid-up capital of ₹50L is significantly below the value of this RFQ (₹42L). Buyer is advised to request banker reference and financial statements before award.' },
    ];
  }

  return [{ type: 'text', text: doc.summary }];
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AITable({ data }) {
  if (!data?.columns) return null;
  const exportTable = () => {
    const csv = [data.columns, ...(data.rows || [])].map(r => r.join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "aerchain_export.csv"; a.click();
  };
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ textAlign: 'right', marginBottom: 4 }}>
        <button onClick={exportTable} style={{ fontSize: 10, padding: '2px 7px', border: '1px solid #ddd', borderRadius: 4, background: '#fff', color: '#666', cursor: 'pointer' }}>↓ CSV</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead><tr>{data.columns.map((c, i) => <th key={i} style={{ padding: '5px 8px', textAlign: 'left', fontWeight: 600, color: '#555', borderBottom: '2px solid #e5e5e3', background: '#f9f9f7', fontSize: 10, whiteSpace: 'nowrap' }}>{c}</th>)}</tr></thead>
          <tbody>{(data.rows || []).map((row, i) => <tr key={i} style={{ background: i % 2 ? '#fafaf9' : '#fff' }}>{row.map((cell, j) => <td key={j} style={{ padding: '5px 8px', borderBottom: '1px solid #f0efec', fontSize: 11 }}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function AIChart({ data }) {
  if (!data?.series) return null;
  const series = data.series;
  const chartData = series[0].data.map((d, i) => { const o = { label: d.label }; series.forEach(s => { o[s.name] = s.data[i]?.value ?? 0; }); return o; });
  if (data.chart_type === 'pie') {
    const pd = series[0].data.map(d => ({ name: d.label, value: d.value }));
    return <div style={{ height: 200, marginTop: 8 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pd} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={9}>{pd.map((_, i) => <Cell key={i} fill={CC[i % 5]} />)}</Pie><Tooltip formatter={v => v.toLocaleString('en-IN')} /></PieChart></ResponsiveContainer></div>;
  }
  return <div style={{ height: 200, marginTop: 8 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{ top: 4, right: 12, left: 0, bottom: 50 }}><CartesianGrid strokeDasharray="3 3" stroke="#f0efec" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 9, fill: '#888' }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" interval={0} /><YAxis tick={{ fontSize: 9, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : v} /><Tooltip formatter={(v, n) => [v.toLocaleString('en-IN'), n]} contentStyle={{ fontSize: 10, border: '1px solid #e5e5e3', borderRadius: 6 }} />{series.map((s, i) => <Bar key={s.name} dataKey={s.name} fill={CC[i % 5]} radius={[3, 3, 0, 0]} maxBarSize={40} />)}</BarChart></ResponsiveContainer></div>;
}

function FlagGroups({ flags }) {
  const groups = {};
  flags.forEach(f => {
    const m = f.match(/^(V\d[^:(]*)/);
    const key = m ? m[1].trim() : 'General';
    const body = f.replace(/^V\d[^:)]*[):]\s*/, '').trim() || f;
    if (!groups[key]) groups[key] = [];
    if (body && body.toLowerCase() !== key.toLowerCase()) {
      groups[key].push(body);
    }
  });
  return (
    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Object.entries(groups).map(([vendor, items]) => (
        <div key={vendor} style={{ background: '#fffbf0', borderLeft: '3px solid #f59e0b', borderRadius: '0 6px 6px 0', padding: '8px 12px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#78350f', marginBottom: items.length ? 4 : 0 }}>⚠ {vendor}</div>
          {items.map((item, i) => <div key={i} style={{ fontSize: 11, color: '#78350f', paddingLeft: 8, marginBottom: 2 }}>• {item}</div>)}
        </div>
      ))}
    </div>
  );
}

const SUGGESTIONS = [
  "Who is the cheapest vendor overall?",
  "Chart the total bid value per vendor",
  "Which vendors have missing line items?",
  "What are the top 3 risks before award?",
  "Show a price table for all laptop items",
  "Chart average lead time per vendor",
  "Compare payment terms across vendors",
  "Which vendor has the best price-to-delivery tradeoff?",
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cat, setCat] = useState("All");
  const [view, setView] = useState('table');
  const [sortVendor, setSortVendor] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSugg, setShowSugg] = useState(true);
  const [splitPct, setSplitPct] = useState(58); // left panel % of width
  const chatRef = useRef(null);
  const draggingRef = useRef(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Drag to resize
  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const pct = (e.clientX / window.innerWidth) * 100;
      setSplitPct(Math.min(80, Math.max(30, pct)));
    };
    const onUp = () => { draggingRef.current = false; document.body.style.cursor = ''; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const startDrag = (e) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const lowest = Object.entries(TOTALS).sort((a, b) => a[1] - b[1])[0];
  let items = cat === "All" ? IT : IT.filter(i => i.category === cat);
  if (sortVendor) {
    items = [...items].sort((a, b) => {
      const pa = a.bids[sortVendor]?.unit_price ?? (sortDir === 'asc' ? Infinity : -Infinity);
      const pb = b.bids[sortVendor]?.unit_price ?? (sortDir === 'asc' ? Infinity : -Infinity);
      return sortDir === 'asc' ? pa - pb : pb - pa;
    });
  }

  const send = useCallback(async (q) => {
    if (loading || !q.trim()) return;
    const question = q.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: question }]);
    setLoading(true);
    const nh = [...history, { role: "user", content: question }];
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM_PROMPT, messages: nh })
      });
      const raw = await res.json();
      const text = raw.content?.[0]?.text?.trim() || "";
      const parsed = extractJSON(text) || { answer_type: 'text', summary: text, data: null, flags: [], confidence: 'low' };
      setHistory([...nh, { role: "assistant", content: text }]);
      setMessages(prev => [...prev, { role: "ai", parsed }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "ai", parsed: { answer_type: "text", summary: `Error: ${e.message}`, data: null, flags: [], confidence: "low" } }]);
    }
    setLoading(false);
  }, [loading, history]);

  const TOPBAR_H = 48;
  const CONTENT_H = `calc(100vh - ${TOPBAR_H}px)`;

  function exportFullPDF() {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = 297, pageH = 210, margin = 14;
    let y = 14;

    pdf.setFillColor(15, 15, 15);
    pdf.rect(0, 0, pageW, 16, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AERCHAIN ANALYST — BID COMPARISON REPORT', margin, 11);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(`RFQ-2026-IT-0047 · Nexova Technologies · Generated ${new Date().toLocaleDateString('en-IN')}`, pageW - margin, 11, { align: 'right' });
    y = 24;

    pdf.setTextColor(17, 17, 17);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    const lowestPdf = Object.entries(TOTALS).sort((a,b)=>a[1]-b[1])[0];
    const stats = [`Vendors: 5`, `Line Items: 30`, `Lowest Bid: ₹${(TOTALS[lowestPdf[0]]/100000).toFixed(0)}L`, `Risk Flags: 13`];
    stats.forEach((s, i) => {
      pdf.setFillColor(245, 245, 243);
      pdf.roundedRect(margin + i * 65, y, 62, 10, 2, 2, 'F');
      pdf.setTextColor(17, 17, 17);
      pdf.text(s, margin + i * 65 + 4, y + 7);
    });
    y += 18;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(17, 17, 17);
    pdf.text('Side-by-Side Bid Comparison', margin, y);
    y += 6;

    const vendorNames = V.map(v => `${v.name.split(' ')[0]}\n${v.id}${FLAG_COUNTS[v.id] > 0 ? ` (${FLAG_COUNTS[v.id]} flags)` : ''}`);
    const head = [['Item', 'Description', 'Qty', ...vendorNames]];
    const body = IT.map(item => {
      return [
        item.id,
        item.description.length > 40 ? item.description.substring(0, 40) + '...' : item.description,
        `${item.quantity} ${item.unit}`,
        ...V.map(v => {
          const b = item.bids[v.id];
          if (!b) return '—';
          return `₹${b.unit_price.toLocaleString('en-IN')}\n${b.lead_time_days}d · ${b.warranty_years}yr`;
        })
      ];
    });

    autoTable(pdf, {
      head,
      body,
      startY: y,
      margin: { left: margin, right: margin },
      styles: { fontSize: 7, cellPadding: 2, lineColor: [232, 231, 228], lineWidth: 0.2 },
      headStyles: { fillColor: [15, 15, 15], textColor: 255, fontStyle: 'bold', fontSize: 7 },
      alternateRowStyles: { fillColor: [250, 250, 249] },
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 55 },
        2: { cellWidth: 16 },
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index > 2) {
          const item = IT[data.row.index];
          if (item) {
            const vendor = V[data.column.index - 3];
            const b = item.bids[vendor?.id];
            const prices = V.map(vv => item.bids[vv.id]?.unit_price).filter(Boolean);
            const minP = Math.min(...prices);
            if (b && b.unit_price === minP) {
              data.cell.styles.textColor = [45, 106, 31];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      }
    });

    if (messages.length > 0) {
      pdf.addPage('landscape');
      y = 14;

      pdf.setFillColor(15, 15, 15);
      pdf.rect(0, 0, pageW, 16, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI ANALYST — CONVERSATION LOG', margin, 11);
      y = 24;

      messages.forEach((m) => {
        if (y > pageH - 20) { pdf.addPage('landscape'); y = 20; }

        if (m.role === 'user') {
          pdf.setFillColor(26, 106, 191);
          pdf.roundedRect(pageW - margin - 160, y, 160, 10, 2, 2, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          const lines = pdf.splitTextToSize(m.text, 155);
          pdf.text(lines, pageW - margin - 4, y + 7, { align: 'right' });
          y += Math.max(12, lines.length * 5 + 4);
        } else {
          const p = m.parsed;
          pdf.setFillColor(250, 250, 249);
          pdf.setDrawColor(55, 138, 221);
          pdf.setLineWidth(0.5);
          const summaryLines = pdf.splitTextToSize(p.summary || '', pageW - margin * 2 - 4);
          const boxH = summaryLines.length * 5 + 8;
          if (y + boxH > pageH - 20) { pdf.addPage('landscape'); y = 20; }
          pdf.roundedRect(margin, y, pageW - margin * 2, boxH, 2, 2, 'FD');
          pdf.setFillColor(55, 138, 221);
          pdf.rect(margin, y, 2, boxH, 'F');
          pdf.setTextColor(17, 17, 17);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.text(summaryLines, margin + 5, y + 6);
          y += boxH + 3;

          if ((p.answer_type === 'table' || p.answer_type === 'mixed') && p.data?.columns) {
            if (y > pageH - 40) { pdf.addPage('landscape'); y = 20; }
            autoTable(pdf, {
              head: [p.data.columns],
              body: p.data.rows || [],
              startY: y,
              margin: { left: margin, right: margin },
              styles: { fontSize: 7, cellPadding: 2 },
              headStyles: { fillColor: [55, 138, 221], textColor: 255, fontStyle: 'bold', fontSize: 7 },
              alternateRowStyles: { fillColor: [250, 250, 249] },
            });
            y = pdf.lastAutoTable.finalY + 4;
          }

          if (p.flags?.length > 0) {
            if (y > pageH - 20) { pdf.addPage('landscape'); y = 20; }
            p.flags.slice(0, 5).forEach(flag => {
              const flagLines = pdf.splitTextToSize(`⚠ ${flag}`, pageW - margin * 2 - 8);
              pdf.setFillColor(255, 251, 240);
              pdf.setDrawColor(245, 158, 11);
              pdf.roundedRect(margin, y, pageW - margin * 2, flagLines.length * 4 + 6, 1, 1, 'FD');
              pdf.setTextColor(120, 53, 15);
              pdf.setFontSize(8);
              pdf.text(flagLines, margin + 4, y + 5);
              y += flagLines.length * 4 + 8;
            });
          }

          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`${p.confidence} confidence`, margin, y);
          y += 8;
        }
      });
    }

    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFillColor(245, 245, 243);
      pdf.rect(0, pageH - 10, pageW, 10, 'F');
      pdf.setFontSize(7);
      pdf.setTextColor(150, 150, 150);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Aerchain Analyst · RFQ-2026-IT-0047 · Nexova Technologies', margin, pageH - 3);
      pdf.text(`Page ${i} of ${pageCount}`, pageW - margin, pageH - 3, { align: 'right' });
    }

    pdf.save('aerchain_bid_report.pdf');
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: '#fafaf9' }}>
      <style>{`*{box-sizing:border-box}body,html{margin:0;padding:0;overflow:hidden}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#d1d1ce;border-radius:4px}::-webkit-scrollbar-track{background:transparent}`}</style>

      {/* Topbar */}
      <div style={{ height: TOPBAR_H, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#0f0f0f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, color: '#fff' }}><span style={{ fontWeight: 300 }}>aerchain</span> <span style={{ fontWeight: 700, color: '#378add' }}>analyst</span></span>
          <span style={{ fontSize: 10, color: '#888', background: '#1f1f1f', border: '1px solid #2a2a2a', borderRadius: 999, padding: '2px 8px' }}>RFQ-2026-IT-0047</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={downloadCSV} style={{ fontSize: 11, padding: '4px 10px', border: '1px solid #555', borderRadius: 6, background: 'transparent', color: '#fff', cursor: 'pointer' }}>↓ Export CSV</button>
          <button onClick={exportFullPDF} style={{ fontSize: 11, padding: '4px 10px', border: '1px solid #555', borderRadius: 6, background: 'transparent', color: '#fff', cursor: 'pointer' }}>↓ Export PDF</button>
        </div>
      </div>

      {/* Content row */}
      <div style={{ height: CONTENT_H, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>

        {/* LEFT PANEL */}
        <div style={{ width: `${splitPct}%`, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Stats */}
          <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: '#fff', borderBottom: '1px solid #e8e7e4' }}>
            {[["5", "Vendors"], ["30", "Line items"], [`₹${(TOTALS[lowest[0]] / 100000).toFixed(0)}L`, "Lowest total bid"], ["13", "Risk flags"]].map(([val, lbl], i) => (
              <div key={lbl} style={{ padding: '12px 16px', borderRight: i < 3 ? '1px solid #f0efec' : undefined }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: '#111', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 3 }}>{lbl}</div>
              </div>
            ))}
          </div>
          {/* Filters */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: '#fff', borderBottom: '1px solid #e8e7e4', overflowX: 'auto' }}>
            <div style={{display:'flex',gap:4,marginRight:12,flexShrink:0}}>
              <button onClick={()=>setView('table')} style={{fontSize:10,padding:'3px 8px',borderRadius:999,cursor:'pointer',border:view==='table'?'1px solid #85b7eb':'1px solid #e5e5e3',background:view==='table'?'#e6f1fb':'#fff',color:view==='table'?'#185fa5':'#666',fontWeight:view==='table'?600:400}}>Comparison</button>
              <button onClick={()=>setView('risks')} style={{fontSize:10,padding:'3px 8px',borderRadius:999,cursor:'pointer',border:view==='risks'?'1px solid #f59e0b':'1px solid #e5e5e3',background:view==='risks'?'#fffbf0':'#fff',color:view==='risks'?'#92400e':'#666',fontWeight:view==='risks'?600:400}}>⚠ Risks & Docs</button>
            </div>
            {view === 'table' && (
              <>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#111', whiteSpace: 'nowrap' }}>Side-by-side comparison</span>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {["All", ...CATS].map(c => (
                    <button key={c} onClick={() => setCat(c)} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, cursor: 'pointer', border: cat === c ? '1px solid #85b7eb' : '1px solid #e5e5e3', background: cat === c ? '#e6f1fb' : '#fff', color: cat === c ? '#185fa5' : '#666', whiteSpace: 'nowrap' }}>{c}</button>
                  ))}
                </div>
              </>
            )}
          </div>
          {view === 'table' ? (
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, minWidth: 650 }}>
              <thead>
                <tr style={{ background: '#f5f5f3', position: 'sticky', top: 0, zIndex: 1 }}>
                  <th style={{ padding: '7px 10px', textAlign: 'left', fontWeight: 500, fontSize: 10, color: '#888', borderBottom: '1px solid #e8e7e4', minWidth: 190 }}>
                    Item <span style={{ fontWeight: 400, color: '#aaa' }}>· Price · Lead · Warranty</span>
                  </th>
                  <th style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 500, fontSize: 10, color: '#888', borderBottom: '1px solid #e8e7e4' }}>Qty</th>
                  {V.map(v => (
                    <th
                      key={v.id}
                      onClick={() => {
                        if (sortVendor === v.id) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
                        else { setSortVendor(v.id); setSortDir('asc'); }
                      }}
                      style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 500, fontSize: 10, color: '#888', borderBottom: '1px solid #e8e7e4', minWidth: 90, cursor: 'pointer', userSelect: 'none' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <span style={{ color: '#111', fontWeight: 500 }}>{v.name.split(' ')[0]}{sortVendor === v.id ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</span>
                        {FLAG_COUNTS[v.id] > 0 && <span title={`${FLAG_COUNTS[v.id]} risk flags`} style={{ width: 16, height: 16, borderRadius: '50%', background: '#dc2626', color: '#fff', fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'help' }}>{FLAG_COUNTS[v.id]}</span>}
                      </div>
                      <div style={{ fontSize: 9, color: '#bbb', fontWeight: 400 }}>{v.id}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, ri) => {
                  const prices = V.map(v => item.bids[v.id]?.unit_price).filter(Boolean);
                  const minP = Math.min(...prices), maxP = Math.max(...prices);
                  return (
                    <tr key={item.id} style={{ background: ri % 2 === 0 ? '#fff' : '#fafaf9', borderBottom: '1px solid #f0efec' }}>
                      <td style={{ padding: '6px 10px', verticalAlign: 'top' }}>
                        <div style={{ fontSize: 9, color: '#999', marginBottom: 1 }}>{item.id}</div>
                        <div style={{ fontSize: 11, fontWeight: 500, color: '#111', lineHeight: 1.4 }}>{item.description}</div>
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'right', color: '#999', verticalAlign: 'top', fontSize: 11 }}>{item.quantity} {item.unit}</td>
                      {V.map(v => {
                        const b = item.bids[v.id];
                        if (!b) return <td key={v.id} style={{ padding: '6px 10px', textAlign: 'center', color: '#ddd', verticalAlign: 'top', fontStyle: 'italic' }}>—</td>;
                        const isLow = b.unit_price === minP, isHigh = b.unit_price === maxP && prices.length > 1;
                        return (
                          <td key={v.id} style={{ padding: '6px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                            <div style={{ fontSize: 12, fontWeight: isLow ? 600 : 400, color: isLow ? '#2d6a1f' : isHigh ? '#991b1b' : '#111', fontVariantNumeric: 'tabular-nums' }}>₹{b.unit_price.toLocaleString('en-IN')}</div>
                            <div style={{ fontSize: 9, color: '#888', marginTop: 1 }}>{b.lead_time_days}d · {b.warranty_years}yr</div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          ) : (
          <div style={{flex:1,overflow:'auto',minHeight:0,padding:16}}>
            <div style={{marginBottom:24}}>
              <div style={{fontSize:12,fontWeight:600,color:'#111',marginBottom:12,display:'flex',alignItems:'center',gap:6}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:'#dc2626',display:'inline-block'}}/>
                Risk Flags <span style={{fontSize:11,fontWeight:400,color:'#999',marginLeft:4}}>13 identified</span>
              </div>
              {DS.vendors.map(v => {
                const flags = DS.red_flags.filter(r => r.vendor_id === v.id);
                if (!flags.length) return null;
                return (
                  <div key={v.id} style={{marginBottom:12}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#374151',marginBottom:4,display:'flex',alignItems:'center',gap:6}}>
                      <span style={{width:16,height:16,borderRadius:'50%',background:'#dc2626',color:'#fff',fontSize:9,display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0}}>{flags.length}</span>
                      {v.name}
                    </div>
                    {flags.map((f,i) => (
                      <div key={i} style={{fontSize:11,color:'#78350f',background:'#fffbf0',borderLeft:'3px solid #f59e0b',borderRadius:'0 4px 4px 0',padding:'5px 10px',marginBottom:4}}>
                        {f.flag}
                      </div>
                    ))}
                  </div>
                );
              })}
              <div style={{fontSize:11,color:'#166534',background:'#f0fdf4',borderLeft:'3px solid #22c55e',borderRadius:'0 4px 4px 0',padding:'5px 10px'}}>
                ✓ V1 Crestline Systems — No risk flags identified
              </div>
            </div>

            <div>
              <div style={{fontSize:12,fontWeight:600,color:'#111',marginBottom:12,display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontSize:14}}>📄</span>
                Submitted Documents <span style={{fontSize:11,fontWeight:400,color:'#999',marginLeft:4}}>4 documents</span>
              </div>
              {DS.attached_documents.map((doc,i) => {
                const vendor = DS.vendors.find(v => v.id === doc.vendor_id);
                return (
                  <div key={i} style={{border:'1px solid #e8e7e4',borderRadius:8,padding:'10px 14px',marginBottom:8,background:'#fff',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:600,color:'#111',marginBottom:2}}>{doc.doc_type}</div>
                      <div style={{fontSize:10,color:'#666',marginBottom:4}}>{vendor?.name}</div>
                      <div style={{fontSize:11,color:'#444',lineHeight:1.5}}>{doc.summary}</div>
                    </div>
                    <button onClick={() => downloadDocPDF(doc, vendor)} style={{fontSize:10,padding:'4px 8px',border:'1px solid #e0e0de',borderRadius:6,background:'#fafaf9',color:'#555',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
                      ↓ Download
                    </button>
                  </div>
                );
              })}
              <div style={{border:'1px solid #fee2e2',borderRadius:8,padding:'10px 14px',background:'#fff5f5'}}>
                <div style={{fontSize:11,fontWeight:600,color:'#991b1b',marginBottom:2}}>No documents submitted</div>
                <div style={{fontSize:10,color:'#666'}}>V2 Orbitex Technologies — only vendor with zero documentation</div>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* DRAG HANDLE */}
        <div onMouseDown={startDrag} style={{ width: 5, height: '100%', background: '#e8e7e4', cursor: 'col-resize', flexShrink: 0, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#378add'}
          onMouseLeave={e => e.currentTarget.style.background = '#e8e7e4'}
        />

        {/* RIGHT PANEL — Chat */}
        <div style={{ width: `${100 - splitPct}%`, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', borderLeft: '1px solid #e8e7e4' }}>

          {/* Label */}
          <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#aaa', padding: '10px 14px 6px', letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #f0efec' }}>AI Analyst</div>

          {/* CHAT MESSAGES — THE ONLY SCROLLABLE AREA */}
          <div
            ref={chatRef}
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {messages.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8, color: '#bbb', fontSize: 13, textAlign: 'center' }}>
                <div style={{ fontSize: 32 }}>💬</div>
                <div style={{ color: '#666' }}>Ask anything about the bids</div>
                <div style={{ fontSize: 11 }}>Prices · risks · charts · recommendations</div>
              </div>
            )}
            {messages.map((m, i) =>
              m.role === 'user'
                ? <div key={i} style={{ alignSelf: 'flex-end', background: '#1a6abf', color: '#fff', borderRadius: '12px 12px 2px 12px', padding: '9px 13px', fontSize: 13, maxWidth: '85%', lineHeight: 1.45, wordBreak: 'break-word' }}>{m.text}</div>
                : <div key={i} style={{ width: '100%', background: '#fafaf9', borderRadius: '2px 12px 12px 12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                  <div style={{ height: 3, background: '#378add' }} />
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: '#1a1a18', marginBottom: m.parsed.data || m.parsed.flags?.length ? 8 : 0 }}>{m.parsed.summary}</div>
                    {(m.parsed.answer_type === 'table' || m.parsed.answer_type === 'mixed') && <AITable data={m.parsed.data} />}
                    {(m.parsed.answer_type === 'chart' || m.parsed.answer_type === 'mixed') && <AIChart data={m.parsed.data} />}
                    {m.parsed.flags?.length > 0 && <FlagGroups flags={m.parsed.flags} />}
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.parsed.confidence === 'high' ? '#639922' : m.parsed.confidence === 'medium' ? '#ef9f27' : '#e24b4a', display: 'inline-block' }} />
                      {m.parsed.confidence} confidence
                    </div>
                  </div>
                </div>
            )}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#fafaf9', borderRadius: '2px 12px 12px 12px', padding: '12px 14px', display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
                {[0, 150, 300].map(d => <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#bbb', display: 'inline-block', animation: 'pulse 1.2s infinite', animationDelay: `${d}ms` }} />)}
                <style>{`@keyframes pulse{0%,80%,100%{opacity:.3}40%{opacity:1}}`}</style>
              </div>
            )}
          </div>

          {/* Suggestions — collapsible, fixed height */}
          <div style={{ flexShrink: 0, borderTop: '1px solid #f0efec' }}>
            <div onClick={() => setShowSugg(s => !s)} style={{ padding: '5px 12px', fontSize: 10, color: '#aaa', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
              <span>SUGGESTED QUESTIONS</span><span style={{ fontSize: 8 }}>{showSugg ? '▲' : '▼'}</span>
            </div>
            {showSugg && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: '0 10px 8px' }}>
                {SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)} style={{ fontSize: 10, padding: '3px 8px', border: '1px solid #bcd4f0', borderRadius: 999, color: '#185fa5', background: '#f0f7ff', cursor: 'pointer' }}>{s}</button>)}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ flexShrink: 0, padding: '8px 12px 12px', borderTop: '1px solid #e8e7e4', display: 'flex', gap: 8, alignItems: 'center', background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask about vendors, prices, risks..."
              style={{ flex: 1, fontSize: 12, padding: '8px 10px', border: '1px solid #e0e0de', borderRadius: 8, background: '#fafaf9', color: '#111', outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={() => send(input)} disabled={loading} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: '#378add', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 16, opacity: loading ? 0.4 : 1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
