from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
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
CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN)

INK = colors.HexColor("#2F2A28")
EMBER = colors.HexColor("#B13A2F")
CLAY = colors.HexColor("#D28A62")
SAND = colors.HexColor("#F6EFE6")
PAPER = colors.HexColor("#FFFDF9")
MIST = colors.HexColor("#EEF3F0")
JADE = colors.HexColor("#3F7A68")
LINE = colors.HexColor("#E1D6CC")
MUTED = colors.HexColor("#6B625D")

SITE_URL = "www.firstchinatripkit.com"
CONTACT_EMAIL = "hello@firstchinatripkit.com"


if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("FCTK", str(FONT_PATH)))
    pdfmetrics.registerFont(TTFont("FCTKBold", str(FONT_PATH)))
    BASE_FONT = "FCTK"
    BOLD_FONT = "FCTKBold"
else:
    BASE_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"


def make_styles():
    styles = getSampleStyleSheet()
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
            "FCTKCoverKicker",
            fontName=BOLD_FONT,
            fontSize=12,
            leading=15,
            textColor=CLAY,
            alignment=TA_CENTER,
            spaceAfter=14,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCoverTitle",
            fontName=BOLD_FONT,
            fontSize=34,
            leading=39,
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
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKHeading",
            fontName=BOLD_FONT,
            fontSize=14.2,
            leading=17,
            textColor=INK,
            spaceBefore=6,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKBody",
            fontName=BASE_FONT,
            fontSize=9.2,
            leading=12.2,
            textColor=colors.HexColor("#554D49"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKSmall",
            fontName=BASE_FONT,
            fontSize=7.7,
            leading=10.2,
            textColor=MUTED,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCardTitle",
            fontName=BOLD_FONT,
            fontSize=10,
            leading=12.4,
            textColor=INK,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKTableHead",
            fontName=BOLD_FONT,
            fontSize=7.2,
            leading=9.2,
            textColor=colors.white,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKTableText",
            fontName=BASE_FONT,
            fontSize=7.0,
            leading=9.1,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKLargeCardText",
            fontName=BASE_FONT,
            fontSize=10,
            leading=14,
            textColor=INK,
        )
    )
    return styles


S = make_styles()


STYLE_ALIASES = {
    "Kicker": "FCTKKicker",
    "Title": "FCTKTitle",
    "CoverKicker": "FCTKCoverKicker",
    "CoverTitle": "FCTKCoverTitle",
    "CoverSubtitle": "FCTKCoverSubtitle",
    "Heading": "FCTKHeading",
    "Body": "FCTKBody",
    "Small": "FCTKSmall",
    "CardTitle": "FCTKCardTitle",
    "TableHead": "FCTKTableHead",
    "TableText": "FCTKTableText",
    "LargeCardText": "FCTKLargeCardText",
}


def p(text, style="Body"):
    return Paragraph(text, S[STYLE_ALIASES.get(style, style)])


def title(kicker, heading, intro=None):
    items = [p(kicker.upper(), "Kicker"), p(heading, "Title")]
    if intro:
        items.append(p(intro, "Body"))
    items.append(Spacer(1, 0.08 * inch))
    return items


