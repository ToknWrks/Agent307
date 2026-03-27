import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const BLACK = rgb(0, 0, 0);
const GRAY = rgb(0.4, 0.4, 0.4);
const LIGHT_GRAY = rgb(0.85, 0.85, 0.85);

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Draw a horizontal rule
function drawRule(page: ReturnType<PDFDocument["addPage"]>, y: number, margin: number, width: number) {
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: LIGHT_GRAY,
  });
}

// Draw a labeled field row
function drawField(
  page: ReturnType<PDFDocument["addPage"]>,
  label: string,
  value: string,
  x: number,
  y: number,
  regularFont: ReturnType<typeof PDFDocument.prototype.embedStandardFont>,
  boldFont: ReturnType<typeof PDFDocument.prototype.embedStandardFont>
) {
  page.drawText(label, { x, y, size: 9, font: boldFont, color: GRAY });
  page.drawText(value, { x, y: y - 14, size: 11, font: regularFont, color: BLACK });
}

export async function generateArticlesOfOrganization(data: {
  llcName: string;
  registeredAgentName: string;
  registeredAgentAddress: string;
  organizerName: string;
  filingDate: Date;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // Letter size
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 72;
  const pageWidth = 612;
  const contentWidth = pageWidth - margin * 2;
  let y = 720;

  // Header
  page.drawText("STATE OF WYOMING", { x: margin, y, size: 11, font: bold, color: GRAY });
  y -= 16;
  page.drawText("SECRETARY OF STATE", { x: margin, y, size: 11, font: bold, color: GRAY });
  y -= 32;

  page.drawText("ARTICLES OF ORGANIZATION", {
    x: margin,
    y,
    size: 20,
    font: bold,
    color: BLACK,
  });
  y -= 12;
  page.drawText("Limited Liability Company", { x: margin, y, size: 12, font: regular, color: GRAY });
  y -= 8;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Article I
  page.drawText("ARTICLE I — NAME", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  page.drawText(
    "The name of the Limited Liability Company is:",
    { x: margin, y, size: 11, font: regular, color: BLACK }
  );
  y -= 22;
  page.drawText(data.llcName, { x: margin, y, size: 14, font: bold, color: BLACK });
  y -= 32;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Article II
  page.drawText("ARTICLE II — REGISTERED AGENT", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  page.drawText(
    "The name and address of the registered agent in Wyoming is:",
    { x: margin, y, size: 11, font: regular, color: BLACK }
  );
  y -= 22;
  page.drawText(data.registeredAgentName, { x: margin, y, size: 11, font: bold, color: BLACK });
  y -= 16;
  page.drawText(data.registeredAgentAddress, { x: margin, y, size: 11, font: regular, color: BLACK });
  y -= 32;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Article III
  page.drawText("ARTICLE III — MANAGEMENT", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  page.drawText(
    "The Limited Liability Company shall be managed by its Member(s).",
    { x: margin, y, size: 11, font: regular, color: BLACK }
  );
  y -= 32;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Article IV
  page.drawText("ARTICLE IV — LIABILITY", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  const liabilityText =
    "To the fullest extent permitted by the Wyoming Limited Liability Company Act, the liability of " +
    "each Member and Manager shall be limited. No Member or Manager shall be personally liable for " +
    "the debts, obligations, or liabilities of the Company solely by reason of being a Member or Manager.";

  // Word-wrap liability text
  const words = liabilityText.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    const w = regular.widthOfTextAtSize(test, 11);
    if (w > contentWidth) {
      page.drawText(line, { x: margin, y, size: 11, font: regular, color: BLACK });
      y -= 16;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x: margin, y, size: 11, font: regular, color: BLACK });
    y -= 16;
  }
  y -= 16;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Organizer
  page.drawText("ORGANIZER", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  page.drawText(
    `The undersigned, acting as organizer of the above LLC, executes these Articles of Organization on ${formatDate(data.filingDate)}.`,
    { x: margin, y, size: 11, font: regular, color: BLACK }
  );
  y -= 48;

  // Signature line
  page.drawLine({
    start: { x: margin, y },
    end: { x: margin + 200, y },
    thickness: 0.5,
    color: BLACK,
  });
  y -= 14;
  page.drawText(data.organizerName, { x: margin, y, size: 11, font: regular, color: BLACK });
  y -= 14;
  page.drawText("Organizer", { x: margin, y, size: 9, font: regular, color: GRAY });

  // Footer
  page.drawText(
    "This is a draft document. File via Wyoming Secretary of State at wyobiz.wyo.gov.",
    { x: margin, y: 40, size: 8, font: regular, color: GRAY }
  );

  return doc.save();
}

export async function generateOperatingAgreement(data: {
  llcName: string;
  memberName: string;
  memberAddress: string;
  registeredAgentName: string;
  registeredAgentAddress: string;
  effectiveDate: Date;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 72;
  const pageWidth = 612;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 16;

  function addPage() {
    const p = doc.addPage([612, 792]);
    return { page: p, y: 720 };
  }

  function wrapText(
    page: ReturnType<PDFDocument["addPage"]>,
    text: string,
    x: number,
    startY: number,
    size: number,
    font: Awaited<ReturnType<typeof doc.embedFont>>,
    color = BLACK,
    maxWidth = contentWidth
  ): number {
    let y = startY;
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > maxWidth) {
        page.drawText(line, { x, y, size, font, color });
        y -= lineHeight;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x, y, size, font, color });
      y -= lineHeight;
    }
    return y;
  }

  // --- Page 1 ---
  let { page, y } = addPage();

  page.drawText("OPERATING AGREEMENT", { x: margin, y, size: 20, font: bold, color: BLACK });
  y -= 16;
  page.drawText("Single-Member Limited Liability Company", { x: margin, y, size: 12, font: regular, color: GRAY });
  y -= 8;
  drawRule(page, y, margin, pageWidth);
  y -= 24;

  // Key details block
  drawField(page, "LLC Name", data.llcName, margin, y, regular, bold);
  y -= 40;
  drawField(page, "State of Formation", "Wyoming", margin, y, regular, bold);
  y -= 40;
  drawField(page, "Sole Member", data.memberName, margin, y, regular, bold);
  y -= 40;
  drawField(page, "Member Address", data.memberAddress, margin, y, regular, bold);
  y -= 40;
  drawField(page, "Registered Agent", `${data.registeredAgentName}, ${data.registeredAgentAddress}`, margin, y, regular, bold);
  y -= 40;
  drawField(page, "Effective Date", formatDate(data.effectiveDate), margin, y, regular, bold);
  y -= 40;
  drawRule(page, y, margin, pageWidth);
  y -= 28;

  // Recitals
  page.drawText("RECITALS", { x: margin, y, size: 10, font: bold, color: GRAY });
  y -= 18;
  y = wrapText(
    page,
    `This Operating Agreement ("Agreement") is entered into as of ${formatDate(data.effectiveDate)}, by ${data.memberName} ("Member"), as the sole member of ${data.llcName}, a Wyoming Limited Liability Company (the "Company"), organized pursuant to the Wyoming Limited Liability Company Act (Wyo. Stat. § 17-29-101 et seq.) (the "Act").`,
    margin, y, 11, regular
  );
  y -= 16;

  // Articles
  const articles = [
    {
      title: "ARTICLE 1 — ORGANIZATION",
      clauses: [
        { heading: "1.1 Formation.", text: `The Company was formed as a Wyoming limited liability company by filing Articles of Organization with the Wyoming Secretary of State.` },
        { heading: "1.2 Name.", text: `The name of the Company is ${data.llcName}.` },
        { heading: "1.3 Registered Agent.", text: `The Company's registered agent in Wyoming is ${data.registeredAgentName}, located at ${data.registeredAgentAddress}.` },
        { heading: "1.4 Principal Place of Business.", text: `The principal place of business shall be at the address designated by the Member from time to time.` },
        { heading: "1.5 Term.", text: `The Company shall continue in existence perpetually unless dissolved in accordance with this Agreement or the Act.` },
      ],
    },
    {
      title: "ARTICLE 2 — PURPOSE",
      clauses: [
        { heading: "2.1 Purpose.", text: `The Company may engage in any lawful business activity permitted under the laws of Wyoming and other applicable jurisdictions.` },
      ],
    },
    {
      title: "ARTICLE 3 — MEMBERSHIP",
      clauses: [
        { heading: "3.1 Sole Member.", text: `${data.memberName} is the sole Member and holds 100% of the membership interest of the Company.` },
        { heading: "3.2 Liability.", text: `The Member shall not be personally liable for the debts, obligations, or liabilities of the Company solely by reason of being a Member.` },
        { heading: "3.3 Transfer.", text: `The Member may transfer their membership interest, in whole or in part, without restriction. Any transferee shall be admitted as a Member upon execution of a written agreement.` },
      ],
    },
    {
      title: "ARTICLE 4 — MANAGEMENT",
      clauses: [
        { heading: "4.1 Member-Managed.", text: `The Company shall be managed by the Member. The Member has full authority to bind the Company, execute contracts, open bank accounts, and take any other action on behalf of the Company.` },
        { heading: "4.2 Officers.", text: `The Member may appoint officers to assist in Company operations. Officers shall serve at the pleasure of the Member and may be removed at any time.` },
        { heading: "4.3 Agents.", text: `The Member may authorize AI agents, automated systems, or other representatives to act on behalf of the Company within limits set by the Member. Such authorization shall be in writing and revocable at any time.` },
      ],
    },
    {
      title: "ARTICLE 5 — CAPITAL & FINANCES",
      clauses: [
        { heading: "5.1 Capital Contributions.", text: `The Member may contribute cash, property, or services to the Company at any time. The Company shall maintain appropriate records of all capital contributions.` },
        { heading: "5.2 Distributions.", text: `Distributions shall be made to the Member at such times and in such amounts as the Member determines, subject to the Act and applicable law.` },
        { heading: "5.3 Bank Accounts.", text: `The Company shall maintain one or more bank accounts in its name. The Member shall be the sole authorized signatory unless otherwise designated in writing.` },
        { heading: "5.4 Tax Treatment.", text: `As a single-member LLC, the Company shall be treated as a disregarded entity for federal income tax purposes unless the Member elects otherwise by filing appropriate forms with the IRS.` },
      ],
    },
    {
      title: "ARTICLE 6 — RECORDS",
      clauses: [
        { heading: "6.1 Records.", text: `The Company shall maintain complete and accurate books and records of its financial affairs and operations, including this Agreement, Articles of Organization, tax returns, and financial statements.` },
        { heading: "6.2 Fiscal Year.", text: `The fiscal year of the Company shall be the calendar year (January 1 through December 31) unless otherwise determined by the Member.` },
      ],
    },
    {
      title: "ARTICLE 7 — DISSOLUTION",
      clauses: [
        { heading: "7.1 Events of Dissolution.", text: `The Company shall be dissolved upon: (a) the written decision of the Member to dissolve; (b) the entry of a judicial decree of dissolution; or (c) any other event requiring dissolution under the Act.` },
        { heading: "7.2 Winding Up.", text: `Upon dissolution, the Company shall wind up its affairs, liquidate assets, pay liabilities, and distribute remaining assets to the Member.` },
      ],
    },
    {
      title: "ARTICLE 8 — MISCELLANEOUS",
      clauses: [
        { heading: "8.1 Governing Law.", text: `This Agreement shall be governed by and construed in accordance with the laws of the State of Wyoming.` },
        { heading: "8.2 Amendments.", text: `This Agreement may be amended only by a written instrument signed by the Member.` },
        { heading: "8.3 Entire Agreement.", text: `This Agreement constitutes the entire agreement of the Member with respect to the Company and supersedes all prior agreements, oral or written.` },
        { heading: "8.4 Severability.", text: `If any provision of this Agreement is found to be invalid, the remaining provisions shall remain in full force and effect.` },
      ],
    },
  ];

  for (const article of articles) {
    // Check if we need a new page
    if (y < 120) {
      const next = addPage();
      page = next.page;
      y = next.y;
    }

    page.drawText(article.title, { x: margin, y, size: 11, font: bold, color: BLACK });
    y -= 20;

    for (const clause of article.clauses) {
      if (y < 100) {
        const next = addPage();
        page = next.page;
        y = next.y;
      }

      const fullText = `${clause.heading} ${clause.text}`;
      y = wrapText(page, fullText, margin, y, 10, regular);
      y -= 10;
    }

    y -= 8;
  }

  // Signature block — new page if needed
  if (y < 200) {
    const next = addPage();
    page = next.page;
    y = next.y;
  }

  drawRule(page, y, margin, pageWidth);
  y -= 28;

  page.drawText("IN WITNESS WHEREOF", { x: margin, y, size: 11, font: bold, color: BLACK });
  y -= 16;
  y = wrapText(
    page,
    `The undersigned, being the sole Member of ${data.llcName}, adopts this Operating Agreement as of ${formatDate(data.effectiveDate)}.`,
    margin, y, 11, regular
  );
  y -= 40;

  page.drawLine({
    start: { x: margin, y },
    end: { x: margin + 240, y },
    thickness: 0.5,
    color: BLACK,
  });
  y -= 14;
  page.drawText(data.memberName, { x: margin, y, size: 11, font: regular, color: BLACK });
  y -= 14;
  page.drawText("Sole Member", { x: margin, y, size: 9, font: regular, color: GRAY });
  y -= 14;
  page.drawText(data.memberAddress, { x: margin, y, size: 9, font: regular, color: GRAY });

  // Footer on last page
  page.drawText(
    "This Operating Agreement is for informational purposes. Consult a licensed attorney for legal advice.",
    { x: margin, y: 40, size: 8, font: regular, color: GRAY }
  );

  return doc.save();
}
