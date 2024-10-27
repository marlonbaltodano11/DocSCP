from docx.text.paragraph import Paragraph
from docx.oxml import OxmlElement
from docx.oxml.xmlchemy import BaseOxmlElement
from typing import List, Optional
from ..model_data import Checkbox

class CheckboxService:
    """
    Clase encargada de manejar la manipulación de checkboxes dentro del documento.
    """

    @staticmethod
    def find_checkboxes_in_paragraph(paragraph: Paragraph) -> List[Checkbox]:
        """
        Find checkboxes in a given paragraph and return a list of tuples with the associated title and the checkbox element.

        Args:
            paragraph (Paragraph): The paragraph to search for checkboxes.

        Returns:
            List[Tuple[Optional[str], BaseOxmlElement]]: A list of tuples where each tuple contains the title (if any) and the checkbox element.
        """
        
        checkboxes: List[Checkbox] = []
        previous_text: Optional[str] = None  # Consider the previous run element as the title for the checkbox

        for element in paragraph._element:
            if element.tag.endswith('r'):
                # Extract the text from the run
                current_text = ''.join([node.text for node in element if node.tag.endswith('t')])
                previous_text = current_text if current_text.strip() != "" else previous_text
                continue
            
            if element.tag.endswith('sdt'):
                # Append the checkbox (structured document tag) and its associated title (if any)
                checkboxes.append(Checkbox(label=previous_text, element=element))
            
            previous_text = None

        return checkboxes