def checkbox_table(items, col_width=CONTENT_WIDTH):
    rows = [[p("□", "TableText"), p(item, "TableText")] for item in items]
    table = Table(rows, colWidths=[0.25 * inch, col_width - 0.25 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def bullet_list(items):
    return ListFlowable(
        [ListItem(p(item, "Body"), leftIndent=10) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=16,
        bulletFontName=BASE_FONT,
        bulletFontSize=7,
        bulletColor=EMBER,
    )


def data_table(rows, widths, header=True, body_style="TableText"):
    converted = []
    for row_index, row in enumerate(rows):
        style = "TableHead" if row_index == 0 and header else body_style
        converted.append([p(str(cell), style) for cell in row])
    table = Table(converted, colWidths=widths, hAlign="LEFT", repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        commands.extend(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, MIST]),
            ]
        )
    else:
        commands.append(("BACKGROUND", (0, 0), (-1, -1), colors.white))
    table.setStyle(TableStyle(commands))
    return table


def card(title_text, body_text, width=CONTENT_WIDTH, fill=SAND):
    table = Table([[p(title_text, "CardTitle")], [p(body_text, "Small")]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def phrase_table(rows):
    return data_table(
        [["English", "Chinese characters", "Pinyin"]] + rows,
        [2.05 * inch, 2.2 * inch, 2.5 * inch],
    )


def on_page(canvas, doc):
    page_num = canvas.getPageNumber()
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFont(BOLD_FONT, 8)
    canvas.setFillColor(INK)
    canvas.drawString(MARGIN, 0.33 * inch, "First China Trip Kit")
    canvas.setFont(BASE_FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_WIDTH / 2, 0.33 * inch, SITE_URL)
    canvas.drawRightString(PAGE_WIDTH - MARGIN, 0.33 * inch, str(page_num))
    canvas.restoreState()


def cover_page(story):
    cover = Table(
        [
            [p("FIRST CHINA TRIP KIT", "CoverKicker")],
            [p("China Payment & Apps Setup Guide", "CoverTitle")],
            [
                p(
                    "A practical pre-arrival setup guide for Alipay, WeChat Pay, essential apps, and first-day payment backups.",
                    "CoverSubtitle",
                )
            ],
            [p(f"{SITE_URL}<br/>{CONTACT_EMAIL}", "CoverSubtitle")],
        ],
        colWidths=[CONTENT_WIDTH],
        rowHeights=[0.55 * inch, 1.45 * inch, 1.05 * inch, 0.62 * inch],
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
    story.append(Spacer(1, 0.75 * inch))
    story.append(cover)
    story.append(Spacer(1, 0.32 * inch))
    story.append(
        data_table(
            [
                ["Use this guide for", "Keep as backup"],
                [
                    "Preparing payment apps, essential apps, internet access, hotel address cards, and first-day tests before arrival.",
                    "Save the PDF offline and print the cards you may need for taxis, hotels, and checkout counters.",
                ],
            ],
            [3.35 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())


def build_story():
    story = []

    cover_page(story)

    story += title("Page 2", "Important disclaimer")
    story.append(
        card(
            "Travel planning information only",
            "This guide provides travel planning information only. It is not legal, immigration, financial, banking, or official government advice. Payment app support, card acceptance, verification rules, transport policies, and travel requirements may change. Always verify current official information before traveling.",
            fill=MIST,
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        data_table(
            [
                ["Do not use this guide as", "Use this guide as"],
                ["A guarantee that an app, bank card, visa, route, or merchant payment will work.", "A practical pre-trip checklist and backup planning tool."],
                ["A replacement for official app notices, bank card rules, immigration rules, or transport policies.", "A way to organize what to verify before booking and before relying on payment apps."],
            ],
            [3.35 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())

    story += title("Page 3", "Quick setup overview")
    story.append(
        checkbox_table(
            [
                "Install Alipay.",
                "Add international card if supported.",
                "Install WeChat.",
                "Prepare translation app.",
                "Prepare map app.",
                "Prepare eSIM / roaming.",
                "Save hotel address in Chinese.",
                "Carry backup cash.",
                "Carry physical bank card.",
                "Test payment on arrival day.",
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        card(
            "Best order",
            "Set up apps before you fly, save hotel details offline, then make one small purchase after arrival before depending on mobile payment for taxis or dinner.",
        )
    )
    story.append(PageBreak())

    story += title("Page 4", "Alipay setup checklist")
    story.append(
        data_table(
            [
                ["Section", "What to prepare", "Backup plan"],
                ["Passport", "Use the same passport name format if identity details are requested.", "Keep passport available during setup and hotel check-in."],
                ["International card", "Add a card if supported by your account and card issuer.", "Prepare another card, cash, and a physical card."],
                ["Phone number", "Use a number you can access while traveling.", "Keep your home SIM available if bank SMS is needed."],
                ["Bank app", "Make sure your bank app and security prompts work overseas.", "Notify your bank of travel if your issuer recommends it."],
                ["Stable internet", "Use reliable Wi-Fi or mobile data during setup.", "Do urgent purchases with a working backup first."],
                ["First-day payment test", "Test with water or a small snack.", "Do not make taxis or dinner your first test."],
                ["Common setup issues", "Card declined, SMS not received, identity prompt, app language confusion.", "Step aside, screenshot the prompt, and ask hotel staff if needed."],
            ],
            [1.22 * inch, 3.0 * inch, 2.53 * inch],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(card("Careful wording", "Alipay may work well for many foreign visitors, but support can depend on account status, card issuer, verification, app rules, and merchant flows. Prepare a backup."))
    story.append(PageBreak())

    story += title("Page 5", "WeChat / WeChat Pay setup checklist")
    story.append(
        data_table(
            [
                ["Topic", "Use", "Planning note"],
                ["Why WeChat is useful", "Messaging, local contact, restaurant ordering, mini programs, and some payment flows.", "Install before arrival and confirm you can sign in."],
                ["Messaging use", "Hotels, drivers, contacts, and service providers may use WeChat.", "Keep account access stable before you travel."],
                ["Payment backup", "WeChat Pay can be useful when a merchant or mini program expects it.", "Treat it as a backup until you have tested it."],
                ["Mini programs", "Restaurants, attractions, ride-hailing, and services may use mini programs.", "Some flows can be hard without Chinese support."],
                ["Setup friction warning", "Foreign card support and verification can vary.", "Do not make WeChat Pay your only payment option."],
                ["If WeChat Pay does not work", "Use Alipay, cash, physical card, or hotel help.", "Solve account issues later away from the queue."],
                ["When to use Alipay first", "Everyday QR payments and simple first-day purchases.", "Test both options before relying on either."],
            ],
            [1.35 * inch, 2.8 * inch, 2.6 * inch],
        )
    )
    story.append(PageBreak())

    story += title("Page 6", "Payment backup decision tree")
    story.append(
        data_table(
            [
                ["If this happens", "Try this", "Then this", "Final backup"],
                ["Alipay works", "Use it as your primary payment method.", "Still keep a backup card and cash.", "Save successful setup notes."],
                ["Alipay card fails", "Try another card.", "Check bank app or issuer security prompt.", "Use cash, physical card, or hotel help."],
                ["WeChat Pay works", "Use it as a backup.", "Use where restaurants or mini programs expect it.", "Do not remove other backups."],
                ["App payment fails", "Reconnect data and retry once.", "Try another wallet or cashier scan flow.", "Use cash / physical card / hotel help."],
                ["Taxi payment fails", "Ask driver if cash is possible.", "Call hotel or show hotel phone number.", "Ask hotel to help resolve the fare."],
                ["No internet", "Use offline hotel address and saved screenshots.", "Use cash and physical card.", "Get hotel or station staff help."],
            ],
            [1.42 * inch, 1.9 * inch, 1.9 * inch, 1.53 * inch],
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(card("Rule of thumb", "Pay with a working backup first. Debug account or bank issues later, away from a taxi, restaurant line, or checkout counter."))
    story.append(PageBreak())

    story += title("Page 7", "Essential China app stack")
    story.append(
        data_table(
            [
                ["App / Tool", "Chinese name", "Main use", "Install before arrival?", "Foreigner friction", "Backup tip"],
                ["Alipay", "支付宝", "Payment, QR codes, ride-hailing, some services.", "Yes", "Medium", "Carry card and cash."],
                ["WeChat", "微信", "Messaging, payment backup, mini programs.", "Yes", "Medium / High", "Use Alipay first if needed."],
                ["Translation app", "-", "Text, voice, camera translation.", "Yes", "Low", "Download offline Chinese."],
                ["Map app", "-", "Routes, addresses, transit.", "Yes", "Medium", "Save screenshots."],
                ["eSIM / roaming app", "-", "Mobile data setup and support.", "Yes", "Medium", "Keep hotel Wi-Fi plan."],
                ["Trip.com or train booking support", "-", "Train and hotel booking help.", "Yes", "Low / Medium", "Save passport-linked tickets."],
                ["DiDi", "滴滴", "Ride-hailing.", "Optional", "Medium", "Hotel can help call taxi."],
                ["Amap", "高德地图", "Local maps and transit.", "Optional", "High", "Use screenshots or translation."],
                ["12306", "中国铁路12306", "Official train tickets.", "Optional", "High", "Use booking platform or station help."],
                ["Offline screenshot folder", "-", "Backup for addresses and tickets.", "Yes", "Low", "Keep it available without data."],
            ],
            [0.92 * inch, 0.78 * inch, 1.55 * inch, 1.05 * inch, 0.95 * inch, 1.5 * inch],
        )
    )
    story.append(PageBreak())

    story += title("Page 8", "First-day payment test")
    story.append(
        checkbox_table(
            [
                "Go to a convenience store.",
                "Buy water or a small snack.",
                "Test Alipay.",
                "Confirm card charge.",
                "Save receipt if needed.",
                "Keep cash ready.",
                "Do not depend on taxis or dinner before testing payment.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        data_table(
            [
                ["Good test", "Avoid as first test"],
                ["A small purchase near your hotel, airport, or station.", "Taxi fare, group dinner, attraction entry, or any queue where people are waiting behind you."],
                ["A staffed counter where you can step aside if needed.", "A rushed self-service kiosk with weak mobile data."],
            ],
            [3.35 * inch, 3.35 * inch],
        )
    )
    story.append(PageBreak())

    story += title("Page 9", "Troubleshooting table")
    story.append(
        data_table(
            [
                ["Problem", "Possible reason", "What to try", "Backup"],
                ["Card cannot be added", "Issuer support, identity prompt, app rule, network issue.", "Try another card, stable Wi-Fi, or bank app check.", "Cash, physical card, hotel help."],
                ["SMS verification does not arrive", "Roaming, SIM, spam filter, delay.", "Wait, reconnect, check home SIM access.", "Use another payment path."],
                ["Merchant says payment failed", "QR flow, network, issuer block, merchant setting.", "Try again once, lower amount, or another wallet.", "Cash or physical card."],
                ["App asks for identity verification", "Account rules or transaction risk check.", "Read prompt carefully; avoid sharing sensitive data with strangers.", "Use backup payment."],
                ["No internet after landing", "Roaming/eSIM not active or airport coverage issue.", "Use airport/hotel Wi-Fi and activation notes.", "Cash, screenshots, hotel address."],
                ["Taxi cannot accept card", "Taxi expects cash or QR payment.", "Ask about cash before ride if possible.", "Hotel call or ride-hailing app."],
                ["Restaurant only accepts QR payment", "Ordering/payment inside QR or mini program.", "Ask staff to help or order at cashier.", "Choose simpler first meal."],
                ["Bank blocks transaction", "Issuer fraud check or travel rule.", "Open bank app or call support later.", "Backup card or cash."],
            ],
            [1.18 * inch, 1.82 * inch, 2.45 * inch, 1.3 * inch],
        )
    )
    story.append(PageBreak())

    story += title("Page 10", "Useful Chinese payment phrases")
    story.append(
        phrase_table(
            [
                ["Can I pay with Alipay?", "我可以用支付宝支付吗？", "Wǒ kěyǐ yòng Zhīfùbǎo zhīfù ma?"],
                ["Can I pay with WeChat Pay?", "可以用微信支付吗？", "Kěyǐ yòng Wēixìn zhīfù ma?"],
                ["Can I pay by card?", "可以刷卡吗？", "Kěyǐ shuākǎ ma?"],
                ["Can I pay with cash?", "可以用现金吗？", "Kěyǐ yòng xiànjīn ma?"],
                ["The payment failed.", "支付失败了。", "Zhīfù shībài le."],
                ["Could you scan my QR code?", "您可以扫我的付款码吗？", "Nín kěyǐ sǎo wǒ de fùkuǎn mǎ ma?"],
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(card("How to use this page", "Show the Chinese characters on your phone. Keep the page available offline in case translation apps or mobile data are not working."))
    story.append(PageBreak())

    story += title("Page 11", "Taxi and hotel phrase card")
    story.append(
        phrase_table(
            [
                ["Please help me call a taxi.", "请帮我叫一辆出租车。", "Qǐng bāng wǒ jiào yí liàng chūzūchē."],
                ["This is my hotel address.", "这是我的酒店地址。", "Zhè shì wǒ de jiǔdiàn dìzhǐ."],
                ["Please take me to this address.", "请带我去这个地址。", "Qǐng dài wǒ qù zhège dìzhǐ."],
                ["Can I pay with cash?", "可以用现金吗？", "Kěyǐ yòng xiànjīn ma?"],
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(card("Taxi note", "If your destination is difficult to explain, show the Chinese address and hotel phone number. Hotel staff can often help confirm the destination before you leave."))
    story.append(PageBreak())

    story += title("Page 12", "Hotel address card template")
    story.append(
        data_table(
            [
                ["Field", "Write your details here"],
                ["Hotel English name", ""],
                ["Hotel Chinese name", ""],
                ["Chinese address", ""],
                ["Hotel phone", ""],
                ["Nearest metro station", ""],
                ["Emergency contact", ""],
                ["Notes", ""],
            ],
            [2.0 * inch, 4.75 * inch],
            body_style="LargeCardText",
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(card("Offline tip", "Save this card as a screenshot and print one copy. It is useful for taxis, station help desks, and hotel check-in issues."))
    story.append(PageBreak())

    story += title("Page 13", "Payment backup card")
    story.append(
        data_table(
            [
                ["Backup item", "Write your plan here"],
                ["Primary payment", ""],
                ["Backup payment", ""],
                ["Cash location", ""],
                ["Bank support number", ""],
                ["Hotel phone", ""],
                ["Phrase", "可以用现金吗？ / Kěyǐ yòng xiànjīn ma? / Can I pay with cash?"],
            ],
            [2.0 * inch, 4.75 * inch],
            body_style="LargeCardText",
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(card("Do not store sensitive data", "Do not write full card numbers, account passwords, or bank login details on this card. Keep it practical and non-sensitive."))
    story.append(PageBreak())

    story += title("Page 14", "Before you fly checklist")
    checklist_groups = [
        ["Payment", "Alipay installed; WeChat installed; card prepared; cash backup ready."],
        ["Apps", "Translation, maps, ride-hailing, train support, and screenshot folder ready."],
        ["Internet", "Roaming, eSIM, SIM, or pocket Wi-Fi plan confirmed."],
        ["Hotel address", "Chinese name, address, phone, and nearest metro saved offline."],
        ["Train tickets", "Passport-linked details and station names saved."],
        ["Passport", "Passport accessible for hotel, trains, and tickets."],
        ["Cash", "Small RMB backup carried safely."],
        ["Power bank", "Charged and packed for payment and maps."],
        ["Emergency phrases", "Payment, taxi, hotel, and cash phrases saved offline."],
    ]
    story.append(data_table([["Area", "Ready check"]] + checklist_groups, [1.6 * inch, 5.15 * inch]))
    story.append(PageBreak())

    story += title("Page 15", "Official resources to verify")
    story.append(
        data_table(
            [
                ["Resource", "What to verify"],
                ["Alipay official resources", "Current foreign card support, identity requirements, fees, and payment limits."],
                ["WeChat Pay official resources", "Current foreign card support, wallet availability, verification, and usage limits."],
                ["China government payment guidance for overseas visitors", "Current official visitor payment guidance and accepted methods."],
                ["Your own bank card issuer", "Travel rules, fraud checks, overseas fees, SMS prompts, and card restrictions."],
                ["Hotel or travel provider", "Address, payment options, deposit rules, local taxi or arrival help."],
            ],
            [2.25 * inch, 4.5 * inch],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(card("Verify before booking", "Payment support, card acceptance, transport policies, and travel requirements may change. Check official resources before relying on any single setup."))
    story.append(PageBreak())

    story += title("Page 16", "Need more China trip help?")
    story.append(
        card(
            "Next steps",
            f"Visit {SITE_URL} for city kits, itinerary kits, travel essentials, and free planning tools.",
            fill=MIST,
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        data_table(
            [
                ["Resource", "Where to go"],
                ["City kits", "Choose your first China base and save useful Chinese addresses."],
                ["Itinerary kits", "Build routes that leave room for jet lag, transfers, and weather."],
                ["Travel essentials", "Prepare visa, internet, train, food, safety, and basic Chinese notes."],
                ["Free tools", "Use checklists, route pickers, and planning helpers."],
                ["Support", CONTACT_EMAIL],
            ],
            [1.65 * inch, 5.1 * inch],
        )
    )
    story.append(Spacer(1, 0.2 * inch))
    story.append(
        card(
            "Thank you",
            "Thanks for supporting First China Trip Kit. The guide stays practical, cautious, and focused on first-time visitors.",
        )
    )

    return story


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        rightMargin=MARGIN,
        leftMargin=MARGIN,
        topMargin=0.54 * inch,
        bottomMargin=0.62 * inch,
        title="China Payment & Apps Setup Guide",
        author="First China Trip Kit",
        subject="Printable China payment and app setup guide for first-time visitors",
    )
    doc.build(build_story(), onFirstPage=on_page, onLaterPages=on_page)
    print(f"Payment & Apps Guide PDF ready: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
