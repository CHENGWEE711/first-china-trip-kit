from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUTPUT = Path("public/products/china-arrival-setup-bundle.pdf")
PREVIEW = Path("public/products/previews/china-arrival-setup-bundle-preview.pdf")

INK = colors.HexColor("#2F2A28")
EMBER = colors.HexColor("#B13A2F")
JADE = colors.HexColor("#3F7A68")
SAND = colors.HexColor("#F6EFE6")
PAPER = colors.HexColor("#FFFDF9")
LINE = colors.HexColor("#E1D6CC")
MUTED = colors.HexColor("#6B625D")


def styles():
    base = getSampleStyleSheet()
    base.add(ParagraphStyle("Kicker", parent=base["BodyText"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=EMBER, spaceAfter=7))
    base.add(ParagraphStyle("BundleTitle", parent=base["Title"], fontName="Helvetica-Bold", fontSize=26, leading=31, textColor=INK, spaceAfter=10))
    base.add(ParagraphStyle("BundleHeading", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=INK, spaceBefore=6, spaceAfter=8))
    base.add(ParagraphStyle("BundleBody", parent=base["BodyText"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=MUTED, spaceAfter=6))
    base.add(ParagraphStyle("BundleBodyBold", parent=base["BodyText"], fontName="Helvetica-Bold", fontSize=9.5, leading=14, textColor=INK, spaceAfter=6))
    base.add(ParagraphStyle("BundleSmall", parent=base["BodyText"], fontName="Helvetica", fontSize=7.5, leading=10, textColor=MUTED))
    return base


S = styles()


def p(text, style="BundleBody"):
    return Paragraph(text, S[style])


def checklist(title, items, accent=EMBER):
    rows = [[p(title, "BundleBodyBold")]] + [[p(f"□  {item}")] for item in items]
    table = Table(rows, colWidths=[6.85 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), SAND),
        ("LINEBELOW", (0, 0), (-1, 0), 1.2, accent),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 1), (-1, -1), 0.25, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 0.48 * inch, A4[0] - doc.rightMargin, 0.48 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 0.3 * inch, "First China Trip Kit - China Arrival Setup Bundle - Updated July 2026")
    canvas.drawRightString(A4[0] - doc.rightMargin, 0.3 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build(path, preview=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(path), pagesize=A4, rightMargin=0.58 * inch, leftMargin=0.58 * inch, topMargin=0.58 * inch, bottomMargin=0.66 * inch, title="China Arrival Setup Bundle")
    story = [
        Spacer(1, 0.35 * inch),
        p("FIRST CHINA TRIP KIT", "Kicker"),
        p("China Arrival Setup Bundle", "BundleTitle"),
        p("A practical, printable arrival plan for first-time China travelers. Use this after confirming current entry, payment, airline and transport requirements from official sources."),
        Spacer(1, 0.14 * inch),
        checklist("Your arrival-day command sheet", [
            "Passport, visa or transit evidence, onward travel and hotel details are available offline.",
            "Hotel name, Chinese address, phone number and map pin are saved in two places.",
            "Phone, cable, power bank and mobile-data activation steps are in hand luggage.",
            "A primary payment method, backup card and modest RMB cash reserve are ready.",
            "Airport or station transfer, pickup point and fallback route are confirmed.",
        ]),
        Spacer(1, 0.18 * inch),
        p("How to use this bundle", "BundleHeading"),
        p("Complete the checklists before departure. On arrival, solve only the next practical task: get data, open your saved hotel address, reach the hotel, and test one small payment. Do not enter passport or card numbers in shared notes, forms or unknown links."),
    ]
    if preview:
        story.append(Spacer(1, 0.25 * inch))
        story.append(p("Sample preview - the full bundle includes payment, app, transport, emergency and offline backup pages.", "BundleSmall"))
    else:
        story += [
            PageBreak(),
            p("FIRST CHINA TRIP KIT", "Kicker"),
            p("Payments and app setup", "BundleTitle"),
            checklist("Before you fly", [
                "Install Alipay or another primary payment option and follow the current verification prompts.",
                "Prepare a second card from a different issuer where possible.",
                "Install translation, map, ride-hailing and rail-support apps you actually need.",
                "Save your passwords and recovery route securely; do not rely on SMS access at the airport.",
                "Create an offline screenshot folder for reservations, addresses and insurance details.",
            ], JADE),
            Spacer(1, 0.18 * inch),
            checklist("If a payment or app fails", [
                "Step aside from the counter, check battery and data, then try one backup method.",
                "Ask whether the merchant can scan your payment code if scanning theirs did not work.",
                "Use cash or a physical card for the urgent purchase, then troubleshoot on stable Wi-Fi.",
                "Do not repeatedly retry an issuer-declined card; check bank alerts and limits later.",
            ], JADE),
            PageBreak(),
            p("FIRST CHINA TRIP KIT", "Kicker"),
            p("Transport, hotel and emergency backup", "BundleTitle"),
            checklist("Arrival-to-hotel plan", [
                "Confirm the exact airport, terminal, railway station or border port - not only the city name.",
                "Save the hotel address in Chinese, the front-desk phone number and a map pin.",
                "Record the ride-hailing pickup point, public-transport option and one simple fallback.",
                "For trains, match the ticket to the passport you will carry and check the exact departure station.",
            ]),
            Spacer(1, 0.18 * inch),
            checklist("Official verification reminders", [
                "Check your exact entry path with official immigration or consular sources before travel.",
                "Check current payment-app, card-issuer, airline and rail policies before relying on them.",
                "Ask the carrier and immigration authority if your transit route or documents are unclear.",
                "Keep travel insurance and emergency contacts available offline, but protected from casual access.",
            ]),
            Spacer(1, 0.18 * inch),
            p("Disclaimer", "BundleHeading"),
            p("This bundle is general travel-planning information, not legal, immigration, financial, medical, airline, payment-provider or transport advice. Requirements change and the final decision rests with the relevant authority, carrier, merchant or provider."),
        ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build(OUTPUT)
    build(PREVIEW, preview=True)
    print(f"Created {OUTPUT} and {PREVIEW}")
