from docx.document import Document as DocumentObject
from docx.text.paragraph import Paragraph
from typing import List, Dict

class ParagraphService:
    """
    Clase que maneja la lógica de reemplazo de texto en párrafos y tablas.
    """

    @staticmethod
    def write_formatted_text(paragraph: Paragraph, text: str):
        last_paragraph: Paragraph = paragraph
        reversed_text_parts: List[str] = text.split('\n')[::-1]
        text_parts_length = len(reversed_text_parts)
        
        for index, text_part in enumerate(reversed_text_parts):
            last_paragraph.text = text_part
            
            if index < text_parts_length - 1:
                last_paragraph = last_paragraph.insert_paragraph_before()
    
    @staticmethod          
    def replace_paragraphs_text(paragraphs: List[Paragraph], data: Dict[str, str]):
        for paragraph in paragraphs:
            key = paragraph.text.strip()
            if key in data.keys():
                paragraph.clear()
                ParagraphService.write_formatted_text(paragraph, data[key])
    
    @staticmethod
    def apply_style_to_paragraphs(paragraphs: List[Paragraph], doc: DocumentObject, style: str):
        """
        Applies a style to all paragraphs of the provided list.
        
        :param paragraphs: Paragraph list where the style will be applied.
        :param doc: Parent Document.
        :param style: Name of the style to apply.
        """
        # Validate that the style exists in the document
        if style in doc.styles:
            for paragraph in paragraphs:
                paragraph.style = doc.styles[style]
        else:
            raise ValueError(f"Style '{style}' not found in the document's styles.")