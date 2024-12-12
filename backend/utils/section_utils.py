from typing import List
from model_data.table import Table
from docx.text.paragraph import Paragraph

def clean_section(text: str) -> str:
    text = text.strip()
    text_parts = text.split('\n')[1:]
    text_parts = [text_part.strip() for text_part in text_parts]
    return '\n'.join(text_parts).strip()

def process_section_content(section: List[Table | Paragraph]):
    if not section:
        return ""    
    
    section_content = []
    for item in section:
        if isinstance(item, Paragraph):
            section_content.append(item.text)
        elif isinstance(item, Table):
            section_content.append(item.to_plain_text())
    
    section_content = clean_section('\n'.join(section_content))
    return section_content