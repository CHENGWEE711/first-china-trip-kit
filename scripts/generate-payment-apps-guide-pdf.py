from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    FrameBreak,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_PATH = Path("public/products/china-payment-apps-setup-guide.pdf")
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.58 * inch

INK = colors.HexColor("#2f2a28")
EMBER = colors.HexColor("#b13a2f")
CLAY = colors.HexColor("#d28a62")
SAND = colors.HexColor("#f6efe6")
PAPER = colors.HexColor("#fffdf9")
MIST = colors.HexColor("#eef3f0")
JADE = colors.HexColor("#3f7a68")
LINE = colors.HexColor("#e1d6cc")


if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("FCTK", str(FONT_PATH)))
    pdfmetrics.registerFont(TTFont("FCTKBold", str(FONT_PATH)))
    BASE_FONT = "FCTK"
    BOLD_FONT = "FCTKBold"
else:
    BASE_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"


class ColorBlock(Flowable):
    def __init__(self, width, height, fill_color, stroke_color=None):
        super().__init__()
        self.width = width
        self.height = height
        self.fill_color = fill_color
        self.stroke_color = stroke_color

    def draw(self):
        self.canv.setFillColor(self.fill_color)
        self.canv.setStrokeColor(self.stroke_color or self.fill_color)
        self.canv.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=1)


def make_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            "FCTKCoverKicker",
            fontName=BOLD_FONT,
            fontSize=11,
            textColor=CLAY,
            uppercase=True,
            leading=14,
            alignment=TA_CENTER,
            spaceAfter=14,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCoverTitle",
            fontName=BOLD_FONT,
            fontSize=31,
            leading=36,
            textColor=colors.white,
            alignment=TA_CENTER,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCoverSubtitle",
            fontName=BASE_FONT,
            fontSize=13,
            leading=19,
            textColor=colors.white,
            alignment=TA_CENTER,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKKicker",
            fontName=BOLD_FONT,
            fontSize=9,
            leading=11,
            textColor=EMBER,
            uppercase=True,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKTitle",
            fontName=BOLD_FONT,
            fontSize=24,
            leading=29,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKHeading",
            fontName=BOLD_FONT,
            fontSize=15,
            leading=18,
            textColor=INK,
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKBody",
            fontName=BASE_FONT,
            fontSize=9.6,
            leading=13.2,
            textColor=colors.HexColor("#554d49"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKSmall",
            fontName=BASE_FONT,
            fontSize=8.1,
            leading=11,
            textColor=colors.HexColor("#6b625d"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCardTitle",
            fontName=BOLD_FONT,
            fontSize=10,
            leading=13,
            textColor=INK,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKTableText",
            fontName=BASE_FONT,
            fontSize=7.6,
            leading=10.3,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKTableHead",
            fontName=BOLD_FONT,
            fontSize=7.8,
            leading=10.4,
            textColor=colors.white,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKPhrase",
            fontName=BASE_FONT,
            fontSize=8.6,
            leading=12,
            textColor=INK,
        )
    )
    return styles


S = make_styles()


def p(text, style="FCTKBody"):
    return Paragraph(text, S[style])


