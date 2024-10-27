from .document_template_service import DocumentTemplateService
from typing import Dict

class SyllabusTemplateService(DocumentTemplateService):
    """
    Servicio especializado para la manipulación de plantillas de syllabus.
    """
    
    CHECKBOX_LABELS = {
        "{{in-person}}": "Presencial",
        "{{semi-in-person}}": "Semipresencial",
        "{{quarter}}": "Cuatrimestre",
        "{{semester}}": "Semestre",
        "{{trimestre}}": "Trimestre",
        "{{2_1}}": "2",
        "{{3_1}}": "3",
        "{{4_1}}": "4",
        "{{5_1}}": "5",
        "{{6_1}}": "6",
        "{{2_2}}": "2",
        "{{3_2}}": "3",
        "{{4_2}}": "4",
        "{{5_2}}": "5",
        "{{6_2}}": "6",
    }

    def __init__(self, data: Dict[str, any]):
        template_path = r'backend\apps\document_generator\templates\syllabus_template.docx'
        super().__init__(template_path, data)

    def fill_document_template(self):
        checkbox_data: Dict[str, str] = self._data.get('checkboxes')
        
        # Format some of the dict values
        checkbox_data['{{credits}}'] = checkbox_data['{{credits}}'] + '_1' 
        checkbox_data['{{weekly_frequency}}'] = checkbox_data['{{weekly_frequency}}'] + '_2' 
        
        self._fill_checkboxes(checkbox_data, labels = self.CHECKBOX_LABELS)
        self._replace_paragraph_text(self._data)
