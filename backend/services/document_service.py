from docx.document import Document as DocumentObject
from docx.table import Table as TableObject
from docx.oxml.xmlchemy import BaseOxmlElement
from docx.text.paragraph import Paragraph
from typing import List, Generator, Iterable
from model_data import Checkbox
from services.checkbox_service import CheckboxService
from model_data.table import Table

class DocumentService:
    """Handle document related tasks
    """
    
    NAMESPACES = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    def __init__(self, doc: DocumentObject):
        self._doc = doc
        self._paragraphs = self.get_all_paragraphs()
        
    def get_tables(self) -> List[TableObject]:
        return self._doc.tables
    
    def _get_paragraph_from_element(self, element: BaseOxmlElement) -> Generator[Paragraph, None, None]:
        """
        Yields paragraphs found within an element. If the element is a table, it delegates
        to Table to extract paragraphs from the table.
        
        Args:
            element (OxmlElement): The element to extract paragraphs from.

        Yields:
            Paragraph: Each paragraph found in the element.
        """
        if isinstance(element, BaseOxmlElement):
            # Check if the element is a table
            if element.tag.endswith('tbl'):
                table = Table(TableObject(tbl=element, parent=self._doc))

                # Assuming Table.get_paragraphs returns Paragraph objects
                paragraphs = table.get_paragraphs()
                for paragraph in paragraphs:
                    yield paragraph

            # Check if the element is a paragraph
            elif element.tag.endswith('p'):
                # Convert the OXML element to a Paragraph object
                paragraph = Paragraph(element, self._doc)
                yield paragraph
    
    def get_all_paragraphs(self) -> List[Paragraph]:
        """
        Get all paragraphs from the document in order.

        Returns:
            List[Paragraph]: A list of Paragraph objects extracted from the document.
        """
        paragraphs = []
        
        # Iterate over all elements in the document body
        for element in self._doc.element.body:
            paragraphs.extend(list(self._get_paragraph_from_element(element)))
        
        #[print(p.text) for p in paragraphs]
        return paragraphs
    
    def get_all_elements(self) -> List[Paragraph | Table]:
        """
        Get all elements from the document in order.

        Returns:
            List[Paragraph|Table]: A list of Paragraph and Table objects extracted from the document.
        """
        
        elements = []
        
        oxml_elements: Iterable[BaseOxmlElement] = self._doc.element.body
        
        for oxml_element in oxml_elements:
            if oxml_element.tag.endswith('p'):
                elements.append(Paragraph(oxml_element, self._doc))
            elif oxml_element.tag.endswith('tbl'):
                elements.append(Table(TableObject(tbl=oxml_element, parent=self._doc)))

        return elements
    
    def get_checkboxes(self) -> List[Checkbox]:
        checkboxes: List[Checkbox] = []
          
        for paragraph in self._paragraphs:
            checkboxes.extend(CheckboxService.find_checkboxes_in_paragraph(paragraph))
        
        return checkboxes
    
    def replace_text(self):
        pass