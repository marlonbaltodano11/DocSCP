from docx.table import Table as TableObject
from docx.table import _Row, _Cell
from docx.text.paragraph import Paragraph
from typing import Iterator, List, Tuple, Optional

def _iter_row_cell(row: _Row) -> Iterator[Optional[_Cell]]:
    for _ in range(row.grid_cols_before):
        yield None
    for c in row.cells:
        yield c
    for _ in range(row.grid_cols_after):
        yield None
        
def _iter_row_cell_texts(row: _Row) -> Iterator[str]:
    for cell in _iter_row_cell(row):
        yield cell.text if cell else ""  # Devolver texto vacío si la celda es None
        
class TableService:
    """Handle table related tasks."""

    @staticmethod
    def convert_table_to_text(table: TableObject) -> List[Tuple[str]]:
        """Convert a table into a list of tuples containing cell texts."""
        return [tuple(_iter_row_cell_texts(row)) for row in table.rows]
    
    @staticmethod
    def get_paragraphs(table: TableObject) -> List[Paragraph]:
        """Extract paragraphs from the given table."""
        paragraphs: List[Paragraph] = []

        for row in table.rows:
            for cell in _iter_row_cell(row):
                if cell:  # Si la celda no es None
                    paragraphs.extend(cell.paragraphs)

        return paragraphs
    
    @staticmethod
    def create_row():
        """Create a new row at the end of the table."""
        raise NotImplementedError("This method is not implemented yet.")
    
    @staticmethod
    def insert_row():
        """Insert a new row into a specific position of the table."""
        raise NotImplementedError("This method is not implemented yet.")
    
    @staticmethod
    def combine_cells():
        """Combine a group of cells into a single cell."""
        raise NotImplementedError("This method is not implemented yet.")
