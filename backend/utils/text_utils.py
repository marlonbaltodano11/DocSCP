import unicodedata
import re
from typing import List

def remove_accents(text: str) -> str:
    """
    Removes accents from the given text.
    """
    nfkd_form = unicodedata.normalize('NFKD', text)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])

def replace_control_characters(text: str) -> str:
    # Diccionario con los caracteres de control y sus representaciones literales
    control_chars = {
        '\n': '\\n',   # Salto de línea
        '\t': '\\t',   # Tabulador
        '\r': '\\r',   # Retorno de carro
        '\b': '\\b',   # Backspace
        '\f': '\\f',   # Form feed (cambio de página)
        '\v': '\\v',    # Vertical tab
        '"': "'"
    }

    # Utilizar regex para reemplazar cada uno de los caracteres de control
    def replace_match(match):
        char = match.group(0)
        return control_chars.get(char, char)
    
    # Reemplazar los caracteres de control en el texto
    return re.sub(r'[\n\t\r\b\f\v"]', replace_match, text)


def clean_label_text(text:str) -> str:
    return remove_accents(text).lower().strip(':;')

def clean_title_text(text: str) -> str:
    """
    Cleans the text by removing accents, trimming whitespace,
    and removing list index prefix (1., 2., I., II., ...)
    """
    text = text.strip().strip('.').lower()
    
    # Remove accents
    text = remove_accents(text)
    
    # Clean and split the text
    text = re.split(r'^([ivx\d]+.{0,1})+ ', text)
    text = text[-1] if len(text) > 1 else text[0]
    text = text.replace('\t', ' ').replace('\n', ' ').strip()
    return text

def slice_and_clean_title_text(raw_text: str) -> List[str]:
    text_sliced = raw_text.split('\n')
    text_sliced = [clean_title_text(text) for text in text_sliced]
    text_sliced = [text for text in text_sliced if text]
    return text_sliced
    