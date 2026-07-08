import { useState, useRef, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DS = {"scenario":{"company":"Nexova Technologies","category":"IT Hardware — Laptops, Monitors & Peripherals","rfx_id":"RFQ-2026-IT-0047","budget_ceiling":4200000},"vendors":[{"id":"V1","name":"Crestline Systems Pvt. Ltd.","hq":"Bengaluru, India","years_in_business":14,"profile":"Mid-size IT hardware distributor, strong in South India, ISO 9001 certified. Known for reliable delivery but not the cheapest."},{"id":"V2","name":"Orbitex Technologies Ltd.","hq":"Mumbai, India","years_in_business":9,"profile":"Aggressive pricing, pan-India reach. Has had delivery delays in past quarters. Missing several compliance certifications."},{"id":"V3","name":"Pinnacle InfoSolutions","hq":"Delhi, India","years_in_business":21,"profile":"Oldest vendor in the mix. Premium pricing, excellent certifications, slow but dependable. Strong after-sales."},{"id":"V4","name":"SwiftEdge Procurement Co.","hq":"Pune, India","years_in_business":5,"profile":"Newest entrant. Suspiciously low prices across the board, claims fast delivery — but thin track record. Red flag vendor."},{"id":"V5","name":"Meridian Tech Supplies","hq":"Hyderabad, India","years_in_business":11,"profile":"Solid mid-market option. Good certifications, average pricing, some line items not quoted."}],"line_items":[{"id":"LI-01","category":"Laptop","description":"Business Laptop 14\" — Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro","quantity":120,"unit":"nos","bids":{"V1":{"unit_price":68500,"lead_time_days":18,"warranty_years":3},"V2":{"unit_price":61200,"lead_time_days":35,"warranty_years":2},"V3":{"unit_price":72000,"lead_time_days":21,"warranty_years":3},"V4":{"unit_price":55000,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":67000,"lead_time_days":22,"warranty_years":2}}},{"id":"LI-02","category":"Laptop","description":"Performance Laptop 15\" — Core i7, 32GB RAM, 1TB SSD","quantity":45,"unit":"nos","bids":{"V1":{"unit_price":112000,"lead_time_days":21,"warranty_years":3},"V2":{"unit_price":99500,"lead_time_days":40,"warranty_years":2},"V3":{"unit_price":118000,"lead_time_days":25,"warranty_years":3},"V4":{"unit_price":88000,"lead_time_days":12,"warranty_years":3},"V5":{"unit_price":108000,"lead_time_days":24,"warranty_years":3}}},{"id":"LI-03","category":"Laptop","description":"Ultrabook 13\" — Core i5, 16GB RAM, 256GB SSD","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":78000,"lead_time_days":18,"warranty_years":2},"V2":{"unit_price":69000,"lead_time_days":38,"warranty_years":1},"V3":{"unit_price":82000,"lead_time_days":20,"warranty_years":3},"V4":{"unit_price":61000,"lead_time_days":10,"warranty_years":3},"V5":null}},{"id":"LI-04","category":"Laptop","description":"Developer Workstation 16\" — Core i9, 64GB RAM, 2TB SSD, Linux","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":195000,"lead_time_days":30,"warranty_years":3},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3},"V4":{"unit_price":162000,"lead_time_days":14,"warranty_years":3},"V5":{"unit_price":188000,"lead_time_days":32,"warranty_years":2}}},{"id":"LI-05","category":"Monitor","description":"24\" FHD Monitor — IPS, 75Hz, HDMI+DP","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":14500,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":12800,"lead_time_days":28,"warranty_years":2},"V3":{"unit_price":15200,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":11200,"lead_time_days":8,"warranty_years":3},"V5":{"unit_price":13900,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-06","category":"Monitor","description":"27\" QHD Monitor — IPS, 144Hz, USB-C 65W","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":28500,"lead_time_days":18,"warranty_years":3},"V2":{"unit_price":25200,"lead_time_days":35,"warranty_years":2},"V3":{"unit_price":31000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":21500,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":27000,"lead_time_days":20,"warranty_years":2}}},{"id":"LI-07","category":"Monitor","description":"32\" 4K Monitor — VA, 60Hz, HDMI 2.1","quantity":25,"unit":"nos","bids":{"V1":{"unit_price":42000,"lead_time_days":22,"warranty_years":3},"V2":null,"V3":{"unit_price":46500,"lead_time_days":28,"warranty_years":3},"V4":{"unit_price":34000,"lead_time_days":12,"warranty_years":3},"V5":{"unit_price":40500,"lead_time_days":25,"warranty_years":2}}},{"id":"LI-08","category":"Monitor","description":"Dual Monitor Stand — Adjustable, steel base","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":3800,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":3100,"lead_time_days":20,"warranty_years":1},"V3":{"unit_price":4200,"lead_time_days":12,"warranty_years":2},"V4":{"unit_price":2600,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":3600,"lead_time_days":14,"warranty_years":1}}},{"id":"LI-09","category":"Peripheral","description":"Wireless Keyboard + Mouse Combo","quantity":250,"unit":"sets","bids":{"V1":{"unit_price":2200,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":1800,"lead_time_days":18,"warranty_years":1},"V3":{"unit_price":2500,"lead_time_days":12,"warranty_years":2},"V4":{"unit_price":1500,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":2100,"lead_time_days":11,"warranty_years":1}}},{"id":"LI-10","category":"Peripheral","description":"USB-C Docking Station — 12-in-1, 4K, 100W PD","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":15,"warranty_years":2},"V2":{"unit_price":7200,"lead_time_days":30,"warranty_years":1,"notes":"Grey market risk"},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":2},"V4":{"unit_price":6000,"lead_time_days":9,"warranty_years":2},"V5":{"unit_price":8000,"lead_time_days":17,"warranty_years":2}}},{"id":"LI-11","category":"Peripheral","description":"Noise-Cancelling Headset — USB + 3.5mm","quantity":180,"unit":"nos","bids":{"V1":{"unit_price":4500,"lead_time_days":12,"warranty_years":1},"V2":{"unit_price":3800,"lead_time_days":22,"warranty_years":1},"V3":{"unit_price":5100,"lead_time_days":15,"warranty_years":2},"V4":{"unit_price":3000,"lead_time_days":8,"warranty_years":2},"V5":null}},{"id":"LI-12","category":"Peripheral","description":"Webcam — 1080p, autofocus","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":3200,"lead_time_days":10,"warranty_years":1},"V2":{"unit_price":2700,"lead_time_days":20,"warranty_years":1},"V3":{"unit_price":3500,"lead_time_days":14,"warranty_years":1},"V4":{"unit_price":2100,"lead_time_days":7,"warranty_years":2},"V5":{"unit_price":3000,"lead_time_days":12,"warranty_years":1}}},{"id":"LI-13","category":"Peripheral","description":"Laptop Bag — 15.6\", water-resistant","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":1800,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":1400,"lead_time_days":15,"warranty_years":1},"V3":null,"V4":{"unit_price":1100,"lead_time_days":5,"warranty_years":1},"V5":{"unit_price":1700,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-14","category":"Peripheral","description":"USB-A Hub — 7-port, USB 3.0","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":1500,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":1200,"lead_time_days":18,"warranty_years":1},"V3":{"unit_price":1700,"lead_time_days":10,"warranty_years":2},"V4":{"unit_price":950,"lead_time_days":6,"warranty_years":2},"V5":{"unit_price":1400,"lead_time_days":10,"warranty_years":1}}},{"id":"LI-15","category":"Peripheral","description":"Portable SSD — 1TB, USB 3.2 Gen2","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":7800,"lead_time_days":12,"warranty_years":3},"V2":{"unit_price":6500,"lead_time_days":25,"warranty_years":2},"V3":{"unit_price":8200,"lead_time_days":16,"warranty_years":3},"V4":{"unit_price":5200,"lead_time_days":9,"warranty_years":3},"V5":{"unit_price":7500,"lead_time_days":14,"warranty_years":2}}},{"id":"LI-16","category":"Networking","description":"Business WiFi Router — WiFi 6","quantity":30,"unit":"nos","bids":{"V1":{"unit_price":12000,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":10200,"lead_time_days":30,"warranty_years":2},"V3":{"unit_price":13500,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":8500,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":11500,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-17","category":"Networking","description":"Network Switch — 24-port Gigabit","quantity":15,"unit":"nos","bids":{"V1":{"unit_price":18500,"lead_time_days":18,"warranty_years":3},"V2":null,"V3":{"unit_price":21000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":14500,"lead_time_days":11,"warranty_years":3},"V5":{"unit_price":17800,"lead_time_days":20,"warranty_years":2}}},{"id":"LI-18","category":"Networking","description":"Cat6 Ethernet Cable — 305m box","quantity":20,"unit":"boxes","bids":{"V1":{"unit_price":4200,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":3500,"lead_time_days":15,"warranty_years":1},"V3":{"unit_price":4800,"lead_time_days":10,"warranty_years":1},"V4":{"unit_price":2900,"lead_time_days":6,"warranty_years":1},"V5":{"unit_price":4000,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-19","category":"Power","description":"UPS — 1KVA, online double conversion","quantity":40,"unit":"nos","bids":{"V1":{"unit_price":15500,"lead_time_days":20,"warranty_years":2},"V2":{"unit_price":13000,"lead_time_days":38,"warranty_years":1},"V3":{"unit_price":17000,"lead_time_days":25,"warranty_years":3},"V4":{"unit_price":10500,"lead_time_days":12,"warranty_years":2},"V5":{"unit_price":14500,"lead_time_days":22,"warranty_years":2}}},{"id":"LI-20","category":"Power","description":"Surge Protector Strip — 6-outlet","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":850,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":680,"lead_time_days":14,"warranty_years":1},"V3":{"unit_price":950,"lead_time_days":8,"warranty_years":2},"V4":{"unit_price":520,"lead_time_days":5,"warranty_years":2},"V5":{"unit_price":800,"lead_time_days":8,"warranty_years":1}}},{"id":"LI-21","category":"Printing","description":"Laser Printer — B&W, A4, duplex","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":22000,"lead_time_days":15,"warranty_years":2},"V2":{"unit_price":19000,"lead_time_days":30,"warranty_years":1},"V3":{"unit_price":24500,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":15500,"lead_time_days":9,"warranty_years":2},"V5":{"unit_price":21000,"lead_time_days":16,"warranty_years":2}}},{"id":"LI-22","category":"Printing","description":"Color MFP — A4, scan/copy/fax","quantity":10,"unit":"nos","bids":{"V1":{"unit_price":38000,"lead_time_days":18,"warranty_years":2},"V2":{"unit_price":32000,"lead_time_days":35,"warranty_years":1},"V3":{"unit_price":42000,"lead_time_days":22,"warranty_years":3},"V4":{"unit_price":26000,"lead_time_days":11,"warranty_years":2},"V5":null}},{"id":"LI-23","category":"Printing","description":"Toner Cartridge — High yield black (x10)","quantity":50,"unit":"packs","bids":{"V1":{"unit_price":5500,"lead_time_days":8,"warranty_years":1,"notes":"OEM brand"},"V2":{"unit_price":4200,"lead_time_days":15,"warranty_years":1},"V3":{"unit_price":6000,"lead_time_days":10,"warranty_years":1,"notes":"OEM brand"},"V4":{"unit_price":3200,"lead_time_days":6,"warranty_years":1,"notes":"Unbranded — origin not disclosed"},"V5":{"unit_price":5000,"lead_time_days":9,"warranty_years":1}}},{"id":"LI-24","category":"Storage","description":"NAS Device — 4-bay, diskless","quantity":8,"unit":"nos","bids":{"V1":{"unit_price":45000,"lead_time_days":25,"warranty_years":3},"V2":null,"V3":{"unit_price":52000,"lead_time_days":30,"warranty_years":3},"V4":{"unit_price":36000,"lead_time_days":14,"warranty_years":3},"V5":{"unit_price":43000,"lead_time_days":28,"warranty_years":2}}},{"id":"LI-25","category":"Storage","description":"HDD — 4TB, 7200 RPM, for NAS","quantity":32,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":14,"warranty_years":3},"V2":{"unit_price":7200,"lead_time_days":28,"warranty_years":2},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":3},"V4":{"unit_price":5800,"lead_time_days":10,"warranty_years":3},"V5":{"unit_price":8000,"lead_time_days":15,"warranty_years":2}}},{"id":"LI-26","category":"Collaboration","description":"Video Conferencing Bar — 4K + speaker","quantity":12,"unit":"nos","bids":{"V1":{"unit_price":52000,"lead_time_days":22,"warranty_years":2},"V2":{"unit_price":45000,"lead_time_days":40,"warranty_years":1},"V3":{"unit_price":58000,"lead_time_days":28,"warranty_years":3},"V4":{"unit_price":38000,"lead_time_days":12,"warranty_years":2},"V5":{"unit_price":50000,"lead_time_days":25,"warranty_years":2}}},{"id":"LI-27","category":"Collaboration","description":"Interactive Display — 75\", 4K touch","quantity":6,"unit":"nos","bids":{"V1":{"unit_price":185000,"lead_time_days":30,"warranty_years":3},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3},"V4":{"unit_price":148000,"lead_time_days":15,"warranty_years":3},"V5":{"unit_price":175000,"lead_time_days":32,"warranty_years":2}}},{"id":"LI-28","category":"Security","description":"Hardware Security Key — FIDO2, USB-A + NFC","quantity":300,"unit":"nos","bids":{"V1":{"unit_price":3500,"lead_time_days":12,"warranty_years":2},"V2":{"unit_price":2900,"lead_time_days":22,"warranty_years":1},"V3":{"unit_price":4000,"lead_time_days":15,"warranty_years":2},"V4":{"unit_price":2200,"lead_time_days":8,"warranty_years":2,"notes":"Brand not disclosed"},"V5":{"unit_price":3300,"lead_time_days":13,"warranty_years":1}}},{"id":"LI-29","category":"Security","description":"Laptop Lock — Kensington-compatible","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":800,"lead_time_days":7,"warranty_years":1},"V2":{"unit_price":650,"lead_time_days":14,"warranty_years":1},"V3":{"unit_price":900,"lead_time_days":9,"warranty_years":1},"V4":{"unit_price":480,"lead_time_days":5,"warranty_years":1},"V5":{"unit_price":750,"lead_time_days":8,"warranty_years":1}}},{"id":"LI-30","category":"Accessories","description":"Laptop Cooling Pad — 15.6\", dual fan","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":1200,"lead_time_days":8,"warranty_years":1},"V2":{"unit_price":950,"lead_time_days":16,"warranty_years":1},"V3":null,"V4":{"unit_price":720,"lead_time_days":6,"warranty_years":1},"V5":{"unit_price":1100,"lead_time_days":9,"warranty_years":1}}}],"questionnaire":{"questions":[{"id":"Q1","text":"Payment terms?"},{"id":"Q2","text":"Volume discounts?"},{"id":"Q3","text":"DOA return/replacement policy?"},{"id":"Q4","text":"Authorized reseller?"},{"id":"Q5","text":"Certifications held?"},{"id":"Q6","text":"After-sales support model?"},{"id":"Q7","text":"Enterprise references (last 2 years)?"},{"id":"Q8","text":"Policy on import/customs delays?"},{"id":"Q9","text":"Pan-India delivery?"},{"id":"Q10","text":"Financial stability?"}],"responses":{"V1":{"Q1":"Net 45 days. 1.5% discount within 10 days.","Q2":"3% above ₹25L, 5% above ₹50L.","Q3":"DOA within 72hr, no questions asked up to 30 days.","Q4":"Yes, fully authorized. Letters available.","Q5":"ISO 9001:2015, MSME, GeM registered.","Q6":"Dedicated AM. L1 4hr, L2 on-site 48hr. SLA penalty clause.","Q7":"Infosys BPO (2025), Wipro (2024), Mphasis (2025).","Q8":"Local buffer stock — import delays don't affect delivery.","Q9":"Yes, all 28 states + 8 UTs. Insurance included.","Q10":"Turnover ₹42Cr FY2025. CRISIL BBB+."},"V2":{"Q1":"Net 30 days. No early payment discount.","Q2":"Not formalized. Negotiate case by case.","Q3":"7 working days. Customer pays return shipping.","Q4":"Most brands. Some via distributors.","Q5":"No ISO. GST only.","Q6":"Email only. 24-48hr response. No formal SLA.","Q7":"Mid-size companies. References not available.","Q8":"Import delays passed to customer. No buffer stock.","Q9":"Most cities. Tier-2/3 may have surcharge.","Q10":"Turnover ₹18Cr approx. No credit rating."},"V3":{"Q1":"Net 60 days. LC for >₹1Cr.","Q2":"2% above ₹30L, 4% above ₹75L.","Q3":"DOA 48hr, reverse pickup at our cost.","Q4":"Yes, all 14 brands. Gold partner with 3 OEMs.","Q5":"ISO 9001:2015, ISO 14001:2015, SA8000, NSIC.","Q6":"Named AM + backup. 2hr SLA. On-site 24hr metro.","Q7":"TCS (2025), L&T (2024), HDFC Life (2025). All verifiable.","Q8":"90-day rolling buffer for all A-category items.","Q9":"Own logistics 6 metros. 3PL rest. Fully insured.","Q10":"Turnover ₹95Cr FY2025. ICRA A-."},"V4":{"Q1":"Net 15 days preferred.","Q2":"Flat 7% on all orders above ₹10L.","Q3":"DOA 24hr, no paperwork anywhere in India.","Q4":"Multiple channels. Authorization for select brands only.","Q5":"ISO 9001:2015 (pending renewal), MSME, Startup India.","Q6":"WhatsApp + email. 1hr first response. On-site 12hr pan-India.","Q7":"50+ enterprise clients. Reference list after NDA only.","Q8":"Guarantee delivery regardless of import status.","Q9":"Yes, pan-India.","Q10":"Turnover ₹8Cr FY2025. No credit rating."},"V5":{"Q1":"Net 45 days. 2% discount within 15 days.","Q2":"3% above ₹20L, 4.5% above ₹40L.","Q3":"DOA 5 working days. Reverse pickup arranged.","Q4":"Primary brands authorized. Two items via sub-distributors.","Q5":"ISO 9001:2015, GeM, MSME.","Q6":"Dedicated AM. 8hr SLA. Same-day on-site Hyd/BLR.","Q7":"Cognizant (2024), Minda Industries (2025).","Q8":"Partial buffer. High-import items may vary 5-7 days.","Q9":"Yes. Surcharge Tier-3 + North-East.","Q10":"Turnover ₹31Cr FY2025. No formal rating."}}},"attached_documents":[{"vendor_id":"V1","doc_type":"ISO Certificate","summary":"ISO 9001:2015 by Bureau Veritas. Valid March 2028."},{"vendor_id":"V3","doc_type":"ISO Certificate","summary":"ISO 9001:2015 + ISO 14001:2015 by DNV. Valid August 2028."},{"vendor_id":"V4","doc_type":"Company Registration","summary":"Startup India DPIIT. Incorporated April 2020. Paid-up capital ₹50L."},{"vendor_id":"V5","doc_type":"ISO Certificate","summary":"ISO 9001:2015 by TUV SUD. Expires November 2026."}],"red_flags":[{"vendor_id":"V4","flag":"Pricing 18-25% below market — implausible for ₹8Cr turnover company"},{"vendor_id":"V4","flag":"ISO 9001 pending renewal — not confirmed active"},{"vendor_id":"V4","flag":"References only after NDA — evasive"},{"vendor_id":"V4","flag":"Authorization for select brands only — not confirmed reseller"},{"vendor_id":"V4","flag":"Toner cartridges unbranded, origin undisclosed — counterfeit risk"},{"vendor_id":"V4","flag":"Hardware security key brand not disclosed — critical for FIDO2"},{"vendor_id":"V2","flag":"5 line items not quoted (LI-04, LI-07, LI-17, LI-24, LI-27) — incomplete bid"},{"vendor_id":"V2","flag":"No ISO certification — only vendor with zero quality certs"},{"vendor_id":"V2","flag":"No client references — cannot verify enterprise delivery"},{"vendor_id":"V2","flag":"USB-C docking station grey market risk"},{"vendor_id":"V3","flag":"Net 60-day payment terms — longest in pool, cash flow impact"},{"vendor_id":"V5","flag":"ISO certificate expires November 2026 — within contract period"},{"vendor_id":"V5","flag":"4 line items not quoted (LI-03, LI-11, LI-22, LI-30)"}]};

