from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps


WIDTH = 1080
HEIGHT = 1350
OUT_DIR = Path("public/share")
BACKGROUND_PATH = Path("scripts/assets/checklist-share-poster-background.png")
QR_PATH = OUT_DIR / "checklist-store-qr.png"
OUTPUT_PATH = OUT_DIR / "china-first-trip-checklist-share-card.png"
OG_OUTPUT_PATH = OUT_DIR / "china-first-trip-checklist-share-og.png"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

CREAM = "#F3EADB"
PAPER = "#FFFDF8"
INK = "#262522"
MUTED = "#67615B"
RED = "#B13A2F"
GREEN = "#507365"
LINE = "#D7C7B1"


def font(size: int, bold: bool = False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def tracked_text(draw, xy, body, size, fill, bold=False, tracking=3, anchor="la"):
    active_font = font(size, bold)
    widths = [draw.textlength(char, font=active_font) for char in body]
    total = sum(widths) + tracking * max(0, len(body) - 1)
    x, y = xy
    if anchor.startswith("m"):
        x -= total / 2
    for char, width in zip(body, widths):
        draw.text((x, y), char, font=active_font, fill=fill, anchor="lm")
        x += width + tracking


def center_text(draw, y, body, size, fill=INK, bold=False, spacing=8):
    draw.multiline_text(
        (WIDTH / 2, y),
        body,
        font=font(size, bold),
        fill=fill,
        anchor="mm",
        align="center",
        spacing=spacing,
    )


def create_share_card():
    for required_path in (BACKGROUND_PATH, QR_PATH):
        if not required_path.exists():
            raise FileNotFoundError(f"Missing required artwork: {required_path}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    background = Image.open(BACKGROUND_PATH).convert("RGB")
    background = ImageOps.fit(
        background,
        (WIDTH, HEIGHT),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.48),
    )
    background = ImageEnhance.Contrast(background).enhance(0.92)
    image = background.convert("RGBA")

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle(
        (86, 72, WIDTH - 86, HEIGHT - 72),
        radius=28,
        fill=(255, 253, 248, 238),
        outline=(215, 199, 177, 255),
        width=2,
    )
    overlay_draw.rectangle((86, 72, 108, HEIGHT - 72), fill=RED)
    image = Image.alpha_composite(image, overlay)
    draw = ImageDraw.Draw(image)

    tracked_text(draw, (146, 132), "FIRST CHINA TRIP KIT", 22, RED, True, 3)
    tracked_text(draw, (934, 132), "TRAVEL KIT 01", 16, MUTED, True, 2, "mm")
    draw.line((146, 168, 934, 168), fill=LINE, width=2)

    rounded(draw, (146, 208, 388, 252), 8, "#F6E3DF", RED, 1)
    tracked_text(draw, (267, 230), "FREE PRINTABLE", 16, RED, True, 2, "mm")

    draw.multiline_text(
        (146, 292),
        "China First-Trip\nVisitor Checklist",
        font=font(70, True),
        fill=INK,
        spacing=8,
    )

    draw.multiline_text(
        (148, 466),
        "A practical arrival-ready checklist for payment, apps,\ninternet, transport, hotel addresses, and emergency phrases.",
        font=font(24),
        fill=MUTED,
        spacing=9,
    )

    draw.line((146, 572, 934, 572), fill=LINE, width=2)
    metadata = [
        ("FORMAT", "PRINT + MOBILE"),
        ("LENGTH", "3 PAGES"),
        ("BEST FOR", "FIRST-TIME VISITORS"),
    ]
    column_width = 788 / 3
    for index, (label, value) in enumerate(metadata):
        x = 146 + index * column_width
        tracked_text(draw, (x, 604), label, 13, RED, True, 2)
        draw.text((x, 630), value, font=font(18, True), fill=INK)
        if index < len(metadata) - 1:
            divider_x = x + column_width - 28
            draw.line((divider_x, 594, divider_x, 660), fill=LINE, width=1)

    rounded(draw, (146, 710, 934, 1152), 20, INK)
    tracked_text(draw, (190, 764), "SCAN TO OPEN THE FREE CHECKLIST", 17, CREAM, True, 2)
    draw.line((190, 797, 890, 797), fill="#514D48", width=1)

    qr = Image.open(QR_PATH).convert("RGB")
    qr = qr.resize((258, 258), Image.Resampling.NEAREST)
    qr_frame = Image.new("RGB", (294, 294), PAPER)
    qr_frame.paste(qr, (18, 18))
    image.paste(qr_frame, (190, 830))

    draw.text((536, 842), "PLAN BEFORE\nYOU LAND.", font=font(42, True), fill=PAPER, spacing=4)
    draw.multiline_text(
        (538, 952),
        "Check the essentials.\nSave a copy offline.\nShare it with your travel group.",
        font=font(21),
        fill="#D9D1C5",
        spacing=10,
    )
    draw.line((538, 1070, 888, 1070), fill=RED, width=4)
    draw.text((538, 1091), "www.firstchinatripkit.com/store", font=font(18, True), fill=CREAM)

    tracked_text(draw, (146, 1205), "PAYMENT  /  APPS  /  INTERNET  /  TRANSPORT", 14, GREEN, True, 2)
    draw.text(
        (146, 1241),
        "Independent practical planning for first-time visitors to China.",
        font=font(17),
        fill=MUTED,
    )

    image.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)
    print(f"Generated {OUTPUT_PATH} ({WIDTH}x{HEIGHT})")


