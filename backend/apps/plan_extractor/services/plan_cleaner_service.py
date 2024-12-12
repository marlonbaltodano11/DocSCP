
from typing import Dict, List, Tuple
from model_data.table import Table
from docx.text.paragraph import Paragraph
import re
from apps.plan_extractor.services.general_information_classifier_service import GeneralInformationClassifierService
from utils.text_utils import clean_label_text
from utils.section_utils import process_section_content
from apps.plan_extractor.services.thematic_section_service import ThematicSectionService
from apps.plan_extractor.services.analytic_section_service import AnalyticSectionService

class PlanCleanerService:
    
    GENERAL_INFORMATION_TEMPLATE = {
        "career": "",
        "signature_name": "",
        "signature_code": "",
        "career_year": "",
        "total_hours": "",
        "credits": "",
        
        # These are always blank
        "teacher_fullname": "",
        "delivery_date": "",
        "update_date": "",
        "approved_date": "",
        "timetable": "",
        "approved_by": "",
    }
    
    def __init__(self):
        self._general_information_classifier = GeneralInformationClassifierService()
        self._thematic_section = ThematicSectionService()
        self._analytic_section = AnalyticSectionService()
    
    def _get_general_information(self, general_section: List[Table|Paragraph]) -> Dict[str, str]:
        general_information_table = None
        
        for item in general_section:
            # If the table has less than 2 rows I will assume it's not the right table.
            # That is because there are some table used just for the title, for some reason
            if isinstance(item, Table) and len(item._table.rows) >= 2:
                general_information_table = item
                break
        
        # If the table's rows number is between [2, 3] then it's assumed that the information
        # inside the table is in plain text, so an attempt will be made to extract the information. 
        if len(tuple(general_information_table)) <= 3:
            general_information_table: str = general_information_table.to_plain_text() # Turn table into plain text
            matches = re.findall(r"(.+):(.+)", general_information_table)
            general_information_table = tuple((match[0].strip(), match[1].strip()) for match in matches)
        
        # Filter the row that doesn't follow the key, value structure
        general_information_table = tuple(row for row in tuple(general_information_table) if len(row) == 2)
        
        general_information = self.GENERAL_INFORMATION_TEMPLATE.copy()
        for row in general_information_table:
            raw_label = clean_label_text(row[0])
            label = self._general_information_classifier.classify_label(raw_label)
            
            if label != 'other':
                general_information[label] = row[1]
        
        return general_information
    
    def _get_subject_objective(self, objective_section: List[Table | Paragraph]) -> str:
        return process_section_content(objective_section)
    
    def _get_methodological_recommendations(self, recommendations_section: List[Table | Paragraph]) -> str:
        return process_section_content(recommendations_section)
    
    def _get_evaluation_method(self, evaluation_section: List[Table | Paragraph]) -> str:
        return process_section_content(evaluation_section)
    
    def _get_course_plan(self, thematic_section: List[Table | Paragraph], analytic_section: List[Table | Paragraph]) -> str:
        unit_topics = self._analytic_section.extract_unit_topics(process_section_content(analytic_section))
        units = self._thematic_section.extract_information(thematic_section)
        
        for idx, topics in enumerate(unit_topics):
            if idx > len(units) - 1:
                break
            
            units[idx]['topics'] = topics

        return units
        
    def _get_bibliography(self, bibliography_section: List[Table | Paragraph]) -> str:
        return process_section_content(bibliography_section)
    
    def get_cleaned_plan(self, raw_sections: Dict[str, List]) -> List[Dict[str, any]]:
        general_information = self._get_general_information(raw_sections.get('General Information', None))
        subject_objective = self._get_subject_objective(raw_sections.get('Objectives', None))
        methodological_recommendations = self._get_methodological_recommendations(raw_sections.get('Methodological Recommendations', None))
        evaluation_method = self._get_evaluation_method(raw_sections.get('Evaluation System', None))
        course_plan = self._get_course_plan(raw_sections.get('Thematic Plan', None), raw_sections.get('Analytical Plan', None))
        bibliography = self._get_bibliography(raw_sections.get('Bibliography', None))
        
        cleaned_plan = {
            # General Information
            "general_information": general_information,
            
            "subject_objective": subject_objective,
            "methodological_recommendations": methodological_recommendations,
            "evaluation_method": evaluation_method,
            
            # Combined plan (Analytic and Thematic Plan)
            "course_plan": course_plan,
            
            "bibliography": bibliography
        }
        
        return cleaned_plan
        
    