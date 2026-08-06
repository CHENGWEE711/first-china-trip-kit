"""Build and validate the China Arrival Setup Bundle v2.0 delivery pack.

The paid bundle is deliberately a set of focused, offline-friendly PDFs instead
of one long document.  The $7 payment guide is generated separately and copied
byte-for-byte into the bundle so the two products cannot diverge silently.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, StyleSheet1
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


PRODUCT_VERSION = "2.0"
LAST_REVIEWED = "2026-07-29"
BRAND = "First China Trip Kit"
OUT = Path("product-assets/china-arrival-setup-bundle")
PREVIEWS = Path("public/products/previews")
TMP = Path("tmp/pdfs/arrival-setup-bundle")
PAYMENT_GUIDE = Path("product-assets/china-payment-apps-setup-guide.pdf")
PUBLIC_BUNDLE_PREVIEW = Path("public/products/previews/china-arrival-setup-bundle-preview.pdf")
LEGACY_BUNDLE_DOWNLOAD = Path("public/products/china-arrival-setup-bundle.pdf")
LEGACY_PAYMENT_DOWNLOAD = Path("public/products/china-payment-apps-setup-guide.pdf")
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

INK = colors.HexColor("#2F2A28")
EMBER = colors.HexColor("#B13A2F")
CLAY = colors.HexColor("#D28A62")
SAND = colors.HexColor("#F6EFE6")
PAPER = colors.HexColor("#FFFDF9")
MIST = colors.HexColor("#EEF3F0")
JADE = colors.HexColor("#3F7A68")
LINE = colors.HexColor("#E1D6CC")
MUTED = colors.HexColor("#6B625D")
AMBER = colors.HexColor("#C58A21")

if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("FCTK", str(FONT_PATH)))
    BASE_FONT = "FCTK"
    BOLD_FONT = "FCTK"
else:
    BASE_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"


def make_styles() -> StyleSheet1:
    styles = StyleSheet1()
    styles.add(ParagraphStyle("Kicker", fontName=BOLD_FONT, fontSize=8.5, leading=11, textColor=EMBER, spaceAfter=5))
    styles.add(ParagraphStyle("Title", fontName=BOLD_FONT, fontSize=25, leading=30, textColor=INK, spaceAfter=10))
    styles.add(ParagraphStyle("H1", fontName=BOLD_FONT, fontSize=19, leading=24, textColor=INK, spaceAfter=8))
    styles.add(ParagraphStyle("H2", fontName=BOLD_FONT, fontSize=13, leading=17, textColor=INK, spaceAfter=5))
    styles.add(ParagraphStyle("Body", fontName=BASE_FONT, fontSize=9.4, leading=13.6, textColor=colors.HexColor("#504844"), spaceAfter=5))
    styles.add(ParagraphStyle("BodySmall", fontName=BASE_FONT, fontSize=8.2, leading=11.4, textColor=MUTED, spaceAfter=4))
    styles.add(ParagraphStyle("BodyBold", fontName=BOLD_FONT, fontSize=9.4, leading=13.6, textColor=INK, spaceAfter=4))
    styles.add(ParagraphStyle("CoverKicker", fontName=BOLD_FONT, fontSize=11, leading=14, alignment=TA_CENTER, textColor=EMBER, spaceAfter=10))
    styles.add(ParagraphStyle("CoverTitle", fontName=BOLD_FONT, fontSize=28, leading=34, alignment=TA_CENTER, textColor=INK, spaceAfter=12))
    styles.add(ParagraphStyle("CoverBody", fontName=BASE_FONT, fontSize=11, leading=16, alignment=TA_CENTER, textColor=MUTED, spaceAfter=9))
    return styles


STYLES = make_styles()
MARGIN = 0.56 * inch
CONTENT_WIDTH = A4[0] - 2 * MARGIN


def p(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, STYLES[style])


def footer(canvas, doc) -> None:
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.45)
    canvas.line(MARGIN, 0.47 * inch, A4[0] - MARGIN, 0.47 * inch)
    canvas.setFont(BOLD_FONT, 7.8)
    canvas.setFillColor(INK)
    canvas.drawString(MARGIN, 0.3 * inch, BRAND)
    canvas.setFont(BASE_FONT, 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(A4[0] / 2, 0.3 * inch, f"China Arrival Setup Bundle v{PRODUCT_VERSION} - Last reviewed {LAST_REVIEWED}")
    canvas.drawRightString(A4[0] - MARGIN, 0.3 * inch, f"{doc.page}")
    canvas.restoreState()


def document(path: Path, title: str, subject: str, *, pagesize=A4) -> SimpleDocTemplate:
    path.parent.mkdir(parents=True, exist_ok=True)
    return SimpleDocTemplate(
        str(path),
        pagesize=pagesize,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.54 * inch,
        bottomMargin=0.66 * inch,
        title=title,
        author=BRAND,
        subject=subject,
    )


def card(title: str, text: str, *, fill=PAPER, accent=JADE) -> Table:
    data = [[p(title, "H2")], [p(text, "Body")]]
    table = Table(data, colWidths=[CONTENT_WIDTH])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.75, LINE),
        ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 13),
        ("RIGHTPADDING", (0, 0), (-1, -1), 13),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return table


def bullets(items: Iterable[str]) -> list:
    result = []
    for item in items:
        result.append(Paragraph(f'<font color="#B13A2F">&#9679;</font>&nbsp;&nbsp;{item}', STYLES["Body"]))
    return result


def completion_box(ready: str, backup: str) -> Table:
    data = [[p("YOU'RE READY WHEN", "BodyBold"), p("BACKUP IF IT FAILS", "BodyBold")], [p(ready, "Body"), p(backup, "Body")]]
    table = Table(data, colWidths=[CONTENT_WIDTH / 2, CONTENT_WIDTH / 2])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), MIST),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


def cover_story(title: str, subtitle: str, filename: str) -> list:
    return [
        Spacer(1, 0.52 * inch),
        p("FIRST CHINA TRIP KIT", "CoverKicker"),
        p(title, "CoverTitle"),
        p(subtitle, "CoverBody"),
        Spacer(1, 0.2 * inch),
        Table([[p(f"China Arrival Setup Bundle<br/>Version {PRODUCT_VERSION} - Last reviewed {LAST_REVIEWED}<br/>{filename}", "CoverBody")]], colWidths=[CONTENT_WIDTH], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), SAND), ("BOX", (0, 0), (-1, -1), 0.8, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 24), ("RIGHTPADDING", (0, 0), (-1, -1), 24),
            ("TOPPADDING", (0, 0), (-1, -1), 20), ("BOTTOMPADDING", (0, 0), (-1, -1), 20),
        ])),
        Spacer(1, 0.28 * inch),
        card("Use with current official information", "Payment-app support, carrier rules, entry arrangements and transport operations can change. Verify the current official requirement that applies to your own trip before relying on a plan in this bundle.", fill=MIST, accent=JADE),
    ]


def make_read_me_first() -> None:
    path = OUT / "00_READ_ME_FIRST.pdf"
    story = cover_story(
        "Read Me First",
        "A quick, calm way to choose the right setup path before your first China arrival.",
        "00_READ_ME_FIRST.pdf",
    )
    story += [
        Spacer(1, 0.24 * inch),
        p("Choose your setup time", "H1"),
    ]
    routes = [
        ("15-minute essential setup", "Choose a network option; install your primary payment app; save the hotel Chinese address; save your airport-to-hotel route; screenshot one offline emergency card."),
        ("30-minute recommended setup", "Add a payment backup; install map, translation and ride-hailing apps; check your airport or station and hotel names; prepare a cash or physical-card fallback."),
        ("60-minute complete setup", "Complete the payment, app, network, address, transport, first-24-hours, offline-card, troubleshooting and personal Arrival Sheet modules."),
    ]
    for title, text in routes:
        story += [card(title, text, fill=PAPER, accent=EMBER), Spacer(1, 0.12 * inch)]
    story += [PageBreak(), p("Open these files in this order", "H1")]
    files = [
        ("01", "China Arrival Setup Guide", "Your end-to-end pre-arrival sequence, complete standards and first-24-hours plan."),
        ("02", "Payment & Apps Setup Guide", "The complete current $7 guide. It is included, not a shortened duplicate."),
        ("03", "Mobile Quick Cards", "Large, bilingual cards for your phone gallery or printout."),
        ("04", "My China Arrival Sheet", "A fillable personal plan saved locally on your device."),
        ("05", "Troubleshooting Decision Trees", "Five short flows for common first-day failures."),
        ("06", "Offline Checklist and Sources", "Time-ordered checklists plus the source and update log."),
    ]
    rows = [[p("FILE", "BodyBold"), p("USE IT FOR", "BodyBold")]] + [[p(f"{num} - {name}", "BodyBold"), p(text, "Body")] for num, name, text in files]
    table = Table(rows, colWidths=[2.18 * inch, CONTENT_WIDTH - 2.18 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), PAPER),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER), ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story += [table, Spacer(1, 0.2 * inch), p("Important limitations", "H1")]
    story += bullets([
        "This is practical travel-planning information, not visa, immigration, legal, financial, medical or insurance advice.",
        "Payment platforms, banks, apps and network providers can require verification or decline a transaction. Keep a backup.",
        "For an emergency, contact the relevant official authority, carrier, hotel or local staff rather than relying on this PDF alone.",
        "Check the product page for the latest available version. This product does not promise lifetime updates or automatic email delivery.",
    ])
    document(path, "Read Me First - China Arrival Setup Bundle", "Quick-start instructions for the China Arrival Setup Bundle").build(story, onFirstPage=footer, onLaterPages=footer)


GUIDE_PAGES = [
    ("Your starting point", "Start with the tasks that make the next task possible. Prepare connection, payment, a readable hotel address, and an arrival route before adding optional tools.", ["Keep booking, hotel and onward-travel details available offline.", "Choose one primary internet option and one usable backup.", "Install a primary payment app while you have stable internet.", "Save the hotel Chinese name, address, phone and map pin."], "Your core four are saved in two places and can be opened without mobile data.", "Use airport Wi-Fi, a hotel phone call, a physical card or modest RMB cash to bridge the first gap."),
    ("Before you start", "Use the labels below to decide when a task belongs in your plan. A task can be useful without being safe to leave until after landing.", ["DO BEFORE DEPARTURE: apps, screenshots, address, route and backups.", "CAN DO AFTER ARRIVAL: local transit card, optional city app and a small payment test.", "REQUIRES INTERNET: app installation, booking changes, eSIM activation and maps.", "WORKS OFFLINE: saved cards, reservations, Chinese address and the Arrival Sheet."], "You know which items need a reliable connection and which ones must still work without one.", "Write critical information on a printout if your phone is your only copy."),
    ("Five first-trip mistakes to avoid", "Most arrival stress comes from dependence on a single app, a vague destination, or a plan that only works while the phone is online.", ["Only saving the hotel English name instead of Chinese address and phone.", "Relying on one card, one wallet or one network option.", "Guessing a station or terminal from the city name.", "Trying a first payment only when transport or dinner is urgent."], "Your plan has a second payment method, a second way to get online and a specific address.", "Ask hotel staff or a service counter for help instead of repeating failed app actions."),
    ("Payment readiness: choose a stack", "Use a primary option, a backup and a final fallback. The goal is not a guaranteed wallet; it is a calm order of actions when one method does not work.", ["Primary: a payment app set up with a supported card where available.", "Backup: another app or card from a different issuer where practical.", "Final fallback: physical card where accepted and a modest RMB cash reserve.", "Run a small, low-pressure payment test after arrival before you depend on it."], "Your primary, backup and final fallback are written on your Arrival Sheet.", "Step aside, check network and battery, then move to the next method rather than repeating a decline."),
    ("Payment completion standard", "Verification, bank rules and merchant flows can vary. Set up what you can, then plan for the possibility that a wallet or card is temporarily unavailable.", ["The payment app is installed from an official app store.", "Any requested in-app verification is completed through the official flow only.", "At least one card is ready to try and a second option is considered.", "You know how to reach your issuer if it sends a security alert."], "You can name your next two payment options without opening an app.", "Use the included Payment & Apps Guide and Payment Decision Tree for the exact failure order."),
    ("Essential apps: choose jobs, not logos", "Install only the apps you will actually use. Every app should have a job, an account requirement and a backup route.", ["Payment: a primary wallet and, if useful, a second wallet.", "Navigation: a map app with hotel and station pins saved.", "Translation: offline language data or saved phrases.", "Transport: ride-hailing and, if needed, the official rail or carrier app."], "Each essential job has an app, a login status and a backup.", "Use a web booking confirmation, printed address or hotel staff if an optional app cannot be installed."),
    ("Choose an internet plan", "Internet makes apps easier, but a plan should never assume one provider, one eSIM or one airport Wi-Fi network will work perfectly.", ["Compare international roaming, an eSIM and a local SIM for your phone compatibility, trip length and support needs.", "Confirm whether activation needs internet before landing.", "Keep your mobile carrier account and eSIM instructions accessible before you fly.", "Do not promise that a specific network tool or VPN will work in every location."], "You know your primary connection, activation step and backup connection.", "Use airport or hotel Wi-Fi long enough to contact the hotel and open offline information."),
    ("When mobile internet is missing", "Treat no data as a solvable sequence: phone settings, plan status, Wi-Fi, then offline information and a person who can help.", ["Check airplane mode, mobile data, roaming setting and battery.", "Check eSIM or SIM activation instructions without repeatedly changing unknown settings.", "Try trusted airport, station or hotel Wi-Fi for one task at a time.", "Open your saved Chinese address card before trying to search again."], "You can show your destination and contact details without a connection.", "Ask staff to call the hotel or use a physical taxi queue rather than entering a random address."),
    ("Address and location setup", "A readable Chinese address is more useful than a city name. Save the name, address, phone, map pin and nearby landmark before your trip.", ["Confirm the hotel English name with the booking confirmation.", "Ask the hotel or booking platform for the Chinese name and address if it is not shown.", "Save the hotel phone number and one nearby landmark.", "Save the exact arrival airport, terminal or high-speed railway station."], "Your hotel details fit on one screen and can be shown to a driver or staff member.", "Use the bilingual Mobile Address Card and have the hotel confirm the correct Chinese address."),
    ("Address completion standard", "Many cities have similarly named hotels and more than one railway station. Do not rely on an English transliteration or a generic district name.", ["Hotel Chinese name and full Chinese address are saved.", "Hotel phone is saved separately from the booking app.", "Airport, terminal and station names are matched to the ticket.", "A map pin and landmark are saved offline where your map app supports it."], "You can answer 'which station?' and 'which terminal?' without guessing.", "Show the card, call the hotel or ask the booking platform to confirm the exact property."),
    ("Airport or station to hotel", "Pick a first option that suits your arrival time, luggage and mobility, then write one simpler fallback. Do not rely on a fixed fare or a single pickup point.", ["Ride-hailing: confirm phone data, pickup point and payment backup.", "Taxi: show the Chinese address, ask for a receipt if useful and retain a payment fallback.", "Metro or airport express: confirm the last service and transfers before a late arrival.", "Hotel pickup: reconfirm meeting point, contact method and what to do if you cannot find it."], "Your first and backup transport choices include an address and a contact plan.", "Use a taxi queue, hotel call or public transport information desk if an app pickup fails."),
    ("Late arrival and no network", "At night, optimize for safety and clarity rather than the cheapest route. Keep the hotel number, address and a simple transport fallback visible.", ["Confirm whether rail, metro or airport express service still operates for your arrival time.", "If using ride-hailing, save the pickup instructions before you land.", "Keep cash or a physical-card option for a taxi where accepted.", "Choose a visible staffed place if you need to wait while reconnecting."], "Your late-arrival plan has a staffed fallback and hotel contact path.", "Call the hotel from an information desk, use an official taxi queue or ask to show your address card."),
    ("Luggage, children and mobility", "Extra bags, children, older travelers and mobility needs change the best transport choice. Plan for fewer transfers and a clear place to wait.", ["Choose a route with enough space and fewer stair or transfer surprises.", "Keep medication, charger, address and payment backup in carry-on baggage.", "Assign who holds the phone, documents and hotel address.", "Confirm if a child seat, lift access or hotel transfer is required."], "Your party knows the meeting point, the address and who carries the offline backup.", "Use staffed transport, hotel assistance or a taxi queue when the original route is no longer practical."),
    ("First 24 hours: before boarding", "Complete the highest-impact tasks while your usual number, Wi-Fi and support channels still work.", ["Activate or download your internet instructions.", "Confirm payment, address, route and hotel contact.", "Download or screenshot this bundle and your reservations.", "Tell an emergency contact your arrival city and accommodation."], "Your phone gallery has a single offline folder for arrival information.", "Print the core cards and Arrival Sheet if you do not trust your phone battery."),
    ("First 24 hours: after landing", "Do one thing at a time: complete required border formalities, collect bags, get connected, find transport, then make contact with the hotel.", ["Check local time and the last practical transport option.", "Use your selected data plan or trusted Wi-Fi.", "Open the saved Chinese hotel address before you leave the terminal.", "Make a small payment test only when it is safe and unhurried."], "You can reach the hotel without searching for a new destination.", "Use a taxi queue or hotel call while you resolve connection or payment problems."),
    ("First 24 hours: after check-in", "Once inside, reduce tomorrow's friction rather than trying to solve every travel task at once.", ["Confirm your next day's departure time and station or airport.", "Test map and ride-hailing access near the hotel.", "Save the hotel card, lobby photo or additional landmark.", "Charge your phone, power bank and any eSIM device."], "Your next transport connection and hotel return route are saved.", "Ask the front desk to write or confirm the address and nearest transport landmark."),
    ("First 24 hours: before sleep", "A short reset prevents a morning rush. Keep only the items that must work while you are tired.", ["Charge phone and power bank.", "Set an offline alarm and save your next departure time.", "Check ticket, station, terminal and hotel return route.", "Keep essential documents secure; do not store full card or passport details on casual notes."], "Tomorrow's first action is written down with time and location.", "Use hotel staff, carrier or official platform support if a ticket or route looks inconsistent."),
    ("Special scenario: solo travel", "Solo travelers benefit from reducing unknowns before leaving the airport or station.", ["Share your arrival outline with a trusted contact.", "Choose official pickup, transport and accommodation channels.", "Keep one payment and one address backup separate from your main phone workflow.", "Avoid sharing full document or payment details with strangers offering shortcuts."], "Someone you trust knows where you expect to stay and how to reach you.", "Stay in a visible staffed place and contact your hotel or official support if you feel unsure."),
    ("Special scenario: traveling with children", "Children add timing, food, rest and toilet-stop constraints. Choose a simpler first transport option and keep essentials close.", ["Carry snacks, water, required medication and a charging plan.", "Use the Arrival Sheet to note any relevant hotel or transport details.", "Avoid relying on a last-minute app setup while managing luggage.", "Confirm the hotel can receive your party and any child-specific needs."], "The route has room for delays and a quiet fallback.", "Ask hotel or carrier staff for a calm, official alternative rather than improvising a long transfer."),
    ("Special scenario: older or less-mobile travelers", "Favor reliability, assistance and low-transfer routes over a theoretically faster journey.", ["Plan lift access, luggage handling and a clear meeting point.", "Keep medication, contact information and the hotel address in a reachable place.", "Confirm whether your route requires long walks, stairs or a late transfer.", "Consider hotel pickup or a taxi queue where appropriate."], "Your arrival route matches the pace and mobility needs of the traveler.", "Use staff assistance and contact the hotel if the planned transfer becomes impractical."),
    ("Special scenario: no Chinese language", "A clear bilingual card is more useful than a long conversation. Point to the address, station or short request first.", ["Save the hotel address in Chinese and English.", "Use the included bilingual cards at transport and hotel desks.", "Keep translation app access, but do not make it your only communication method.", "Use numbers, dates and ticket screenshots to reduce ambiguity."], "Your important request can be shown on one card without a live translation session.", "Ask an official desk, hotel front desk or booking platform to help contact the right party."),
    ("Special scenario: payment fails", "Payment failure can come from data, account verification, an issuer security check, a card rule or a merchant flow. Do not assume one cause.", ["Check network and battery once.", "Look for an official in-app message or bank alert.", "Try one approved backup rather than repeated rapid attempts.", "Move to physical card or cash if the immediate purchase cannot wait."], "You know the next payment option before you approach the counter.", "Use the Payment & Apps Guide and the first Decision Tree for the detailed sequence."),
    ("Special scenario: phone lost", "Protect accounts first, then regain communication and access through official channels.", ["Use the device locator and account recovery routes you prepared before travel.", "Contact your carrier and payment providers through official channels.", "Use a hotel or trusted official desk to place necessary calls.", "Do not disclose account credentials to someone offering informal help."], "Your recovery contacts and a second way to reach your hotel are available offline.", "Use a trusted computer or hotel phone and follow official account recovery instructions."),
    ("Special scenario: passport lost", "A lost passport is an official matter. Do not rely on a generic internet guide for an individual case.", ["Keep a separate copy of your travel document details where you judge it appropriate.", "Contact local police and your embassy or consulate through official channels.", "Contact your carrier and hotel as needed to explain a travel disruption.", "Follow the instructions of immigration and consular authorities."], "You know how to reach your consular support and accommodation contact.", "Go to an official police, immigration or consular channel; do not use unverified intermediaries."),
    ("Special scenario: delayed baggage", "Keep the information needed to leave the airport even if your checked bag is delayed.", ["Keep payment, phone charging and hotel information in carry-on luggage.", "Record the carrier's baggage reference and official contact channel.", "Ask how the bag will be delivered and what address format is required.", "Do not leave the airport without the airline's written process or reference."], "You can travel to the hotel with documents, charging, address and payment backups.", "Use the hotel address card and keep the carrier reference in your offline folder."),
    ("Special scenario: hotel cannot find booking", "Stay calm at the desk and use the booking reference, identity document and hotel contact route.", ["Show the booking confirmation and date details.", "Confirm the property name and Chinese address match the reservation.", "Contact the booking platform through its official support route.", "Ask the hotel to explain the issue in writing if needed."], "You have the booking reference and a second way to contact the platform.", "Ask the hotel for nearby alternatives or use the booking platform's official emergency support."),
    ("Special scenario: flight or train changes", "A changed route can change airport, terminal, station, arrival time and hotel transport. Reconfirm all five, not only the departure time.", ["Use the carrier or official rail platform as your primary source.", "Confirm the exact new station, terminal and arrival time.", "Update the hotel and any pickup service.", "Recheck the last viable transport option."], "Your Arrival Sheet matches the current ticket and the hotel has your revised information if necessary.", "Contact the carrier, official rail platform or hotel directly before relying on a third-party message."),
    ("Final 60-minute review", "Use this page as the handoff from planning to travel. The aim is a prepared first day, not perfect control over every changing service.", ["Payment: primary, backup, final fallback.", "Internet: primary option, activation instruction, backup Wi-Fi or staff route.", "Address: Chinese hotel address, phone, map pin and landmark.", "Transport: primary route, backup route and first-24-hours plan."], "All four areas fit on your completed Arrival Sheet and can be opened offline.", "Start with the 15-minute route, then use each focused PDF only when you need it."),
    ("Limits, sources and next review", "Product facts are intentionally conservative. Use the Offline Checklist and Sources file for the review log and primary source categories.", ["Entry and transit requirements are assessed by relevant official authorities.", "Payment app support and bank-card rules depend on the provider and issuer.", "Transport operations, fares and pickup locations change by place and time.", "Check the product page for the latest available version before travel."], "You have identified which official source applies to your exact trip.", "Delay a decision and verify with the authority, carrier, hotel or provider when information is unclear."),
]


def make_arrival_guide() -> None:
    path = OUT / "01_CHINA_ARRIVAL_SETUP_GUIDE.pdf"
    story = cover_story(
        "China Arrival Setup Guide",
        "A complete pre-arrival setup system for first-time visitors who want fewer surprises after landing.",
        "01_CHINA_ARRIVAL_SETUP_GUIDE.pdf",
    )
    for index, (title, intro, items, ready, backup) in enumerate(GUIDE_PAGES, start=1):
        story += [PageBreak(), p(f"Section {index:02d}", "Kicker"), p(title, "H1"), p(intro, "Body")]
        story += bullets(items)
        story += [Spacer(1, 0.1 * inch), completion_box(ready, backup)]
        if title == "Before you start":
            story += [Spacer(1, 0.16 * inch), card("Identity checks may apply", "Some payment, telecom, carrier and railway services can request official identity verification. Follow the provider's own secure flow and do not send travel-document or card information through unofficial messages.", fill=SAND, accent=AMBER)]
        if title == "Airport or station to hotel":
            story += [Spacer(1, 0.16 * inch), card("Do not use a fixed-price promise", "Fares, pickup points, operating hours and payment acceptance change by city and time. Verify the route through the hotel, operator or app you will actually use.", fill=SAND, accent=AMBER)]
    document(path, "China Arrival Setup Guide", "Pre-arrival setup system for first-time China visitors").build(story, onFirstPage=footer, onLaterPages=footer)


class DecisionTree(Flowable):
    def __init__(self, nodes: list[tuple[str, str]], width: float = CONTENT_WIDTH):
        super().__init__()
        self.nodes = nodes
        self.width = width
        self.height = len(nodes) * 78 + (len(nodes) - 1) * 19

    def wrap(self, avail_width, avail_height):
        return min(self.width, avail_width), self.height

    def draw(self):
        canvas = self.canv
        width = self.width
        node_height = 60
        y = self.height - node_height
        for index, (question, action) in enumerate(self.nodes):
            canvas.setStrokeColor(EMBER if index == 0 else JADE)
            canvas.setFillColor(SAND if index == 0 else PAPER)
            canvas.roundRect(0, y, width, node_height, 8, fill=1, stroke=1)
            canvas.setFillColor(INK)
            canvas.setFont(BOLD_FONT, 10)
            canvas.drawString(13, y + 39, question)
            canvas.setFont(BASE_FONT, 8.4)
            for line_index, line in enumerate(split_lines(action, 88)):
                canvas.drawString(13, y + 23 - line_index * 10, line)
            if index < len(self.nodes) - 1:
                x = width / 2
                canvas.setStrokeColor(MUTED)
                canvas.line(x, y, x, y - 13)
                canvas.setFillColor(MUTED)
                canvas.setFont(BOLD_FONT, 7.4)
                canvas.drawCentredString(x, y - 10, "NO / NOT SURE")
                canvas.line(x, y - 13, x - 3.5, y - 8)
                canvas.line(x, y - 13, x + 3.5, y - 8)
            y -= 79


def split_lines(text: str, count: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        attempt = f"{line} {word}".strip()
        if len(attempt) > count and line:
            lines.append(line)
            line = word
        else:
            line = attempt
    if line:
        lines.append(line)
    return lines[:3]


def wrap_lines_by_width(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    """Wrap Latin words and unspaced CJK text using the actual PDF font width."""
    tokens = text.split() if " " in text else list(text)
    separator = " " if " " in text else ""
    lines: list[str] = []
    line = ""
    for token in tokens:
        attempt = f"{line}{separator if line else ''}{token}"
        if line and pdfmetrics.stringWidth(attempt, font_name, font_size) > max_width:
            lines.append(line)
            line = token
        else:
            line = attempt
    if line:
        lines.append(line)
    return lines


TREE_DATA = [
    ("Alipay or WeChat Pay is not working", [
        ("START: Is phone data or trusted Wi-Fi working?", "If yes, continue. If no, use the No Mobile Internet tree first."),
        ("Do you see an official app or bank verification message?", "Follow the official prompt once; do not send details through unofficial links."),
        ("Can you try a different approved card or wallet?", "Try one backup method, then stop repeated attempts if declined."),
        ("Can a physical card or modest cash solve this purchase?", "Use the immediate fallback, then investigate issuer or account rules later."),
        ("Still blocked?", "Use stable Wi-Fi and official provider or card-issuer support."),
    ]),
    ("DiDi or taxi problem", [
        ("START: Is the pickup point and Chinese address visible?", "If yes, confirm the pin. If no, open the Mobile Address Card."),
        ("Can the app locate you and show a car?", "If not, move to an official pickup area or use a taxi queue."),
        ("Can you pay in the app?", "If no, use a payment backup or ask about accepted payment before boarding."),
        ("Can the driver find the hotel?", "Show the Chinese address and hotel phone; use a nearby landmark."),
        ("Still uncertain?", "Ask the hotel or staffed transport desk for a verified route."),
    ]),
    ("Cannot find the hotel", [
        ("START: Do you have Chinese name, address and phone?", "If no, open booking confirmation or contact the booking platform."),
        ("Does the map pin match the booking property?", "If no, do not guess between similarly named hotels."),
        ("Can staff call the hotel?", "Show the card and ask a transport or information desk to call."),
        ("Can the booking platform confirm the property?", "Use official in-app or web support with your booking reference."),
        ("Still unresolved?", "Ask for a safe staffed place while the hotel or platform resolves it."),
    ]),
    ("No mobile internet", [
        ("START: Is airplane mode off and battery usable?", "If not, correct those basics first."),
        ("Is the chosen SIM or eSIM activated as instructed?", "Review your provider's official activation instructions."),
        ("Can trusted airport or hotel Wi-Fi connect?", "Use it for one urgent task: hotel contact or route confirmation."),
        ("Does roaming or APN need provider support?", "Contact your carrier through its official support route."),
        ("Still offline?", "Use offline cards, address sheet, cash/physical card and staffed assistance."),
    ]),
    ("Station or airport confusion", [
        ("START: Does the ticket show the exact city, station or terminal?", "If no, open the official carrier or rail booking."),
        ("Does the map pin match that exact location?", "Do not choose by English city name alone."),
        ("Has the schedule or terminal changed?", "Confirm through the official carrier or rail operator."),
        ("Can the hotel or transport provider confirm your route?", "Ask them to verify the exact station or terminal, not just the city."),
        ("Still unsure?", "Use a staffed official desk and allow extra time rather than guessing."),
    ]),
]


def make_decision_trees() -> None:
    path = OUT / "05_TROUBLESHOOTING_DECISION_TREES.pdf"
    story = cover_story("Troubleshooting Decision Trees", "Five printable flows for common payment, transport, hotel, network and station problems.", "05_TROUBLESHOOTING_DECISION_TREES.pdf")
    for title, nodes in TREE_DATA:
        story += [PageBreak(), p("FOLLOW ONE PATH AT A TIME", "Kicker"), p(title, "H1"), p("These flows help you choose the next safe action. They do not replace the official provider, carrier, hotel, immigration authority or emergency service.", "Body"), Spacer(1, 0.1 * inch), DecisionTree(nodes)]
    document(path, "Troubleshooting Decision Trees", "Offline decision trees for first China arrival problems").build(story, onFirstPage=footer, onLaterPages=footer)


CARDS = [
    ("My Hotel Address", "我的酒店地址", "Please take me to this hotel.", "请带我去这家酒店。", ["Hotel English name", "Hotel Chinese name", "Chinese address", "Hotel phone"]),
    ("Please Take Me to This Address", "请带我去这个地址", "Please take me to this address. Thank you.", "请带我去这个地址，谢谢。", ["Destination in Chinese", "Nearby landmark", "Hotel or contact phone"]),
    ("My Airport and Terminal", "我的机场和航站楼", "I need to go to this airport and terminal.", "我需要去这个机场和航站楼。", ["Airport", "Terminal", "Flight number", "Departure time"]),
    ("My Railway Station", "我的火车站", "I need to go to this railway station.", "我需要去这个火车站。", ["City", "Station name in Chinese", "Train number", "Departure time"]),
    ("Payment Is Not Working", "支付不能使用", "My payment is not working. Can I use another method?", "我的支付不能使用。我可以用其他方式吗？", ["Primary payment", "Backup payment", "Cash / physical-card note"]),
    ("I Have No Internet", "我没有网络", "I do not have mobile internet. Can you help me contact my hotel?", "我没有手机网络。您可以帮我联系酒店吗？", ["Hotel phone", "Hotel address", "Emergency contact"]),
    ("Please Call My Hotel", "请帮我联系酒店", "Please call my hotel. I need help finding the address.", "请帮我联系酒店。我需要帮助找到地址。", ["Hotel Chinese name", "Hotel phone", "Booking reference"]),
    ("I Need Help", "我需要帮助", "I am a visitor and I need help. Please help me contact my hotel or official service.", "我是游客，我需要帮助。请帮我联系酒店或官方服务。", ["Hotel / official contact", "Language", "Important note"]),
    ("Food Allergy", "食物过敏", "I have a food allergy. Please tell me what is in this food.", "我有食物过敏。请告诉我这份食物里有什么。", ["Allergen to avoid", "Severe reaction note", "Emergency contact"]),
    ("Medical or Passport Help", "医疗或护照帮助", "I need medical help or official passport assistance.", "我需要医疗帮助或官方护照协助。", ["Emergency / official contact", "Embassy or consulate", "Insurance contact"]),
]


def make_mobile_cards() -> None:
    from reportlab.pdfgen import canvas

    path = OUT / "03_MOBILE_QUICK_CARDS.pdf"
    width, height = 390, 720
    path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(path), pagesize=(width, height), title="Mobile Quick Cards", author=BRAND, subject="Bilingual offline quick cards for China arrival")
    for number, (title, chinese_title, english, chinese, fields) in enumerate(CARDS, start=1):
        c.setFillColor(PAPER)
        c.rect(0, 0, width, height, fill=1, stroke=0)
        c.setFillColor(INK)
        c.rect(0, height - 118, width, 118, fill=1, stroke=0)
        c.setFillColor(PAPER)
        c.setFont(BOLD_FONT, 10)
        c.drawString(26, height - 36, f"FIRST CHINA TRIP KIT  |  OFFLINE CARD {number:02d}")
        c.setFont(BOLD_FONT, 24)
        c.drawString(26, height - 71, title)
        c.setFillColor(colors.HexColor("#DCE9E4"))
        c.setFont(BOLD_FONT, 16)
        c.drawString(26, height - 98, chinese_title)
        y = height - 158
        card_height = 150
        text_width = width - 80
        c.setFillColor(SAND)
        c.roundRect(22, y - card_height, width - 44, card_height, 12, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont(BOLD_FONT, 12)
        c.drawString(40, y - 29, "SHOW THIS")
        c.setFont(BASE_FONT, 14)
        english_lines = wrap_lines_by_width(english, BASE_FONT, 14, text_width)
        if len(english_lines) > 3:
            raise ValueError(f"Mobile card English copy needs more than three lines: {title}")
        for i, line in enumerate(english_lines):
            c.drawString(40, y - 54 - i * 18, line)
        c.setFillColor(EMBER)
        c.setFont(BOLD_FONT, 17)
        chinese_lines = wrap_lines_by_width(chinese, BOLD_FONT, 17, text_width)
        if len(chinese_lines) > 3:
            raise ValueError(f"Mobile card Chinese copy needs more than three lines: {title}")
        chinese_y = y - 54 - (len(english_lines) - 1) * 18 - 26
        for i, line in enumerate(chinese_lines):
            c.drawString(40, chinese_y - i * 21, line)
        y -= card_height + 46
        c.setFillColor(MUTED)
        c.setFont(BOLD_FONT, 10)
        c.drawString(26, y, "FILL IN BEFORE YOU FLY")
        y -= 28
        for field in fields:
            c.setFillColor(INK)
            c.setFont(BOLD_FONT, 10)
            c.drawString(28, y, field)
            c.setStrokeColor(LINE)
            c.line(28, y - 13, width - 28, y - 13)
            y -= 54
        c.setFillColor(MUTED)
        c.setFont(BASE_FONT, 8.2)
        c.drawString(28, 35, f"Bundle v{PRODUCT_VERSION} - Last reviewed {LAST_REVIEWED}")
        c.drawString(28, 21, "Keep sensitive document and card numbers off this card.")
        c.showPage()
    c.save()


FORM_FIELDS = [
    ("traveler_name", "Traveler name or nickname"), ("arrival_date", "Arrival date"), ("arrival_city", "Arrival city"),
    ("flight_number", "Flight number"), ("arrival_airport", "Airport"), ("arrival_terminal", "Terminal"),
    ("hotel_english_name", "Hotel English name"), ("hotel_chinese_name", "Hotel Chinese name"),
    ("hotel_chinese_address", "Hotel Chinese address"), ("hotel_phone", "Hotel phone"),
    ("primary_transport", "First transport option"), ("backup_transport", "Backup transport option"),
    ("railway_station", "Railway station"), ("next_destination", "Next destination"),
    ("emergency_contact", "Emergency contact"), ("insurance_contact", "Insurance contact"),
    ("primary_payment", "Primary payment"), ("backup_payment", "Backup payment"),
    ("primary_internet", "Primary internet"), ("backup_internet", "Backup internet"), ("important_notes", "Important notes"),
]


def make_arrival_sheet() -> None:
    from reportlab.pdfgen import canvas

    path = OUT / "04_MY_CHINA_ARRIVAL_SHEET.pdf"
    c = canvas.Canvas(str(path), pagesize=A4, title="My China Arrival Sheet", author=BRAND, subject="Fillable local arrival planning sheet")
    positions = [(MARGIN, 0), (A4[0] / 2 + 8, 0)]
    index = 0
    for page in range(2):
        c.setFillColor(PAPER)
        c.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont(BOLD_FONT, 21)
        c.drawString(MARGIN, A4[1] - 58, "My China Arrival Sheet")
        c.setFillColor(MUTED)
        c.setFont(BASE_FONT, 9)
        c.drawString(MARGIN, A4[1] - 76, "Fill this locally. This PDF does not upload anything to the website. Do not add passport or bank-card numbers.")
        top = A4[1] - 120
        for column in range(2):
            x = positions[column][0]
            y = top
            for _ in range(6 if page == 0 else 5):
                if index >= len(FORM_FIELDS):
                    break
                name, label = FORM_FIELDS[index]
                c.setFillColor(INK)
                c.setFont(BOLD_FONT, 9)
                c.drawString(x, y, label)
                height = 52 if name in {"hotel_chinese_address", "important_notes"} else 24
                c.acroForm.textfield(
                    name=name,
                    value="",
                    x=x,
                    y=y - height - 8,
                    width=CONTENT_WIDTH / 2 - 20,
                    height=height,
                    borderStyle="solid",
                    borderWidth=0.7,
                    borderColor=LINE,
                    fillColor=PAPER,
                    textColor=INK,
                    forceBorder=True,
                    fontName="Helvetica",
                    fontSize=10,
                    fieldFlags="multiline" if height > 24 else "",
                )
                y -= height + 48
                index += 1
        c.setStrokeColor(LINE)
        c.line(MARGIN, 32, A4[0] - MARGIN, 32)
        c.setFillColor(MUTED)
        c.setFont(BASE_FONT, 7.5)
        c.drawString(MARGIN, 19, f"China Arrival Setup Bundle v{PRODUCT_VERSION} - Last reviewed {LAST_REVIEWED} - Page {page + 1} of 2")
        c.showPage()
    c.save()


def checklist_table(title: str, rows: list[str]) -> list:
    return [p(title, "H2"), Table([[p("□", "BodyBold"), p(row, "Body")] for row in rows], colWidths=[0.24 * inch, CONTENT_WIDTH - 0.24 * inch], style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PAPER), ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ])), Spacer(1, 0.12 * inch)]


SOURCES = [
    ("China government: Guide to Working and Living in China (2025)", "Payment choices, telecom/SIM overview, rail, ride-hailing and accommodation context.", "https://english.www.gov.cn/2025special/bizexpatsinchina2025"),
    ("China government: Payment service guide for overseas visitors", "Payment diversity, card, cash and mobile-payment context.", "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html"),
    ("National Immigration Administration", "240-hour visa-free transit conditions, ports and permitted areas. Final entry decisions remain with immigration authorities.", "https://en.nia.gov.cn/n147413/c187308/content.html"),
    ("China Railway 12306 English FAQ", "Official rail account, passport and ticketing context.", "https://www.12306.cn/en/faq.html"),
]


def make_offline_checklist_sources() -> None:
    path = OUT / "06_OFFLINE_CHECKLIST_AND_SOURCES.pdf"
    story = cover_story("Offline Checklist and Sources", "A printable time-ordered checklist, product update notes and a concise primary-source review log.", "06_OFFLINE_CHECKLIST_AND_SOURCES.pdf")
    story += [PageBreak(), p("Print or screenshot this checklist", "H1")]
    story += checklist_table("7 days before departure", ["Confirm your current entry and transit path with the relevant official authority.", "Check phone compatibility and choose internet plus one backup.", "Install payment, map, translation and transport apps from official stores.", "Ask hotel for Chinese name, Chinese address and phone if missing."])
    story += checklist_table("3 days before departure", ["Save airport, terminal, station, hotel and route details offline.", "Prepare payment primary, backup, physical card and modest cash fallback.", "Complete the Arrival Sheet and save Quick Cards to your phone."])
    story += checklist_table("24 hours before departure", ["Download this bundle and reservations to your offline folder.", "Charge phone and power bank; confirm eSIM or roaming activation instructions.", "Recheck any flight, train, hotel or pickup changes through official sources."])
    story += [PageBreak()]
    story += checklist_table("Before boarding", ["Open the 15-minute essential setup route.", "Confirm hotel Chinese address, phone and first transport option.", "Keep documents and payment backups in carry-on baggage."])
    story += checklist_table("After landing", ["Complete border and baggage steps, then connect to your selected internet option.", "Open the Chinese address before choosing transport.", "Test a small payment only when you have time and a backup."])
    story += checklist_table("After hotel check-in", ["Save the hotel card and confirm next-day station or airport.", "Charge devices; save tomorrow's plan offline.", "Use a hotel or official provider to resolve any major issue."])
    story += [PageBreak(), p("Source and update log", "H1"), p(f"Product version: {PRODUCT_VERSION}<br/>Last reviewed: {LAST_REVIEWED}<br/>Update policy: Check the product page for the latest available version. No lifetime-update or automatic-email-delivery promise is made.", "Body")]
    rows = [[p("PRIMARY SOURCE", "BodyBold"), p("USED TO REVIEW", "BodyBold")]]
    for name, use, url in SOURCES:
        rows.append([p(f'<link href="{url}">{name}</link>', "BodyBold"), p(use, "Body")])
    table = Table(rows, colWidths=[2.45 * inch, CONTENT_WIDTH - 2.45 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), PAPER),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER), ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story += [table, Spacer(1, 0.18 * inch), card("Update notes", "v2.0 creates a seven-file arrival setup system, includes the complete current $7 Payment & Apps Guide, adds offline cards, a fillable local Arrival Sheet, five decision trees, a first-24-hours plan and a source review log.", fill=MIST, accent=JADE)]
    document(path, "Offline Checklist and Sources", "Offline checklist and source review log for the China Arrival Setup Bundle").build(story, onFirstPage=footer, onLaterPages=footer)


def ensure_payment_guide() -> None:
    if PAYMENT_GUIDE.exists():
        return
    generator = Path(__file__).with_name("generate-payment-apps-guide-pdf.py")
    subprocess.run([sys.executable, str(generator)], check=True)
    if not PAYMENT_GUIDE.exists():
        raise FileNotFoundError(f"Could not generate the current $7 guide: {PAYMENT_GUIDE}")


def copy_payment_guide() -> None:
    ensure_payment_guide()
    if not PAYMENT_GUIDE.exists():
        raise FileNotFoundError(f"Generate the current $7 guide first: {PAYMENT_GUIDE}")
    destination = OUT / "02_PAYMENT_AND_APPS_SETUP_GUIDE.pdf"
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(PAYMENT_GUIDE, destination)
    if destination.read_bytes() != PAYMENT_GUIDE.read_bytes():
        raise RuntimeError("The bundle payment guide is not byte-identical to the standalone $7 guide.")


def render_preview(pdf: Path, page: int, destination: Path) -> None:
    executable = shutil.which("pdftoppm")
    if not executable:
        raise RuntimeError("pdftoppm is required to render product previews")
    destination.parent.mkdir(parents=True, exist_ok=True)
    prefix = TMP / destination.stem
    prefix.parent.mkdir(parents=True, exist_ok=True)
    for existing in prefix.parent.glob(f"{prefix.name}*"):
        existing.unlink()
    subprocess.run([executable, "-png", "-singlefile", "-r", "150", "-f", str(page), "-l", str(page), str(pdf), str(prefix)], check=True)
    rendered = prefix.with_suffix(".png")
    if not rendered.exists():
        raise RuntimeError(f"Could not render {pdf} page {page}")
    shutil.copy2(rendered, destination)


def make_previews() -> None:
    render_preview(OUT / "00_READ_ME_FIRST.pdf", 1, PREVIEWS / "arrival-bundle-v2-setup-routes.png")
    render_preview(OUT / "05_TROUBLESHOOTING_DECISION_TREES.pdf", 2, PREVIEWS / "arrival-bundle-v2-payment-tree.png")
    render_preview(OUT / "03_MOBILE_QUICK_CARDS.pdf", 1, PREVIEWS / "arrival-bundle-v2-address-card.png")
    render_preview(OUT / "01_CHINA_ARRIVAL_SETUP_GUIDE.pdf", 16, PREVIEWS / "arrival-bundle-v2-first-24-hours.png")
    render_preview(OUT / "04_MY_CHINA_ARRIVAL_SHEET.pdf", 1, PREVIEWS / "arrival-bundle-v2-arrival-sheet.png")
    # Preserve the existing public URLs as genuinely limited previews; the full
    # paid files live outside the web root and are delivered through Payhip.
    shutil.copy2(OUT / "00_READ_ME_FIRST.pdf", PUBLIC_BUNDLE_PREVIEW)
    shutil.copy2(OUT / "00_READ_ME_FIRST.pdf", LEGACY_BUNDLE_DOWNLOAD)
    payment_preview = PREVIEWS / "china-payment-apps-setup-guide-preview.pdf"
    if payment_preview.exists():
        shutil.copy2(payment_preview, LEGACY_PAYMENT_DOWNLOAD)


EXPECTED = {
    "00_READ_ME_FIRST.pdf": (2, 2),
    "01_CHINA_ARRIVAL_SETUP_GUIDE.pdf": (25, 35),
    "02_PAYMENT_AND_APPS_SETUP_GUIDE.pdf": (18, 18),
    "03_MOBILE_QUICK_CARDS.pdf": (8, 12),
    "04_MY_CHINA_ARRIVAL_SHEET.pdf": (2, 2),
    "05_TROUBLESHOOTING_DECISION_TREES.pdf": (6, 6),
    "06_OFFLINE_CHECKLIST_AND_SOURCES.pdf": (4, 4),
}


def get_uri_links(reader: PdfReader) -> list[str]:
    links: list[str] = []
    for page in reader.pages:
        for annotation in page.get("/Annots", []):
            obj = annotation.get_object()
            action = obj.get("/A")
            if action and action.get("/URI"):
                links.append(str(action["/URI"]))
    return links


def validate() -> None:
    forbidden = ("/Users/", "api_key", "secret", "token", "@example.com", "order_")
    for filename, (minimum, maximum) in EXPECTED.items():
        path = OUT / filename
        if not path.exists() or path.stat().st_size == 0:
            raise AssertionError(f"Missing or empty PDF: {filename}")
        reader = PdfReader(path)
        if not minimum <= len(reader.pages) <= maximum:
            raise AssertionError(f"Unexpected page count for {filename}: {len(reader.pages)}")
        page_text = [(page.extract_text() or "").strip() for page in reader.pages]
        if any(not value for value in page_text):
            raise AssertionError(f"Blank page found in {filename}")
        extracted = "\n".join(page_text)
        if len(extracted.strip()) < 180:
            raise AssertionError(f"No extractable text in {filename}")
        if "�" in extracted:
            raise AssertionError(f"Character corruption found in {filename}")
        raw = path.read_bytes().decode("latin-1", errors="ignore").lower()
        if any(value.lower() in raw for value in forbidden):
            raise AssertionError(f"Sensitive or internal metadata marker found in {filename}")
        if filename != "03_MOBILE_QUICK_CARDS.pdf":
            width = float(reader.pages[0].mediabox.width)
            height = float(reader.pages[0].mediabox.height)
            if abs(width - A4[0]) > 0.1 or abs(height - A4[1]) > 0.1:
                raise AssertionError(f"A4 page size expected for {filename}")
    mobile = PdfReader(OUT / "03_MOBILE_QUICK_CARDS.pdf")
    mobile_width = float(mobile.pages[0].mediabox.width)
    mobile_height = float(mobile.pages[0].mediabox.height)
    if not (380 <= mobile_width <= 400 and 700 <= mobile_height <= 730):
        raise AssertionError("Mobile Quick Cards do not use the intended portrait phone size")
    source_links = get_uri_links(PdfReader(OUT / "06_OFFLINE_CHECKLIST_AND_SOURCES.pdf"))
    if len(source_links) < 4 or not all(url.startswith("https://") for url in source_links):
        raise AssertionError("Offline source log has incomplete external links")
    form_path = OUT / "04_MY_CHINA_ARRIVAL_SHEET.pdf"
    form_reader = PdfReader(form_path)
    fields = form_reader.get_fields() or {}
    expected_fields = {name for name, _ in FORM_FIELDS}
    if not expected_fields.issubset(fields):
        raise AssertionError("Arrival Sheet form fields are incomplete")
    filled = TMP / "arrival-sheet-fill-test.pdf"
    writer = PdfWriter(clone_from=str(form_path))
    writer.update_page_form_field_values(None, {"traveler_name": "Sample Traveler", "arrival_city": "Sample City"}, auto_regenerate=False)
    with filled.open("wb") as stream:
        writer.write(stream)
    filled_reader = PdfReader(filled)
    filled_fields = filled_reader.get_fields() or {}
    if str(filled_fields["traveler_name"].get("/V", "")) != "Sample Traveler":
        raise AssertionError("Arrival Sheet form values did not persist after saving")
    if (OUT / "02_PAYMENT_AND_APPS_SETUP_GUIDE.pdf").read_bytes() != PAYMENT_GUIDE.read_bytes():
        raise AssertionError("$7 guide is not synchronized with the Bundle copy")
    print("Arrival Setup Bundle PDF package validation: PASS")
    for filename in EXPECTED:
        reader = PdfReader(OUT / filename)
        print(f"- {filename}: {len(reader.pages)} pages, {Path(OUT / filename).stat().st_size} bytes")


def main() -> None:
    make_read_me_first()
    make_arrival_guide()
    copy_payment_guide()
    make_mobile_cards()
    make_arrival_sheet()
    make_decision_trees()
    make_offline_checklist_sources()
    make_previews()
    validate()


if __name__ == "__main__":
    main()
