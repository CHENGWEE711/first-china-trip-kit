import os
import shutil
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, StyleSheet1
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_PATH = Path("public/products/china-payment-apps-setup-guide.pdf")
PREVIEW_DIR = Path("public/products/previews")
TMP_PREVIEW_DIR = Path("tmp/pdfs/payment-apps-previews")
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.56 * inch
CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN)

INK = colors.HexColor("#2F2A28")
EMBER = colors.HexColor("#B13A2F")
EMBER_DARK = colors.HexColor("#8F2E28")
CLAY = colors.HexColor("#D28A62")
SAND = colors.HexColor("#F6EFE6")
PAPER = colors.HexColor("#FFFDF9")
MIST = colors.HexColor("#EEF3F0")
JADE = colors.HexColor("#3F7A68")
LINE = colors.HexColor("#E1D6CC")
MUTED = colors.HexColor("#6B625D")
PINK = colors.HexColor("#F4E0DC")

RAW_SITE_URL = os.environ.get("NEXT_PUBLIC_SITE_URL", "https://www.firstchinatripkit.com")
DISPLAY_SITE_URL = RAW_SITE_URL.replace("https://", "").replace("http://", "").rstrip("/")
CONTACT_EMAIL = "hello@firstchinatripkit.com"
LAST_UPDATED = "July 2026"


if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("FCTK", str(FONT_PATH)))
    pdfmetrics.registerFont(TTFont("FCTKBold", str(FONT_PATH)))
    BASE_FONT = "FCTK"
    BOLD_FONT = "FCTKBold"
else:
    BASE_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"


def make_styles():
    styles = StyleSheet1()
    styles.add(
        ParagraphStyle(
            "Kicker",
            fontName=BOLD_FONT,
            fontSize=8.5,
            leading=10.5,
            textColor=EMBER,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Title",
            fontName=BOLD_FONT,
            fontSize=22,
            leading=27,
            textColor=INK,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "CoverKicker",
            fontName=BOLD_FONT,
            fontSize=12,
            leading=15,
            textColor=CLAY,
            alignment=TA_CENTER,
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            "CoverTitle",
            fontName=BOLD_FONT,
            fontSize=33,
            leading=38,
            textColor=colors.white,
            alignment=TA_CENTER,
            spaceAfter=14,
        )
    )
    styles.add(
        ParagraphStyle(
            "CoverSubtitle",
            fontName=BASE_FONT,
            fontSize=12.5,
            leading=18,
            textColor=colors.white,
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "Body",
            fontName=BASE_FONT,
            fontSize=8.8,
            leading=11.7,
            textColor=colors.HexColor("#554D49"),
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "BodyBold",
            fontName=BOLD_FONT,
            fontSize=8.8,
            leading=11.7,
            textColor=INK,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Small",
            fontName=BASE_FONT,
            fontSize=7.25,
            leading=9.4,
            textColor=MUTED,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            "SmallBold",
            fontName=BOLD_FONT,
            fontSize=7.25,
            leading=9.4,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            "CardTitle",
            fontName=BOLD_FONT,
            fontSize=9.4,
            leading=11.8,
            textColor=INK,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "CardTitleWhite",
            fontName=BOLD_FONT,
            fontSize=9.4,
            leading=11.8,
            textColor=colors.white,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "WhiteBody",
            fontName=BASE_FONT,
            fontSize=8.3,
            leading=10.7,
            textColor=colors.white,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            "TableHead",
            fontName=BOLD_FONT,
            fontSize=6.8,
            leading=8.5,
            textColor=colors.white,
        )
    )
    styles.add(
        ParagraphStyle(
            "TableText",
            fontName=BASE_FONT,
            fontSize=6.8,
            leading=8.8,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            "TableTextBold",
            fontName=BOLD_FONT,
            fontSize=6.8,
            leading=8.8,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            "LargeCardText",
            fontName=BASE_FONT,
            fontSize=9.5,
            leading=13,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            "Number",
            fontName=BOLD_FONT,
            fontSize=17,
            leading=19,
            textColor=EMBER,
            alignment=TA_CENTER,
        )
    )
    return styles


