import { useState, useRef, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DS = {"scenario":{"company":"Nexova Technologies","category":"IT Hardware — Laptops, Monitors & Peripherals","rfx_id":"RFQ-2026-IT-0047","issued_date":"2026-06-01","submission_deadline":"2026-06-15","total_quantity_context":"Annual procurement for 3 regional offices (Bengaluru, Mumbai, Delhi)","budget_ceiling":4200000},"vendors":[{"id":"V1","name":"Crestline Systems Pvt. Ltd.","hq":"Bengaluru, India","years_in_business":14,"profile":"Mid-size IT hardware distributor, strong in South India, ISO 9001 certified. Known for reliable delivery but not the cheapest."},{"id":"V2","name":"Orbitex Technologies Ltd.","hq":"Mumbai, India","years_in_business":9,"profile":"Aggressive pricing, pan-India reach. Has had delivery delays in past quarters. Missing several compliance certifications."},{"id":"V3","name":"Pinnacle InfoSolutions","hq":"Delhi, India","years_in_business":21,"profile":"Oldest vendor in the mix. Premium pricing, excellent certifications, slow but dependable. Strong after-sales."},{"id":"V4","name":"SwiftEdge Procurement Co.","hq":"Pune, India","years_in_business":5,"profile":"Newest entrant. Suspiciously low prices across the board, claims fast delivery, ticks every certification box — but thin track record. Red flag vendor."},{"id":"V5","name":"Meridian Tech Supplies","hq":"Hyderabad, India","years_in_business":11,"profile":"Solid mid-market option. Good certifications, average pricing, some line items not quoted (MFR unavailability cited)."}],"line_items":[{"id":"LI-01","category":"Laptop","description":"Business Laptop 14\" — Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro","quantity":120,"unit":"nos","bids":{"V1":{"unit_price":68500,"lead_time_days":18,"warranty_years":3,"notes":"Includes onsite support Year 1"},"V2":{"unit_price":61200,"lead_time_days":35,"warranty_years":2,"notes":null},"V3":{"unit_price":72000,"lead_time_days":21,"warranty_years":3,"notes":"Premium brand, extended warranty available"},"V4":{"unit_price":55000,"lead_time_days":10,"warranty_years":3,"notes":"Best price guaranteed"},"V5":{"unit_price":67000,"lead_time_days":22,"warranty_years":2,"notes":null}}},{"id":"LI-02","category":"Laptop","description":"Performance Laptop 15\" — Core i7, 32GB RAM, 1TB SSD, Windows 11 Pro","quantity":45,"unit":"nos","bids":{"V1":{"unit_price":112000,"lead_time_days":21,"warranty_years":3,"notes":null},"V2":{"unit_price":99500,"lead_time_days":40,"warranty_years":2,"notes":"Import subject to port delays"},"V3":{"unit_price":118000,"lead_time_days":25,"warranty_years":3,"notes":null},"V4":{"unit_price":88000,"lead_time_days":12,"warranty_years":3,"notes":null},"V5":{"unit_price":108000,"lead_time_days":24,"warranty_years":3,"notes":null}}},{"id":"LI-03","category":"Laptop","description":"Ultrabook 13\" — Core i5, 16GB RAM, 256GB SSD, Windows 11 Home","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":78000,"lead_time_days":18,"warranty_years":2,"notes":null},"V2":{"unit_price":69000,"lead_time_days":38,"warranty_years":1,"notes":null},"V3":{"unit_price":82000,"lead_time_days":20,"warranty_years":3,"notes":null},"V4":{"unit_price":61000,"lead_time_days":10,"warranty_years":3,"notes":null},"V5":null}},{"id":"LI-04","category":"Laptop","description":"Developer Workstation Laptop 16\" — Core i9, 64GB RAM, 2TB SSD, Linux","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":195000,"lead_time_days":30,"warranty_years":3,"notes":"Made-to-order"},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3,"notes":"Certified for Linux, tested"},"V4":{"unit_price":162000,"lead_time_days":14,"warranty_years":3,"notes":null},"V5":{"unit_price":188000,"lead_time_days":32,"warranty_years":2,"notes":null}}},{"id":"LI-05","category":"Monitor","description":"24\" FHD Monitor — IPS Panel, 75Hz, HDMI+DP","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":14500,"lead_time_days":14,"warranty_years":3,"notes":null},"V2":{"unit_price":12800,"lead_time_days":28,"warranty_years":2,"notes":null},"V3":{"unit_price":15200,"lead_time_days":18,"warranty_years":3,"notes":null},"V4":{"unit_price":11200,"lead_time_days":8,"warranty_years":3,"notes":null},"V5":{"unit_price":13900,"lead_time_days":16,"warranty_years":2,"notes":null}}},{"id":"LI-06","category":"Monitor","description":"27\" QHD Monitor — IPS, 144Hz, USB-C 65W charging, HDR400","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":28500,"lead_time_days":18,"warranty_years":3,"notes":null},"V2":{"unit_price":25200,"lead_time_days":35,"warranty_years":2,"notes":null},"V3":{"unit_price":31000,"lead_time_days":22,"warranty_years":3,"notes":null},"V4":{"unit_price":21500,"lead_time_days":10,"warranty_years":3,"notes":null},"V5":{"unit_price":27000,"lead_time_days":20,"warranty_years":2,"notes":null}}},{"id":"LI-07","category":"Monitor","description":"32\" 4K Monitor — VA Panel, 60Hz, HDMI 2.1, for design/creative use","quantity":25,"unit":"nos","bids":{"V1":{"unit_price":42000,"lead_time_days":22,"warranty_years":3,"notes":null},"V2":null,"V3":{"unit_price":46500,"lead_time_days":28,"warranty_years":3,"notes":null},"V4":{"unit_price":34000,"lead_time_days":12,"warranty_years":3,"notes":null},"V5":{"unit_price":40500,"lead_time_days":25,"warranty_years":2,"notes":null}}},{"id":"LI-08","category":"Monitor","description":"Dual Monitor Stand — Adjustable, fits 17\"–32\", steel base","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":3800,"lead_time_days":10,"warranty_years":1,"notes":null},"V2":{"unit_price":3100,"lead_time_days":20,"warranty_years":1,"notes":null},"V3":{"unit_price":4200,"lead_time_days":12,"warranty_years":2,"notes":null},"V4":{"unit_price":2600,"lead_time_days":7,"warranty_years":2,"notes":null},"V5":{"unit_price":3600,"lead_time_days":14,"warranty_years":1,"notes":null}}},{"id":"LI-09","category":"Peripheral","description":"Wireless Keyboard + Mouse Combo — Business grade, 2.4GHz","quantity":250,"unit":"sets","bids":{"V1":{"unit_price":2200,"lead_time_days":10,"warranty_years":1,"notes":null},"V2":{"unit_price":1800,"lead_time_days":18,"warranty_years":1,"notes":null},"V3":{"unit_price":2500,"lead_time_days":12,"warranty_years":2,"notes":null},"V4":{"unit_price":1500,"lead_time_days":7,"warranty_years":2,"notes":null},"V5":{"unit_price":2100,"lead_time_days":11,"warranty_years":1,"notes":null}}},{"id":"LI-10","category":"Peripheral","description":"USB-C Docking Station — 12-in-1, 4K HDMI, 100W PD, Ethernet","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":15,"warranty_years":2,"notes":null},"V2":{"unit_price":7200,"lead_time_days":30,"warranty_years":1,"notes":"Grey market stock risk noted internally"},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":2,"notes":null},"V4":{"unit_price":6000,"lead_time_days":9,"warranty_years":2,"notes":null},"V5":{"unit_price":8000,"lead_time_days":17,"warranty_years":2,"notes":null}}},{"id":"LI-11","category":"Peripheral","description":"Noise-Cancelling Headset — USB + 3.5mm, for video calls","quantity":180,"unit":"nos","bids":{"V1":{"unit_price":4500,"lead_time_days":12,"warranty_years":1,"notes":null},"V2":{"unit_price":3800,"lead_time_days":22,"warranty_years":1,"notes":null},"V3":{"unit_price":5100,"lead_time_days":15,"warranty_years":2,"notes":null},"V4":{"unit_price":3000,"lead_time_days":8,"warranty_years":2,"notes":null},"V5":null}},{"id":"LI-12","category":"Peripheral","description":"Webcam — 1080p, autofocus, built-in mic, plug-and-play","quantity":150,"unit":"nos","bids":{"V1":{"unit_price":3200,"lead_time_days":10,"warranty_years":1,"notes":null},"V2":{"unit_price":2700,"lead_time_days":20,"warranty_years":1,"notes":null},"V3":{"unit_price":3500,"lead_time_days":14,"warranty_years":1,"notes":null},"V4":{"unit_price":2100,"lead_time_days":7,"warranty_years":2,"notes":null},"V5":{"unit_price":3000,"lead_time_days":12,"warranty_years":1,"notes":null}}},{"id":"LI-13","category":"Peripheral","description":"Laptop Bag — 15.6\", water-resistant, business style","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":1800,"lead_time_days":7,"warranty_years":1,"notes":null},"V2":{"unit_price":1400,"lead_time_days":15,"warranty_years":1,"notes":null},"V3":null,"V4":{"unit_price":1100,"lead_time_days":5,"warranty_years":1,"notes":null},"V5":{"unit_price":1700,"lead_time_days":9,"warranty_years":1,"notes":null}}},{"id":"LI-14","category":"Peripheral","description":"USB-A Hub — 7-port, USB 3.0, powered","quantity":100,"unit":"nos","bids":{"V1":{"unit_price":1500,"lead_time_days":8,"warranty_years":1,"notes":null},"V2":{"unit_price":1200,"lead_time_days":18,"warranty_years":1,"notes":null},"V3":{"unit_price":1700,"lead_time_days":10,"warranty_years":2,"notes":null},"V4":{"unit_price":950,"lead_time_days":6,"warranty_years":2,"notes":null},"V5":{"unit_price":1400,"lead_time_days":10,"warranty_years":1,"notes":null}}},{"id":"LI-15","category":"Peripheral","description":"Portable SSD — 1TB, USB 3.2 Gen2, rugged","quantity":60,"unit":"nos","bids":{"V1":{"unit_price":7800,"lead_time_days":12,"warranty_years":3,"notes":null},"V2":{"unit_price":6500,"lead_time_days":25,"warranty_years":2,"notes":null},"V3":{"unit_price":8200,"lead_time_days":16,"warranty_years":3,"notes":null},"V4":{"unit_price":5200,"lead_time_days":9,"warranty_years":3,"notes":null},"V5":{"unit_price":7500,"lead_time_days":14,"warranty_years":2,"notes":null}}},{"id":"LI-16","category":"Networking","description":"Business WiFi Router — WiFi 6, dual band, for office use","quantity":30,"unit":"nos","bids":{"V1":{"unit_price":12000,"lead_time_days":14,"warranty_years":3,"notes":null},"V2":{"unit_price":10200,"lead_time_days":30,"warranty_years":2,"notes":null},"V3":{"unit_price":13500,"lead_time_days":18,"warranty_years":3,"notes":null},"V4":{"unit_price":8500,"lead_time_days":10,"warranty_years":3,"notes":null},"V5":{"unit_price":11500,"lead_time_days":16,"warranty_years":2,"notes":null}}},{"id":"LI-17","category":"Networking","description":"Network Switch — 24-port, Gigabit managed","quantity":15,"unit":"nos","bids":{"V1":{"unit_price":18500,"lead_time_days":18,"warranty_years":3,"notes":null},"V2":null,"V3":{"unit_price":21000,"lead_time_days":22,"warranty_years":3,"notes":null},"V4":{"unit_price":14500,"lead_time_days":11,"warranty_years":3,"notes":null},"V5":{"unit_price":17800,"lead_time_days":20,"warranty_years":2,"notes":null}}},{"id":"LI-18","category":"Networking","description":"Cat6 Ethernet Cable — 305m box, plenum rated","quantity":20,"unit":"boxes","bids":{"V1":{"unit_price":4200,"lead_time_days":8,"warranty_years":1,"notes":null},"V2":{"unit_price":3500,"lead_time_days":15,"warranty_years":1,"notes":null},"V3":{"unit_price":4800,"lead_time_days":10,"warranty_years":1,"notes":null},"V4":{"unit_price":2900,"lead_time_days":6,"warranty_years":1,"notes":null},"V5":{"unit_price":4000,"lead_time_days":9,"warranty_years":1,"notes":null}}},{"id":"LI-19","category":"Power","description":"UPS — 1KVA, online double conversion, for workstations","quantity":40,"unit":"nos","bids":{"V1":{"unit_price":15500,"lead_time_days":20,"warranty_years":2,"notes":null},"V2":{"unit_price":13000,"lead_time_days":38,"warranty_years":1,"notes":null},"V3":{"unit_price":17000,"lead_time_days":25,"warranty_years":3,"notes":null},"V4":{"unit_price":10500,"lead_time_days":12,"warranty_years":2,"notes":null},"V5":{"unit_price":14500,"lead_time_days":22,"warranty_years":2,"notes":null}}},{"id":"LI-20","category":"Power","description":"Surge Protector Strip — 6-outlet, 2m cable, with USB ports","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":850,"lead_time_days":7,"warranty_years":1,"notes":null},"V2":{"unit_price":680,"lead_time_days":14,"warranty_years":1,"notes":null},"V3":{"unit_price":950,"lead_time_days":8,"warranty_years":2,"notes":null},"V4":{"unit_price":520,"lead_time_days":5,"warranty_years":2,"notes":null},"V5":{"unit_price":800,"lead_time_days":8,"warranty_years":1,"notes":null}}},{"id":"LI-21","category":"Printing","description":"Laser Printer — B&W, A4, duplex, network","quantity":20,"unit":"nos","bids":{"V1":{"unit_price":22000,"lead_time_days":15,"warranty_years":2,"notes":null},"V2":{"unit_price":19000,"lead_time_days":30,"warranty_years":1,"notes":null},"V3":{"unit_price":24500,"lead_time_days":18,"warranty_years":3,"notes":null},"V4":{"unit_price":15500,"lead_time_days":9,"warranty_years":2,"notes":null},"V5":{"unit_price":21000,"lead_time_days":16,"warranty_years":2,"notes":null}}},{"id":"LI-22","category":"Printing","description":"Color Multifunction Printer — A4, scan/copy/fax, network","quantity":10,"unit":"nos","bids":{"V1":{"unit_price":38000,"lead_time_days":18,"warranty_years":2,"notes":null},"V2":{"unit_price":32000,"lead_time_days":35,"warranty_years":1,"notes":null},"V3":{"unit_price":42000,"lead_time_days":22,"warranty_years":3,"notes":null},"V4":{"unit_price":26000,"lead_time_days":11,"warranty_years":2,"notes":null},"V5":null}},{"id":"LI-23","category":"Printing","description":"Printer Toner Cartridge — Compatible, high yield, black (pack of 10)","quantity":50,"unit":"packs","bids":{"V1":{"unit_price":5500,"lead_time_days":8,"warranty_years":1,"notes":"OEM brand"},"V2":{"unit_price":4200,"lead_time_days":15,"warranty_years":1,"notes":"Third-party compatible"},"V3":{"unit_price":6000,"lead_time_days":10,"warranty_years":1,"notes":"OEM brand"},"V4":{"unit_price":3200,"lead_time_days":6,"warranty_years":1,"notes":"Unbranded — origin not disclosed"},"V5":{"unit_price":5000,"lead_time_days":9,"warranty_years":1,"notes":null}}},{"id":"LI-24","category":"Storage & Compute","description":"NAS Device — 4-bay, diskless, for office file server","quantity":8,"unit":"nos","bids":{"V1":{"unit_price":45000,"lead_time_days":25,"warranty_years":3,"notes":null},"V2":null,"V3":{"unit_price":52000,"lead_time_days":30,"warranty_years":3,"notes":null},"V4":{"unit_price":36000,"lead_time_days":14,"warranty_years":3,"notes":null},"V5":{"unit_price":43000,"lead_time_days":28,"warranty_years":2,"notes":null}}},{"id":"LI-25","category":"Storage & Compute","description":"HDD — 4TB, 3.5\", 7200 RPM, for NAS","quantity":32,"unit":"nos","bids":{"V1":{"unit_price":8500,"lead_time_days":14,"warranty_years":3,"notes":null},"V2":{"unit_price":7200,"lead_time_days":28,"warranty_years":2,"notes":null},"V3":{"unit_price":9200,"lead_time_days":18,"warranty_years":3,"notes":null},"V4":{"unit_price":5800,"lead_time_days":10,"warranty_years":3,"notes":null},"V5":{"unit_price":8000,"lead_time_days":15,"warranty_years":2,"notes":null}}},{"id":"LI-26","category":"Collaboration","description":"Video Conferencing Bar — 4K camera + speaker, USB, for meeting rooms","quantity":12,"unit":"nos","bids":{"V1":{"unit_price":52000,"lead_time_days":22,"warranty_years":2,"notes":null},"V2":{"unit_price":45000,"lead_time_days":40,"warranty_years":1,"notes":null},"V3":{"unit_price":58000,"lead_time_days":28,"warranty_years":3,"notes":null},"V4":{"unit_price":38000,"lead_time_days":12,"warranty_years":2,"notes":null},"V5":{"unit_price":50000,"lead_time_days":25,"warranty_years":2,"notes":null}}},{"id":"LI-27","category":"Collaboration","description":"Interactive Display — 75\", 4K, touch, Android + HDMI in","quantity":6,"unit":"nos","bids":{"V1":{"unit_price":185000,"lead_time_days":30,"warranty_years":3,"notes":null},"V2":null,"V3":{"unit_price":210000,"lead_time_days":35,"warranty_years":3,"notes":null},"V4":{"unit_price":148000,"lead_time_days":15,"warranty_years":3,"notes":null},"V5":{"unit_price":175000,"lead_time_days":32,"warranty_years":2,"notes":null}}},{"id":"LI-28","category":"Security","description":"Hardware Security Key — FIDO2/U2F, USB-A + NFC","quantity":300,"unit":"nos","bids":{"V1":{"unit_price":3500,"lead_time_days":12,"warranty_years":2,"notes":null},"V2":{"unit_price":2900,"lead_time_days":22,"warranty_years":1,"notes":null},"V3":{"unit_price":4000,"lead_time_days":15,"warranty_years":2,"notes":null},"V4":{"unit_price":2200,"lead_time_days":8,"warranty_years":2,"notes":"Brand not disclosed"},"V5":{"unit_price":3300,"lead_time_days":13,"warranty_years":1,"notes":null}}},{"id":"LI-29","category":"Security","description":"Laptop Lock — Kensington-compatible, combination","quantity":200,"unit":"nos","bids":{"V1":{"unit_price":800,"lead_time_days":7,"warranty_years":1,"notes":null},"V2":{"unit_price":650,"lead_time_days":14,"warranty_years":1,"notes":null},"V3":{"unit_price":900,"lead_time_days":9,"warranty_years":1,"notes":null},"V4":{"unit_price":480,"lead_time_days":5,"warranty_years":1,"notes":null},"V5":{"unit_price":750,"lead_time_days":8,"warranty_years":1,"notes":null}}},{"id":"LI-30","category":"Accessories","description":"Laptop Cooling Pad — 15.6\" compatible, dual fan, USB powered","quantity":80,"unit":"nos","bids":{"V1":{"unit_price":1200,"lead_time_days":8,"warranty_years":1,"notes":null},"V2":{"unit_price":950,"lead_time_days":16,"warranty_years":1,"notes":null},"V3":null,"V4":{"unit_price":720,"lead_time_days":6,"warranty_years":1,"notes":null},"V5":{"unit_price":1100,"lead_time_days":9,"warranty_years":1,"notes":null}}}],"questionnaire":{"questions":[{"id":"Q1","text":"What are your payment terms?"},{"id":"Q2","text":"Do you offer volume discounts? If yes, at what thresholds?"},{"id":"Q3","text":"What is your return/replacement policy for DOA (Dead on Arrival) items?"},{"id":"Q4","text":"Are you an authorized reseller for the brands you are quoting?"},{"id":"Q5","text":"What certifications does your organization hold? (ISO, MSME, etc.)"},{"id":"Q6","text":"Describe your after-sales support model — escalation path, SLA."},{"id":"Q7","text":"Have you supplied to companies of similar size (500+ employees) in the last 2 years? Provide references."},{"id":"Q8","text":"What is your policy on customs/import delays for international shipments?"},{"id":"Q9","text":"Do you have pan-India delivery capability?"},{"id":"Q10","text":"What is your financial stability indicator? (Turnover, credit rating, or banker reference)"}],"responses":{"V1":{"Q1":"Net 45 days from invoice date. Early payment discount of 1.5% for payment within 10 days.","Q2":"Yes — 3% discount on orders above ₹25L, 5% above ₹50L, negotiable above ₹1Cr.","Q3":"DOA replacements within 72 hours. Customer ships back, we courier replacement same day of receipt. No questions asked up to 30 days.","Q4":"Yes. We are authorized resellers for all brands quoted. Authorization letters available on request.","Q5":"ISO 9001:2015 certified. MSME registered. GeM portal registered vendor.","Q6":"Dedicated account manager. L1 support via email/phone within 4 business hours. L2 (on-site) within 48 hours. SLA breach triggers penalty clause.","Q7":"Yes — references: Infosys BPO (2025), Wipro Facilities (2024), Mphasis (2025). Contacts available.","Q8":"We maintain a local buffer stock of all quoted items. Import delays do not affect delivery commitments.","Q9":"Yes. Delivery to all 28 states and 8 UTs via 3PL partners. Insurance included.","Q10":"Annual turnover ₹42 Cr (FY2025). CRISIL rated BBB+. Banker reference from HDFC Bank available."},"V2":{"Q1":"Net 30 days. No early payment discount.","Q2":"Discount structure not formalized. Can negotiate case by case.","Q3":"DOA replacement within 7 working days. Customer responsible for return shipping.","Q4":"Authorized for most brands. Some items sourced through distributors — authorization may vary.","Q5":"No ISO certification currently. GST registered. Working towards ISO 9001.","Q6":"Support via email. Response within 24-48 hours. No formal SLA document available.","Q7":"Have supplied to mid-size companies. References not available for sharing at this stage.","Q8":"Import delays are passed on to customer with advance notice. No buffer stock maintained.","Q9":"Pan-India delivery available for most cities. Tier-2/3 cities may incur additional freight charges.","Q10":"Turnover approximately ₹18 Cr. No formal credit rating. Bank statements available on request."},"V3":{"Q1":"Net 60 days from invoice. LC acceptable for large orders above ₹1Cr.","Q2":"Volume discounts of 2% above ₹30L, 4% above ₹75L. Structured annually.","Q3":"DOA replacement within 48 hours. Dedicated logistics partner handles reverse pickup at our cost.","Q4":"Yes, authorized reseller for all 14 brands in our portfolio. Gold partner status with 3 OEMs.","Q5":"ISO 9001:2015, ISO 14001:2015 (Environmental), SA8000 (Social Accountability). NSIC registered.","Q6":"Named account manager + backup. 2-hour response SLA. On-site within 24 hours in metro cities. Monthly review calls.","Q7":"References: Tata Consultancy Services (2025), Larsen & Toubro (2024), HDFC Life Insurance (2025). All verifiable.","Q8":"We maintain 90-day rolling buffer stock for all A-category items. Customers are insulated from import disruptions.","Q9":"Yes. Own logistics in 6 metro cities. 3PL for rest of India. All deliveries fully insured.","Q10":"Annual turnover ₹95 Cr (FY2025). ICRA rated A-. Stable outlook confirmed by independent auditor."},"V4":{"Q1":"Net 15 days preferred. Flexible for large accounts.","Q2":"Flat 7% discount on all orders above ₹10L. No threshold structure beyond that.","Q3":"DOA replacement within 24 hours, anywhere in India. No paperwork required.","Q4":"We source from multiple channels to ensure best pricing. Authorization documentation available for select brands.","Q5":"ISO 9001:2015 (certification pending renewal), MSME, Startup India registered.","Q6":"WhatsApp and email support. 1-hour first response. On-site within 12 hours pan-India.","Q7":"We have served 50+ enterprise clients. Reference list available after NDA signing.","Q8":"We guarantee delivery timelines regardless of import status. Internal buffer handles all disruptions.","Q9":"Yes, pan-India delivery within quoted lead times.","Q10":"Turnover ₹8 Cr (FY2025, first full year). High-growth trajectory. No formal credit rating yet."},"V5":{"Q1":"Net 45 days. 2% early payment discount if paid within 15 days.","Q2":"3% discount above ₹20L, 4.5% above ₹40L.","Q3":"DOA replacement within 5 working days. Reverse pickup arranged by us.","Q4":"Authorized reseller for primary brands quoted. Two items sourced from sub-distributors.","Q5":"ISO 9001:2015 certified. GeM vendor. MSME registered.","Q6":"Dedicated account manager. Email/phone support with 8-hour SLA. On-site support in Hyderabad and Bengaluru same day, other cities within 72 hours.","Q7":"References: Cognizant (2024), Minda Industries (2025). Will share contacts upon request.","Q8":"Partial buffer stock. Items with high import dependency may see 5–7 day variance.","Q9":"Yes, pan-India. Surcharge applicable for Tier-3 cities and North-East.","Q10":"Annual turnover ₹31 Cr (FY2025). No formal rating. Audited financials available."}}},"attached_documents":[{"vendor_id":"V1","doc_type":"ISO Certificate","summary":"ISO 9001:2015 certificate issued by Bureau Veritas. Valid until March 2028. Scope covers procurement, warehousing, and distribution of IT hardware."},{"vendor_id":"V1","doc_type":"Client Reference Letter","summary":"Reference letter from Infosys BPO dated Jan 2026. Confirms on-time delivery of 850 laptops and 400 peripherals. Rated 'Excellent' on quality and responsiveness."},{"vendor_id":"V3","doc_type":"ISO Certificate","summary":"ISO 9001:2015 and ISO 14001:2015 dual certificate issued by DNV. Valid until August 2028."},{"vendor_id":"V3","doc_type":"OEM Authorization Letter","summary":"Gold Partner authorization from a leading PC OEM, valid FY2026-27. Authorizes sale and support of full product line in India."},{"vendor_id":"V4","doc_type":"Company Registration","summary":"Startup India DPIIT certificate and MCA incorporation documents. Company incorporated April 2020. Paid-up capital ₹50L."},{"vendor_id":"V5","doc_type":"ISO Certificate","summary":"ISO 9001:2015 certificate issued by TUV SUD. Valid until November 2026. Renewal in progress per vendor communication."}],"red_flags":[{"vendor_id":"V4","flag":"Pricing 18–25% below market across all categories — economically implausible for a 5-year-old company with ₹8Cr turnover"},{"vendor_id":"V4","flag":"ISO 9001 certificate listed as 'pending renewal' — not confirmed active"},{"vendor_id":"V4","flag":"References available only after NDA — non-standard and evasive for a vendor procurement process"},{"vendor_id":"V4","flag":"Authorization documents 'available for select brands' — not confirmed authorized reseller"},{"vendor_id":"V4","flag":"Toner cartridges listed as 'unbranded, origin not disclosed' — risk of counterfeit"},{"vendor_id":"V4","flag":"Hardware security key brand not disclosed — critical for a FIDO2 security device"},{"vendor_id":"V2","flag":"5 line items not quoted (LI-04, LI-07, LI-17, LI-24, LI-27) — incomplete bid"},{"vendor_id":"V2","flag":"No ISO certification — only vendor without any quality certification"},{"vendor_id":"V2","flag":"No client references shared — cannot verify enterprise delivery track record"},{"vendor_id":"V2","flag":"USB-C Docking Station (LI-10) noted internally as 'grey market stock risk'"},{"vendor_id":"V3","flag":"Net 60 day payment terms are longest in the pool — cash flow impact on buyer"},{"vendor_id":"V5","flag":"ISO certificate expiring November 2026 — within this contract period"},{"vendor_id":"V5","flag":"4 line items not quoted (LI-03, LI-11, LI-22, LI-30)"}]};

