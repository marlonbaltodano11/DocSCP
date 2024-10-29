from docx.text.paragraph import Paragraph
from typing import Dict, List

class RunService:
    """_summary_
    """
    
    @staticmethod
    def replace_runs_text(paragraph: Paragraph, data: Dict[str, str]):
        for run in paragraph.runs:
            key = run.text.strip()
            if key in data.keys():
                run.text = data[key]