const VENDORS = DS.vendors;
const ITEMS = DS.line_items;
const CATS = [...new Set(ITEMS.map(i => i.category))];
const RED_FLAG_VIDS = new Set(DS.red_flags.map(r => r.vendor_id));
const FLAG_COUNTS = {};
VENDORS.forEach(v => { FLAG_COUNTS[v.id] = DS.red_flags.filter(r => r.vendor_id === v.id).length; });
const TOTALS = {};
VENDORS.forEach(v => {
  TOTALS[v.id] = 0;
  ITEMS.forEach(item => { const b = item.bids[v.id]; if (b) TOTALS[v.id] += b.unit_price * item.quantity; });
});
const LEAD_AVGS = {};
VENDORS.forEach(v => {
  const times = ITEMS.map(i => i.bids[v.id]?.lead_time_days).filter(Boolean);
  LEAD_AVGS[v.id] = times.reduce((a,b)=>a+b,0)/times.length;
});
const CC = ["#378add","#1d9e75","#ba7517","#a22d2d","#6349b7"];

// Build system prompt ONCE at module level — not inside component
const SYSTEM_PROMPT = (() => {
  const facts = VENDORS.map(v => {
    const m = ITEMS.filter(i => !i.bids[v.id]).length;
    return `${v.id}(${v.name}): ₹${(TOTALS[v.id]/100000).toFixed(1)}L total | ${m}/30 missing | avg lead ${LEAD_AVGS[v.id].toFixed(1)}d`;
  }).join('\n');
  return `You are a procurement analyst AI inside Aerchain. Analyzing RFQ-2026-IT-0047 for Nexova Technologies. Category: IT Hardware. Budget: ₹42L.
RULE: Answer ONLY from the data below. Never invent numbers.
VENDORS:\n${VENDORS.map(v=>`${v.id}: ${v.name} (${v.hq}, ${v.years_in_business}yrs) — ${v.profile}`).join('\n')}
BIDS (price|lead_days|warranty_yr; NOT_QUOTED=no bid):\n${ITEMS.map(item=>{const b=VENDORS.map(v=>{const bid=item.bids[v.id];return bid?`${v.id}:₹${bid.unit_price}|${bid.lead_time_days}d|${bid.warranty_years}yr${bid.notes?'|'+bid.notes:''}`:`${v.id}:NOT_QUOTED`;}).join(' ');return `${item.id}[${item.category}] ${item.description} qty:${item.quantity}${item.unit} >> ${b}`;}).join('\n')}
QUESTIONNAIRE:\n${DS.questionnaire.questions.map(q=>{const a=VENDORS.map(v=>`${v.id}:"${DS.questionnaire.responses[v.id]?.[q.id]||'No response'}"`).join(' ');return `${q.id}(${q.text}): ${a}`;}).join('\n')}
DOCS:\n${DS.attached_documents.map(d=>`${d.vendor_id}|${d.doc_type}:${d.summary}`).join('\n')}
RED FLAGS:\n${DS.red_flags.map(r=>`⚠ ${r.vendor_id}: ${r.flag}`).join('\n')}
PRE-COMPUTED:\n${facts}
RESPOND with ONLY a raw JSON object. No markdown fences. No code blocks. No text before or after. Your response must start with { and end with }:
{"answer_type":"text"|"table"|"chart"|"mixed","summary":"2-3 sentence insight","data":null|{...},"flags":["warnings"],"confidence":"high"|"medium"|"low"}
table data: {"columns":[...],"rows":[[...],...]}
chart data: {"chart_type":"bar"|"pie","title":"...","series":[{"name":"...","data":[{"label":"...","value":number}]}]}
Rules: Lead with insight. Flag V4 risks always. Use ₹ Indian format. high=in data, medium=inference, low=judgment.`;
})();

