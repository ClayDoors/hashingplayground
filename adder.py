import fitz  # PyMuPDF

pdf_path = "basepdf.pdf"
output_path = "modified.pdf"
new_url = "https://google.com"
pdf = fitz.open(pdf_path)
    
    # Iterate through each page
for page_num in range(pdf.page_count):
    page = pdf[page_num]
        
        # Get all links on the page
    links = page.get_links()
        
    for link in links:
         if 'uri' in link:  
            page.delete_link(link)
            link['uri'] = new_url
            page.insert_link(link)
                
                

pdf.save(output_path)
pdf.close()
print(f"All URLs have been changed to {new_url} in the PDF.")
