from services.document_template_service import DocumentTemplateService
from typing import Dict
from model_data.table import Table
from pathlib import Path

class SyllabusTemplateService(DocumentTemplateService):
    """
    Servicio especializado para la manipulación de plantillas de syllabus.
    """
    
    CHECKBOX_LABELS = {
        "{{in-person}}": "Presencial",
        "{{semi-in-person}}": "Semipresencial",
        "{{quarter}}": "Cuatrimestre",
        "{{semester}}": "Semestre",
        "{{trimester}}": "Trimestre",
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
    
    TABLE_SUBTITLE_STYLE = "Subtítulo Tabla"
    TABLE_CONTENT_STYLE = "Contenido Tabla"
    MICROPLANNING_TABLE_INDEX = 4
    MICROPLANNING_TABLE_KEY = "microplanning_table"
    SCHEDULE_TABLE_INDEX = 5
    SCHEDULE_TABLE_KEY = "schedule_table"
    
    def __init__(self, data: Dict[str, any]):
        template_path = Path('apps') / 'syllabus_generator' / 'templates' / 'syllabus_template.docx'
        super().__init__(template_path, data)

    def _fill_tables(self):
        """
        Fills the tables in the document with the provided data from the data dictionary.
        """
        tables = self._doc.tables
        microplanning_table = Table(tables[self.MICROPLANNING_TABLE_INDEX], self._doc)
        schedule_table = Table(tables[self.SCHEDULE_TABLE_INDEX], self._doc)
        
        self._fill_microplanning_table(microplanning_table)
        self._fill_schedule_table(schedule_table)

    def _fill_microplanning_table(self, table: Table):
        """
        Fills the microplanning table with data.

        :param table: The table to fill with microplanning data.
        """
        microplanning_data = self._data.get(self.MICROPLANNING_TABLE_KEY, [])
        self._fill_table_data(table, microplanning_data, self.TABLE_CONTENT_STYLE)

    def _fill_schedule_table(self, table: Table):
        """
        Fills the schedule table with data.

        :param table: The table to fill with schedule data.
        """
        schedule_data = self._data.get(self.SCHEDULE_TABLE_KEY, {})

        first_partial_data = schedule_data.get("first_partial", [])
        self._fill_table_data(table, first_partial_data, self.TABLE_CONTENT_STYLE)

        # Add subtitle for the second partial
        table.create_subtitle_row("Segundo Parcial (Plan diario):", self.TABLE_SUBTITLE_STYLE, 'D9D9D9')

        second_partial_data = schedule_data.get("second_partial", [])
        self._fill_table_data(table, second_partial_data, self.TABLE_CONTENT_STYLE, True)

    
    def fill_document_template(self):
        checkbox_data: Dict[str, str] = self._data.get('checkboxes')
        
        # Format some of the dict values
        checkbox_data['{{credits}}'] = str(checkbox_data['{{credits}}']) + '_1' 
        checkbox_data['{{weekly_frequency}}'] = str(checkbox_data['{{weekly_frequency}}']) + '_2' 
        
        super().fill_document_template(self.CHECKBOX_LABELS)
        
        self._fill_tables()
         