function extractJSON(text) {
  try { return JSON.parse(text.trim()); } catch {}
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) { try { return JSON.parse(fenced[1].trim()); } catch {} }
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s !== -1 && e > s) { try { return JSON.parse(text.slice(s, e+1)); } catch {} }
  return { answer_type:'text', summary: text, data:null, flags:[], confidence:'low' };
}

function downloadCSV() {
  const h = ["ID","Description","Category","Qty","Unit",...VENDORS.map(v=>v.name+" ₹"),...VENDORS.map(v=>v.name+" Lead"),...VENDORS.map(v=>v.name+" Warranty")];
  const r = ITEMS.map(i=>[i.id,`"${i.description}"`,i.category,i.quantity,i.unit,...VENDORS.map(v=>i.bids[v.id]?.unit_price??'N/A'),...VENDORS.map(v=>i.bids[v.id]?.lead_time_days??'N/A'),...VENDORS.map(v=>i.bids[v.id]?.warranty_years??'N/A')]);
  const csv=[h,...r].map(x=>x.join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="aerchain_bids.csv";a.click();
}

function AITable({data}) {
  if (!data?.columns) return null;
  function tableCSV() {
    const csv=[data.columns,...data.rows].map(r=>r.join(",")).join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="aerchain_table.csv";a.click();
  }
  return (
    <div style={{marginTop:8}}>
      <div style={{textAlign:'right',marginBottom:4}}>
        <button onClick={tableCSV} style={{fontSize:10,padding:'2px 7px',border:'0.5px solid #ccc',borderRadius:4,background:'#fff',color:'#666',cursor:'pointer'}}>↓ CSV</button>
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
          <thead><tr>{data.columns.map((c,i)=><th key={i} style={{padding:'5px 8px',textAlign:'left',fontWeight:500,color:'#5f5e5a',borderBottom:'1px solid #e5e5e3',background:'#f5f5f3',fontSize:10,whiteSpace:'nowrap'}}>{c}</th>)}</tr></thead>
          <tbody>{(data.rows||[]).map((row,i)=><tr key={i} style={{background:i%2?'#fafaf9':'#fff'}}>{row.map((cell,j)=><td key={j} style={{padding:'5px 8px',borderBottom:'1px solid #f0efec',fontSize:11,color:'#1a1a18'}}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function AIChart({data}) {
  if (!data?.series) return null;
  const series = data.series;
  const chartData = series[0].data.map((d,i)=>{ const o={label:d.label}; series.forEach(s=>{o[s.name]=s.data[i]?.value??0;}); return o; });
  if (data.chart_type==='pie') {
    const pd = series[0].data.map(d=>({name:d.label,value:d.value}));
    return <div style={{height:200,marginTop:8}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pd} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,percent})=>`${name.split(' ')[0]} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={9}>{pd.map((_,i)=><Cell key={i} fill={CC[i%5]}/>)}</Pie><Tooltip formatter={v=>v.toLocaleString('en-IN')}/></PieChart></ResponsiveContainer></div>;
  }
  return (
    <div style={{height:200,marginTop:8}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{top:4,right:12,left:0,bottom:45}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" vertical={false}/>
          <XAxis dataKey="label" tick={{fontSize:9,fill:'#888780'}} axisLine={false} tickLine={false} angle={-35} textAnchor="end" interval={0}/>
          <YAxis tick={{fontSize:9,fill:'#888780'}} axisLine={false} tickLine={false} tickFormatter={v=>v>=100000?`${(v/100000).toFixed(0)}L`:v}/>
          <Tooltip formatter={(v,n)=>[v.toLocaleString('en-IN'),n]} contentStyle={{fontSize:10,border:'1px solid #e5e5e3',borderRadius:6}}/>
          {series.map((s,i)=><Bar key={s.name} dataKey={s.name} fill={CC[i%5]} radius={[3,3,0,0]} maxBarSize={40}/>)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function FlagGroups({flags}) {
  const groups = {};
  flags.forEach(f => {
    const m = f.match(/^(V\d[^:(]*)/);
    const key = m ? m[1].trim() : 'General';
    if (!groups[key]) groups[key] = [];
    groups[key].push(f.replace(/^V\d[^:)]*[):]\s*/,'').trim());
  });
  return (
    <div style={{marginTop:8,display:'flex',flexDirection:'column',gap:6}}>
      {Object.entries(groups).map(([vendor,items])=>(
        <div key={vendor} style={{background:'#fffbf0',borderLeft:'3px solid #f59e0b',borderRadius:'0 6px 6px 0',padding:'8px 12px'}}>
          <div style={{fontSize:11,fontWeight:600,color:'#78350f',marginBottom:4}}>⚠ {vendor}</div>
          {items.map((item,i)=><div key={i} style={{fontSize:11,color:'#78350f',paddingLeft:8,marginBottom:i<items.length-1?3:0}}>• {item}</div>)}
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
  "Compare payment terms across all vendors",
  "Which vendor has the best price-to-delivery tradeoff?",
];

export default function App() {
  const [cat, setCat] = useState("All");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSugg, setShowSugg] = useState(true);
  const chatRef = useRef(null);

  // Inject global styles once
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `*,*::before,*::after{box-sizing:border-box}body,html{margin:0;padding:0;overflow:hidden;height:100%;width:100%}#root{height:100vh;width:100%;display:flex;flex-direction:column;overflow:hidden}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#d1d1ce;border-radius:4px}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 50);
    }
  }, [messages, loading]);

  const lowest = Object.entries(TOTALS).sort((a,b)=>a[1]-b[1])[0];
  const items = cat === "All" ? ITEMS : ITEMS.filter(i => i.category === cat);

  const send = useCallback(async (q) => {
    if (loading || !q.trim()) return;
    const question = q.trim();
    setInput("");
    setMessages(prev => [...prev, {role:"user", text:question}]);
    setLoading(true);
    const nh = [...history, {role:"user", content:question}];
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6", max_tokens:1000, system:SYSTEM_PROMPT, messages:nh})
      });
      const raw = await res.json();
      const text = raw.content?.[0]?.text?.trim() || "";
      const parsed = extractJSON(text);
      setHistory([...nh, {role:"assistant", content:text}]);
      setMessages(prev => [...prev, {role:"ai", parsed}]);
    } catch(e) {
      setMessages(prev => [...prev, {role:"ai", parsed:{answer_type:"text", summary:`Error: ${e.message}`, data:null, flags:[], confidence:"low"}}]);
    }
    setLoading(false);
  }, [loading, history]);

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',width:'100vw',overflow:'hidden',background:'#fafaf9',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      {/* Topbar */}
      <div style={{flexShrink:0,height:48,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',background:'#0f0f0f'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:16,color:'#fff'}}><span style={{fontWeight:300}}>aerchain</span> <span style={{fontWeight:700,color:'#378add'}}>analyst</span></span>
          <span style={{fontSize:10,color:'#888',background:'#1f1f1f',border:'1px solid #2a2a2a',borderRadius:999,padding:'2px 8px'}}>RFQ-2026-IT-0047</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={downloadCSV} style={{fontSize:11,padding:'4px 10px',border:'1px solid #3a3a3a',borderRadius:6,background:'transparent',color:'#ccc',cursor:'pointer'}}>↓ Export CSV</button>
          <button onClick={()=>window.print()} style={{fontSize:11,padding:'4px 10px',border:'1px solid #3a3a3a',borderRadius:6,background:'transparent',color:'#ccc',cursor:'pointer'}}>↓ Export PDF</button>
        </div>
      </div>

      {/* Main content row */}
      <div style={{display:'flex',height:'calc(100vh - 48px)',overflow:'hidden',alignItems:'stretch'}}>

        {/* Left panel */}
        <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0,minHeight:0,overflow:'hidden'}}>

          {/* Stats */}
          <div style={{flexShrink:0,display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderBottom:'1px solid #e8e7e4',background:'#fff'}}>
            {[["5","Vendors"],["30","Line items"],[`₹${(TOTALS[lowest[0]]/100000).toFixed(0)}L`,"Lowest total bid"],["13","Risk flags"]].map(([v,l],i)=>(
              <div key={l} style={{padding:'12px 16px',borderRight:i<3?'1px solid #f0efec':undefined}}>
                <div style={{fontSize:24,fontWeight:600,color:'#111',lineHeight:1}}>{v}</div>
                <div style={{fontSize:11,color:'#999',marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={{flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 14px',borderBottom:'1px solid #e8e7e4',background:'#fff',overflowX:'auto'}}>
            <span style={{fontSize:12,fontWeight:500,color:'#111',whiteSpace:'nowrap',marginRight:12}}>Side-by-side comparison</span>
            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
              {["All",...CATS].map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{fontSize:10,padding:'3px 8px',borderRadius:999,cursor:'pointer',border:cat===c?'1px solid #85b7eb':'1px solid #e5e5e3',background:cat===c?'#e6f1fb':'#fff',color:cat===c?'#185fa5':'#5f5e5a',whiteSpace:'nowrap'}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Table — THIS is the scrollable zone */}
          <div style={{flex:1,overflowY:'auto',overflowX:'auto',minHeight:0}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:11,minWidth:700}}>
              <thead>
                <tr style={{background:'#f5f5f3'}}>
                  <th style={{padding:'7px 10px',textAlign:'left',fontWeight:500,fontSize:10,color:'#888',borderBottom:'1px solid #e8e7e4',position:'sticky',top:0,background:'#f5f5f3',minWidth:200,zIndex:1}}>
                    Item <span style={{fontWeight:400,color:'#bbb',marginLeft:8}}>Price · Lead time (days) · Warranty (yrs)</span>
                  </th>
                  <th style={{padding:'7px 10px',textAlign:'right',fontWeight:500,fontSize:10,color:'#888',borderBottom:'1px solid #e8e7e4',position:'sticky',top:0,background:'#f5f5f3',zIndex:1}}>Qty</th>
                  {VENDORS.map(v=>(
                    <th key={v.id} style={{padding:'7px 10px',textAlign:'right',fontWeight:500,fontSize:10,color:'#888',borderBottom:'1px solid #e8e7e4',position:'sticky',top:0,background:'#f5f5f3',minWidth:95,zIndex:1}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:4}}>
                        <span style={{color:'#111',fontWeight:500}}>{v.name.split(' ')[0]}</span>
                        {FLAG_COUNTS[v.id]>0 && (
                          <span title={`${FLAG_COUNTS[v.id]} risk flags`} style={{width:16,height:16,borderRadius:'50%',background:'#dc2626',color:'#fff',fontSize:9,display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:600,cursor:'help'}}>
                            {FLAG_COUNTS[v.id]}
                          </span>
                        )}
                      </div>
                      <div style={{fontSize:9,color:'#bbb',fontWeight:400}}>{v.id}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item,ri)=>{
                  const prices = VENDORS.map(v=>item.bids[v.id]?.unit_price).filter(Boolean);
                  const minP=Math.min(...prices), maxP=Math.max(...prices);
                  return (
                    <tr key={item.id} style={{background:ri%2===0?'#fff':'#fafaf9',borderBottom:'1px solid #f0efec'}}>
                      <td style={{padding:'6px 10px',verticalAlign:'top'}}>
                        <div style={{fontSize:9,color:'#bbb',marginBottom:1}}>{item.id}</div>
                        <div style={{fontSize:11,fontWeight:500,color:'#111',lineHeight:1.4}}>{item.description}</div>
                      </td>
                      <td style={{padding:'6px 10px',textAlign:'right',color:'#888',verticalAlign:'top',fontSize:11}}>{item.quantity} {item.unit}</td>
                      {VENDORS.map(v=>{
                        const b=item.bids[v.id];
                        if (!b) return <td key={v.id} style={{padding:'6px 10px',textAlign:'center',color:'#ccc',verticalAlign:'top',fontStyle:'italic'}}>—</td>;
                        const isLow=b.unit_price===minP, isHigh=b.unit_price===maxP&&prices.length>1;
                        return (
                          <td key={v.id} style={{padding:'6px 10px',textAlign:'right',verticalAlign:'top'}}>
                            <div style={{fontSize:12,fontWeight:isLow?600:400,color:isLow?'#2d6a1f':isHigh?'#991b1b':'#111',fontVariantNumeric:'tabular-nums'}}>
                              ₹{b.unit_price.toLocaleString('en-IN')}
                            </div>
                            <div style={{fontSize:9,color:'#bbb',marginTop:1}}>{b.lead_time_days}d · {b.warranty_years}yr</div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drag handle */}
        <div style={{flexShrink:0,width:4,background:'#e8e7e4',cursor:'col-resize'}}/>

        {/* Right panel — Chat */}
        <div style={{flexShrink:0,width:'420px',display:'flex',flexDirection:'column',position:'relative',background:'#fff',height:'calc(100vh - 48px)',borderLeft:'1px solid #e8e7e4'}}>

          {/* Label */}
          <div style={{flexShrink:0,fontSize:10,fontWeight:600,color:'#aaa',padding:'10px 14px 6px',letterSpacing:1,textTransform:'uppercase',borderBottom:'1px solid #f0efec'}}>
            AI Analyst
          </div>

          {/* Messages — THE scrollable area */}
          <div ref={chatRef} style={{position:'absolute',top:41,bottom:130,left:0,right:0,overflowY:'scroll',padding:12,display:'flex',flexDirection:'column',gap:10}}>
            {messages.length===0 && (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:8,color:'#aaa',fontSize:13,textAlign:'center'}}>
                <div style={{fontSize:28}}>💬</div>
                <div>Ask anything about the bids</div>
                <div style={{fontSize:11}}>Prices · risks · charts · recommendations</div>
              </div>
            )}
            {messages.map((m,i)=>
              m.role==='user'
                ? <div key={i} style={{alignSelf:'flex-end',background:'#1a6abf',color:'#fff',borderRadius:'12px 12px 2px 12px',padding:'8px 12px',fontSize:13,maxWidth:'85%',lineHeight:1.45}}>{m.text}</div>
                : <div key={i} style={{width:'100%',background:'#fafaf9',borderRadius:'2px 12px 12px 12px',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
                    <div style={{height:3,background:'#378add'}}/>
                    <div style={{padding:'10px 12px'}}>
                      <div style={{fontSize:13,lineHeight:1.6,color:'#1a1a18',marginBottom:m.parsed.data||m.parsed.flags?.length?8:0}}>{m.parsed.summary}</div>
                      {(m.parsed.answer_type==='table'||m.parsed.answer_type==='mixed')&&<AITable data={m.parsed.data}/>}
                      {(m.parsed.answer_type==='chart'||m.parsed.answer_type==='mixed')&&<AIChart data={m.parsed.data}/>}
                      {m.parsed.flags?.length>0&&<FlagGroups flags={m.parsed.flags}/>}
                      <div style={{fontSize:10,color:'#aaa',marginTop:8,display:'flex',alignItems:'center',gap:4}}>
                        <span style={{width:6,height:6,borderRadius:'50%',background:m.parsed.confidence==='high'?'#639922':m.parsed.confidence==='medium'?'#ef9f27':'#e24b4a',display:'inline-block'}}/>
                        {m.parsed.confidence} confidence
                      </div>
                    </div>
                  </div>
            )}
            {loading && (
              <div style={{background:'#fafaf9',borderRadius:'2px 12px 12px 12px',padding:'12px 14px',display:'flex',gap:5,alignItems:'center'}}>
                {[0,150,300].map(d=><span key={d} style={{width:6,height:6,borderRadius:'50%',background:'#aaa',display:'inline-block',animation:'pulse 1.2s infinite',animationDelay:`${d}ms`}}/>)}
                <style>{`@keyframes pulse{0%,80%,100%{opacity:.3}40%{opacity:1}}`}</style>
              </div>
            )}
          </div>

          {/* Suggestions — collapsible */}
          <div style={{position:'absolute',bottom:56,left:0,right:0,borderTop:'1px solid #f0efec',background:'#fff'}}>
            <div onClick={()=>setShowSugg(s=>!s)} style={{padding:'6px 12px',fontSize:10,color:'#aaa',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',userSelect:'none'}}>
              <span>SUGGESTED QUESTIONS</span><span>{showSugg?'▲':'▼'}</span>
            </div>
            {showSugg && (
              <div style={{display:'flex',flexWrap:'wrap',gap:5,padding:'0 10px 8px'}}>
                {SUGGESTIONS.map(s=><button key={s} onClick={()=>send(s)} style={{fontSize:10,padding:'3px 8px',border:'1px solid #bcd4f0',borderRadius:999,color:'#185fa5',background:'#f0f7ff',cursor:'pointer'}}>{s}</button>)}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'8px 12px 12px',borderTop:'1px solid #e8e7e4',display:'flex',gap:8,alignItems:'center',background:'#fff'}}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&send(input)}
              placeholder="Ask about vendors, prices, risks..."
              style={{flex:1,fontSize:12,padding:'8px 10px',border:'1px solid #e0e0de',borderRadius:8,background:'#fafaf9',color:'#111',outline:'none',fontFamily:'inherit'}}
            />
            <button onClick={()=>send(input)} disabled={loading} style={{width:36,height:36,borderRadius:8,border:'none',background:'#378add',color:'#fff',cursor:loading?'not-allowed':'pointer',fontSize:16,opacity:loading?0.4:1,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
