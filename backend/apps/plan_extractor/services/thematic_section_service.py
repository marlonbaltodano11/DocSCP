from typing import List, Tuple, Optional, Dict
from model_data.table import Table
from docx.text.paragraph import Paragraph
from utils.text_utils import remove_accents

class ThematicSectionService:
    
    # List of keywords that identify the thematic table
    THEMATIC_TABLE_KEYWORDS = ["no", "unidad", "tema", "ct", "cp", "lab", "tot", "ei", "ta", "te", "total", "pt", "vc", "ht", "hp", "hi", "th", "credito"]
    THEMATIC_TABLE_KEYWORDS_MATCH_RATE = 0.3        
    
    # The first keywords has the priority
    # List of keywords of the total hours of the unit
    TOTAL_HOURS_KEYWORDS = ["tot", "total", "th"]
    
    # List of keywords for the name of the unit
    UNIT_NAME_KEYWORDS = ["tema", "unidad"]
    
    def __init__(self):
        pass
    
    def _parse_thematic_table(self, thematic_table) -> Table | None:
        """
        Check if the given table is the thematic table and return the if it is indeed the thematic table.
        If is not the thematic table then return None
        """
        
        parsed_table = tuple(thematic_table)
        
        for row_id, row in enumerate(parsed_table):
            match_rate = len([column for column in row if remove_accents(column).lower().strip('.').strip() in self.THEMATIC_TABLE_KEYWORDS])/len(self.THEMATIC_TABLE_KEYWORDS)
            
            if match_rate >= self.THEMATIC_TABLE_KEYWORDS_MATCH_RATE:
                return parsed_table[row_id:-1]
        
        return None
    
    def _get_thematic_table(self, thematic_section: List[Table | Paragraph]) -> Optional[Tuple[Tuple[str]]]:
        thematic_section: List[Table] = [item for item in thematic_section if isinstance(item, Table)]
        thematic_table: Optional[Tuple[Tuple[str]]] = None
        
        for table in thematic_section:
            thematic_table = self._parse_thematic_table(table)
            if thematic_table is not None:
                break
        
        return thematic_table
    
    def _get_column_by_keywords(self, table: Tuple[Tuple[str]], keywords: List[str]) -> List[any]:
        column_id = None
        
        for keyword in keywords:
            for idx, column in enumerate(table[0]):
                if remove_accents(column).lower().strip('.').strip() == keyword:
                    column_id = idx
                    break
            if column_id is not None:
                break

        if column_id is None:
            return []

        return [row[column_id] for row in table[1:]]

    def extract_information(self, thematic_section: List[Table | Paragraph]) -> List[Dict]:
        thematic_table = self._get_thematic_table(thematic_section)
        units_with_hours = []
        
        if thematic_table is None:
            return units_with_hours
        
        units_column = self._get_column_by_keywords(thematic_table, self.UNIT_NAME_KEYWORDS)
        hours_column = self._get_column_by_keywords(thematic_table, self.TOTAL_HOURS_KEYWORDS)
        
        for idx, unit in enumerate(units_column): 
            units_with_hours.append({"unit_name":unit, "hours":hours_column[idx]})
        
        return units_with_hours
        
        
                
        