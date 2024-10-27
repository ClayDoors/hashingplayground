import fitz  # PyMuPDF

def replace_pdf_urls(pdf_path, new_url, output_path):
    # Open the PDF file
    pdf = fitz.open(pdf_path)
    
    # Iterate through each page
    for page_num in range(pdf.page_count):
        page = pdf[page_num]
        
        # Get all links on the page
        links = page.get_links()
        
        for link in links:
          #  if 'uri' in link:  # Check if it's a URL link
                # Update the link to the new URL# Get link rectangle
            page.delete_link(link)
              #  link['uri'] = new_url
               # page.insert_link(link)
                
                

    # Save the modified PDF
   # pdf.save(output_path)
    pdf.close()
    print(f"All URLs have been changed to {new_url} in the PDF.")

# Example usage
replace_pdf_urls("basepdf.pdf", "https://google.com", "modified.pdf")
