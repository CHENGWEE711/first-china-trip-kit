from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "marketing" / "china-first-trip-launch"
OUT.mkdir(parents=True, exist_ok=True)

CREAM = "#F7F0E6"
PAPER = "#FFFDFC"
RED = "#B63B32"
DARK = "#202A33"
GRAY = "#6B7074"
MIST = "#E5E0D8"
WHITE = "#FFFFFF"
GOLD = "#D29B51"

REGULAR_FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD_FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    return ImageFont.truetype(BOLD_FONT if bold else REGULAR_FONT, size)


def wrap(draw, text, text_font, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=text_font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def multiline(draw, xy, text, text_font, fill, max_width, spacing=12):
    x, y = xy
    lines = wrap(draw, text, text_font, max_width)
    line_height = text_font.size + spacing
    for line in lines:
        draw.text((x, y), line, font=text_font, fill=fill)
        y += line_height
    return y


def shadow_card(image, box, radius=28, fill=PAPER, shadow=14):
    x1, y1, x2, y2 = box
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.rounded_rectangle((x1 + 5, y1 + 10, x2 + 5, y2 + 10), radius, fill=(32, 42, 51, 35))
    layer = layer.filter(ImageFilter.GaussianBlur(shadow))
    image.alpha_composite(layer)
    ImageDraw.Draw(image).rounded_rectangle(box, radius, fill=fill)


def brand(draw, width, y=55, dark=False):
    fg = WHITE if dark else DARK
    draw.rounded_rectangle((64, y, 120, y + 56), 14, fill=RED)
    draw.ellipse((79, y + 14, 105, y + 40), outline=WHITE, width=3)
    draw.line((83, y + 33, 89, y + 22, 97, y + 30, 102, y + 20), fill=WHITE, width=3)
    draw.ellipse((81, y + 31, 85, y + 35), fill=WHITE)
    draw.ellipse((100, y + 18, 104, y + 22), fill=WHITE)
    draw.text((140, y + 9), "FIRST CHINA TRIP KIT", font=font(25, True), fill=fg)
    draw.line((64, y + 78, width - 64, y + 78), fill=(255, 255, 255, 70) if dark else MIST, width=2)


def footer(draw, width, height, label="firstchinatripkit.com", dark=False):
    fg = WHITE if dark else DARK
    draw.text((64, height - 86), label, font=font(25, True), fill=fg)
    draw.text((width - 268, height - 84), "SAVE  |  PRINT  |  PLAN", font=font(17, True), fill=RED if not dark else "#F2C2BA")


def numbered_card(image, draw, y, number, title, note, width=1000):
    shadow_card(image, (64, y, width - 64, y + 156), radius=24)
    draw.ellipse((92, y + 44, 160, y + 112), fill=RED)
    number_text = str(number)
    bbox = draw.textbbox((0, 0), number_text, font=font(30, True))
    draw.text((126 - (bbox[2] - bbox[0]) / 2, y + 60), number_text, font=font(30, True), fill=WHITE)
    draw.text((188, y + 34), title, font=font(28, True), fill=DARK)
    multiline(draw, (188, y + 80), note, font(21), GRAY, width - 280, spacing=8)


def make_pin(filename, kicker, title, subtitle, items, notice=None):
    width, height = 1000, 1500
    image = Image.new("RGBA", (width, height), CREAM)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((690, -80, 1060, 310), 90, fill=RED)
    draw.ellipse((748, 34, 884, 170), outline=(255, 255, 255, 105), width=5)
    draw.line((776, 130, 801, 72, 840, 116, 865, 64), fill=(255, 255, 255, 120), width=5)
    draw.ellipse((768, 122, 784, 138), fill=WHITE)
    draw.ellipse((857, 56, 873, 72), fill=WHITE)
    brand(draw, width)
    draw.text((64, 180), kicker.upper(), font=font(22, True), fill=RED)
    y = multiline(draw, (64, 232), title, font(62, True), DARK, 620, spacing=12)
    y = multiline(draw, (64, y + 18), subtitle, font(29), GRAY, 800, spacing=9)
    y += 46
    card_height = 112 if len(items) >= 5 else 150
    card_gap = 14 if len(items) >= 5 else 20
    for index, (item_title, item_note) in enumerate(items, 1):
        shadow_card(image, (64, y, width - 64, y + card_height), radius=24, shadow=10)
        draw.rounded_rectangle((88, y + 28, 148, y + 88), 16, fill=RED if index == 1 else DARK)
        draw.text((108, y + 40), str(index), font=font(27, True), fill=WHITE)
        draw.text((174, y + 24), item_title, font=font(27, True), fill=DARK)
        multiline(draw, (174, y + 64), item_note, font(20), GRAY, width - 270, spacing=7)
        y += card_height + card_gap
    if notice:
        draw.rounded_rectangle((64, height - 182, width - 64, height - 112), 18, fill=DARK)
        draw.text((88, height - 160), notice, font=font(18, True), fill=WHITE)
    footer(draw, width, height)
    image.convert("RGB").save(OUT / filename, quality=95, optimize=True)


def make_carousel_slide(index, title, body, badge, accent=RED):
    width, height = 1080, 1350
    dark_slide = index == 1 or index == 6
    background = DARK if dark_slide else CREAM
    image = Image.new("RGBA", (width, height), background)
    draw = ImageDraw.Draw(image)
    brand(draw, width, dark=dark_slide)

    if dark_slide:
        draw.rounded_rectangle((704, 160, 1118, 610), 96, fill=RED)
        draw.ellipse((790, 250, 1000, 460), outline=(255, 255, 255, 120), width=6)
        draw.line((814, 408, 850, 286, 918, 370, 966, 266), fill=(255, 255, 255, 130), width=6)
        draw.ellipse((805, 399, 823, 417), fill=WHITE)
        draw.ellipse((957, 257, 975, 275), fill=WHITE)
    else:
        draw.rounded_rectangle((780, 176, 1030, 426), 58, fill=accent)
        draw.ellipse((840, 235, 970, 365), outline=WHITE, width=5)
        draw.line((858, 342, 884, 260, 930, 316, 953, 250), fill=WHITE, width=5)

    draw.text((64, 188), badge.upper(), font=font(22, True), fill="#F2C2BA" if dark_slide else RED)
    title_color = WHITE if dark_slide else DARK
    body_color = "#D7DDE2" if dark_slide else GRAY
    y = multiline(draw, (64, 250), title, font(63, True), title_color, 770, spacing=12)
    y = multiline(draw, (64, y + 34), body, font(31), body_color, 820, spacing=12)

    if 1 < index < 6:
        shadow_card(image, (64, 760, width - 64, 1095), radius=32, fill=PAPER, shadow=16)
        draw.text((102, 806), "FIRST-DAY ACTION", font=font(20, True), fill=RED)
        action_text = {
            2: "Install early. Follow official in-app verification. Keep another method ready.",
            3: "Use it as a possible backup, not the only way you expect to pay.",
            4: "Pack both. Card acceptance varies and cash can solve a failed QR payment.",
            5: "Buy water near your hotel and confirm the charge before taxis or dinner.",
        }[index]
        multiline(draw, (102, 860), action_text, font(31, True), DARK, width - 210, spacing=13)

    if index in (1, 6):
        labels = ["PAYMENT", "OFFLINE BACKUPS", "FIRST-DAY TEST"] if index == 1 else ["READ", "SAVE", "PRINT"]
        x = 64
        for label in labels:
            label_width = draw.textlength(label, font=font(18, True)) + 42
            draw.rounded_rectangle((x, 700, x + label_width, 752), 14, outline=(255, 255, 255, 90), width=2)
            draw.text((x + 21, 716), label, font=font(18, True), fill="#F2C2BA")
            x += label_width + 14

    draw.text((64, height - 85), "firstchinatripkit.com", font=font(24, True), fill=title_color)
    draw.text((width - 128, height - 88), f"{index}/6", font=font(24, True), fill="#F2C2BA" if dark_slide else RED)
    image.convert("RGB").save(OUT / f"instagram-payment-carousel-{index:02}.png", quality=95, optimize=True)


make_pin(
    "pinterest-payment-stack.png",
    "First-day setup",
    "Your China payment stack",
    "Four independent layers to prepare before you fly.",
    [
        ("Alipay if supported", "Prepare and verify before departure, then test a small purchase."),
        ("WeChat Pay backup", "Useful if setup works, but do not rely on it as your only method."),
        ("Physical bank card", "Keep it available for hotels and larger venues where accepted."),
        ("RMB cash", "Carry a small emergency amount for failed QR payments or data loss."),
    ],
    "Availability may change. Prepare a backup.",
)

make_pin(
    "pinterest-apps-before-arrival.png",
    "Phone-ready checklist",
    "China apps to prepare before arrival",
    "Payment, maps, translation, data, bookings, and offline backups.",
    [
        ("Payment", "Alipay plus WeChat as a possible backup"),
        ("Language", "Translation with offline language support"),
        ("Navigation", "Map tool plus saved Chinese addresses"),
        ("Internet", "eSIM or roaming prepared before landing"),
        ("Offline backup", "Screenshots, tickets, hotel card, and power bank"),
    ],
    "Install first. Test early. Save offline.",
)

make_pin(
    "pinterest-transit-five-checks.png",
    "Transit planning",
    "240-hour transit: check before booking",
    "Eligibility depends on your passport, ticket, ports, and permitted travel area.",
    [
        ("Passport", "Check the current official eligibility information."),
        ("Onward ticket", "Confirm travel to a third country or region."),
        ("Entry and exit ports", "Verify that both ports participate."),
        ("Permitted travel area", "Keep every planned hotel city inside it."),
        ("Official verification", "Recheck current sources before paying."),
    ],
    "Planning guide only. Not legal or immigration advice.",
)

carousel = [
    ("Your first-day China payment plan", "Build four layers before you fly.", "Save this plan"),
    ("Layer 1: Alipay if supported", "Prepare your passport, international card, bank app, phone number, and stable internet.", "Primary option"),
    ("Layer 2: WeChat Pay backup", "Install WeChat for messaging and mini programs. Payment setup may involve extra friction.", "Possible backup"),
    ("Layers 3 + 4: card and cash", "Carry a physical bank card and a small amount of RMB cash as independent backups.", "Physical backup"),
    ("Test before you depend on it", "Make a small purchase near your hotel before relying on mobile payment for taxis or dinner.", "Arrival-day test"),
    ("Keep the full setup guide offline", "Checklists, troubleshooting steps, phrase cards, and first-day backups for your trip.", "First China Trip Kit"),
]

for slide_index, (slide_title, slide_body, slide_badge) in enumerate(carousel, 1):
    make_carousel_slide(slide_index, slide_title, slide_body, slide_badge)

print(f"Launch assets ready in {OUT}")