S = make_styles()


def p(text, style="Body"):
    return Paragraph(str(text), S[style])


def page_title(kicker, heading, intro=None):
    items = [p(kicker.upper(), "Kicker"), p(heading, "Title")]
    if intro:
        items.append(p(intro, "Body"))
    items.append(Spacer(1, 0.08 * inch))
    return items


def data_table(rows, widths, header=True, body_style="TableText", row_backgrounds=None):
    converted = []
    for row_index, row in enumerate(rows):
        cells = []
        for col_index, cell in enumerate(row):
            style = "TableHead" if row_index == 0 and header else body_style
            if not (row_index == 0 and header) and col_index == 0 and body_style == "TableText":
                style = "TableTextBold"
            cells.append(p(cell, style))
        converted.append(cells)

    table = Table(converted, colWidths=widths, hAlign="LEFT", repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        commands.extend(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), row_backgrounds or [colors.white, MIST]),
            ]
        )
    else:
        commands.append(("BACKGROUND", (0, 0), (-1, -1), colors.white))
    table.setStyle(TableStyle(commands))
    return table


def card(title_text, body_text, width=CONTENT_WIDTH, fill=SAND, title_style="CardTitle"):
    table = Table(
        [[p(title_text, title_style)], [p(body_text, "Small")]],
        colWidths=[width],
        hAlign="LEFT",
    )
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


def card_grid(cards, columns=2, fill=SAND):
    gap = 0.12 * inch
    width = (CONTENT_WIDTH - gap * (columns - 1)) / columns
    rows = []
    current = []
    for title_text, body_text in cards:
        current.append(card(title_text, body_text, width=width, fill=fill))
        if len(current) == columns:
            rows.append(current)
            current = []
    if current:
        current += [Spacer(width, 1)] * (columns - len(current))
        rows.append(current)

    table = Table(rows, colWidths=[width] * columns, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), gap / 2),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), gap),
            ]
        )
    )
    return table


def checkbox_table(items, col_width=CONTENT_WIDTH):
    rows = [[p("□", "TableTextBold"), p(item, "TableText")] for item in items]
    table = Table(rows, colWidths=[0.24 * inch, col_width - 0.24 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE),
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


def step_flow(steps):
    width = CONTENT_WIDTH / len(steps)
    row = []
    for index, (title_text, body_text) in enumerate(steps, start=1):
        row.append(
            Table(
                [[p(str(index), "Number")], [p(title_text, "CardTitle")], [p(body_text, "Small")]],
                colWidths=[width],
            )
        )
    table = Table([row], colWidths=[width] * len(steps), hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, -1), MIST),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def phrase_table(rows):
    return data_table(
        [["English", "Chinese characters", "Pinyin"]] + rows,
        [2.05 * inch, 2.25 * inch, 2.45 * inch],
    )


def print_card(title_text, rows):
    return KeepTogether(
        [
            card(title_text, "Cut out or screenshot this card. Do not write full card numbers, passwords, or bank login details.", fill=MIST),
            Spacer(1, 0.1 * inch),
            data_table(rows, [2.05 * inch, 4.7 * inch], header=False, body_style="LargeCardText"),
        ]
    )


def on_page(canvas, doc):
    page_num = canvas.getPageNumber()
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN, 0.48 * inch, PAGE_WIDTH - MARGIN, 0.48 * inch)
    canvas.setFont(BOLD_FONT, 8)
    canvas.setFillColor(INK)
    canvas.drawString(MARGIN, 0.31 * inch, "First China Trip Kit")
    canvas.setFont(BASE_FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_WIDTH / 2, 0.31 * inch, DISPLAY_SITE_URL)
    canvas.drawRightString(PAGE_WIDTH - MARGIN, 0.31 * inch, str(page_num))
    canvas.restoreState()


