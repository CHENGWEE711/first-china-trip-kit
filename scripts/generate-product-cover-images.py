from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


OUT_DIR = Path("public/products/previews")
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

CREAM = "#F7F1E6"
PAPER = "#FFFDF8"
INK = "#2B2A28"
MUTED = "#6F6A63"
RED = "#B8473F"
DARK_RED = "#8F332E"
GREEN = "#4E7D67"
LINE = "#E5D9C8"
MIST = "#EAF1EC"


def font(size: int, bold: bool = False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw, xy, body, size, fill=INK, bold=False, anchor=None, align="left", spacing=8):
    draw.multiline_text(
        xy,
        body,
        font=font(size, bold),
        fill=fill,
        anchor=anchor,
        align=align,
        spacing=spacing,
    )


def fit_lines(draw, body, max_width, size, bold=False):
    words = body.split()
    lines = []
    current = ""
    f = font(size, bold)
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=f)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return "\n".join(lines)


def draw_checklist(draw, x, y, w, h):
    rounded(draw, (x, y, x + w, y + h), 28, PAPER, LINE, 3)
    text(draw, (x + 34, y + 32), "First-day setup", 28, INK, True)
    items = ["Payment test", "App stack", "Taxi phrases", "Offline cards"]
    for i, item in enumerate(items):
        yy = y + 92 + i * 60
        rounded(draw, (x + 36, yy, x + 68, yy + 32), 8, MIST, GREEN, 3)
        draw.line((x + 44, yy + 16, x + 53, yy + 25, x + 63, yy + 8), fill=GREEN, width=4)
        text(draw, (x + 90, yy - 2), item, 27, INK)


def draw_phone(draw, x, y, w, h):
    rounded(draw, (x, y, x + w, y + h), 38, "#FDFBF5", INK, 4)
    rounded(draw, (x + 28, y + 52, x + w - 28, y + h - 62), 22, CREAM, LINE, 2)
    text(draw, (x + w / 2, y + 90), "Payment", 27, INK, True, anchor="mm")
    rounded(draw, (x + 58, y + 142, x + w - 58, y + 202), 18, RED)
    rounded(draw, (x + 58, y + 226, x + w - 58, y + 286), 18, GREEN)
    draw.rectangle((x + w / 2 - 42, y + 324, x + w / 2 + 42, y + 408), outline=INK, width=4)
    for dx in [-24, 24]:
        for dy in [346, 386]:
            draw.rectangle((x + w / 2 + dx - 10, y + dy - 10, x + w / 2 + dx + 10, y + dy + 10), fill=INK)


def draw_wallet(draw, x, y, w, h):
    rounded(draw, (x, y + 34, x + w, y + h), 30, "#F1E4D3", RED, 4)
    rounded(draw, (x + 34, y, x + w - 58, y + 88), 22, PAPER, RED, 4)
    rounded(draw, (x + w - 136, y + 94, x + w - 22, y + 154), 18, PAPER, RED, 3)
    draw.ellipse((x + w - 90, y + 112, x + w - 70, y + 132), fill=RED)


def draw_map_pin(draw, x, y, size):
    draw.ellipse((x, y, x + size, y + size), fill=MIST, outline=GREEN, width=4)
    draw.ellipse((x + size * 0.32, y + size * 0.28, x + size * 0.68, y + size * 0.64), outline=GREEN, width=5)
    draw.polygon(
        [
            (x + size * 0.5, y + size * 0.92),
            (x + size * 0.28, y + size * 0.57),
            (x + size * 0.72, y + size * 0.57),
        ],
        fill=GREEN,
    )


def draw_taxi(draw, x, y, w, h):
    rounded(draw, (x, y + h * 0.32, x + w, y + h * 0.78), 22, "#F9E3B0", INK, 3)
    draw.polygon(
        [(x + w * 0.22, y + h * 0.32), (x + w * 0.38, y + h * 0.12), (x + w * 0.65, y + h * 0.12), (x + w * 0.8, y + h * 0.32)],
        fill="#F9E3B0",
        outline=INK,
    )
    draw.ellipse((x + w * 0.16, y + h * 0.68, x + w * 0.32, y + h * 0.9), fill=INK)
    draw.ellipse((x + w * 0.68, y + h * 0.68, x + w * 0.84, y + h * 0.9), fill=INK)
    text(draw, (x + w / 2, y + h * 0.45), "TAXI", 22, INK, True, anchor="mm")


def draw_hero_graphic(draw, x, y, scale=1.0):
    draw_wallet(draw, x, y + int(170 * scale), int(330 * scale), int(190 * scale))
    draw_phone(draw, x + int(355 * scale), y + int(25 * scale), int(270 * scale), int(430 * scale))
    draw_checklist(draw, x + int(660 * scale), y + int(100 * scale), int(380 * scale), int(350 * scale))
    draw_map_pin(draw, x + int(70 * scale), y + int(5 * scale), int(112 * scale))
    draw_taxi(draw, x + int(750 * scale), y, int(210 * scale), int(130 * scale))
    draw.arc((x + int(150 * scale), y + int(45 * scale), x + int(910 * scale), y + int(280 * scale)), 180, 350, fill=RED, width=max(3, int(5 * scale)))
    draw.ellipse((x + int(900 * scale), y + int(115 * scale), x + int(922 * scale), y + int(137 * scale)), fill=RED)