def bullet_list(items):
    return ListFlowable(
        [ListItem(p(item, "FCTKBody"), leftIndent=10) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=16,
        bulletFontName=BASE_FONT,
        bulletFontSize=7,
        bulletColor=EMBER,
    )


def check_list(items):
    data = []
    for item in items:
        data.append([p("□", "FCTKTableText"), p(item, "FCTKTableText")])
    table = Table(data, colWidths=[0.22 * inch, 6.55 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def info_card(title, body, width=3.25 * inch):
    content = [
        [p(title, "FCTKCardTitle")],
        [p(body, "FCTKSmall")],
    ]
    table = Table(content, colWidths=[width], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SAND),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def section_header(kicker, title, intro=None):
    out = [p(kicker, "FCTKKicker"), p(title, "FCTKTitle")]
    if intro:
        out.append(p(intro, "FCTKBody"))
    out.append(Spacer(1, 0.08 * inch))
    return out


def table(rows, widths, header=True):
    converted = []
    for row_index, row in enumerate(rows):
        style = "FCTKTableHead" if row_index == 0 and header else "FCTKTableText"
        converted.append([p(str(cell), style) for cell in row])
    t = Table(converted, colWidths=widths, hAlign="LEFT", repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        commands.extend(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, MIST]),
            ]
        )
    else:
        commands.append(("BACKGROUND", (0, 0), (-1, -1), colors.white))
    t.setStyle(TableStyle(commands))
    return t


def on_page(canvas, doc):
    page_num = canvas.getPageNumber()
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont(BOLD_FONT, 8)
    canvas.drawString(MARGIN, 0.33 * inch, "First China Trip Kit")
    canvas.setFont(BASE_FONT, 7.5)
    canvas.setFillColor(colors.HexColor("#6b625d"))
    canvas.drawCentredString(PAGE_WIDTH / 2, 0.33 * inch, "Travel planning information - verify official requirements")
    canvas.drawRightString(PAGE_WIDTH - MARGIN, 0.33 * inch, f"{page_num}")
    canvas.restoreState()


def cover_page(story):
    cover = Table(
        [
            [p("FIRST CHINA TRIP KIT", "FCTKCoverKicker")],
            [p("China Payment & Apps Setup Guide", "FCTKCoverTitle")],
            [
                p(
                    "A printable pre-arrival setup pack for Alipay, WeChat Pay, essential apps, maps, translation, ride-hailing, internet access, backup payment options, and first-day troubleshooting.",
                    "FCTKCoverSubtitle",
                )
            ],
            [
                p(
                    "Mobile-readable. Printable. Built for first-time foreign visitors preparing for China.",
                    "FCTKCoverSubtitle",
                )
            ],
        ],
        colWidths=[PAGE_WIDTH - 2 * MARGIN],
        rowHeights=[0.55 * inch, 1.3 * inch, 1.05 * inch, 0.7 * inch],
    )
    cover.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), INK),
                ("BOX", (0, 0), (-1, -1), 1, INK),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 28),
                ("RIGHTPADDING", (0, 0), (-1, -1), 28),
                ("TOPPADDING", (0, 0), (-1, -1), 18),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
            ]
        )
    )
    story.append(Spacer(1, 0.55 * inch))
    story.append(cover)
    story.append(Spacer(1, 0.28 * inch))
    story.append(
        table(
            [
                ["Use this guide for", "What this guide is not"],
                [
                    "Planning your first payment, app, internet, and backup setup before arrival.",
                    "Legal, immigration, visa, financial, banking, or official government advice.",
                ],
            ],
            [3.35 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())


def build_story():
    story = []
    cover_page(story)

    story += section_header(
        "Start here",
        "How to use this setup guide",
        "Work through the pages before you fly, then keep the phrase cards and offline notes on your phone. Availability may change, so use this as a practical planning layer and verify important rules in the official app or provider source.",
    )
    story.append(
        table(
            [
                ["When", "What to do", "Why it matters"],
                ["7-14 days before", "Install apps, add cards, choose data plan, save hotel address.", "You have time to solve verification and bank security prompts."],
                ["2-3 days before", "Reopen apps, update passwords, save screenshots, pack backup card and cash.", "Travel day is not the moment to debug account access."],
                ["Arrival day", "Test data, maps, translation, payment, ride-hailing, and hotel address.", "Small tests reduce stress before the first meal or taxi."],
                ["First 48 hours", "Use simple purchases, keep backups nearby, ask hotel staff for address help.", "Most friction is easier to solve away from queues."],
            ],
            [1.45 * inch, 3.1 * inch, 2.2 * inch],
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(info_card("Important travel disclaimer", "First China Trip Kit provides travel planning information only. We do not provide legal, immigration, visa, financial, banking, or official government advice. Visa rules, payment app support, bank card acceptance, transport policies, and booking requirements may change. Always verify current official requirements before booking or traveling.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Pre-arrival plan", "Your setup timeline")
    story.append(
        check_list(
            [
                "Confirm your passport, visa or visa-free transit eligibility, and entry documents through official sources.",
                "Install Alipay and WeChat before departure and confirm you can sign in.",
                "Add at least one international card to Alipay if supported for your account and card issuer.",
                "Prepare WeChat Pay as a backup if your account and card setup allow it.",
                "Choose roaming, eSIM, local SIM, or pocket Wi-Fi before arrival.",
                "Save your hotel name, Chinese address, phone number, and nearest landmark offline.",
                "Save passport copy, flight details, train tickets, attraction bookings, and insurance offline.",
                "Carry a physical card and a small cash backup for arrival-day problems.",
                "Prepare translation, maps, and ride-hailing access before the first transfer.",
            ]
        )
    )
    story.append(PageBreak())

    story += section_header("Payment overview", "Payment setup master checklist")
    story.append(
        table(
            [
                ["Layer", "Prepare", "Use for", "Backup note"],
                ["Alipay", "Install, sign in, add card, learn scan/show QR flows.", "Everyday payments, ride-hailing, some local travel services.", "Do not rely on one card only if you can add another."],
                ["WeChat Pay", "Prepare if your account supports it.", "Restaurants, mini programs, local contact flows.", "Treat as a backup until tested."],
                ["Physical card", "Keep the card used for hotels and bookings.", "Hotel deposits, international hotels, emergency backup.", "Some small merchants may not accept it."],
                ["Cash", "Carry a modest amount in RMB.", "Arrival-day gaps, phone battery issues, small merchant backup.", "China is mobile-payment heavy, but cash can still help."],
                ["Hotel help", "Ask staff to confirm addresses or write a short note.", "Taxi, station, booking, and payment explanation support.", "Useful when translation is not enough."],
            ],
            [1.0 * inch, 2.1 * inch, 2.0 * inch, 1.65 * inch],
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(info_card("Prepare a backup", "Payment app availability, foreign card support, merchant QR flows, and bank security rules may change. Keep more than one payment path ready.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Alipay", "Alipay setup checklist")
    story.append(
        check_list(
            [
                "Install the official Alipay app from your phone's app store.",
                "Sign in with a phone number you can access while traveling.",
                "Use the same passport name format when identity details are requested.",
                "Add your main international card if supported.",
                "Add a backup card from a different bank if possible.",
                "Learn the two QR patterns: scan merchant code and show your payment code.",
                "Enable phone security you can use while traveling, such as passcode or biometrics.",
                "Keep mobile data active before opening payment, map, or ride-hailing flows.",
                "Test with a small low-pressure purchase before relying on Alipay for a full day.",
            ]
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(info_card("If setup fails", "Do not solve every account issue at a busy counter. Step aside, try stable Wi-Fi, use a backup card or cash for urgent purchases, and ask hotel staff for practical help.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("WeChat Pay", "WeChat Pay setup checklist")
    story.append(
        check_list(
            [
                "Install WeChat and confirm you can sign in before travel day.",
                "Prepare account security and phone access before departure.",
                "Open wallet/payment features only if they are available for your account.",
                "Add your card if supported and complete only ordinary app prompts.",
                "Do not make WeChat Pay your only payment plan on a first trip.",
                "Use WeChat Pay where a restaurant, local service, or mini program flow needs it.",
                "Test with a small purchase before using it for a taxi, meal, or ticket line.",
                "Keep Alipay, physical card, and cash available as backups.",
            ]
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(
        table(
            [
                ["Good WeChat Pay use case", "Use another backup when"],
                ["A restaurant ordering system opens inside WeChat.", "Your account asks for extra verification you cannot complete."],
                ["A local contact or mini program expects WeChat.", "You are standing in a queue with weak mobile data."],
                ["A merchant QR flow works better in WeChat.", "The purchase is urgent and cash or Alipay is faster."],
            ],
            [3.35 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())

    story += section_header("Backup payment", "Backup payment decision tree")
    story.append(
        table(
            [
                ["Problem", "First move", "Second move", "Fallback"],
                ["Merchant QR will not load", "Check mobile data and try again.", "Ask if cashier can scan your payment code.", "Use another wallet or cash."],
                ["Card issuer blocks payment", "Try backup card if already added.", "Use cash or physical card for urgent purchase.", "Call issuer later on stable Wi-Fi."],
                ["App asks for verification", "Step aside and read the prompt calmly.", "Use hotel Wi-Fi or ask staff for translation help.", "Use another payment path."],
                ["Taxi payment unclear", "Use ride-hailing inside an app if possible.", "Show hotel address and ask about cash before ride.", "Ask hotel staff to help arrange taxi."],
                ["Restaurant QR ordering fails", "Ask staff for help or cashier ordering.", "Choose picture menu or counter ordering.", "Move to a simpler first meal."],
            ],
            [1.55 * inch, 1.85 * inch, 1.85 * inch, 1.5 * inch],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(info_card("Decision rule", "If the purchase is urgent, pay with the working backup first. Debug app and card problems later, away from the counter.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Apps", "Essential China apps stack")
    story.append(
        table(
            [
                ["Need", "Primary app type", "Prepare before arrival", "Offline backup"],
                ["Payment", "Alipay plus WeChat if available", "Install, sign in, add card, learn QR flows.", "Cash, physical card, screenshot notes."],
                ["Maps", "Apple Maps, Amap, or Baidu Maps", "Save hotel and station names in Chinese.", "Screenshots of routes and addresses."],
                ["Translation", "Text, camera, and offline Chinese", "Download offline language pack if offered.", "Saved phrase cards."],
                ["Ride-hailing", "DiDi or ride-hailing mini program", "Save hotel address and pickup notes.", "Taxi card and cash backup."],
                ["Trains", "12306 or travel platform", "Save passport-linked booking details.", "Screenshots of train number, station, carriage."],
                ["Internet", "Roaming, eSIM, local SIM, or pocket Wi-Fi", "Choose plan and test instructions.", "Airport Wi-Fi and hotel help."],
            ],
            [0.9 * inch, 1.7 * inch, 2.35 * inch, 1.8 * inch],
        )
    )
    story.append(PageBreak())

    story += section_header("Internet", "Mobile data and access checklist")
    story.append(
        check_list(
            [
                "Confirm your phone supports your chosen roaming, eSIM, SIM, or pocket Wi-Fi option.",
                "Save activation instructions offline before the flight.",
                "Keep your home SIM or phone number accessible if apps or banks send security prompts.",
                "Download offline Chinese in your translation app if available.",
                "Save key map pins, station names, hotel address, and booking details as screenshots.",
                "Before leaving the airport or station, test data, maps, translation, payment apps, and ride-hailing.",
                "Carry a power bank so payment and transport apps are not limited by battery.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        table(
            [
                ["Option", "Best for", "Watch for"],
                ["Roaming", "Simple short trips if your home plan is affordable.", "Daily fees, speed limits, and coverage."],
                ["Travel eSIM", "Phones that support eSIM and travelers who want setup before landing.", "Activation timing and mainland China support."],
                ["Local SIM", "Longer stays and travelers who need local service.", "Passport registration and setup time."],
                ["Pocket Wi-Fi", "Groups sharing one connection.", "Battery, pickup/return, and carrying another device."],
            ],
            [1.2 * inch, 3.1 * inch, 2.4 * inch],
        )
    )
    story.append(PageBreak())

    story += section_header("Arrival day", "First-day payment test")
    story.append(
        check_list(
            [
                "Open Alipay and confirm the app loads on mobile data.",
                "Open WeChat and confirm you can access chat and payment features if available.",
                "Load your hotel address in Chinese and map pin.",
                "Make one small low-pressure purchase, such as bottled water or a snack.",
                "If one card fails, try a backup card or another wallet before troubleshooting in depth.",
                "Use ride-hailing or hotel help for your first taxi if the destination is hard to explain.",
                "Keep cash, physical card, passport, and hotel address accessible on the first day.",
                "Write down what worked: wallet, card, merchant type, and any prompts you saw.",
            ]
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(info_card("Good first purchase", "Choose a calm shop near your hotel or a staffed counter. Avoid making your first test while a taxi meter is running or a restaurant line is waiting.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Troubleshooting", "Common payment failure fixes")
    story.append(
        table(
            [
                ["Symptom", "Likely cause", "What to try"],
                ["Payment app opens slowly", "Weak mobile data or app update.", "Step aside, reconnect, reopen app, use screenshot notes."],
                ["Card cannot be charged", "Issuer security or merchant support.", "Try backup card, lower-pressure merchant, cash, or physical card."],
                ["QR scan does nothing", "Wrong QR type or mini program issue.", "Ask cashier to scan your payment code instead."],
                ["Identity prompt appears", "Account verification required.", "Read prompt, use stable Wi-Fi, avoid sharing sensitive data with strangers."],
                ["Restaurant ordering QR is confusing", "Menu flow requires local language or account.", "Ask staff for help, use camera translation, or order at counter."],
                ["Taxi driver does not understand address", "Address not saved in Chinese.", "Show hotel card with Chinese address and phone number."],
                ["Train booking details hard to find", "App login or data issue.", "Use passport, screenshots, and staffed counter if needed."],
            ],
            [1.55 * inch, 1.85 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())

    story += section_header("Phrase cards", "Taxi and checkout phrases")
    story.append(
        table(
            [
                ["Situation", "Show this Chinese", "Pinyin", "Meaning"],
                ["Taxi to hotel", "请带我去这个地址。", "Qing dai wo qu zhe ge di zhi.", "Please take me to this address."],
                ["Call hotel", "可以帮我打电话给酒店吗？", "Ke yi bang wo da dian hua gei jiu dian ma?", "Can you help call the hotel?"],
                ["Alipay", "可以用支付宝吗？", "Ke yi yong Zhi Fu Bao ma?", "Can I use Alipay?"],
                ["WeChat Pay", "可以用微信支付吗？", "Ke yi yong Wei Xin Zhi Fu ma?", "Can I use WeChat Pay?"],
                ["Cash", "可以用现金吗？", "Ke yi yong xian jin ma?", "Can I use cash?"],
                ["Need help", "我不会操作，可以帮我一下吗？", "Wo bu hui cao zuo, ke yi bang wo yi xia ma?", "I do not know how to use this. Can you help?"],
                ["Receipt", "可以给我收据吗？", "Ke yi gei wo shou ju ma?", "Can I have a receipt?"],
            ],
            [1.0 * inch, 2.0 * inch, 1.95 * inch, 1.8 * inch],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(info_card("How to use phrases", "Show the Chinese characters on your screen. Short written Chinese is often clearer than long spoken audio in a busy taxi, shop, or restaurant.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Offline cards", "Print or save these cards")
    cards = [
        ("Hotel address card", "Hotel name: ____________________<br/>Chinese address: ____________________<br/>Phone: ____________________<br/>Nearest landmark: ____________________"),
        ("Payment backup card", "Main wallet: ____________________<br/>Backup wallet: ____________________<br/>Backup card: ____________________<br/>Cash location: ____________________"),
        ("Transport card", "Arrival airport/station: ____________________<br/>Hotel route: ____________________<br/>Backup taxi phrase saved: Yes / No"),
        ("Emergency card", "Travel insurance: ____________________<br/>Embassy/consulate info: ____________________<br/>Hotel front desk phone: ____________________"),
    ]
    story.append(
        table(
            [[title, body] for title, body in cards],
            [2.0 * inch, 4.75 * inch],
            header=False,
        )
    )
    story.append(PageBreak())

    story += section_header("Arrival checklist", "First 24 hours in China")
    story.append(
        check_list(
            [
                "Confirm phone data works outside the airport or station.",
                "Open maps and confirm your hotel route.",
                "Open translation app and camera translation.",
                "Confirm hotel address and phone number are saved in Chinese.",
                "Test one payment app with a small purchase.",
                "Keep cash and physical card available until payment is tested.",
                "Save screenshots of any app prompts that need later attention.",
                "Ask hotel staff to confirm station, attraction, or taxi addresses before long transfers.",
                "Avoid tight train, flight, or attraction schedules on the first day.",
                "Rest, charge devices, and prepare the next morning's transport plan.",
            ]
        )
    )
    story.append(PageBreak())

    story += section_header("Verify", "Official verification reminders")
    story.append(
        table(
            [
                ["Topic", "Verify before relying on it", "Where to check"],
                ["Entry documents", "Visa, visa-free transit, passport validity, permitted stay area.", "Official consular or immigration sources."],
                ["Payment apps", "Current foreign card support, fees, identity prompts, and usage limits.", "Official app help pages and in-app notices."],
                ["Transport", "Ticket rules, station name, passport checks, refund or change policy.", "Official railway or booking platform details."],
                ["Attractions", "Reservation rules, passport requirements, closure days, entry time.", "Official attraction pages or booking mini programs."],
                ["Mobile data", "Plan coverage, activation timing, speed, and mainland China support.", "Your mobile provider or eSIM provider."],
            ],
            [1.3 * inch, 3.2 * inch, 2.25 * inch],
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(info_card("Keep this wording in mind", "Availability may change. Prepare a backup. Verify official requirements. This guide helps you plan, but it does not replace current official instructions.", 6.75 * inch))
    story.append(PageBreak())

    story += section_header("Quick reference", "Final pre-flight checklist")
    story.append(
        check_list(
            [
                "Passport and entry documents verified.",
                "Hotel Chinese address and phone number saved offline.",
                "Alipay installed, signed in, and prepared if available.",
                "WeChat and WeChat Pay prepared as a backup if available.",
                "Payment backup card and cash plan ready.",
                "Mobile data option chosen and instructions saved offline.",
                "Maps, translation, ride-hailing, and train support apps prepared.",
                "First-day small payment test planned.",
                "Taxi and checkout phrase cards saved to phone.",
                "Important screenshots stored in an offline album.",
                "Official requirements checked before final bookings.",
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(info_card("Need help?", "If you cannot access your guide or purchased the wrong file, contact hello@firstchinatripkit.com and we will review the issue.", 6.75 * inch))
    return story


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        rightMargin=MARGIN,
        leftMargin=MARGIN,
        topMargin=0.54 * inch,
        bottomMargin=0.58 * inch,
        title="China Payment & Apps Setup Guide",
        author="First China Trip Kit",
        subject="Printable China payment and app setup guide for first-time visitors",
    )
    doc.build(build_story(), onFirstPage=on_page, onLaterPages=on_page)
    print(f"Payment & Apps Guide PDF ready: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
