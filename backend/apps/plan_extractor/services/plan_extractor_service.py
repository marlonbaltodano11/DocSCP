from services.document_service import DocumentService
from services.document_io_service import DocumentIOService
from docx.document import Document as DocumentObject
from utils.text_utils import clean_title_text
from typing import List, Dict, Optional
from apps.plan_extractor.services.title_checker_service import TitleCheckerService
from apps.plan_extractor.services.title_classifier_service import TitleClassifierService
from docx.text.paragraph import Paragraph
from model_data.table import Table

class PlanExtractorService:
    def __init__(self, doc: DocumentObject):
        self._doc = doc
        self._doc_service = DocumentService(self._doc)
        self._title_checker = TitleCheckerService()
        self._title_classifier = TitleClassifierService()
    
    def check_bold_text(self, paragraph: Paragraph) -> List[str]: # This could be in a parragraph service or class
        if any([run.bold for run in paragraph.runs]) or paragraph.style.font.bold:
            return True
        return False

    def get_sections(self) -> Dict[str, List]:
        elements =  self._doc_service.get_all_elements()
        
        sections: Dict[str, List] = {}
        current_section: Optional[str] = None
        
        for element in elements:
            #is_section_title = False
            
            if isinstance(element, Paragraph):
                if self.check_bold_text(element):
                    cleaned_text = clean_title_text(element.text)
                    
                    if self._title_checker.check_title(cleaned_text):
                        #is_section_title = True
                        current_section = self._title_classifier.classify_title(cleaned_text)
                        sections[current_section] = []        
                        
            else:
                for paragraph in element.get_paragraphs():
                    if self.check_bold_text(paragraph):
                        cleaned_text = clean_title_text(paragraph.text)
                       
                        if self._title_checker.check_title(cleaned_text):
                            current_section = self._title_classifier.classify_title(cleaned_text)
                            sections[current_section] = []
                            break
            
            if current_section is not None:
                sections[current_section].append(element)
        
        return sections