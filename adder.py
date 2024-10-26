import fitz  # PyMuPDF
from PyPDF2 import PdfReader, PdfWriter

# Open the PDF
pdf_reader = PdfReader("./uploads/basepdf.pdf")
pdf_writer = PdfWriter()

   # Add JavaScript
for page in pdf_reader.pages:
    pdf_writer.add_page(page)

js_file = open("script.js", "rb")
pdf_writer.add_js(js_file.read())
js_file.close()

   # Save the modified PDF
with open("output.pdf", "wb") as output_file:
    pdf_writer.write(output_file)