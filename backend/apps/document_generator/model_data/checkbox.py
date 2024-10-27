from docx.oxml.xmlchemy import BaseOxmlElement
from docx.oxml.ns import qn
from lxml import etree
from typing import Optional


class Checkbox:
    """
    Class to represent a checkbox with a label and state.
    """
    
    CHECKBOX_SELECTED_XML = """
    <w:sdtContent xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:r>
            <w:rPr><w:szCs w:val="24"/></w:rPr>
            <w:sym w:font="Wingdings 2" w:char="F052"/>
        </w:r>
    </w:sdtContent>
    """

    CHECKBOX_UNSELECTED_XML = """
    <w:sdtContent xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:r>
            <w:rPr><w:szCs w:val="24"/></w:rPr>
            <w:sym w:font="Wingdings 2" w:char="F0A3"/>
        </w:r>
    </w:sdtContent>
    """
    
    NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'w14': 'http://schemas.microsoft.com/office/word/2010/wordml'
    }
 
    
    def __init__(self, label: str = "", element: BaseOxmlElement = None):
        """
        Initialize a Checkbox instance.
        
        :param label: The label or label of the checkbox.
        :param state: The state of the checkbox (True for checked, False for unchecked).
        """
        self.label = label
        self._element = element
        
        self._state: Optional[bool] = self._get_state()
        
        
    @property
    def state(self):
        return self._get_state()
    
    def _get_state(self) -> bool:
        """Get the checkbox value from the document"""

        checkbox_value: str = self._element.find(".//w:sdtPr/w14:checkbox/w14:checked", namespaces=self.NAMESPACES)
        return True if checkbox_value.get(qn("w14:val")) == "1" else False
        
    def _set_state(self, state: bool):
        """Change the textbox state in the document

        Args:
            state (bool): The new state of the checkbox
        """
        # Buscar el valor del checkbox en <w14:checked>
        checkbox_value = self._element.find(".//w:sdtPr/w14:checkbox/w14:checked", namespaces=self.NAMESPACES)

        if checkbox_value is not None:
            # Cambiar el atributo 'val' de w14:checked a "1" o "0" según el valor booleano
            checkbox_value.set(qn("w14:val"), "1" if state else "0")
            self._state = state
            
            # Modificar el contenido visual del checkbox
            checkbox_content = self._element.find(".//w:sdtContent", namespaces=self.NAMESPACES)
            if checkbox_content is not None:
                checkbox_content.clear()
                new_content = etree.fromstring(self.CHECKBOX_SELECTED_XML if state else self.CHECKBOX_UNSELECTED_XML)
                checkbox_content.append(new_content)
        

    def check(self):
        """Set the checkbox state to checked (True)."""
        if not self._state:
            self._set_state(True)

    def uncheck(self):
        """Set the checkbox state to unchecked (False)."""
        if self._state:
            self._set_state(False)

    def toggle(self) -> bool:
        """Toggle the state of the checkbox."""
        self._set_state(not self._state)
        return self._state

    def __str__(self):
        """String representation of the checkbox."""
        return f"Checkbox(label={self.label}, state={'checked' if self.state else 'unchecked'})"