def create_og_card():
    width = 1200
    height = 630
    background = Image.open(BACKGROUND_PATH).convert("RGB")
    background = ImageOps.fit(
        background,
        (width, height),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.46),
    )
    background = ImageEnhance.Contrast(background).enhance(0.9).convert("RGBA")

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle(
        (54, 42, width - 54, height - 42),
        radius=24,
        fill=(255, 253, 248, 242),
        outline=(215, 199, 177, 255),
        width=2,
    )
    overlay_draw.rectangle((54, 42, 72, height - 42), fill=RED)
    image = Image.alpha_composite(background, overlay)
    draw = ImageDraw.Draw(image)

    tracked_text(draw, (112, 94), "FIRST CHINA TRIP KIT", 18, RED, True, 3)
    rounded(draw, (112, 132, 336, 170), 7, "#F6E3DF", RED, 1)
    tracked_text(draw, (224, 151), "FREE PRINTABLE", 14, RED, True, 2, "mm")
    draw.multiline_text(
        (112, 205),
        "China First-Trip\nVisitor Checklist",
        font=font(54, True),
        fill=INK,
        spacing=6,
    )
    draw.multiline_text(
        (114, 352),
        "Payment · Apps · Internet · Transport\nHotel addresses · Emergency phrases",
        font=font(21),
        fill=MUTED,
        spacing=7,
    )
    draw.line((112, 434, 656, 434), fill=LINE, width=2)
    tracked_text(draw, (112, 470), "PRINT  /  SAVE OFFLINE  /  SHARE", 13, GREEN, True, 2)
    draw.text(
        (112, 518),
        "www.firstchinatripkit.com/store",
        font=font(21, True),
        fill=INK,
    )

    rounded(draw, (730, 88, 1088, 542), 18, INK)
    tracked_text(draw, (909, 130), "SCAN FOR THE FREE KIT", 13, CREAM, True, 2, "mm")
    qr = Image.open(QR_PATH).convert("RGB").resize((252, 252), Image.Resampling.NEAREST)
    qr_frame = Image.new("RGB", (284, 284), PAPER)
    qr_frame.paste(qr, (16, 16))
    image.paste(qr_frame, (767, 164))
    draw.text((785, 478), "PLAN BEFORE YOU LAND.", font=font(20, True), fill=PAPER)
    draw.line((785, 516, 1033, 516), fill=RED, width=4)

    image.convert("RGB").save(OG_OUTPUT_PATH, "PNG", optimize=True)
    print(f"Generated {OG_OUTPUT_PATH} ({width}x{height})")


if __name__ == "__main__":
    create_share_card()
    create_og_card()
