import os
import docx
from docx.document import Document as DocumentObject

class DocumentIOService:
    """
    Service class to handle document-related I/O operations using the python-docx library.

    Attributes:
        document_path (str): Path to the document file to be handled.
        doc (DocumentObject): The loaded document object from the given document path.
    """

    def __init__(self, document_path: str):
        """
        Initializes the DocumentIOService instance and loads the document from the given path.

        Args:
            document_path (str): Path to the document file to be loaded.

        Raises:
            FileNotFoundError: If the file at the specified document_path does not exist.
        """
        self.document_path = document_path
        self.doc = self._load_document()

    def _load_document(self) -> DocumentObject:
        """
        Loads a document from the specified path.

        Returns:
            DocumentObject: The loaded document.

        Raises:
            FileNotFoundError: If the document does not exist at the given path.
        """
        if os.path.exists(self.document_path):
            return docx.Document(self.document_path)
        else:
            raise FileNotFoundError(f"File '{self.document_path}' not found.")

    def save_document(self):
        """
        Saves the current document to the original file path.
        """
        self.doc.save(self.document_path)
        
    def save_document_as(self, output_path: str):
        """
        Saves the current document to a new file path.

        Args:
            output_path (str): Path to save the document as a new file.
        """
        self.doc.save(output_path)

    def get_document(self) -> DocumentObject:
        """
        Returns the loaded document object.

        Returns:
            DocumentObject: The loaded document.
        """
        return self.doc

    def delete_document(self) -> bool:
        """
        Deletes the document file from the file system.

        Returns:
            bool: True if the file was successfully deleted, False if it failed.

        Raises:
            FileNotFoundError: If the document does not exist at the given path.
        """
        if os.path.exists(self.document_path):
            os.remove(self.document_path)
            return True
        else:
            raise FileNotFoundError(f"File '{self.document_path}' not found.")