def cover_page(story):
    cover = Table(
        [
            [p("FIRST CHINA TRIP KIT", "CoverKicker")],
            [p("China Payment & Apps Setup Guide", "CoverTitle")],
            [
                p(
                    "A practical pre-arrival setup guide for Alipay, WeChat Pay, essential China apps, offline cards, and first-day payment backups.",
                    "CoverSubtitle",
                )
            ],
            [p(f"{DISPLAY_SITE_URL}<br/>{CONTACT_EMAIL}<br/>Last updated: {LAST_UPDATED}", "CoverSubtitle")],
        ],
        colWidths=[CONTENT_WIDTH],
        rowHeights=[0.52 * inch, 1.45 * inch, 1.08 * inch, 0.78 * inch],
    )
    cover.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), INK),
                ("BOX", (0, 0), (-1, -1), 1.2, INK),
                ("LINEBELOW", (0, 0), (-1, 0), 1.1, CLAY),
                ("LINEABOVE", (0, 3), (-1, 3), 1.1, CLAY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 30),
                ("RIGHTPADDING", (0, 0), (-1, -1), 30),
                ("TOPPADDING", (0, 0), (-1, -1), 18),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
            ]
        )
    )
    story.append(Spacer(1, 0.58 * inch))
    story.append(cover)
    story.append(Spacer(1, 0.22 * inch))
    story.append(
        card_grid(
            [
                ("Use before you fly", "Install apps, prepare cards, save addresses, and decide your payment backups before arrival."),
                ("Use on arrival day", "Run a small payment test before relying on mobile payment for taxis, dinner, or train station snacks."),
                ("Use offline", "Print or screenshot phrase cards, hotel cards, and the payment backup decision tree."),
            ],
            columns=3,
            fill=SAND,
        )
    )
    story.append(PageBreak())


