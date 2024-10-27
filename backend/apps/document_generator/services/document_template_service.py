from .document_io_service import DocumentIOService
from .checkbox_service import CheckboxService
from .document_service import DocumentService
from typing import Dict

class DocumentTemplateService(DocumentService):
    """
    Servicio principal para la manipulación de plantillas de documentos.
    """
    
    def __init__(self, template_path: str, data: Dict[str, any]):
        self.doc_io = DocumentIOService(template_path)
        self.doc = self.doc_io.get_document()
        self._data = data
        
        super().__init__(self.doc)
    
    def _replace_paragraph_text(self, data: Dict[str, str]):
        for paragraph in self._paragraphs:
            for run in paragraph.runs:
                if run.text in data.keys():
                    run.text = data[run.text]
    
    def _replace_checkbox_labels(self, labels: Dict[str, str]):
        self._replace_paragraph_text(labels)
    
    def _fill_checkboxes(self, checkbox_data: Dict[str, str], labels: Dict[str, str] = None):
        checkboxes = self._get_checkboxes()
        values = ["{{"+item[1]+"}}" for item in checkbox_data.items()]

        for checkbox in checkboxes:
            checkbox.check() if checkbox.label in values else checkbox.uncheck()
            
        if labels:
            self._replace_checkbox_labels(labels)
    
    def fill_document_template(self):
        checkbox_data: Dict[str, str] = self._data.get('checkboxes')
        self._fill_checkboxes(checkbox_data)
        self._replace_paragraph_text(self._data)

    def save(self, output_path: str):
        self.doc_io.save_document_as(output_path)


if __name__ == '__main__':
    
    # Inicialización
    document_template = DocumentTemplateService()

    # Guardar documento final
    #document_template.save('output.docx')