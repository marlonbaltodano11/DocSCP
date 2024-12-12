from huggingface_hub import hf_hub_download
model_class_path = hf_hub_download(repo_id="marlonbaltodano11/syllabus_title_checker", filename="modeling_syllabus_title_binary_classifier.py")
import sys
import os
sys.path.append(os.path.dirname(model_class_path))

import torch
from transformers import DistilBertTokenizer
from modeling_syllabus_title_binary_classifier import SyllabusTitleBinaryClassifier # type: ignore

class TitleCheckerService:
    def __init__(self):
        # Setup device
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'

        # Tokenizer and Model
        self.tokenizer = DistilBertTokenizer.from_pretrained("marlonbaltodano11/syllabus_title_checker")
        self.model = SyllabusTitleBinaryClassifier.from_pretrained("marlonbaltodano11/syllabus_title_checker").to(self.device)

    def _tokenize(self, text) -> any:
        encoding = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=128,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'],
            'attention_mask': encoding['attention_mask']
        }
    
    def check_title(self, title: str) -> bool:
        encoding = self._tokenize(title)
        
        with torch.no_grad():
            input_ids = encoding['input_ids'].to(self.device)
            attention_mask = encoding['attention_mask'].to(self.device)

            # Forward pass
            output = self.model(input_ids, attention_mask)
            pred = torch.round(output.squeeze())

            return pred.item() == 1
    
    