def build_story():
    story = []
    cover_page(story)

    story += page_title(
        "Page 2",
        "Important disclaimer and how to use this kit",
        "This guide is a practical planning aid. It helps you prepare, test, and recover from common first-day payment and app issues.",
    )
    story.append(
        card(
            "Travel planning information only",
            "This guide is not legal, immigration, financial, banking, or official government advice. Payment app support, card acceptance, verification rules, transport policies, and travel requirements may change. Always verify current official information before traveling.",
            fill=PINK,
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        data_table(
            [
                ["Do not use this guide as", "Use this guide as"],
                ["A guarantee that an app, bank card, visa, route, or merchant payment will work.", "A practical pre-trip checklist, worksheet, and offline backup pack."],
                ["A replacement for official app notices, bank card rules, immigration rules, or transport policies.", "A way to organize what to verify before booking and before relying on payment apps."],
                ["A place to store passwords, full card numbers, or sensitive identity details.", "A non-sensitive print pack for addresses, support numbers, and simple phrases."],
            ],
            [3.25 * inch, 3.5 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 3", "Quick setup map")
    story.append(
        step_flow(
            [
                ("Install", "Alipay, WeChat, translation, map, mobile data, train support, and screenshot folder."),
                ("Prepare", "Passport, cards, bank app, SMS access, hotel address, cash, and physical card."),
                ("Save offline", "Hotel address, train bookings, phrase cards, bank support number, and arrival notes."),
                ("Test", "Make a small convenience-store purchase before relying on apps for taxis or dinner."),
            ]
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        checkbox_table(
            [
                "Install Alipay and log in before departure.",
                "Add an international card if supported by your account and issuer.",
                "Install WeChat and attempt WeChat Pay setup if available.",
                "Prepare translation, map, eSIM or roaming, and train support apps.",
                "Save hotel name, Chinese address, phone, and nearest metro station offline.",
                "Carry small RMB cash and a physical bank card as backups.",
                "Do a small first-day payment test before depending on mobile payment.",
            ]
        )
    )
    story.append(PageBreak())

    story += page_title("Page 4", "Alipay setup worksheet")
    story.append(
        data_table(
            [
                ["Section", "What to prepare", "If it does not work"],
                ["Passport", "Use the same passport name format if identity details are requested.", "Keep passport accessible and avoid rushing verification in a queue."],
                ["International card", "Add a card if supported by your account and card issuer.", "Try another card, check bank app alerts, or use cash / physical card."],
                ["Phone number", "Use a number you can access during travel.", "Keep your home SIM available if bank SMS is needed."],
                ["Bank app", "Confirm overseas card controls, security prompts, and transaction notices.", "Notify your bank if your issuer recommends travel setup."],
                ["Stable internet", "Use reliable Wi-Fi or mobile data during setup.", "Do urgent purchases with a working backup first."],
                ["First-day payment test", "Test with water or a small snack.", "Do not make taxis or dinner your first test."],
                ["Common setup issues", "Card declined, SMS not received, identity prompt, app language confusion.", "Step aside, screenshot the prompt, and ask hotel staff if needed."],
            ],
            [1.17 * inch, 2.9 * inch, 2.68 * inch],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(card("Careful wording", "Alipay may work well for many foreign visitors, but support can depend on account status, card issuer, verification, app rules, and merchant flows. Prepare a backup."))
    story.append(PageBreak())

    story += page_title("Page 5", "WeChat and WeChat Pay backup worksheet")
    story.append(
        data_table(
            [
                ["Topic", "Useful for", "Planning note"],
                ["WeChat account", "Messaging, local contact, service chats, and mini programs.", "Install before arrival and confirm you can sign in."],
                ["WeChat Pay", "Backup wallet and some restaurant or service payment flows.", "Treat it as a backup until you have tested it."],
                ["Mini programs", "Restaurants, attractions, ride-hailing, and services.", "Some flows can be hard without Chinese support."],
                ["Setup friction", "Foreign card support and verification can vary.", "Do not make WeChat Pay your only payment option."],
                ["If setup fails", "You can still use WeChat for communication if account access works.", "Use Alipay first if it works, plus cash and physical card."],
                ["When WeChat helps", "Hotel communication, local contacts, service counters, QR ordering.", "Keep screenshots and translation ready if Chinese screens appear."],
            ],
            [1.28 * inch, 2.95 * inch, 2.52 * inch],
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(card("Backup role", "WeChat is still useful even if WeChat Pay is not ready. Do not delete it just because payment setup is slow."))
    story.append(PageBreak())

    story += page_title("Page 6", "Payment backup decision tree")
    story.append(
        card_grid(
            [
                ("Alipay works", "Use it as primary. Still keep cash, physical card, and hotel address screenshots."),
                ("Alipay card fails", "Try another card. Check bank app alerts. Avoid repeated failed attempts at the counter."),
                ("WeChat Pay works", "Use it as backup for mini programs, restaurants, or merchants that expect WeChat."),
                ("App payment fails", "Reconnect data and retry once. Try a different QR flow. Then use backup payment."),
                ("Taxi payment fails", "Ask whether cash is possible. Show hotel phone number. Ask hotel staff for help if needed."),
                ("No internet", "Use offline hotel address, cash, physical card, and saved screenshots until data is restored."),
            ],
            columns=2,
            fill=MIST,
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(
        card(
            "Rule of thumb",
            "Pay with a working backup first. Debug app, card, or bank issues later, away from a taxi, restaurant line, or checkout counter.",
            fill=SAND,
        )
    )
    story.append(PageBreak())

    story += page_title("Page 7", "Essential China app stack")
    story.append(
        data_table(
            [
                ["App / Tool", "Chinese name", "Main use", "Install before arrival?", "Friction", "Backup tip"],
                ["Alipay", "支付宝", "Payment, QR codes, ride-hailing, some services.", "Yes", "Medium", "Carry card and cash."],
                ["WeChat", "微信", "Messaging, payment backup, mini programs.", "Yes", "Medium / High", "Use Alipay first if needed."],
                ["Translation app", "-", "Text, voice, camera translation.", "Yes", "Low", "Download offline Chinese."],
                ["Map app", "-", "Routes, addresses, transit.", "Yes", "Medium", "Save screenshots."],
                ["eSIM / roaming app", "-", "Mobile data setup and support.", "Yes", "Medium", "Keep hotel Wi-Fi plan."],
                ["Trip.com or train support", "-", "Train and hotel booking help.", "Yes", "Low / Medium", "Save passport-linked tickets."],
                ["DiDi", "滴滴", "Ride-hailing.", "Optional", "Medium", "Hotel can help call taxi."],
                ["Amap", "高德地图", "Local maps and transit.", "Optional", "High", "Use screenshots or translation."],
                ["12306", "中国铁路12306", "Official train tickets.", "Optional", "High", "Use booking platform or station help."],
                ["Offline screenshot folder", "-", "Addresses, tickets, payment notes.", "Yes", "Low", "Keep available without data."],
            ],
            [0.92 * inch, 0.75 * inch, 1.55 * inch, 1.02 * inch, 0.78 * inch, 1.73 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 8", "First-day payment test plan")
    story.append(
        step_flow(
            [
                ("Choose a low-stress shop", "Use a convenience store, cafe, or hotel lobby shop near your base."),
                ("Buy something small", "Water or a snack keeps the amount low and the pressure low."),
                ("Test Alipay first", "Try merchant QR and cashier scan if both are possible."),
                ("Confirm backup", "Check card charge, keep receipt if needed, and leave cash ready."),
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        data_table(
            [
                ["Good first test", "Avoid as first test"],
                ["A small purchase near your hotel, airport, or station.", "Taxi fare, group dinner, attraction entry, or any queue where people are waiting behind you."],
                ["A staffed counter where you can step aside if needed.", "A rushed self-service kiosk with weak mobile data."],
                ["A moment when your phone has battery and data.", "Late night arrival with no cash, low battery, and no hotel help nearby."],
            ],
            [3.35 * inch, 3.4 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 9", "Troubleshooting table")
    story.append(
        data_table(
            [
                ["Problem", "Possible reason", "What to try", "Backup"],
                ["Card cannot be added", "Issuer support, identity prompt, app rule, network issue.", "Try another card, stable Wi-Fi, or bank app check.", "Cash, physical card, hotel help."],
                ["SMS verification does not arrive", "Roaming, SIM, spam filter, delay.", "Wait, reconnect, check home SIM access.", "Use another payment path."],
                ["Merchant says payment failed", "QR flow, network, issuer block, merchant setting.", "Try again once, lower amount, or another wallet.", "Cash or physical card."],
                ["App asks for identity verification", "Account rule or transaction risk check.", "Read prompt carefully; avoid sharing sensitive data with strangers.", "Use backup payment."],
                ["No internet after landing", "Roaming/eSIM not active or airport coverage issue.", "Use airport/hotel Wi-Fi and activation notes.", "Cash, screenshots, hotel address."],
                ["Taxi cannot accept card", "Taxi expects cash or QR payment.", "Ask about cash before ride if possible.", "Hotel call or ride-hailing app."],
                ["Restaurant only accepts QR payment", "Ordering/payment inside QR or mini program.", "Ask staff to help or order at cashier.", "Choose simpler first meal."],
                ["Bank blocks transaction", "Issuer fraud check or travel rule.", "Open bank app or call support later.", "Backup card or cash."],
            ],
            [1.15 * inch, 1.75 * inch, 2.45 * inch, 1.4 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 10", "First-day scenario playbook")
    story.append(
        card_grid(
            [
                ("Airport arrival", "Test data before leaving the airport. Keep cash, hotel address, and transport screenshot ready."),
                ("Hotel check-in", "International hotels may prefer physical card pre-authorization. Keep passport and card accessible."),
                ("Taxi or ride-hailing", "Confirm pickup and destination in Chinese. If app payment fails, ask hotel or driver about cash."),
                ("Restaurant QR ordering", "If table QR is hard, ask staff for help or order at the cashier. Keep translation ready."),
                ("Train station", "Save station, train number, carriage, seat, passport-linked booking, and QR details offline."),
                ("Low battery", "Payment, maps, tickets, and translation all depend on your phone. Carry a charged power bank."),
            ],
            columns=2,
            fill=SAND,
        )
    )
    story.append(PageBreak())

    story += page_title("Page 11", "Useful Chinese payment phrases")
    story.append(
        phrase_table(
            [
                ["Can I pay with Alipay?", "我可以用支付宝支付吗？", "Wo keyi yong Zhifubao zhifu ma?"],
                ["Can I pay with WeChat Pay?", "可以用微信支付吗？", "Keyi yong Weixin zhifu ma?"],
                ["Can I pay by card?", "可以刷卡吗？", "Keyi shuaka ma?"],
                ["Can I pay with cash?", "可以用现金吗？", "Keyi yong xianjin ma?"],
                ["The payment failed.", "支付失败了。", "Zhifu shibai le."],
                ["Could you scan my QR code?", "您可以扫我的付款码吗？", "Nin keyi sao wo de fukuan ma?"],
                ["Could you help me try again?", "可以帮我再试一次吗？", "Keyi bang wo zai shi yi ci ma?"],
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(card("How to use this page", "Show the Chinese characters on your phone. Keep this page available offline in case translation apps or mobile data are not working."))
    story.append(PageBreak())

    story += page_title("Page 12", "Taxi and hotel phrase card")
    story.append(
        phrase_table(
            [
                ["Please help me call a taxi.", "请帮我叫一辆出租车。", "Qing bang wo jiao yi liang chuzuche."],
                ["This is my hotel address.", "这是我的酒店地址。", "Zhe shi wo de jiudian dizhi."],
                ["Please take me to this address.", "请带我去这个地址。", "Qing dai wo qu zhege dizhi."],
                ["Can I pay with cash?", "可以用现金吗？", "Keyi yong xianjin ma?"],
                ["Please call my hotel.", "请帮我联系酒店。", "Qing bang wo lianxi jiudian."],
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(card("Taxi note", "If your destination is difficult to explain, show the Chinese address and hotel phone number. Hotel staff can often help confirm the destination before you leave."))
    story.append(PageBreak())

    story += page_title("Page 13", "Hotel address card template")
    story.append(
        print_card(
            "Hotel address card",
            [
                ["Hotel English name", ""],
                ["Hotel Chinese name", ""],
                ["Chinese address", ""],
                ["Hotel phone", ""],
                ["Nearest metro station", ""],
                ["Emergency contact", ""],
                ["Notes", ""],
            ],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 14", "Payment backup card")
    story.append(
        print_card(
            "Payment backup card",
            [
                ["Primary payment", ""],
                ["Backup payment", ""],
                ["Small cash location", ""],
                ["Bank support number", ""],
                ["Hotel phone", ""],
                ["Cash phrase", "可以用现金吗？ / Keyi yong xianjin ma? / Can I pay with cash?"],
            ],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 15", "Offline screenshot folder checklist")
    story.append(
        checkbox_table(
            [
                "Passport photo page copy stored securely and offline.",
                "Hotel Chinese name, address, phone, and nearest metro station.",
                "Train number, station name, carriage, seat, and passport-linked booking.",
                "Flight details, arrival airport, and onward transfer notes.",
                "Payment setup screenshots that do not expose full card numbers or passwords.",
                "Payment, taxi, hotel, and emergency phrase cards.",
                "Bank support number and travel insurance contact.",
                "A simple note titled: If my phone data fails, do this first.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(card("Privacy note", "Do not screenshot passwords, full card numbers, one-time codes, or recovery codes. Keep offline backups practical and non-sensitive."))
    story.append(PageBreak())

    story += page_title("Page 16", "Before you fly master checklist")
    story.append(
        data_table(
            [
                ["Area", "Ready check"],
                ["Payment", "Alipay installed; WeChat installed; card prepared; cash backup ready."],
                ["Apps", "Translation, maps, ride-hailing, train support, and screenshot folder ready."],
                ["Internet", "Roaming, eSIM, SIM, or pocket Wi-Fi plan confirmed."],
                ["Hotel address", "Chinese name, address, phone, and nearest metro saved offline."],
                ["Train tickets", "Passport-linked details and station names saved."],
                ["Passport", "Passport accessible for hotel, trains, and tickets."],
                ["Cash", "Small RMB backup carried safely."],
                ["Power bank", "Charged and packed for payment and maps."],
                ["Emergency phrases", "Payment, taxi, hotel, and cash phrases saved offline."],
            ],
            [1.55 * inch, 5.2 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 17", "Official resources and verification log")
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
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        data_table(
            [
                ["Verified item", "Date checked", "Note"],
                ["Alipay card support", "", ""],
                ["WeChat Pay backup status", "", ""],
                ["Bank travel controls", "", ""],
                ["Hotel payment and deposit policy", "", ""],
                ["Mobile data plan", "", ""],
            ],
            [2.2 * inch, 1.45 * inch, 3.1 * inch],
        )
    )
    story.append(PageBreak())

    story += page_title("Page 18", "Need more China trip help?")
    story.append(
        card(
            "Next steps",
            f"Visit {DISPLAY_SITE_URL} for city kits, itinerary kits, travel essentials, and free planning tools.",
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
    story.append(Spacer(1, 0.18 * inch))
    story.append(card("Thank you", "Thanks for supporting First China Trip Kit. The guide stays practical, cautious, and focused on first-time visitors."))
    return story


def render_previews():
    pdftoppm = shutil.which("pdftoppm")
    if not pdftoppm:
        print("Skipping preview rendering: pdftoppm not found.")
        return

    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    TMP_PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    preview_pages = {
        "payment-apps-guide-cover.png": 1,
        "payment-apps-guide-decision-tree.png": 6,
        "payment-apps-guide-app-stack.png": 7,
        "payment-apps-guide-phrase-card.png": 11,
    }

    for filename, page in preview_pages.items():
        prefix = TMP_PREVIEW_DIR / f"page-{page}"
        for old_file in TMP_PREVIEW_DIR.glob(f"page-{page}*.png"):
            old_file.unlink()
        subprocess.run(
            [
                pdftoppm,
                "-png",
                "-r",
                "150",
                "-f",
                str(page),
                "-l",
                str(page),
                str(OUTPUT_PATH),
                str(prefix),
            ],
            check=True,
        )
        rendered = sorted(TMP_PREVIEW_DIR.glob(f"page-{page}*.png"))
        if not rendered:
            raise RuntimeError(f"No preview rendered for page {page}")
        shutil.copyfile(rendered[0], PREVIEW_DIR / filename)


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        rightMargin=MARGIN,
        leftMargin=MARGIN,
        topMargin=0.52 * inch,
        bottomMargin=0.62 * inch,
        title="China Payment & Apps Setup Guide",
        author="First China Trip Kit",
        subject="Printable China payment and app setup guide for first-time visitors",
    )
    doc.build(build_story(), onFirstPage=on_page, onLaterPages=on_page)
    render_previews()
    print(f"Payment & Apps Guide PDF ready: {OUTPUT_PATH}")
    print(f"Preview images ready: {PREVIEW_DIR}")


if __name__ == "__main__":
    main()