// Pre-compute
const VENDORS = DS.vendors;
const ITEMS = DS.line_items;
const CATS = [...new Set(ITEMS.map(i => i.category))];
const RED_FLAG_VIDS = new Set(DS.red_flags.map(r => r.vendor_id));
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

const CHART_COLORS = ["#378add","#1d9e75","#ba7517","#a22d2d","#6349b7"];

function buildSystemPrompt() {
  const facts = VENDORS.map(v => {
    const missing = ITEMS.filter(i => !i.bids[v.id]).length;
    return `${v.id}(${v.name}): Total ₹${(TOTALS[v.id]/100000).toFixed(1)}L | Missing ${missing}/30 items | Avg lead ${LEAD_AVGS[v.id].toFixed(1)}d`;
  }).join('\n');

  return `You are a procurement analyst AI inside Aerchain. Analyzing RFQ-2026-IT-0047 for ${DS.scenario.company}.
Category: ${DS.scenario.category}. Budget ceiling: ₹${(DS.scenario.budget_ceiling/100000).toFixed(0)}L.

RULE: Answer ONLY from the data below. If not present, say so. Never invent numbers.

VENDORS:
${VENDORS.map(v=>`${v.id}: ${v.name} (${v.hq}, ${v.years_in_business}yrs) — ${v.profile}`).join('\n')}

LINE ITEMS & BIDS (unit_price ₹ | lead_time_days | warranty_years | notes; NOT_QUOTED = no bid):
${ITEMS.map(item=>{
  const bids=VENDORS.map(v=>{const b=item.bids[v.id];return b?`${v.id}:₹${b.unit_price}|${b.lead_time_days}d|${b.warranty_years}yr${b.notes?'|'+b.notes:''}`:`${v.id}:NOT_QUOTED`;}).join(' ');
  return `${item.id}[${item.category}] ${item.description} qty:${item.quantity}${item.unit} >> ${bids}`;
}).join('\n')}

QUESTIONNAIRE RESPONSES:
${DS.questionnaire.questions.map(q=>{
  const ans=VENDORS.map(v=>`${v.id}:"${DS.questionnaire.responses[v.id]?.[q.id]||'No response'}"`).join(' ');
  return `${q.id}(${q.text}): ${ans}`;
}).join('\n')}

DOCUMENTS:
${DS.attached_documents.map(d=>`${d.vendor_id}|${d.doc_type}:${d.summary}`).join('\n')}

RED FLAGS (pre-identified):
${DS.red_flags.map(r=>`⚠ ${r.vendor_id}: ${r.flag}`).join('\n')}

PRE-COMPUTED TOTALS (use these exact numbers):
${facts}

RESPONSE — return ONLY valid JSON, nothing outside it, no markdown fences:
{"answer_type":"text"|"table"|"chart"|"mixed","summary":"2-3 sentence direct insight","data":null|{...},"flags":["risk warnings"],"confidence":"high"|"medium"|"low"}

table data: {"columns":["Col1",...],"rows":[["cell",...],...]}
chart data: {"chart_type":"bar"|"pie","title":"...","x_label":"...","y_label":"...","series":[{"name":"...","data":[{"label":"...","value":number}]}]}
mixed: use either table or chart structure in data field alongside summary.

Rules:
- Lead with the insight, not the method.
- Whenever V4 (SwiftEdge) appears in the answer, flag its risks explicitly.
- Use ₹ and Indian number format (Lakhs).
- confidence: high=directly in data, medium=inference, low=judgment call.
- For export requests, return answer_type "text" with summary explaining what to export.`;
}

