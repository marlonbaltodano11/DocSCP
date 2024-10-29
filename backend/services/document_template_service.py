from services.document_io_service import DocumentIOService
from services.checkbox_service import CheckboxService
from services.document_service import DocumentService
from services.paragraph_service import ParagraphService
from services.run_service import RunService
from model_data.table import Table
from docx.text.paragraph import Paragraph
from typing import Dict, List, Optional

class DocumentTemplateService(DocumentService):
    """
    Servicio principal para la manipulación de plantillas de documentos.
    """
    
    def __init__(self, template_path: str, data: Dict[str, any]):
        self.doc_io = DocumentIOService(template_path)
        self.doc = self.doc_io.get_document()
        self._data = data
        
        super().__init__(self.doc)

    def _replace_checkbox_labels(self, labels: Dict[str, str]):
        for paragraph in self._paragraphs:
            RunService.replace_runs_text(paragraph, labels)
    
    def _fill_checkboxes(self, checkbox_data: Dict[str, str], labels: Dict[str, str] = None):
        checkboxes = self._get_checkboxes()
        values = ["{{"+item[1]+"}}" for item in checkbox_data.items()]

        for checkbox in checkboxes:
            checkbox.check() if checkbox.label in values else checkbox.uncheck()
            
        if labels:
            self._replace_checkbox_labels(labels)
    
    def _fill_table_data(self, table: Table, data: List[List[str]], style: str, create_first_row: Optional[bool] = False):
        """
        Fills a table with data.

        :param table: The table to fill with data.
        :param data: The data to fill into the table (a list of rows).
        :param style: The style to apply to the table rows.
        :param create_first_row: Whether to create the first row of data. Defaults to False (Assume the first row is already created with the desired table).
        """
        if not isinstance(data, list) or not all(isinstance(row, list) for row in data):
            print(f"Invalid data format: {data}")
            return
        
        start_index = 0
        if data:
            if not create_first_row:
                table.set_row(table.get_last_row(), data[start_index], style)
                start_index += 1
            for item in data[start_index:]:
                if isinstance(item, list):
                    table.create_row(item, style)
                else:
                    print(f"Invalid data format for table: {item}")

    def fill_document_template(self, labels: Dict[str, str] = None):
        checkbox_data: Dict[str, str] = self._data.get('checkboxes')
        self._fill_checkboxes(checkbox_data, labels)
        ParagraphService.replace_paragraphs_text(self._paragraphs, self._data)

    def save(self, output_path: str):
        self.doc_io.save_document_as(output_path)


if __name__ == '__main__':
    
    # Inicialización
    document_template = DocumentTemplateService()

    # Guardar documento final
    #document_template.save('output.docx')