def draw_chips(draw, chips, y, w, h):
    chip_size = int(h * 0.025)
    chip_gap = int(w * 0.012)
    chip_widths = [draw.textbbox((0, 0), c, font=font(chip_size, True))[2] + int(w * 0.04) for c in chips]
    total = sum(chip_widths) + chip_gap * (len(chips) - 1)
    x = (w - total) / 2
    for c, cw in zip(chips, chip_widths):
        rounded(draw, (x, y, x + cw, y + int(h * 0.055)), 18, MIST, GREEN, 2)
        text(draw, (x + cw / 2, y + int(h * 0.028)), c, chip_size, GREEN, True, anchor="mm")
        x += cw + chip_gap


def create_cover(size, output, variant):
    w, h = size
    img = Image.new("RGB", size, CREAM)
    draw = ImageDraw.Draw(img)
    margin = int(min(w, h) * 0.06)
    rounded(draw, (margin, margin, w - margin, h - margin), 36, PAPER, LINE, 3)

    if variant == "payhip":
        text(draw, (w / 2, margin + 64), "FIRST CHINA TRIP KIT", 28, RED, True, anchor="mm")
        draw.line((margin + 70, margin + 118, w - margin - 70, margin + 118), fill=LINE, width=3)

        text(
            draw,
            (w / 2, margin + 220),
            "China Payment & Apps\nSetup Guide",
            64,
            INK,
            True,
            anchor="mm",
            align="center",
            spacing=12,
        )
        text(
            draw,
            (w / 2, margin + 360),
            "Alipay · WeChat Pay · Essential Apps\nFirst-Day Backup Plan",
            34,
            MUTED,
            anchor="mm",
            align="center",
            spacing=10,
        )
        rounded(draw, (w / 2 - 165, margin + 415, w / 2 + 165, margin + 475), 18, "#F8E7E3", RED, 2)
        text(draw, (w / 2, margin + 445), "Printable PDF", 31, RED, True, anchor="mm")

        cards_y = margin + 535
        card_w = 390
        card_h = 315
        gap = 34
        start_x = int((w - (card_w * 3 + gap * 2)) / 2)
        feature_cards = [
            ("Payment setup", "Alipay checklist\nWeChat Pay backup\nFirst-day test"),
            ("Decision tree", "Card declined?\nQR failed?\nNo internet?"),
            ("Offline cards", "Taxi phrases\nHotel address\nPayment backup"),
        ]
        for i, (heading, body) in enumerate(feature_cards):
            x = start_x + i * (card_w + gap)
            rounded(draw, (x, cards_y, x + card_w, cards_y + card_h), 28, "#F4EADD", LINE, 3)
            icon_y = cards_y + 42
            if i == 0:
                draw_wallet(draw, x + 118, icon_y, 150, 92)
            elif i == 1:
                for j, label in enumerate(["Try", "Backup", "Ask"]):
                    yy = icon_y + j * 44
                    rounded(draw, (x + 118, yy, x + 272, yy + 31), 10, PAPER, RED if j == 0 else GREEN, 2)
                    text(draw, (x + 195, yy + 16), label, 18, INK, True, anchor="mm")
                    if j < 2:
                        draw.line((x + 195, yy + 31, x + 195, yy + 44), fill=MUTED, width=2)
            else:
                for j in range(3):
                    yy = icon_y + j * 42
                    rounded(draw, (x + 112, yy, x + 142, yy + 30), 8, MIST, GREEN, 2)
                    draw.line((x + 119, yy + 15, x + 127, yy + 23, x + 136, yy + 8), fill=GREEN, width=3)
                    draw.line((x + 158, yy + 9, x + 278, yy + 9), fill=MUTED, width=3)
                    draw.line((x + 158, yy + 22, x + 250, yy + 22), fill=LINE, width=3)
            text(draw, (x + card_w / 2, cards_y + 202), heading, 27, INK, True, anchor="mm")
            text(draw, (x + card_w / 2, cards_y + 255), body, 22, MUTED, anchor="mm", align="center", spacing=8)

        draw_chips(draw, ["Print", "Save Offline", "Travel Ready"], margin + 880, w, h)

        footer_y = h - margin - 58
        draw.line((margin + 90, footer_y - 48, w - margin - 90, footer_y - 48), fill=LINE, width=2)
        text(draw, (w / 2, footer_y), "First China Trip Kit", 30, INK, True, anchor="mm")
        text(draw, (w / 2, footer_y + 42), "www.firstchinatripkit.com", 24, MUTED, anchor="mm")

    elif variant == "store":
        text(draw, (margin + 58, margin + 58), "FIRST CHINA TRIP KIT", 18, RED, True)
        draw.line((margin + 58, margin + 92, w - margin - 58, margin + 92), fill=LINE, width=3)

        title_size = 48
        title = fit_lines(draw, "China Payment & Apps Setup Guide", 500, title_size, True)
        text(draw, (margin + 58, margin + 160), title, title_size, INK, True, spacing=10)
        subtitle = fit_lines(
            draw,
            "Alipay | WeChat Pay | Essential Apps | First-Day Backup Plan",
            500,
            22,
        )
        text(draw, (margin + 58, margin + 295), subtitle, 22, MUTED, spacing=8)

        feature_y = margin + 390
        for label, color in [
            ("Payment checklist", GREEN),
            ("Decision tree", RED),
            ("Phrase cards", GREEN),
        ]:
            rounded(draw, (margin + 58, feature_y, margin + 360, feature_y + 46), 16, MIST if color == GREEN else "#F8E7E3", color, 2)
            text(draw, (margin + 78, feature_y + 13), label, 19, color, True)
            feature_y += 60

        text(draw, (margin + 58, h - margin - 64), "www.firstchinatripkit.com", 20, MUTED)
        text(draw, (margin + 58, h - margin - 34), "hello@firstchinatripkit.com", 18, MUTED)

        graphic_x = margin + 560
        graphic_y = margin + 160
        graphic_w = w - graphic_x - margin - 58
        graphic_h = h - graphic_y - margin - 82
        rounded(draw, (graphic_x, graphic_y, graphic_x + graphic_w, graphic_y + graphic_h), 32, "#F4EADD", LINE, 2)
        draw_hero_graphic(draw, graphic_x + 36, graphic_y + 38, graphic_w / 1120)
    else:
        brand_y = margin + int(h * 0.055)
        text(draw, (w / 2, brand_y), "FIRST CHINA TRIP KIT", int(h * 0.021), RED, True, anchor="mm")
        draw.line((margin + 70, brand_y + int(h * 0.04), w - margin - 70, brand_y + int(h * 0.04)), fill=LINE, width=3)

        title_size = int(h * (0.052 if variant == "square" else 0.052))
        title = (
            "China Payment & Apps\nSetup Guide"
            if variant == "payhip"
            else fit_lines(draw, "China Payment & Apps Setup Guide", w - margin * 2 - 170, title_size, True)
        )
        title_y = margin + int(h * (0.17 if variant == "square" else 0.145))
        text(draw, (w / 2, title_y), title, title_size, INK, True, anchor="mm", align="center", spacing=10)

        subtitle_size = int(h * 0.026)
        subtitle = (
            "Alipay · WeChat Pay · Essential Apps\nFirst-Day Backup Plan\n\nPrintable PDF"
            if variant == "payhip"
            else "Alipay | WeChat Pay | Essential Apps | First-Day Backup Plan"
        )
        subtitle_wrapped = subtitle if variant == "payhip" else fit_lines(draw, subtitle, w - margin * 2 - 200, subtitle_size)
        subtitle_y = margin + int(h * (0.265 if variant == "square" else 0.245))
        text(draw, (w / 2, subtitle_y), subtitle_wrapped, subtitle_size, MUTED, anchor="mm", align="center", spacing=8)

        graphic_top = margin + int(h * (0.34 if variant == "square" else 0.34))
        graphic_h = int(h * (0.33 if variant == "square" else 0.32))
        rounded(draw, (margin + 65, graphic_top, w - margin - 65, graphic_top + graphic_h), 30, "#F4EADD", LINE, 2)
        scale = (w - margin * 2 - 180) / 1120
        draw_hero_graphic(draw, margin + 95, graphic_top + int(graphic_h * 0.08), scale)

        chip_y = margin + int(h * 0.72)
        if variant == "payhip":
            draw_chips(draw, ["Print", "Save Offline", "Travel Ready"], chip_y, w, h)
        else:
            draw_chips(draw, ["Payment checklist", "App stack", "Decision tree", "Phrase cards"], chip_y, w, h)

        footer_y = h - margin - int(h * (0.045 if variant == "square" else 0.05))
        draw.line((margin + 90, footer_y - int(h * 0.03), w - margin - 90, footer_y - int(h * 0.03)), fill=LINE, width=2)
        text(draw, (w / 2, footer_y), "First China Trip Kit", int(h * 0.023), INK, True, anchor="mm")
        text(draw, (w / 2, footer_y + int(h * 0.04)), "www.firstchinatripkit.com", int(h * 0.019), MUTED, anchor="mm")

    img.save(OUT_DIR / output, quality=95)


create_cover((1600, 1200), "payment-apps-guide-payhip-cover.png", "payhip")
create_cover((1600, 1600), "payment-apps-guide-square-cover.png", "square")
create_cover((1200, 800), "payment-apps-guide-store-cover.png", "store")

print("Generated product cover images:")
for name in [
    "payment-apps-guide-payhip-cover.png",
    "payment-apps-guide-square-cover.png",
    "payment-apps-guide-store-cover.png",
]:
    path = OUT_DIR / name
    print(f"- {path} ({path.stat().st_size} bytes)")