// Suggestions
const SUGGESTIONS = [
  "Who is the cheapest vendor overall?",
  "Chart the total bid value per vendor",
  "Which vendors have missing line items?",
  "What are the top 3 risks before award?",
  "Show me a price table for all laptop items",
  "Chart average lead time per vendor",
  "Compare payment terms across all vendors",
  "Which vendor has the best price-to-delivery tradeoff?",
];

// CSV export
function downloadCSV() {
  const headers = ["Item ID","Description","Category","Qty","Unit",
    ...VENDORS.map(v=>v.name+" Price (₹)"),
    ...VENDORS.map(v=>v.name+" Lead (days)"),
    ...VENDORS.map(v=>v.name+" Warranty (yr)")];
  const rows = ITEMS.map(item => [
    item.id, `"${item.description}"`, item.category, item.quantity, item.unit,
    ...VENDORS.map(v=>item.bids[v.id]?.unit_price??'N/A'),
    ...VENDORS.map(v=>item.bids[v.id]?.lead_time_days??'N/A'),
    ...VENDORS.map(v=>item.bids[v.id]?.warranty_years??'N/A'),
  ]);
  const csv = [headers, ...rows].map(r=>r.join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  const a = document.createElement("a"); a.href=url; a.download="aerchain_bid_comparison.csv"; a.click();
}

// ── Components ──────────────────────────────────────────────────────────────

function StatCell({ value, label, last }) {
  return (
    <div style={{
      flex:1,minWidth:0,padding:"12px 16px",background:"#fff",
      borderRight: last ? "none" : "1px solid #e8e7e4",
    }}>
      <div style={{fontSize:28,fontWeight:600,color:"#111",lineHeight:1.1,fontVariantNumeric:"tabular-nums"}}>{value}</div>
      <div style={{fontSize:11,color:"#999",marginTop:2}}>{label}</div>
    </div>
  );
}

function BidTable({ filter }) {
  const items = filter === "All" ? ITEMS : ITEMS.filter(i => i.category === filter);
  return (
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:900}}>
      <thead>
        <tr>
          <th style={th({minWidth:220,textAlign:"left"})}>Item</th>
          <th style={th({textAlign:"right",minWidth:56})}>Qty</th>
          {VENDORS.map(v => {
            const flagCount = DS.red_flags.filter(r => r.vendor_id === v.id).length;
            return (
              <th key={v.id} style={th({textAlign:"left",minWidth:110})}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontWeight:700,fontSize:12,color:"#111"}}>{v.name.split(" ")[0]}</span>
                  {flagCount > 0 && (
                    <span
                      title={`${flagCount} risk flag${flagCount === 1 ? "" : "s"}`}
                      style={{
                        width:16,height:16,borderRadius:"50%",background:"#e24b4a",
                        color:"#fff",fontSize:10,fontWeight:600,lineHeight:"16px",
                        display:"inline-flex",alignItems:"center",justifyContent:"center",
                        flexShrink:0,cursor:"default",
                      }}
                    >
                      {flagCount}
                    </span>
                  )}
                </div>
                <div style={{fontSize:10,color:"#888780",fontWeight:400,marginTop:1}}>{v.id}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => {
          const prices = VENDORS.map(v => item.bids[v.id]?.unit_price).filter(Boolean);
          const minP = Math.min(...prices), maxP = Math.max(...prices);
          const rowBg = idx % 2 === 0 ? "#fff" : "#fafaf9";
          return (
            <tr key={item.id} style={{background:rowBg,borderBottom:"1px solid #e5e5e3"}}>
              <td style={{padding:"5px 10px",verticalAlign:"top",minWidth:220,textAlign:"left"}}>
                <div style={{fontSize:9,color:"#aaa",fontWeight:400,marginBottom:2}}>{item.id}</div>
                <div style={{
                  fontSize:12,fontWeight:500,lineHeight:1.4,color:"#111",
                  overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                }}>{item.description}</div>
              </td>
              <td style={{padding:"5px 10px",textAlign:"right",color:"#888780",verticalAlign:"top",whiteSpace:"nowrap",fontSize:12}}>
                {item.quantity} {item.unit}
              </td>
              {VENDORS.map(v => {
                const b = item.bids[v.id];
                if (!b) {
                  return (
                    <td key={v.id} style={{padding:"5px 10px",textAlign:"center",color:"#888780",verticalAlign:"top",minWidth:110}}>
                      —
                    </td>
                  );
                }
                const isLow = b.unit_price === minP;
                const isHigh = b.unit_price === maxP && prices.length > 1;
                const color = isLow ? "#2d6a1f" : isHigh ? "#991b1b" : "#111";
                return (
                  <td key={v.id} style={{
                    padding:"5px 10px",textAlign:"right",verticalAlign:"top",
                    fontVariantNumeric:"tabular-nums",color,minWidth:110,
                  }}>
                    <div style={{fontSize:12,fontWeight:isLow ? 500 : 400,whiteSpace:"nowrap"}}>
                      ₹{b.unit_price.toLocaleString("en-IN")}
                    </div>
                    <div style={{fontSize:10,color:"#bbb",marginTop:2,whiteSpace:"nowrap"}}>
                      {b.lead_time_days}d · {b.warranty_years}yr
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function th(extra={}) {
  return {
    padding:"5px 10px",fontWeight:500,fontSize:11,color:"#5f5e5a",
    borderBottom:"1px solid #e5e5e3",whiteSpace:"nowrap",
    position:"sticky",top:46,zIndex:5,background:"#f0efec",...extra,
  };
}

function AITable({ data }) {
  if (!data?.columns) return null;

  const exportTableCSV = () => {
    const escape = (cell) => {
      const s = String(cell ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      data.columns.map(escape).join(","),
      ...(data.rows || []).map(row => row.map(escape).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "aerchain_analyst_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{overflowX:"auto",marginTop:8}}>
      <button
        onClick={exportTableCSV}
        style={{
          fontSize:10,padding:"2px 7px",border:"0.5px solid #d1d1ce",borderRadius:4,
          background:"#fff",color:"#5f5e5a",cursor:"pointer",float:"right",marginBottom:4,
        }}
      >
        ↓ CSV
      </button>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:10,border:"none",clear:"both"}}>
        <thead>
          <tr>
            {data.columns.map((c,i)=>(
              <th key={i} style={{
                padding:"5px 8px",textAlign:"left",fontWeight:600,color:"#5f5e5a",
                borderBottom:"1px solid #e5e5e3",background:"transparent",fontSize:10,whiteSpace:"nowrap",
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(data.rows||[]).map((row,i)=>(
            <tr key={i} style={{background: i%2===0 ? "#fff" : "#fafaf9",borderBottom:"1px solid #e5e5e3"}}>
              {row.map((cell,j)=>(
                <td key={j} style={{padding:"5px 8px",color:"#111",fontSize:10}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIChart({ data }) {
  if (!data?.series) return null;
  const series = data.series;
  const chartData = series[0].data.map((d,i) => {
    const obj = { label: d.label };
    series.forEach(s => { obj[s.name] = s.data[i]?.value ?? 0; });
    return obj;
  });

  if (data.chart_type === "pie") {
    const pieData = series[0].data.map(d => ({ name: d.label, value: d.value }));
    return (
      <div style={{height:200,marginTop:8}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
              {pieData.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%5]}/>)}
            </Pie>
            <Tooltip formatter={v=>v.toLocaleString("en-IN")}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{height:200,marginTop:8}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{top:4,right:12,left:8,bottom:40}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e3" vertical={false}/>
          <XAxis
            dataKey="label"
            angle={-35}
            textAnchor="end"
            interval={0}
            tick={{fontSize:9,fill:"#888780"}}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{fontSize:10,fill:"#888780"}} axisLine={false} tickLine={false} tickFormatter={v=>v>=100000?`${(v/100000).toFixed(0)}L`:v}/>
          <Tooltip formatter={(v,name)=>[v.toLocaleString("en-IN"), name]} contentStyle={{fontSize:11,border:"1px solid #e5e5e3",borderRadius:6,background:"#fff",boxShadow:"none"}}/>
          {series.length>1 && <Legend wrapperStyle={{fontSize:10}}/>}
          {series.map((s,i)=>(
            <Bar
              key={s.name}
              dataKey={s.name}
              fill={series.length === 1 ? "#378add" : CHART_COLORS[i%5]}
              radius={[3,3,0,0]}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ConfidenceDot({ level }) {
  const color = level==="high" ? "#22c55e" : level==="medium" ? "#f59e0b" : "#ef4444";
  return <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:color,marginRight:5,verticalAlign:"middle"}}/>;
}

function groupFlags(flags) {
  const groups = {};
  flags.forEach(f => {
    const text = String(f).replace(/^⚠\s*/, "");
    const match = text.match(/^(V\d[^:)]*[):]\s*)/);
    const key = match ? match[1].trim().replace(/:$/, "").replace(/\)$/, "") : "General";
    if (!groups[key]) groups[key] = [];
    groups[key].push(text.replace(/^V\d[^:)]*[):]\s*/, "").trim());
  });
  return groups;
}

const BOLD_TERMS = [
  "NOT QUOTED", "not quoted", "incomplete", "no ISO", "pending renewal",
  "NDA", "grey market", "unbranded", "counterfeit", "undisclosed",
  "implausible", "STRONGLY RECOMMEND EXCLUSION", "red flag",
  "no client references", "not confirmed", "high risk", "FIDO2",
];

function highlightTerms(text) {
  const pattern = new RegExp(`(${BOLD_TERMS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = String(text).split(pattern);
  return parts.map((part, i) =>
    BOLD_TERMS.some(t => t.toLowerCase() === part.toLowerCase())
      ? <strong key={i} style={{fontWeight:600}}>{part}</strong>
      : part
  );
}

function formatFlagGroupLabel(key) {
  if (key === "General") return "⚠ General";
  const idMatch = key.match(/^(V\d+)/);
  if (idMatch) {
    const vendor = VENDORS.find(v => v.id === idMatch[1]);
    if (vendor) return `⚠ ${idMatch[1]} — ${vendor.name.split(" ")[0]}`;
  }
  return `⚠ ${key}`;
}

function FlagGroups({ flags }) {
  const groups = groupFlags(flags);
  return (
    <div style={{marginTop:8}}>
      {Object.entries(groups).map(([key, items]) => (
        <div
          key={key}
          style={{
            background:"#fffbf0",borderLeft:"3px solid #f59e0b",
            borderRadius:"0 6px 6px 0",padding:"8px 12px",marginBottom:6,textAlign:"left",
          }}
        >
          <div style={{fontWeight:700,fontSize:11,color:"#78350f",marginBottom:4}}>
            {formatFlagGroupLabel(key)}
          </div>
          <ul style={{margin:0,paddingLeft:12,listStyle:"none"}}>
            {items.map((item, i) => (
              <li key={i} style={{fontSize:11,color:"#78350f",lineHeight:1.45,marginBottom:2}}>
                <span style={{marginRight:6}}>•</span>{highlightTerms(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [catFilter, setCatFilter] = useState("All");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem("aerchain_onboarded"));
  const [showOnboardingDetail, setShowOnboardingDetail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [chatWidth, setChatWidth] = useState(420);
  const [dragging, setDragging] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "aerchain-theme";
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      #root { margin: 0 !important; padding: 0 !important; height: 100vh !important; width: 100% !important; max-width: none !important; text-align: left !important; border: none !important; display: block !important; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #d1d1ce; border-radius: 4px; }
      @keyframes pulse { 0%,80%,100%{opacity:.3} 40%{opacity:1} }
      .export-btn { transition: background 0.15s, color 0.15s; }
      .export-btn:hover { background: #1a1a18 !important; color: #fff !important; }
    `;
    if (!document.getElementById("aerchain-theme")) document.head.appendChild(style);
    return () => { document.getElementById("aerchain-theme")?.remove(); };
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!dragging) return;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (e) => {
      const next = window.innerWidth - e.clientX;
      setChatWidth(Math.min(700, Math.max(320, next)));
    };
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  const lowestVendor = Object.entries(TOTALS).sort((a,b)=>a[1]-b[1])[0];

  const send = useCallback(async (q) => {
    if (loading || !q.trim()) return;
    const question = q.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", text:question }]);
    setLoading(true);

    const newHistory = [...history, { role:"user", content:question }];

    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1500, system:buildSystemPrompt(), messages:newHistory })
      });
      const raw = await res.json();
      const text = raw.content?.[0]?.text?.trim() || "";
      const clean = text.replace(/^```json\s*/i,"").replace(/```\s*$/i,"").trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { parsed = { answer_type:"text", summary: text || "Could not parse response.", data:null, flags:[], confidence:"low" }; }

      setHistory([...newHistory, { role:"assistant", content:text }]);
      setMessages(prev => [...prev, { role:"ai", parsed }]);
    } catch(e) {
      setMessages(prev => [...prev, { role:"ai", parsed:{ answer_type:"text", summary:`Error: ${e.message}`, data:null, flags:[], confidence:"low" } }]);
    }
    setLoading(false);
  }, [loading, history]);

  const handleKey = (e) => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(input); } };

  return (
    <div style={{
      display:"flex",flexDirection:"column",
      height:"100vh",width:"100vw",margin:0,padding:0,overflow:"hidden",
      background:"#fafaf9",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",color:"#111",
    }}>

      {/* Topbar */}
      <div style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        height:48,padding:"0 16px",margin:0,background:"#0f0f0f",borderRadius:0,flexShrink:0,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
          <div style={{fontSize:16,letterSpacing:-0.2,whiteSpace:"nowrap",color:"#fff"}}>
            <span style={{fontWeight:300}}>aerchain</span>{" "}
            <span style={{fontWeight:600,color:"#378add"}}>analyst</span>
          </div>
          <div style={{
            fontSize:10,color:"#666",background:"#1f1f1f",border:"1px solid #2a2a2a",
            borderRadius:999,padding:"2px 8px",whiteSpace:"nowrap",
          }}>
            RFQ-2026-IT-0047
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          <button className="export-btn" onClick={downloadCSV} style={{
            fontSize:12,padding:"5px 10px",border:"1px solid #3a3a3a",borderRadius:6,
            background:"transparent",color:"#cfcfcf",cursor:"pointer",
          }}>
            Export CSV
          </button>
          <button className="export-btn" onClick={() => setShowToast(true)} style={{
            fontSize:12,padding:"5px 10px",border:"1px solid #3a3a3a",borderRadius:6,
            background:"transparent",color:"#cfcfcf",cursor:"pointer",
          }}>
            Export PDF
          </button>
        </div>
      </div>

      {showToast && (
        <div style={{
          position:"fixed",bottom:20,right:20,zIndex:9999,
          background:"#111",color:"#fff",fontSize:12,padding:"10px 16px",borderRadius:8,
          maxWidth:320,lineHeight:1.5,boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
        }}>
          Use browser Print (Cmd+P) and select Save as PDF for best results
        </div>
      )}

      <div style={{display:"flex",flexDirection:"row",flex:1,minHeight:0,overflow:"hidden"}}>
      {/* Left — Comparison Table */}
      <div style={{
        flex:1,overflow:"auto",minWidth:400,
        background:"#fafaf9",margin:0,padding:0,
      }}>
        {showOnboarding && (
          <div style={{
            background:"#fff",borderBottom:"1px solid #f0efec",padding: showOnboardingDetail ? "10px 16px" : "8px 16px",
            fontSize:12,lineHeight:1.6,color:"#111",
          }}>
            {!showOnboardingDetail ? (
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <button
                  onClick={() => setShowOnboardingDetail(true)}
                  style={{
                    border:"none",background:"transparent",color:"#378add",fontSize:12,
                    cursor:"pointer",padding:0,textAlign:"left",fontWeight:500,
                  }}
                >
                  👋 New here? See how to read this table ›
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("aerchain_onboarded", "true");
                    setShowOnboarding(false);
                  }}
                  style={{
                    border:"none",background:"transparent",color:"#999",fontSize:11,
                    cursor:"pointer",padding:0,flexShrink:0,
                  }}
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div style={{position:"relative"}}>
                <button
                  onClick={() => {
                    localStorage.setItem("aerchain_onboarded", "true");
                    setShowOnboarding(false);
                  }}
                  style={{
                    position:"absolute",top:0,right:0,border:"none",background:"transparent",
                    color:"#378add",fontSize:12,cursor:"pointer",padding:0,fontWeight:500,
                  }}
                >
                  Got it ✓
                </button>
                <div style={{fontWeight:600,marginBottom:4,paddingRight:72}}>👋 Welcome to Aerchain Analyst</div>
                <div style={{color:"#5f5e5a",paddingRight:72}}>
                  Browse the bid comparison table on the left. Filter by category using the tabs above.
                </div>
                <ul style={{margin:"8px 0 0",paddingLeft:18,color:"#5f5e5a"}}>
                  <li>Red number badges = risk flags on that vendor (hover to see count)</li>
                  <li>Each price cell shows: Price · Lead time (days) · Warranty (years)</li>
                  <li>Green price = lowest bid for that item · Red price = highest bid</li>
                  <li>Ask the AI analyst anything in the chat on the right →</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div style={{display:"flex",width:"100%",borderBottom:"1px solid #f0efec",background:"#fff"}}>
          <StatCell value="5" label="Vendors"/>
          <StatCell value="30" label="Line items"/>
          <StatCell value={`₹${(TOTALS[lowestVendor[0]]/100000).toFixed(0)}L`} label="Lowest total bid"/>
          <StatCell value="13" label="Risk flags" last/>
        </div>

        {/* Filter tabs */}
        <div style={{
          display:"flex",alignItems:"center",gap:8,padding:"10px 14px",
          borderBottom:"1px solid #e5e5e3",background:"#fff",
          position:"sticky",top:0,zIndex:10,overflowX:"auto",
        }}>
          {["All",...CATS].map(cat => {
            const active = catFilter === cat;
            return (
              <button key={cat} onClick={()=>setCatFilter(cat)} style={{
                fontSize:11,padding:"5px 12px",borderRadius:999,cursor:"pointer",flexShrink:0,
                border: active ? "1px solid #378add" : "1px solid #e5e5e3",
                background: active ? "#378add" : "#fff",
                color: active ? "#fff" : "#5f5e5a",
                fontWeight: active ? 600 : 400,
              }}>{cat}</button>
            );
          })}
        </div>

        <BidTable filter={catFilter}/>
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
        style={{
          width:4,background: dragging ? "#378add" : "#e5e5e3",cursor:"col-resize",
          flexShrink:0,alignSelf:"stretch",
        }}
      />

      {/* Right — Chat */}
      <div style={{
        display:"flex",flexDirection:"column",background:"#ffffff",
        width:chatWidth,minWidth:320,maxWidth:700,flexShrink:0,overflow:"hidden",
      }}>
        <div style={{
          fontSize:10,fontWeight:600,color:"#888780",padding:"12px 14px 8px",
          letterSpacing:0.8,textTransform:"uppercase",textAlign:"left",
        }}>
          AI Analyst
        </div>

        <div ref={chatRef} style={{
          flex:1,overflowY:"auto",padding:"4px 14px 12px",
          display:"flex",flexDirection:"column",gap:10,alignItems:"stretch",
        }}>
          {messages.length === 0 && (
            <div style={{
              display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",
              flex:1,gap:6,color:"#888780",fontSize:13,textAlign:"left",padding:"12px 4px",
            }}>
              <div style={{fontSize:28}}>💬</div>
              <div style={{color:"#5f5e5a"}}>Ask anything about the bids</div>
              <div style={{fontSize:11}}>Prices · risks · charts · recommendations</div>
            </div>
          )}

          {messages.map((m, i) => {
            if (m.role === "user") {
              return (
                <div key={i} style={{
                  alignSelf:"flex-end",background:"#1a6abf",color:"#fff",
                  borderRadius:"12px 12px 2px 12px",padding:"9px 13px",
                  fontSize:13,lineHeight:1.45,maxWidth:"88%",textAlign:"left",
                }}>
                  {m.text}
                </div>
              );
            }
            const p = m.parsed;
            return (
              <div key={i} style={{
                alignSelf:"flex-start",width:"100%",boxSizing:"border-box",
                background:"#fafaf9",borderRadius:"2px 12px 12px 12px",
                boxShadow:"0 1px 3px rgba(0,0,0,0.06)",overflow:"hidden",textAlign:"left",
              }}>
                <div style={{height:3,background:"#378add",width:"100%"}} />
                <div style={{padding:"11px 13px"}}>
                  <div style={{
                    fontSize:13,lineHeight:1.6,color:"#1a1a18",textAlign:"left",
                    marginBottom:p.data||p.flags?.length?8:0,
                  }}>{p.summary}</div>
                  {(p.answer_type==="table"||p.answer_type==="mixed") && <AITable data={p.data}/>}
                  {(p.answer_type==="chart"||p.answer_type==="mixed") && <AIChart data={p.data}/>}
                  {p.flags?.length > 0 && <FlagGroups flags={p.flags} />}
                  <div style={{fontSize:10,color:"#888780",marginTop:8,display:"flex",alignItems:"center",textAlign:"left"}}>
                    <ConfidenceDot level={p.confidence}/>{p.confidence} confidence
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div style={{
              alignSelf:"flex-start",background:"#fff",border:"1px solid #e5e5e3",
              borderRadius:"2px 12px 12px 12px",padding:"12px 14px",display:"flex",gap:5,alignItems:"center",
            }}>
              {[0,150,300].map(d=>(
                <span key={d} style={{
                  width:6,height:6,borderRadius:"50%",background:"#888780",
                  display:"inline-block",animation:"pulse 1.2s infinite",animationDelay:`${d}ms`,
                }}/>
              ))}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div style={{padding:"8px 14px 0",display:"flex",flexWrap:"wrap",gap:6}}>
          {SUGGESTIONS.map(s=>(
            <button key={s} onClick={()=>send(s)} style={{
              fontSize:10,padding:"4px 10px",border:"1px solid #85b7eb",borderRadius:999,
              color:"#185fa5",background:"#fff",cursor:"pointer",lineHeight:1.3,textAlign:"left",
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding:"10px 14px 14px",borderTop:"1px solid #e5e5e3",marginTop:8,
          background:"#fff",display:"flex",gap:8,alignItems:"center",
        }}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about vendors, prices, risks..."
            style={{
              flex:1,width:"100%",height:36,fontSize:13,padding:"0 12px",
              border:"1px solid #d1d1ce",borderRadius:8,background:"#fff",color:"#111",
              outline:"none",fontFamily:"inherit",
            }}
          />
          <button
            onClick={()=>send(input)}
            disabled={loading}
            style={{
              width:36,height:36,borderRadius:"50%",border:"none",background:"#378add",
              color:"#fff",cursor:loading?"not-allowed":"pointer",fontSize:16,
              opacity:loading?0.4:1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
            }}
          >
            →
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}