import AppKit
import CoreImage
import Foundation

let targetURL = "https://www.firstchinatripkit.com/store"
let outputPath = "public/share/checklist-store-qr.png"

guard let data = targetURL.data(using: .utf8),
      let filter = CIFilter(name: "CIQRCodeGenerator") else {
    fatalError("Unable to create the QR code generator.")
}

filter.setValue(data, forKey: "inputMessage")
filter.setValue("M", forKey: "inputCorrectionLevel")

guard let outputImage = filter.outputImage else {
    fatalError("Unable to render the QR code.")
}

let scaledImage = outputImage.transformed(by: CGAffineTransform(scaleX: 14, y: 14))
let representation = NSCIImageRep(ciImage: scaledImage)
let image = NSImage(size: representation.size)
image.addRepresentation(representation)

guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else {
    fatalError("Unable to encode the QR code as PNG.")
}

let outputURL = URL(fileURLWithPath: outputPath)
try FileManager.default.createDirectory(
    at: outputURL.deletingLastPathComponent(),
    withIntermediateDirectories: true
)
try png.write(to: outputURL)
print("Generated \(outputPath)")
