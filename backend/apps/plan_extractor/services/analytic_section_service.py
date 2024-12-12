from apps.plan_extractor.services.unit_checker_service import UnitCheckerService
from typing import List
from utils.text_utils import replace_control_characters

class AnalyticSectionService:
    def __init__(self):
        self._unit_checker = UnitCheckerService()
        
    def extract_unit_topics(self, analytic_section: str) -> List[List[str]]:
        analytic_section = analytic_section.split('\n')
        unit_topics: List[List[str]]  = []
        
        for line in analytic_section:
            if line.strip() == '':
                continue
            
            if self._unit_checker.check_unit_name(replace_control_characters(line)):
                unit_topics.append([])
            else:
                if len(unit_topics) == 0:
                    unit_topics.append([])
                
                unit_topics[-1].append(line)
        
        return unit_topics
        
    