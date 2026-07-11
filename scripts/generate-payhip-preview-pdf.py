from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


SOURCE_PDF = Path("public/products/china-payment-apps-setup-guide.pdf")
OUTPUT_PDF = Path("public/products/previews/china-payment-apps-setup-guide-preview.pdf")
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

INK = colors.HexColor("#2F2A28")
EMBER = colors.HexColor("#B13A2F")
SAND = colors.HexColor("#F6EFE6")
PAPER = colors.HexColor("#FFFDF9")
LINE = colors.HexColor("#E1D6CC")
MUTED = colors.HexColor("#6B625D")


if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("FCTKPreview", str(FONT_PATH)))
    BASE_FONT = "FCTKPreview"
else:
    BASE_FONT = "Helvetica"


def watermark_for(width: float, height: float):
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))
    c.saveState()
    c.setFillColor(colors.Color(0.70, 0.18, 0.14, alpha=0.12))
    c.setFont("Helvetica-Bold", 52)
    c.translate(width / 2, height / 2)
    c.rotate(34)
    c.drawCentredString(0, 0, "SAMPLE PREVIEW")
    c.restoreState()
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def add_watermarked_source_page(writer: PdfWriter, reader: PdfReader, index: int):
    page = reader.pages[index]
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    page.merge_page(watermark_for(width, height))
    writer.add_page(page)


def sample_phrase_page():
    buf = BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=A4,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.58 * inch,
        bottomMargin=0.58 * inch,
        title="China Payment & Apps Setup Guide Sample Preview",
    )
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            "FCTKTitle",
            parent=styles["Title"],
            fontName=BASE_FONT,
            fontSize=23,
            leading=28,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKBody",
            parent=styles["BodyText"],
            fontName=BASE_FONT,
            fontSize=10,
            leading=14,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            "FCTKCell",
            parent=styles["BodyText"],
            fontName=BASE_FONT,
            fontSize=9.4,
            leading=12,
            textColor=INK,
        )
    )
    rows = [
        ["Situation", "Chinese", "Pinyin"],
        ["Can I pay with Alipay?", "我可以用支付宝支付吗？", "Wo keyi yong Zhifubao zhifu ma?"],
        ["The payment failed.", "支付失败了。", "Zhifu shibai le."],
        ["Please take me to this address.", "请带我去这个地址。", "Qing dai wo qu zhege dizhi."],
        ["Please help me call a taxi.", "请帮我叫一辆出租车。", "Qing bang wo jiao yi liang chuzuche."],
    ]
    story = [
        Paragraph("FIRST CHINA TRIP KIT", styles["FCTKBody"]),
        Paragraph("Taxi and Checkout Phrase Cards", styles["FCTKTitle"]),
        Paragraph(
            "A small preview from the printable phrase-card section. The full guide includes expanded payment, taxi, hotel, setup, troubleshooting, and offline backup pages.",
            styles["FCTKBody"],
        ),
        Spacer(1, 0.18 * inch),
    ]
    table = Table(rows, colWidths=[1.7 * inch, 2.35 * inch, 2.25 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), EMBER),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, -1), BASE_FONT),
                ("FONTSIZE", (0, 0), (-1, 0), 9),
                ("FONTSIZE", (0, 1), (-1, -1), 8.8),
                ("LEADING", (0, 1), (-1, -1), 11.2),
                ("BACKGROUND", (0, 1), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 0.22 * inch))
    footer = Table(
        [["Print", "Save Offline", "Travel Ready"]],
        colWidths=[1.7 * inch, 1.9 * inch, 1.9 * inch],
    )
    footer.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SAND),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("FONTNAME", (0, 0), (-1, -1), BASE_FONT),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(footer)
    doc.build(story)
    buf.seek(0)
    page = PdfReader(buf).pages[0]
    page.merge_page(watermark_for(float(page.mediabox.width), float(page.mediabox.height)))
    return page


def main():
    if not SOURCE_PDF.exists():
        raise FileNotFoundError(SOURCE_PDF)
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(SOURCE_PDF))
    writer = PdfWriter()
    add_watermarked_source_page(writer, reader, 0)
    add_watermarked_source_page(writer, reader, 7)
    writer.add_page(sample_phrase_page())
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)
    print(f"Preview PDF ready: {OUTPUT_PDF}")
    print(f"Pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
